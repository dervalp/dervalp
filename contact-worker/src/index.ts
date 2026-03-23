interface Env {
  RESEND_API_KEY: string;
  RESEND_FROM_EMAIL: string;
  RESEND_TO_EMAIL: string;
  ALLOWED_ORIGIN: string;
}

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(origin: string, env: Env) {
  const headers = new Headers({
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin"
  });

  if (origin === env.ALLOWED_ORIGIN) {
    headers.set("Access-Control-Allow-Origin", origin);
  }

  return headers;
}

function json(data: Record<string, unknown>, status: number, origin: string, env: Env) {
  const headers = corsHeaders(origin, env);
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { status, headers });
}

function isValidPayload(payload: Partial<ContactPayload>) {
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const website = payload.website?.trim() ?? "";

  if (website) {
    return { honeypot: true };
  }

  if (!name || name.length > 120) {
    return { ok: false, message: "Please provide a valid name." };
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 160) {
    return { ok: false, message: "Please provide a valid email address." };
  }

  if (company.length > 160) {
    return { ok: false, message: "Company name is too long." };
  }

  if (!message || message.length > 4000) {
    return { ok: false, message: "Please provide a message." };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      company,
      message,
      website
    }
  };
}

function emailText(payload: Required<Omit<ContactPayload, "website">> & { website: string }) {
  const companyLine = payload.company ? `Company: ${payload.company}\n` : "";
  return [
    `New contact form submission from ${payload.name}`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    companyLine.trimEnd(),
    "",
    "Message:",
    payload.message
  ]
    .filter(Boolean)
    .join("\n");
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";

    if (request.method === "OPTIONS") {
      if (origin !== env.ALLOWED_ORIGIN) {
        return json({ ok: false, message: "Origin not allowed." }, 403, origin, env);
      }

      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin, env)
      });
    }

    if (origin !== env.ALLOWED_ORIGIN) {
      return json({ ok: false, message: "Origin not allowed." }, 403, origin, env);
    }

    if (request.method !== "POST") {
      return json({ ok: false, message: "Method not allowed." }, 405, origin, env);
    }

    let payload: Partial<ContactPayload>;

    try {
      payload = (await request.json()) as Partial<ContactPayload>;
    } catch {
      return json({ ok: false, message: "Invalid JSON payload." }, 400, origin, env);
    }

    const validation = isValidPayload(payload);

    if ("honeypot" in validation) {
      return json({ ok: true }, 200, origin, env);
    }

    if (!validation.ok) {
      return json({ ok: false, message: validation.message }, 400, origin, env);
    }

    const safePayload = validation.value;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [env.RESEND_TO_EMAIL],
        reply_to: safePayload.email,
        subject: `New website inquiry from ${safePayload.name}`,
        text: emailText(safePayload)
      })
    });

    if (!resendResponse.ok) {
      let message = "Resend rejected the request.";

      try {
        const body = (await resendResponse.json()) as {
          message?: string;
          error?: { message?: string };
        };
        message = body.error?.message ?? body.message ?? message;
      } catch {
        // Ignore parse errors and keep the generic message.
      }

      return json({ ok: false, message }, 502, origin, env);
    }

    return json({ ok: true }, 200, origin, env);
  }
};
