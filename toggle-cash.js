document.addEventListener('DOMContentLoaded', () => {
    const paymentTypeSelect = document.getElementById('payment-type');
    const cashSection = document.getElementById('cash-section');
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('submit-cash');
    const MASTER_CASH_CODE = "#00043000#"; // Your Graciousness’ secret code

    function toggleCash() {
        cashSection.style.display = (paymentTypeSelect.value === 'cash') ? 'block' : 'none';
    }

    // Validate cash code on submit
    submitCashBtn.addEventListener('click', () => {
        if(cashCodeInput.value.trim() !== MASTER_CASH_CODE) {
            return alert('Invalid cash code.');
        }
        document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
    });

    // Initialize
    toggleCash();

    // Update on change
    paymentTypeSelect.addEventListener('change', toggleCash);
});
