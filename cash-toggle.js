// cash-toggle.js
window.cashToggle = function() {
  const cashSubmit = document.getElementById('cash-submit');
  const cashCodeInput = document.getElementById('cash-code');
  const cashStatus = document.getElementById('cash-status');

  // Remove previous listeners to avoid duplicates
  const newCashSubmit = cashSubmit.cloneNode(true);
  cashSubmit.parentNode.replaceChild(newCashSubmit, cashSubmit);

  newCashSubmit.addEventListener('click', () => {
    const code = cashCodeInput.value.trim();
    if (!code) {
      cashStatus.textContent = "Please enter your cash code.";
      return;
    }

    cashStatus.textContent = "Verifying cash code...";

    try {
      // Here you can add any custom verification logic
      // For now, just assume valid
      cashStatus.textContent = `Cash code "${code}" accepted.`;

      // Auto-submit form after successful verification
      document.getElementById('quarterclub-form').submit();
    } catch (err) {
      cashStatus.textContent = "Error verifying cash code: " + err.message;
    }
  });
};
