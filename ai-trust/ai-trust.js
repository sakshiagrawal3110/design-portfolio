// TL;DR Drawer Toggle
const tldrBtn = document.getElementById("tldr-btn");
const tldrCloseBtn = document.getElementById("tldr-close-btn");
const tldrPanel = document.getElementById("tldr-panel");

function setTldrState(open) {
  if (!tldrBtn || !tldrPanel) return;
  tldrBtn.classList.toggle("is-active", open);
  tldrBtn.setAttribute("aria-pressed", String(open));
  tldrPanel.hidden = !open;
  if (open) {
    tldrPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

if (tldrBtn) {
  tldrBtn.addEventListener("click", () => {
    const next = tldrBtn.getAttribute("aria-pressed") !== "true";
    setTldrState(next);
  });
}

if (tldrCloseBtn) {
  tldrCloseBtn.addEventListener("click", () => setTldrState(false));
}

// Embedded Window Expand / Collapse Micro-Interaction
document.querySelectorAll("[data-toggle-expand]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const win = btn.closest("[data-embed-window]");
    if (!win) return;
    const expanded = win.classList.toggle("is-expanded");
    btn.classList.toggle("is-expanded", expanded);
    btn.setAttribute("aria-pressed", String(expanded));
    btn.textContent = expanded ? "Compact height" : "Expand height";
  });
});