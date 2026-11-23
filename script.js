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
  if (!toast) return;
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
    if (!row) return;
    const isOpen = row.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
});

// 4. How I Work staggered scroll reveal
const howCols = document.querySelectorAll("[data-how-step]");
if (howCols.length > 0) {
  if ("IntersectionObserver" in window) {
    const howObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          howObserver.unobserve(entry.target);
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

// 6. Headline spotlight entrance & subtle pointer sheen
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

// 7. Toolkit category spotlight filter
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

// 8. Things I Built staggered reveal & subtle tilt micro-interaction
const bentoCards = document.querySelectorAll("[data-bento-card]");
if (bentoCards.length > 0) {
  if ("IntersectionObserver" in window) {
    const bentoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Array.from(bentoCards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add("is-revealed");
          }, Math.min(idx * 75, 300));
          bentoObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
    bentoCards.forEach((card) => bentoObserver.observe(card));
  } else {
    bentoCards.forEach((card) => card.classList.add("is-revealed"));
  }

  bentoCards.forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      if (!card.classList.contains("is-revealed")) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-5px) scale(1.01) rotateX(${(-py * 3).toFixed(2)}deg) rotateY(${(px * 3).toFixed(2)}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

// START: EXPERIENCE MICRO-INTERACTIONS
const expCards = document.querySelectorAll("[data-exp-card]");
const expSegs = document.querySelectorAll("[data-role-seg]");

expCards.forEach((card) => {
  const role = card.dataset.role;
  const matchingSeg = role
    ? document.querySelector(`[data-role-seg="${role}"]`)
    : null;

  card.addEventListener("pointermove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--spot-x", `${x.toFixed(1)}%`);
    card.style.setProperty("--spot-y", `${y.toFixed(1)}%`);
  });

  card.addEventListener("pointerenter", () => {
    expSegs.forEach((seg) => seg.classList.remove("is-highlighted"));
    if (matchingSeg) matchingSeg.classList.add("is-highlighted");
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--spot-x", "50%");
    card.style.setProperty("--spot-y", "50%");
    if (matchingSeg) matchingSeg.classList.remove("is-highlighted");
  });

  card.addEventListener("click", () => {
    card.classList.remove("is-booped");
    void card.offsetWidth;
    card.classList.add("is-booped");
    setTimeout(() => card.classList.remove("is-booped"), 320);
  });
});
// END: EXPERIENCE MICRO-INTERACTIONS