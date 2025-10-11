document.addEventListener('DOMContentLoaded', () => {
    const polygonSection = document.getElementById('polygon-section');
    const polygonWallet = document.getElementById('polygon-wallet');
    const polygonHashInput = document.getElementById('polygon-hash');
    const copyPolygonBtn = document.getElementById('copy-polygon');

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
                        const gasMatic = fastGasGwei / 1e18;
                        const gasUsd = gasMatic * maticUsd;
                        gasFeeEl.textContent = `Estimated Gas Fee: ${gasMatic.toFixed(6)} MATIC (~$${gasUsd.toFixed(2)} USD)`;
                    });
            }).catch(() => {
                gasFeeEl.textContent = "Estimated Gas Fee: Unavailable";
            });
    }

    copyPolygonBtn.addEventListener('click', () => {
        polygonWallet.select();
        document.execCommand('copy');
        alert('Polygon address copied!');
    });

    polygonSection.style.display = 'block';
    updatePolygonGasFee();
});
