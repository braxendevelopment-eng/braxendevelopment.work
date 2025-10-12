// polygon-toggle.js
document.addEventListener('DOMContentLoaded', () => {
    const polygonWallet = document.getElementById('polygon-wallet');
    const polygonHashInput = document.getElementById('polygon-hash');
    const copyPolygonBtn = document.getElementById('copy-polygon');
    const gasFeeEl = document.getElementById('polygon-gas-fee');

    // Expose toggle function for main toggle.js
    window.polygonToggle = function() {
        updateGasFee();
    };

    function updateGasFee() {
        gasFeeEl.textContent = 'Fetching estimated gas fee...';

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
                gasFeeEl.textContent = 'Estimated Gas Fee: Unavailable';
            });
    }

    copyPolygonBtn.addEventListener('click', () => {
        polygonWallet.select();
        document.execCommand('copy');
        alert('Polygon address copied!');
    });

    // Optionally handle submit logic
    // const submitPolygonBtn = document.getElementById('submit-polygon');
    // submitPolygonBtn.addEventListener('click', () => { ... });
});
