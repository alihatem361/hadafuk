// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  const menuOverlay = document.querySelector(".menu-overlay");
  const navLinks = document.querySelectorAll(".main-nav .nav-link");
  // Toggle menu function
  function toggleMenu() {
    menuToggle.classList.toggle("active");
    mainNav.classList.toggle("active");
    menuOverlay.classList.toggle("active");

    // Add slide animation class
    if (mainNav.classList.contains("active")) {
      mainNav.classList.add("slide-down");
      document.body.style.overflow = "hidden";
    } else {
      mainNav.classList.remove("slide-down");
      document.body.style.overflow = "";
    }
  }

  // Event listeners
  menuToggle.addEventListener("click", toggleMenu);p
  menuOverlay.addEventListener("click", toggleMenu);

  // Close menu when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      mainNav.classList.remove("active");
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
});
