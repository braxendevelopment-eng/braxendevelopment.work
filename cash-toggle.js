// cash-toggle.js
window.cashToggle = function() {
    const cashSection = document.getElementById('cash-section');
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('submit-cash');
    const MASTER_CASH_CODE = "#00043000#"; // Your secret code

    submitCashBtn.addEventListener('click', () => {
        const code = cashCodeInput.value.trim();
        if(code !== MASTER_CASH_CODE) {
            alert('Invalid cash code.');
            return;
        }

        // Trigger form submission
        document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
        cashCodeInput.value = ''; // Reset input
        alert('Cash payment accepted. Proceeding to submit.');
    });
};
