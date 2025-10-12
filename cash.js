document.addEventListener('DOMContentLoaded', () => {
    const cashSection = document.getElementById('cash-section');
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('submit-cash');
    const MASTER_CASH_CODE = "YOUR_SECRET_CODE"; // replace with your secret code

    cashSection.style.display = 'block';

    cashCodeInput.addEventListener('input', () => {
        if(cashCodeInput.value.trim() === MASTER_CASH_CODE) {
            console.log('Valid cash code entered.');
        }
    });

    submitCashBtn.addEventListener('click', async () => {
        if(cashCodeInput.value.trim() !== MASTER_CASH_CODE) {
            return alert('Invalid cash code.');
        }

        const businessName = document.getElementById('businessName').value;
        const ein = document.getElementById('ein').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zip = document.getElementById('zip').value;

        const receiptNumber = 'e-' + Math.random().toString(36).substr(2, 8).toUpperCase();

        const data = {
            businessName,
            ein,
            email,
            phone,
            address,
            city,
            state,
            zip,
            paymentMethod: 'Cash',
            cashCode: cashCodeInput.value.trim(),
            receiptNumber
        };

        try {
            const response = await fetch('https://submission-logger.braxendevelopment.workers.dev/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if(response.ok) {
                alert(`Cash payment submitted! Receipt: ${receiptNumber}`);
                cashCodeInput.value = '';
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch(err) {
            console.error(err);
            alert('Error sending cash payment data.');
        }
    });
});
