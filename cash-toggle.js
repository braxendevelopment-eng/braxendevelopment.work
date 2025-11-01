// cash-toggle.js
window.cashToggle = function() {
  const cashSection = document.getElementById('cash-section');
  const cashCodeInput = document.getElementById('cash-code');
  const cashStatus = document.getElementById('cash-status');
  const submitButton = document.getElementById('quarterclub-submit'); // global submit button

  const MASTER_CASH_CODE = "#00043000#";

  // Listen for typing
  cashCodeInput.addEventListener('input', () => {
    const code = cashCodeInput.value.trim();

    if (code === MASTER_CASH_CODE) {
      cashStatus.textContent = "✅ Cash code validated. You may now submit.";
      cashStatus.style.color = "green";
      if (submitButton) submitButton.style.display = "block";
    } else {
      cashStatus.textContent = "❌ Invalid or incomplete code.";
      cashStatus.style.color = "red";
      if (submitButton) submitButton.style.display = "none";
    }
  });
};

