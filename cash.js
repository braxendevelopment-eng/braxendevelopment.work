// cash-toggle.js
// cash-toggle.js
window.cashToggle = function() {
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('cash-submit'); // Make sure ID matches HTML
    const cashStatus = document.getElementById('cash-status');

    const MASTER_CASH_CODE = "#00043000#";

    submitCashBtn.addEventListener('click', async () => {
        const code = cashCodeInput.value.trim();
        if (code !== MASTER_CASH_CODE) {
            cashStatus.textContent = 'Invalid cash code.';
            return;
        }

        cashStatus.textContent = 'Cash payment validated. Submitting form...';
        cashCodeInput.value = ''; // reset input

        // Call the centralized form submit handler
        if (window.handleSubmit) await window.handleSubmit();
    });
};
