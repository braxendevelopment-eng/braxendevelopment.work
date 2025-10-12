document.addEventListener('DOMContentLoaded', () => {
    const paymentType = document.getElementById('payment-type');

    const paypalContainer = document.getElementById('paypal-button-container');
    const polygonSection = document.getElementById('polygon-section');
    const cashSection = document.getElementById('cash-section');

    const polygonWallet = document.getElementById('polygon-wallet');
    const copyPolygonBtn = document.getElementById('copy-polygon');
    const polygonHashInput = document.getElementById('polygon-hash');

    const submitPolygonBtn = document.getElementById('submit-polygon');
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('submit-cash');

    const MASTER_CASH_CODE = "#00043000#"; // Set your secret cash code

    // ---------------- Toggle Sections ----------------
    function toggleSections() {
        paypalContainer.style.display = 'none';
        polygonSection.style.display = 'none';
        cashSection.style.display = 'none';

        if(paymentType.value === 'paypal') {
            paypalContainer.style.display = 'block';
            if(typeof renderPayPalButton === 'function') renderPayPalButton();
        }

        if(paymentType.value === 'polygon') {
            polygonSection.style.display = 'block';
            updatePolygonGasFee();
        }

        if(paymentType.value === 'cash') {
            cashSection.style.display = 'block';
        }
    }

    paymentType.addEventListener('change', toggleSections);

    // ---------------- Polygon Section ----------------
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
            ))
            .catch(() => gasFeeEl.textContent = "Estimated Gas Fee: Unavailable");
    }

    copyPolygonBtn.addEventListener('click', () => {
        polygonWallet.select();
        document.execCommand('copy');
        alert('Polygon address copied!');
    });

    // ---------------- Cash Section ----------------
    submitCashBtn.addEventListener('click', () => {
        if(cashCodeInput.value.trim() !== MASTER_CASH_CODE) {
            alert('Invalid cash code.');
            return;
        }
        alert('Cash code valid! You may submit the form.');
        document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
    });

    // ---------------- Initialize ----------------
    toggleSections(); // Ensure correct section on page load
});
