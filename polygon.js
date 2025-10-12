document.addEventListener('DOMContentLoaded', () => {
    const polygonWallet = document.getElementById('polygon-wallet');
    const polygonHashInput = document.getElementById('polygon-hash');
    const copyPolygonBtn = document.getElementById('copy-polygon');
    const submitPolygonBtn = document.getElementById('submit-polygon');

    function updatePolygonGasFee() {
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

    copyPolygonBtn.addEventListener('click', () => {
        polygonWallet.select();
        document.execCommand('copy');
        alert('Polygon address copied!');
    });

    submitPolygonBtn.addEventListener('click', async () => {
        if(!polygonHashInput.value.trim()) return alert('Enter transaction hash.');

        const formEvent = new Event('submit');
        document.getElementById('quarterclub-form').dispatchEvent(formEvent);
    });

    updatePolygonGasFee();
});
