document.addEventListener('DOMContentLoaded', () => {
    const paymentType = document.getElementById('payment-type');
    const polygonSection = document.getElementById('polygon-section');
    const polygonWallet = document.getElementById('polygon-wallet');
    const polygonHashInput = document.getElementById('polygon-hash');
    const copyPolygonBtn = document.getElementById('copy-polygon');
    const submitPolygonBtn = document.getElementById('submit-polygon');

    function togglePolygonSection() {
        if(paymentType.value === 'polygon') {
            polygonSection.style.display = 'block';
            updatePolygonGasFee();
        } else {
            polygonSection.style.display = 'none';
        }
    }

    paymentType.addEventListener('change', togglePolygonSection);

    // Fetch estimated gas fee
    function updatePolygonGasFee() {
        const gasFeeEl = document.getElementById('polygon-gas-fee');
        gasFeeEl.textContent = 'Estimated Gas Fee: Fetching...';

        fetch('https://gasstation.polygon.technology/v2')
            .then(res => res.json())
            .then(gasData => fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd')
                .then(res => res.json())
                .then(priceData => {
                    const fastGasGwei = gasData.fast.maxFee;
                    const maticUsd = priceData['matic-network'].usd;
                    const gasMatic = fastGasGwei / 1e9;
                    const gasUsd = gasMatic * maticUsd;
                    gasFeeEl.textContent = `Estimated Gas Fee: ${gasMatic.toFixed(6)} MATIC (~$${gasUsd.toFixed(2)} USD)`;
                })
            )).catch(() => gasFeeEl.textContent = 'Estimated Gas Fee: Unavailable');
    }

    // Copy wallet address
    copyPolygonBtn.addEventListener('click', () => {
        polygonWallet.select();
        document.execCommand('copy');
        alert('Polygon address copied!');
    });

    // Submit Polygon payment
    submitPolygonBtn.addEventListener('click', async () => {
        const hash = polygonHashInput.value.trim();
        if(!hash) return alert('Please enter your transaction hash.');

        const receiptNumber = 'e-' + Math.random().toString(36).substr(2, 8).toUpperCase();

        const data = {
            paymentMethod: 'Polygon',
            transactionHash: hash,
            receiptNumber
        };

        try {
            const response = await fetch('https://submission-logger.braxendevelopment.workers.dev/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if(response.ok) {
                alert(`Polygon payment submitted! Receipt: ${receiptNumber}`);
                polygonHashInput.value = '';
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch(err) {
            console.error(err);
            alert('Error sending Polygon payment data.');
        }
    });

    // Initial toggle
    togglePolygonSection();
});
