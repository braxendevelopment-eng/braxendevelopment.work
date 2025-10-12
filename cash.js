document.addEventListener('DOMContentLoaded', () => {
    const paymentType = document.getElementById('payment-type');
    const cashSection = document.getElementById('cash-section');
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('submit-cash');
    const MASTER_CASH_CODE = "#00043000#"; // your master cash code

    function toggleCashSection() {
        if(paymentType.value === 'cash') {
            cashSection.style.display = 'block';
        } else {
            cashSection.style.display = 'none';
        }
    }

    paymentType.addEventListener('change', toggleCashSection);

    submitCashBtn.addEventListener('click', async () => {
        const enteredCode = cashCodeInput.value.trim();

        if(enteredCode !== MASTER_CASH_CODE) {
            alert('Invalid cash code.');
            return;
        }

        const receiptNumber = 'e-' + Math.random().toString(36).substr(2, 8).toUpperCase();

        const data = {
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

    // Initial toggle
    toggleCashSection();
});
