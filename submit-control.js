document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quarterclub-form');
  const paymentType = document.getElementById('payment-type');

  // Reuse the existing submit button in the form, don’t create a new one
  const submitButton = form.querySelector('button[type="submit"]') || document.createElement('button');
  submitButton.type = 'button';
  submitButton.id = 'quarterclub-submit';
  submitButton.textContent = 'Submit';
  submitButton.style.display = 'none';
  submitButton.style.marginTop = '10px';
  if (!form.contains(submitButton)) form.appendChild(submitButton);

  // Bind submit button to handleSubmit
  submitButton.addEventListener('click', () => {
    if (window.handleSubmit) {
      window.handleSubmit();
    } else {
      console.error('handleSubmit is not defined');
    }
  });

  function updateButtonVisibility() {
    let visible = false;

    switch (paymentType.value) {
      case 'paypal':
        visible = true; // PayPal handles validation itself
        break;

      case 'polygon':
        const polygonHash = document.getElementById('polygon-hash')?.value.trim();
        visible = polygonHash && polygonHash.length > 5; // Require hash before showing
        break;

      case 'cash':
        const cashCode = document.getElementById('cash-code')?.value.trim();
        visible = cashCode && cashCode.length > 2; // Require short code before showing
        break;
    }

    submitButton.style.display = visible ? 'block' : 'none';
  }

  // Update when user changes payment method or inputs Polygon/Cash data
  paymentType.addEventListener('change', updateButtonVisibility);

  const polygonInput = document.getElementById('polygon-hash');
  const cashInput = document.getElementById('cash-code');
  if (polygonInput) polygonInput.addEventListener('input', updateButtonVisibility);
  if (cashInput) cashInput.addEventListener('input', updateButtonVisibility);

  // Initial check on page load
  updateButtonVisibility();
});
