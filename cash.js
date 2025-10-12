document.addEventListener('DOMContentLoaded', () => {
    const cashSection = document.getElementById('cash-section');
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('submit-cash');
    const paymentType = document.getElementById('payment-type');
    const MASTER_CASH_CODE = "YOUR_SECRET_CODE"; // replace with your secret code

    function toggleCashSection() {
        cashSection.style.display = paymentType.value === 'cash' ? 'block' : 'none';
    }

    cashCodeInput.addEventListener('input', () => {
        if(cashCodeInput.value.trim() === MASTER_CASH_CODE) {
            console.log('Valid cash code entered.');
        }
    });

    submitCashBtn.addEventListener('click', async () => {
        if(paymentType.value !== 'cash') return;
        if(cashCodeInput.value.trim() !== MASTER_CASH_CODE) return alert('Invalid cash code.');

        const data = {
            businessName: document.getElementById('businessName').value,
            ein: document.getElementById('ein').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value,
            paymentMethod: 'Cash',
            cashCode: cashCodeInput.value.trim(),
            receiptNumber: 'e-' + Math.random().toString(36).substr(2, 8).toUpperCase()
        };

        try {
            const response = await fetch('https://submission-logger.braxendevelopment.workers.dev/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if(response.ok) {
                alert(`Cash payment submitted! Receipt: ${data.receiptNumber}`);
                cashCodeInput.value = '';
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch(err) {
            console.error(err);
            alert('Error sending cash payment data.');
        }
    });

    paymentType.addEventListener('change', toggleCashSection);
    toggleCashSection(); // initial load
});
