document.addEventListener('DOMContentLoaded', () => {
    const polygonSection = document.getElementById('polygon-section');
    const polygonWallet = document.getElementById('polygon-wallet');
    const polygonHashInput = document.getElementById('polygon-hash');
    const copyPolygonBtn = document.getElementById('copy-polygon');
    const submitPolygonBtn = document.getElementById('submit-polygon');
    const paymentType = document.getElementById('payment-type');

    function updatePolygonGasFee() {
        const gasFeeEl = document.getElementById('polygon-gas-fee');
        fetch('https://gasstation.polygon.technology/v2')
            .then(res => res.json())
            .then(gasData => {
                const fastGasGwei = gasData.fast.maxFee;
                return fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd')
                    .then(res => res.json())
                    .then(priceData => {
                        const maticUsd = priceData['matic-network'].usd;
                        const gasMatic = fastGasGwei / 1e9;
                        const gasUsd = gasMatic * maticUsd;
                        gasFeeEl.textContent = `Estimated Gas Fee: ${gasMatic.toFixed(6)} MATIC (~$${gasUsd.toFixed(2)} USD)`;
                    });
            })
            .catch(() => {
                gasFeeEl.textContent = "Estimated Gas Fee: Unavailable";
            });
    }

    function togglePolygonSection() {
        polygonSection.style.display = paymentType.value === 'polygon' ? 'block' : 'none';
        if(paymentType.value === 'polygon') updatePolygonGasFee();
    }

    copyPolygonBtn.addEventListener('click', () => {
        polygonWallet.select();
        document.execCommand('copy');
        alert('Polygon address copied!');
    });

    submitPolygonBtn.addEventListener('click', async () => {
        if(paymentType.value !== 'polygon') return;

        const data = {
            businessName: document.getElementById('businessName').value,
            ein: document.getElementById('ein').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value,
            paymentMethod: 'Polygon',
            transactionHash: polygonHashInput.value,
            receiptNumber: 'e-' + Math.random().toString(36).substr(2, 8).toUpperCase()
        };

        if(!data.transactionHash) return alert('Please enter your transaction hash.');

        try {
            const response = await fetch('https://submission-logger.braxendevelopment.workers.dev/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if(response.ok) {
                alert(`Polygon payment submitted! Receipt: ${data.receiptNumber}`);
                polygonHashInput.value = '';
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('Error sending payment data.');
        }
    });

    paymentType.addEventListener('change', togglePolygonSection);
    togglePolygonSection(); // initial load
});
