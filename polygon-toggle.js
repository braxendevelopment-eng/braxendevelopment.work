// polygon-toggle.js
window.polygonToggle = function() {
    const polygonSection = document.getElementById('polygon-section');
    const polygonWallet = document.getElementById('polygon-wallet');
    const polygonHashInput = document.getElementById('polygon-hash');
    const copyPolygonBtn = document.getElementById('copy-polygon');
    const submitPolygonBtn = document.getElementById('submit-polygon');

    function updateGasFee() {
        const gasFeeEl = document.getElementById('polygon-gas-fee');
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
            )).catch(() => gasFeeEl.textContent = "Estimated Gas Fee: Unavailable");
    }

    // Copy wallet address
    copyPolygonBtn.addEventListener('click', () => {
        polygonWallet.select();
        document.execCommand('copy');
        alert('Polygon address copied!');
    });

    // Submit Polygon transaction
    submitPolygonBtn.addEventListener('click', () => {
        if(!polygonHashInput.value.trim()) {
            alert('Please enter a transaction hash.');
            return;
        }
        document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
    });

    // Initial gas fee fetch
    updateGasFee();
};
