document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quarterclub-form');
  const paymentType = document.getElementById('payment-type');

  // Find or create a single submit button
  const submitButton = form.querySelector('#quarterclub-submit') || document.createElement('button');
  submitButton.type = 'button';
  submitButton.id = 'quarterclub-submit';
  submitButton.textContent = 'Submit Payment';
  submitButton.style.display = 'none';
  submitButton.style.marginTop = '10px';
  if (!form.contains(submitButton)) form.appendChild(submitButton);

  // Bind to handleSubmit
  submitButton.addEventListener('click', () => {
    if (window.handleSubmit) {
      window.handleSubmit();
    } else {
      console.error('handleSubmit is not defined');
    }
  });

  // Show only for Polygon or Cash (not PayPal)
  function updateButtonVisibility() {
    let visible = false;

    switch (paymentType.value) {
      case 'polygon':
        const polygonHash = document.getElementById('polygon-hash')?.value.trim();
        visible = polygonHash && polygonHash.length > 5; // require transaction hash
        break;

      case 'cash':
        const cashCode = document.getElementById('cash-code')?.value.trim();
        visible = cashCode && cashCode.length > 2; // require short code
        break;

      default:
        visible = false; // hide for PayPal and any others
    }

    submitButton.style.display = visible ? 'block' : 'none';
  }

  // Update visibility when payment type changes or inputs are filled
  paymentType.addEventListener('change', updateButtonVisibility);
  document.getElementById('polygon-hash')?.addEventListener('input', updateButtonVisibility);
  document.getElementById('cash-code')?.addEventListener('input', updateButtonVisibility);

  // Run once on load
  updateButtonVisibility();
});
