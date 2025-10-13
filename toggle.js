// toggle.js
document.addEventListener('DOMContentLoaded', () => {
  const tierSelect = document.getElementById('tier-select');
  const paymentType = document.getElementById('payment-type');

  const paypalSection = document.getElementById('paypal-section');
  const polygonSection = document.getElementById('polygon-section');
  const cashSection = document.getElementById('cash-section');

  // --- Hide all payment sections ---
  function hideAllSections() {
    paypalSection.style.display = 'none';
    polygonSection.style.display = 'none';
    cashSection.style.display = 'none';
  }

  // --- Handle Payment Type Change ---
  function handlePaymentTypeChange() {
    hideAllSections();

    switch (paymentType.value) {
      case 'paypal':
        paypalSection.style.display = 'block';
        if (window.paypalToggle) {
          // Clear any existing PayPal buttons before re-rendering
          const container = document.getElementById('paypal-button-container');
          container.innerHTML = '';
          window.paypalToggle();
        }
        break;

      case 'polygon':
        polygonSection.style.display = 'block';
        if (window.polygonToggle) window.polygonToggle();
        break;

      case 'cash':
        cashSection.style.display = 'block';
        if (window.cashToggle) window.cashToggle();
        break;
    }
  }

  // --- Run immediately on load ---
  handlePaymentTypeChange();

  // --- Event listeners ---
  paymentType.addEventListener('change', handlePaymentTypeChange);

  // --- Optional: Re-render PayPal button when tier changes ---
  tierSelect.addEventListener('change', () => {
    if (paymentType.value === 'paypal' && window.paypalToggle) {
      const container = document.getElementById('paypal-button-container');
      container.innerHTML = '';
      window.paypalToggle();
    }
  });
});
