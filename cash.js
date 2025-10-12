document.addEventListener('DOMContentLoaded', () => {
    const cashSection = document.getElementById('cash-section');
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('submit-cash');
    const MASTER_CASH_CODE = "#00043000#";

    submitCashBtn.addEventListener('click', () => {
        if(cashCodeInput.value.trim() !== MASTER_CASH_CODE) return alert('Invalid cash code.');
        document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
    });

    // Show section if selected
    if(document.getElementById('payment-type').value === 'cash') {
        cashSection.style.display = 'block';
    }
});
