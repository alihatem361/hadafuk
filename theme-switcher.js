// Theme switcher functionality
document.addEventListener("DOMContentLoaded", function () {
  // Insert the theme switcher HTML
  createThemeSwitcher();

  // Add theme-font classes to appropriate text elements
  addThemeClasses();

  const themeSwitcher = document.querySelector(".theme-switcher");
  const themeToggleBtn = document.querySelector(".theme-toggle-btn");
  const themeOptions = document.querySelectorAll(".theme-option");
  // Toggle theme switcher panel
  const toggleSwitcher = function () {
    themeSwitcher.classList.toggle("active");
  };
  themeToggleBtn.addEventListener("click", toggleSwitcher);
  themeToggleBtn.clickHandler = toggleSwitcher;
  // Theme color options
  const themes = {
    green: {
      primaryColor: "#00a98f",
      secondaryColor: "#f39c12", // Renamed from accentColor to secondaryColor
    },
    blue: {
      primaryColor: "#3498db",
      secondaryColor: "#2ecc71", // Renamed from accentColor to secondaryColor
    },
    purple: {
      primaryColor: "#9b59b6",
      secondaryColor: "#f1c40f",
    },
    red: {
      primaryColor: "#e74c3c",
      secondaryColor: "#3498db",
    },
    orange: {
      primaryColor: "#E94E1B",
      secondaryColor: "#00A099",
    },
  };

  // Change theme when an option is clicked
  themeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const themeColor = this.getAttribute("data-theme");
      setTheme(themeColor);

      // Update active class
      themeOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      // Save theme preference
      localStorage.setItem("selectedTheme", themeColor);
    });
  }); // Set theme function
  function setTheme(themeColor) {
    const theme = themes[themeColor];
    if (!theme) return;

    document.documentElement.style.setProperty(
      "--primary-color",
      theme.primaryColor
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      theme.secondaryColor
    );

    // Keep accent color for backward compatibility
    document.documentElement.style.setProperty(
      "--accent-color",
      theme.secondaryColor
    );

    // Update font colors for text elements
    updateFontColors(theme.primaryColor);

    // Update SVG fill colors
    updateSvgColors(theme.primaryColor, theme.secondaryColor);
  }

  // Function to create the theme switcher HTML
  function createThemeSwitcher() {
    const themeHTML = `
      <div class="theme-switcher">
        <button class="theme-toggle-btn" aria-label="تغيير سمة الموقع">
          <i class="fas fa-palette"></i>
        </button>
        <div class="theme-title">اختر لون الموقع</div>
        <div class="color-options">
          <div class="theme-option" data-theme="green">
            <div class="color-preview green-preview"></div>
            <span class="theme-label">أخضر (الافتراضي)</span>
          </div>

            <div class="theme-option" data-theme="orange">
            <div class="color-preview orange-preview"></div>
            <span class="theme-label">برتقالي</span>
          </div>

          <div class="theme-option" data-theme="blue">
            <div class="color-preview blue-preview"></div>
            <span class="theme-label">أزرق</span>
          </div>
          <div class="theme-option" data-theme="purple">
            <div class="color-preview purple-preview"></div>
            <span class="theme-label">بنفسجي</span>
          </div>
          <div class="theme-option" data-theme="red">
            <div class="color-preview red-preview"></div>
            <span class="theme-label">أحمر</span>
          </div>
        
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", themeHTML);
  } // Function to update font colors
  function updateFontColors(primaryColor) {
    // Apply the primary color to elements with theme-font class
    const themeFonts = document.querySelectorAll(".theme-font");

    themeFonts.forEach((element) => {
      element.style.color = primaryColor;
    });

    // Apply secondary colors to elements with theme-font-accent class if needed
    const accentElements = document.querySelectorAll(".theme-font-accent");
    const secondaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--secondary-color")
      .trim();

    accentElements.forEach((element) => {
      element.style.color = secondaryColor;
    });
  }

  // Helper function to create a CSS filter for recoloring SVGs
  function createColorFilter(hexColor) {
    const rgb = hexToRgb(hexColor);
    return `brightness(0) saturate(100%) invert(${calculateInversion(
      rgb
    )}) sepia(${calculateSepia(rgb)}) saturate(${calculateSaturation(rgb)}) hue-rotate(${calculateHueRotate(rgb)}deg) brightness(${calculateBrightness(rgb)})`;
  }

  // Helper functions for filter calculations
  function calculateInversion(rgb) {
    return rgb.r / 255 > 0.5 ? 1 : 0;
  }

  function calculateSepia(rgb) {
    return rgb.g / 255 > 0.6 ? 1 : 0.4;
  }

  function calculateSaturation(rgb) {
    const max = Math.max(rgb.r, rgb.g, rgb.b);
    const min = Math.min(rgb.r, rgb.g, rgb.b);
    return max === 0 ? 0 : ((max - min) / max) * 10;
  }

  function calculateHueRotate(rgb) {
    return (Math.atan2(rgb.g - rgb.b, rgb.r - rgb.g) * 180) / Math.PI;
  }

  function calculateBrightness(rgb) {
    return ((rgb.r + rgb.g + rgb.b) / (255 * 3)) * 2;
  }

  // Helper function to convert hex color to RGB if needed later
  function hexToRgb(hex) {
    // Remove the # if present
    hex = hex.replace(/^#/, "");

    // Parse hex values
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return { r, g, b };
  }

  // Function to add theme-font classes to elements that need to change color with theme
  function addThemeClasses() {
    // Add theme-font class to these elements (primary color)
    const primaryFontElements = [
      ".highlight",
      ".header-title",
      ".courses-title",
      ".course-title",
      ".course-price",
      ".payment-steps-title",
      ".payment-tab.active",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      ".nav-link:hover",
      ".footer-logo-text",
    ];

    // Add theme-font-accent class to these elements (accent color)
    const accentFontElements = [".cta-button", ".course-btn", ".payment-link"];

    // Apply primary color class
    primaryFontElements.forEach((selector) => {
      try {
        document.querySelectorAll(selector).forEach((element) => {
          element.classList.add("theme-font");
        });
      } catch (e) {
        console.warn(`Selector error for ${selector}:`, e);
      }
    });

    // Apply accent color class
    accentFontElements.forEach((selector) => {
      try {
        document.querySelectorAll(selector).forEach((element) => {
          element.classList.add("theme-font-accent");
        });
      } catch (e) {
        console.warn(`Selector error for ${selector}:`, e);
      }
    });
  }
  // Load saved theme preference
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    setTheme(savedTheme);
    document
      .querySelector(`[data-theme="${savedTheme}"]`)
      ?.classList.add("active");
  } else {
    // Default active theme
    document.querySelector('[data-theme="green"]')?.classList.add("active");
    // Apply default theme to font colors
    const defaultTheme = themes["green"];
    if (defaultTheme) {
      updateFontColors(defaultTheme.primaryColor);
    }
  }
});
