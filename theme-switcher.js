// Theme switcher functionality
document.addEventListener("DOMContentLoaded", function () {
  // Insert the theme switcher HTML
  createThemeSwitcher();

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
      accentColor: "#f39c12",
    },
    blue: {
      primaryColor: "#3498db",
      accentColor: "#f39c12",
    },
    purple: {
      primaryColor: "#9b59b6",
      accentColor: "#f1c40f",
    },
    red: {
      primaryColor: "#e74c3c",
      accentColor: "#3498db",
    },
    orange: {
      primaryColor: "#e67e22",
      accentColor: "#3498db",
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
  });

  // Set theme function
  function setTheme(themeColor) {
    const theme = themes[themeColor];
    if (!theme) return;

    document.documentElement.style.setProperty(
      "--primary-color",
      theme.primaryColor
    );
    document.documentElement.style.setProperty(
      "--accent-color",
      theme.accentColor
    );

    // Update SVG colors
    updateSvgColors(theme.primaryColor);
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
          <div class="theme-option" data-theme="orange">
            <div class="color-preview orange-preview"></div>
            <span class="theme-label">برتقالي</span>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", themeHTML);
  }
  // Function to update SVG colors
  function updateSvgColors(primaryColor) {
    // Apply CSS filter to SVG images instead of trying to modify SVG content directly
    // This is more efficient and works with cross-origin SVGs
    const themeSvgs = document.querySelectorAll(".theme-svg");

    // Get the base color to calculate the filter
    const baseColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-color")
      .trim();
    const filter = calculateFilter(baseColor, primaryColor);

    // Apply the filter to each SVG with theme-svg class
    themeSvgs.forEach((svg) => {
      svg.style.filter = filter;
    });
  }

  // Function to calculate CSS filter to transform one color to another
  function calculateFilter(baseColor, targetColor) {
    // Convert hex colors to RGB
    const baseRGB = hexToRgb(baseColor);
    const targetRGB = hexToRgb(targetColor);

    if (!baseRGB || !targetRGB) return "";

    // Simple filter calculation - can be improved for more accurate color transformation
    const r = targetRGB.r / baseRGB.r;
    const g = targetRGB.g / baseRGB.g;
    const b = targetRGB.b / baseRGB.b;

    // Create a CSS filter that approximates the color change
    return `brightness(0) saturate(100%) invert(${
      targetRGB.r / 255
    }) sepia(${targetRGB.g / 255}) hue-rotate(${getHueRotate(baseRGB, targetRGB)}deg)`;
  }

  // Function to convert hex color to RGB
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

  // Function to calculate hue rotation angle
  function getHueRotate(baseRGB, targetRGB) {
    // Calculate hue angles
    const baseHue = rgbToHue(baseRGB.r, baseRGB.g, baseRGB.b);
    const targetHue = rgbToHue(targetRGB.r, targetRGB.g, targetRGB.b);

    // Return the difference in hue angles
    return (targetHue - baseHue + 360) % 360;
  }

  // Function to convert RGB to hue
  function rgbToHue(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let hue = 0;

    if (max === min) {
      return 0; // achromatic
    }

    const d = max - min;

    if (max === r) {
      hue = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      hue = (b - r) / d + 2;
    } else {
      hue = (r - g) / d + 4;
    }

    return hue * 60;
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
  }
});
