document.addEventListener('DOMContentLoaded', () => {
    const polygonWallet = document.getElementById('polygon-wallet');
    const polygonHashInput = document.getElementById('polygon-hash');
    const copyPolygonBtn = document.getElementById('copy-polygon');
    const submitPolygonBtn = document.getElementById('submit-polygon');

    // Copy wallet address to clipboard
    copyPolygonBtn.addEventListener('click', () => {
        polygonWallet.select();
        document.execCommand('copy');
        alert('Polygon address copied!');
    });

    // Fetch and display gas fee
    function updatePolygonGasFee() {
        const gasFeeEl = document.getElementById('polygon-gas-fee');
        fetch('https://gasstation.polygon.technology/v2')
            .then(res => res.json())
            .then(gasData => {
                return fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd')
                    .then(res => res.json())
                    .then(priceData => {
                        const fastGasGwei = gasData.fast.maxFee;
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

    // Submit Polygon payment
    submitPolygonBtn.addEventListener('click', async () => {
        const hash = polygonHashInput.value.trim();
        if(!hash) {
            alert('Please enter your transaction hash.');
            return;
        }

        // Gather basic form info
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
            alert('Error sending payment data.');
        }
    });

    // Initialize gas fee display
    updatePolygonGasFee();
});
