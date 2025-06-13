// Payment tabs functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get all payment tabs
  const paymentTabs = document.querySelectorAll(".payment-tab");

  // Get all payment content blocks (we'll add these to the HTML)
  const paymentContents = document.querySelectorAll(".payment-content");

  // Function to show the selected payment method content
  function showPaymentMethod(methodName) {
    // Hide all payment contents first
    document.querySelectorAll(".payment-content").forEach((content) => {
      content.classList.remove("active");
    });

    // Show the selected payment content
    const selectedContent = document.querySelector(
      `.payment-content[data-method="${methodName}"]`
    );
    if (selectedContent) {
      selectedContent.classList.add("active");
    }

    // Update active tab
    paymentTabs.forEach((tab) => {
      if (tab.textContent.trim() === methodName) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }

  // Add click event listeners to all payment tabs
  paymentTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const methodName = this.textContent.trim();
      showPaymentMethod(methodName);
    });
  });

  // Initialize with the first tab (فوري) selected - it's already active in the HTML
});
