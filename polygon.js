document.addEventListener('DOMContentLoaded', () => {
    const polygonSection = document.getElementById('polygon-section');
    const polygonWallet = document.getElementById('polygon-wallet');
    const polygonHashInput = document.getElementById('polygon-hash');
    const copyPolygonBtn = document.getElementById('copy-polygon');
    const submitPolygonBtn = document.getElementById('submit-polygon'); // add a submit button in HTML

    // Fetch gas fee
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
                        const gasMatic = fastGasGwei / 1e9; // fixed conversion
                        const gasUsd = gasMatic * maticUsd;
                        gasFeeEl.textContent = `Estimated Gas Fee: ${gasMatic.toFixed(6)} MATIC (~$${gasUsd.toFixed(2)} USD)`;
                    });
            }).catch(() => {
                gasFeeEl.textContent = "Estimated Gas Fee: Unavailable";
            });
    }

    // Copy address
    copyPolygonBtn.addEventListener('click', () => {
        polygonWallet.select();
        document.execCommand('copy');
        alert('Polygon address copied!');
    });

    // Submit Polygon payment data
    submitPolygonBtn.addEventListener('click', async () => {
        const businessName = document.getElementById('businessName').value;
        const ein = document.getElementById('ein').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const zip = document.getElementById('zip').value;
        const hash = polygonHashInput.value;

        if (!hash) {
            alert('Please enter your transaction hash.');
            return;
        }

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

            if (response.ok) {
                alert(`Polygon payment submitted! Receipt: ${receiptNumber}`);
                polygonHashInput.value = '';
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Error sending payment data.');
        }
    });

    polygonSection.style.display = 'block';
    updatePolygonGasFee();
});
