function toggleAccordion(button) {
  const parent = button.parentElement;
  const content = button.nextElementSibling;
  const icon = button.querySelector("svg");

  document.querySelectorAll(".bg-white").forEach((item) => {
    if (item != parent) {
      const otherContent = item.querySelector(".accordeon-content");
      const otherIcon = item.querySelector("svg");
      if (otherContent) {
        otherContent.classList.add("hidden");
        otherIcon.classList.remove("rotate-90");
      }
    }
  });
  content.classList.toggle("hidden");
  icon.classList.toggle("rotate-90");
}
