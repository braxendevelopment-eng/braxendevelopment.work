document.addEventListener('DOMContentLoaded', () => {
    const cashSection = document.getElementById('cash-section');
    const cashCodeInput = document.getElementById('cash-code');
    const MASTER_CASH_CODE = "YOUR_SECRET_CODE"; // replace with your secret code

    cashSection.style.display = 'block';

    cashCodeInput.addEventListener('input', () => {
        if(cashCodeInput.value.trim() === MASTER_CASH_CODE) {
            // Optional: display a green checkmark or message
            console.log('Valid cash code entered.');
        }
    });
});
