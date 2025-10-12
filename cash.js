document.addEventListener('DOMContentLoaded', () => {
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('submit-cash');
    const MASTER_CASH_CODE = "YOUR_SECRET_CODE"; // replace

    submitCashBtn.addEventListener('click', () => {
        if(cashCodeInput.value.trim() !== MASTER_CASH_CODE) return alert('Invalid cash code.');

        const formEvent = new Event('submit');
        document.getElementById('quarterclub-form').dispatchEvent(formEvent);
    });
});
