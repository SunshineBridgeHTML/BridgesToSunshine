// Bridges to Sunshine LLC — site behavior
// mobile nav, cursor glow, scroll reveal, mailto contact form

document.addEventListener("DOMContentLoaded", () => {
  // mobile nav toggle
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector("nav.links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuBtn.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open") ? "true" : "false"
      );
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => navLinks.classList.remove("open"))
    );
  }

  // cursor glow (desktop only, respects reduced motion)
  const glow = document.getElementById("glow");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (glow && !prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      glow.style.setProperty("--x", e.clientX + "px");
      glow.style.setProperty("--y", e.clientY + "px");
    });
  } else if (glow) {
    glow.style.display = "none";
  }

  // scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  // contact form -> mailto
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const subject = encodeURIComponent(
        `Website inquiry from ${name || "your site visitor"}`
      );
      const body = encodeURIComponent(
        `${message}\n\n—\n${name}\n${email}`
      );
      window.location.href = `mailto:bridgestosunshinellc@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
