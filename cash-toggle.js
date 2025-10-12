// cash-toggle.js
document.addEventListener('DOMContentLoaded', () => {
    const cashSection = document.getElementById('cash-section');
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('submit-cash');

    const MASTER_CASH_CODE = "#00043000#"; // Your master cash code

    // Expose toggle function for main toggle.js
    window.cashToggle = function() {
        // Optionally, reset input field whenever toggled on
        cashCodeInput.value = '';
    };

    submitCashBtn.addEventListener('click', () => {
        const enteredCode = cashCodeInput.value.trim();
        if (enteredCode !== MASTER_CASH_CODE) {
            alert('Invalid cash code.');
            return;
        }
        // Dispatch the main form submit event
        document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
    });
});
