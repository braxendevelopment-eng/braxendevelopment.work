// cash-toggle.js
window.cashToggle = function() {
    const cashSection = document.getElementById('cash-section');
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('cash-submit');

    // Master code for cash payments
    const MASTER_CASH_CODE = "#00043000#";

    submitCashBtn.addEventListener('click', async () => {
        const code = cashCodeInput.value.trim();

        if (code !== MASTER_CASH_CODE) {
            alert('Invalid cash code.');
            return;
        }

        alert('Cash payment validated. Submitting form...');
        cashCodeInput.value = ''; // reset input

        // Use centralized submission handler if defined
        if (window.handleSubmit) {
            await window.handleSubmit();
        } else {
            // Fallback in case handleSubmit isn't defined
            document.getElementById('quarterclub-form').submit();
        }
    });
};
