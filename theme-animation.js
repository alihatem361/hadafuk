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

  // Add extra attribute to SVGs that should use secondary color
  setupSvgThemeAttributes();
});

// Function to add data-theme-color attribute to SVGs that should use secondary color
function setupSvgThemeAttributes() {
  // Add data attributes to SVGs based on their location or purpose
  // This allows the theme switcher to know which color to apply

  // Example: Add data-theme-color="secondary" to specific SVG elements
  // This is just an example - adjust selectors to match your actual SVGs that should use secondary color
  const secondaryColorSvgs = [
    document.querySelector(".blob-image"),
    document.querySelector(".hero-background"),
    // Add more selectors for SVGs that should use secondary color
  ];

  secondaryColorSvgs.forEach((svg) => {
    if (svg) {
      svg.setAttribute("data-theme-color", "secondary");
    }
  });
}
