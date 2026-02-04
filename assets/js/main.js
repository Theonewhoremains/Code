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
