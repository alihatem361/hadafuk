// Theme switcher animations
document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.querySelector(".theme-toggle-btn");
  const themeSwitcher = document.querySelector(".theme-switcher");

  // Replace the click handler from theme-switcher.js with an enhanced version
  themeToggleBtn.removeEventListener("click", themeToggleBtn.clickHandler);

  // Add a new click handler with animations
  themeToggleBtn.addEventListener("click", function () {
    if (!themeSwitcher.classList.contains("active")) {
      // Add bounce animation when opening
      themeSwitcher.classList.add("active");
      themeSwitcher.style.animation = "bounce-in 0.5s forwards";
    } else {
      // Add slide-out animation when closing
      themeSwitcher.style.animation = "slide-out 0.3s forwards";

      // Wait for animation to complete before removing active class
      setTimeout(() => {
        themeSwitcher.classList.remove("active");
        themeSwitcher.style.animation = "";
      }, 300);
    }
  });
});
