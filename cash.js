// cash-toggle.js
window.cashToggle = function() {
    const cashSection = document.getElementById('cash-section');
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('submit-cash');

    // Master code for cash payments
    const MASTER_CASH_CODE = "#00043000#";

    // Show/hide cash section (main toggle.js handles display)
    // Submit Cash Payment
    submitCashBtn.addEventListener('click', () => {
        if(cashCodeInput.value.trim() !== MASTER_CASH_CODE) {
            alert('Invalid cash code.');
            return;
        }
        alert('Cash payment validated. Submitting form...');
        document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
        cashCodeInput.value = ''; // reset input
    });
};
