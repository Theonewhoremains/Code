const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

const dropdownToggles = document.querySelectorAll("[data-dropdown-toggle]");

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    if (window.innerWidth >= 960) return;
    event.preventDefault();
    const parent = toggle.closest(".dropdown");
    parent.classList.toggle("open");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

const revealElements = document.querySelectorAll(".reveal");
revealElements.forEach((el) => observer.observe(el));

const path = window.location.pathname.split("/").pop() || "index.html";
const servicePages = new Set([
  "foundational-kitten-owner-guidance.html",
  "behavioral-assessment-guidance.html",
  "kitten-nutrition-wellness.html",
  "long-term-kitten-care.html",
]);

const highlightSelectors = ".nav-links a, .mobile-menu a, .nav-cta";
const navLinks = document.querySelectorAll(highlightSelectors);

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (!href) return;

  const isServicesPage = servicePages.has(path);
  const shouldHighlightServices =
    isServicesPage && href === "services.html";

  if (href === path || shouldHighlightServices) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});
