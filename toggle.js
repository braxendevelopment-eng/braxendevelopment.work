// toggle.jsdocument.addEventListener('DOMContentLoaded', () => {
  const paymentType = document.getElementById('payment-type');

  const paypalSection = document.getElementById('paypal-section');
  const polygonSection = document.getElementById('polygon-section');
  const cashSection = document.getElementById('cash-section');

  function hideAllSections() {
    paypalSection.style.display = 'none';
    polygonSection.style.display = 'none';
    cashSection.style.display = 'none';
  }

  function handlePaymentTypeChange() {
    hideAllSections();

    switch (paymentType.value) {
      case 'paypal':
        paypalSection.style.display = 'block';
        if (window.paypalToggle) window.paypalToggle();
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

  // Initial toggle on page load
  handlePaymentTypeChange();

  // Re-toggle whenever user changes payment type
  paymentType.addEventListener('change', handlePaymentTypeChange);
});
