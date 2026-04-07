/**
 * Shared export dialog — shows a branded modal asking for email before PDF/XLS download.
 * Works in both Astro (vanilla JS) and React contexts.
 * Returns { email, name } on submit, or null if cancelled.
 */

const DIALOG_ID = "export-dialog";

const STYLES = `
  #${DIALOG_ID} {
    border: none;
    border-radius: 16px;
    padding: 0;
    max-width: 420px;
    width: calc(100% - 2rem);
    margin: auto;
    position: fixed;
    inset: 0;
    height: fit-content;
    box-shadow: 0 8px 40px rgba(21, 25, 28, 0.18), 0 2px 12px rgba(21, 25, 28, 0.08);
    background: #faf9f5;
    color: #0e1110;
    font-family: "Plus Jakarta Sans Variable", "Plus Jakarta Sans", system-ui, sans-serif;
  }
  #${DIALOG_ID}::backdrop {
    background: rgba(14, 17, 16, 0.45);
    backdrop-filter: blur(4px);
  }
  .ed-inner { padding: 2rem 2rem 1.75rem; }
  .ed-close {
    position: absolute; top: 12px; right: 14px;
    background: none; border: none; cursor: pointer;
    font-size: 1.25rem; color: #555e5a; line-height: 1; padding: 4px;
  }
  .ed-close:hover { color: #0e1110; }
  .ed-title {
    font-family: "Lora Variable", "Lora", Georgia, serif;
    font-size: 1.35rem; font-weight: 700; letter-spacing: -0.02em;
    margin: 0 0 0.5rem; color: #0e1110;
  }
  .ed-desc {
    font-size: 0.875rem; color: #555e5a; line-height: 1.6;
    margin: 0 0 1.5rem;
  }
  .ed-field { margin-bottom: 1rem; }
  .ed-label {
    display: block; font-size: 0.8rem; font-weight: 600;
    color: #3a4640; margin-bottom: 0.35rem;
  }
  .ed-input {
    width: 100%; padding: 10px 14px; font-size: 0.9rem;
    border: 1px solid rgba(21, 25, 28, 0.18); border-radius: 8px;
    background: #fff; color: #0e1110; font-family: inherit;
    outline: none; transition: border-color 0.15s;
    box-sizing: border-box;
  }
  .ed-input:focus { border-color: #4a5c3c; }
  .ed-input::placeholder { color: #98a89a; }
  .ed-submit {
    width: 100%; padding: 12px; font-size: 0.9rem; font-weight: 600;
    background: #161c20; color: #f7f4ef; border: none; border-radius: 10px;
    cursor: pointer; font-family: inherit; transition: background 0.15s;
    margin-top: 0.25rem;
  }
  .ed-submit:hover { background: #2e3538; }
  .ed-submit:disabled { opacity: 0.6; cursor: wait; }
  .ed-privacy {
    font-size: 0.72rem; color: #98a89a; text-align: center;
    margin: 1rem 0 0; line-height: 1.5;
  }
  .ed-error {
    font-size: 0.8rem; color: #b04c4a; margin: 0.5rem 0 0;
    display: none;
  }
  .ed-error.visible { display: block; }

  html[data-theme="dark"] #${DIALOG_ID} {
    background: #1a1816; color: #eff2ed;
  }
  html[data-theme="dark"] .ed-title { color: #eff2ed; }
  html[data-theme="dark"] .ed-desc { color: #98a89a; }
  html[data-theme="dark"] .ed-label { color: #aebdaf; }
  html[data-theme="dark"] .ed-input {
    background: #0e0d0b; color: #eff2ed;
    border-color: rgba(255,255,255,0.12);
  }
  html[data-theme="dark"] .ed-input:focus { border-color: #a6be96; }
  html[data-theme="dark"] .ed-submit {
    background: #eef2f2; color: #11161a;
  }
  html[data-theme="dark"] .ed-submit:hover { background: #fff; }
  html[data-theme="dark"] .ed-close { color: #98a89a; }
  html[data-theme="dark"] .ed-close:hover { color: #eff2ed; }
`;

function ensureStyles() {
  if (document.getElementById("ed-styles")) return;
  const style = document.createElement("style");
  style.id = "ed-styles";
  style.textContent = STYLES;
  document.head.appendChild(style);
}

export interface ExportDialogResult {
  email: string;
  name: string;
}

export function showExportDialog(
  toolName: string,
  format: "PDF" | "Excel" = "PDF"
): Promise<ExportDialogResult | null> {
  ensureStyles();

  // Remove any existing dialog
  document.getElementById(DIALOG_ID)?.remove();

  return new Promise((resolve) => {
    const dialog = document.createElement("dialog");
    dialog.id = DIALOG_ID;
    dialog.innerHTML = `
      <div class="ed-inner">
        <button class="ed-close" type="button" aria-label="Close">&times;</button>
        <h3 class="ed-title">Download your ${format} report</h3>
        <p class="ed-desc">Get a personalized ${toolName} report you can share with your team.</p>
        <form id="ed-form">
          <div class="ed-field">
            <label class="ed-label" for="ed-email">Email</label>
            <input class="ed-input" id="ed-email" name="email" type="email"
                   placeholder="you@company.com" required autocomplete="email" />
          </div>
          <div class="ed-field">
            <label class="ed-label" for="ed-name">First name <span style="font-weight:400;color:#98a89a">(optional)</span></label>
            <input class="ed-input" id="ed-name" name="name" type="text"
                   placeholder="Jane" autocomplete="given-name" />
          </div>
          <p class="ed-error" id="ed-error"></p>
          <button class="ed-submit" type="submit">Download ${format}</button>
        </form>
        <p class="ed-privacy">Your email stays private. No spam, no lists.</p>
      </div>
    `;

    document.body.appendChild(dialog);

    const form = dialog.querySelector("#ed-form") as HTMLFormElement;
    const emailInput = dialog.querySelector("#ed-email") as HTMLInputElement;
    const errorEl = dialog.querySelector("#ed-error") as HTMLElement;
    const closeBtn = dialog.querySelector(".ed-close") as HTMLButtonElement;

    function cleanup(result: ExportDialogResult | null) {
      dialog.close();
      dialog.remove();
      resolve(result);
    }

    closeBtn.addEventListener("click", () => cleanup(null));
    dialog.addEventListener("cancel", () => cleanup(null));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorEl.textContent = "Please enter a valid email address.";
        errorEl.classList.add("visible");
        return;
      }
      errorEl.classList.remove("visible");
      const name = (dialog.querySelector("#ed-name") as HTMLInputElement).value.trim();
      cleanup({ email, name });
    });

    dialog.showModal();
    emailInput.focus();
  });
}
