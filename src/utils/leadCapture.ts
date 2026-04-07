/**
 * Sends a lead capture event to the Cloudflare Worker.
 * Pierre receives an email with the lead's info + their tool scores.
 */

export interface LeadPayload {
  email: string;
  name: string;
  tool: string;
  scores: Record<string, number | string>;
  verdict: string;
}

export async function captureLead(payload: LeadPayload): Promise<boolean> {
  const endpoint = (import.meta as any).env?.PUBLIC_CONTACT_FORM_ENDPOINT?.trim?.();
  if (!endpoint) return false;

  // Build a readable message from the tool scores
  const scoreSummary = Object.entries(payload.scores)
    .map(([k, v]) => `  ${k}: ${v}`)
    .join("\n");

  const body = {
    name: payload.name || "Anonymous",
    email: payload.email,
    topic: `Lead: ${payload.tool}`,
    message: [
      `New diagnostic lead from ${payload.tool}`,
      "",
      `Verdict: ${payload.verdict}`,
      "",
      "Scores:",
      scoreSummary,
    ].join("\n"),
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    // Silently fail — don't block the PDF download
    return false;
  }
}
