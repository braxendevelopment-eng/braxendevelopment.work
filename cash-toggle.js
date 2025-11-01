// cash-toggle.js
window.cashToggle = function() {
  const cashSection = document.getElementById('cash-section');
  const cashCodeInput = document.getElementById('cash-code');
  const submitCashBtn = document.getElementById('cash-submit');
  const submitButton = document.getElementById('quarterclub-submit');

  const MASTER_CASH_CODE = "#00043000#";

  submitCashBtn.addEventListener('click', () => {
    const code = cashCodeInput.value.trim();

    if (code !== MASTER_CASH_CODE) {
      alert('Invalid cash code.');
      if (submitButton) submitButton.style.display = 'none';
      return;
    }

    alert('Cash payment validated. You may now submit the form.');
    cashCodeInput.value = ''; // reset input

    // Reveal the main unified Submit button
    if (submitButton) submitButton.style.display = 'block';
  });
};
