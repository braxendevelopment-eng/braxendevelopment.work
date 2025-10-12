document.addEventListener('DOMContentLoaded', () => {
    const cashSection = document.getElementById('cash-section');
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('submit-cash');

    const MASTER_CASH_CODE = "#00043000#"; // Updated master cash code

    submitCashBtn.addEventListener('click', async () => {
        const enteredCode = cashCodeInput.value.trim();
        if(enteredCode !== MASTER_CASH_CODE) {
            alert('Invalid cash code.');
            return;
        }

        // Gather form data
        const businessName = document.getElementById('business-name').value;
        const ein = document.getElementById('business-ein').value;
        const email = document.getElementById('business-email').value;
        const phone = document.getElementById('business-phone').value;
        const address = document.getElementById('business-address').value;
        const city = document.getElementById('business-city').value;
        const state = document.getElementById('business-state').value;
        const zip = document.getElementById('business-zip').value;

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
            cashCode: enteredCode,
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
