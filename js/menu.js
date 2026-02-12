const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navOverlay = document.getElementById("navOverlay");

function toggleMenu() {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", !isExpanded);

  mainNav.classList.toggle("hidden");
  mainNav.classList.toggle("translate-x-full");

  navOverlay.classList.toggle("opacity-0");
  navOverlay.classList.toggle("invisible");

  document.body.classList.toggle("overflow-hidden");
}

menuToggle.addEventListener("click", toggleMenu);
navOverlay.addEventListener("click", toggleMenu);
