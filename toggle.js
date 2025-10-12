document.addEventListener('DOMContentLoaded', () => {
  const paymentTypeSelect = document.getElementById('payment-type');
  const paypalSection = document.getElementById('paypal-button-container');
  const polygonSection = document.getElementById('polygon-section');
  const cashSection = document.getElementById('cash-section');

  function togglePaymentSections() {
    paypalSection.style.display = 'none';
    polygonSection.style.display = 'none';
    cashSection.style.display = 'none';

    switch (paymentTypeSelect.value) {
      case 'paypal':
        paypalSection.style.display = 'block';
        break;
      case 'polygon':
        polygonSection.style.display = 'block';
        break;
      case 'cash':
        cashSection.style.display = 'block';
        break;
    }
  }

  togglePaymentSections();
  paymentTypeSelect.addEventListener('change', togglePaymentSections);
});
