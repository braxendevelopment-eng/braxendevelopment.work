// cash-toggle.js
window.cashToggle = function() {
  const cashSubmit = document.getElementById('cash-submit');
  const cashCodeInput = document.getElementById('cash-code');
  const cashStatus = document.getElementById('cash-status');

  cashSubmit.addEventListener('click', () => {
    const code = cashCodeInput.value.trim();
    if (!code) {
      cashStatus.textContent = "Please enter your cash code.";
      return;
    }

    // Optional: You can validate code against a server here
    cashStatus.textContent = "Cash code accepted!";

    // Submit form after successful verification
    document.getElementById('quarterclub-form').submit();
  });
};
