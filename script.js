// 1. Floating translucent nav scroll state
const floatingNav = document.querySelector(".floating-nav");
window.addEventListener(
  "scroll",
  () => {
    if (!floatingNav) return;
    floatingNav.classList.toggle("is-scrolled", window.scrollY > 24);
  },
  { passive: true }
);

// 2. Click-to-copy email with toast
const toast = document.getElementById("toast");
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

document.querySelectorAll(".copy-email-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast(`Copied ${email}`);
    } catch {
      showToast(email);
    }
  });
});

// 3. Expandable experience rows
document.querySelectorAll(".exp-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const row = btn.closest(".exp-row");
    const isOpen = row.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
});

// 4. Activity heatmap generator (52 weeks x 7 days)
const gridEl = document.getElementById("activity-grid");
if (gridEl) {
  const levels = ["", "heat-1", "heat-2", "heat-3", "heat-4"];
  for (let i = 0; i < 52 * 7; i++) {
    const cell = document.createElement("div");
    const seed = (i * 17 + 7) % 13;
    const lvl = seed > 10 ? 4 : seed > 8 ? 3 : seed > 5 ? 2 : seed > 2 ? 1 : 0;
    cell.className = `heat-cell ${levels[lvl]}`.trim();
    cell.title = lvl ? `${lvl} contributions` : "No activity";
    gridEl.appendChild(cell);
  }
}

// How I Work staggered scroll reveal
const howCols = document.querySelectorAll("[data-how-step]");
if (howCols.length > 0) {
  if ("IntersectionObserver" in window) {
    const howObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            howObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    howCols.forEach((col) => howObserver.observe(col));
  } else {
    howCols.forEach((col) => col.classList.add("is-visible"));
  }
}

// 5. Live IST clock in footer
function updateClock() {
  const el = document.getElementById("local-time");
  if (!el) return;
  el.textContent = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date())
    .toUpperCase();
}
updateClock();
setInterval(updateClock, 30000);

// Headline spotlight entrance & subtle pointer sheen
const heroHeadline = document.querySelector(".hero-display--single");
const intentWord = document.querySelector(".word-intent");

if (heroHeadline && intentWord) {
  setTimeout(() => {
    intentWord.classList.add("is-lit");
    setTimeout(() => intentWord.classList.remove("is-lit"), 1100);
  }, 350);

  heroHeadline.addEventListener("pointermove", (e) => {
    const rect = heroHeadline.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    intentWord.style.backgroundPosition = `${(1 - ratio) * 100}% 0`;
  });

  heroHeadline.addEventListener("pointerleave", () => {
    intentWord.style.backgroundPosition = "";
  });
}

// Toolkit category spotlight filter
const tkFilters = document.querySelectorAll(".tk-filter");
const tkCards = document.querySelectorAll(".toolkit-card");

tkFilters.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.filter;

    tkFilters.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    tkCards.forEach((card) => {
      const match = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("is-dimmed", !match);
      card.classList.toggle("is-focused", selected !== "all" && match);
    });
  });
});