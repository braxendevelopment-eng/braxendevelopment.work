// polygon-toggle.js
window.polygonToggle = function() {
    const gasFeeDisplay = document.getElementById('polygon-gas-fee');

    async function updateGasFee() {
        try {
            // Using Ethers.js with Polygon Mainnet
            const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/");
            const feeData = await provider.getFeeData();

            // feeData.gasPrice is in wei
            const gasInMatic = Number(ethers.utils.formatUnits(feeData.gasPrice, 'gwei')) * 1e-9;
            gasFeeDisplay.textContent = `Estimated Gas Fee: ~${gasInMatic.toFixed(5)} MATIC`;
        } catch (err) {
            console.error(err);
            gasFeeDisplay.textContent = 'Unable to fetch gas fee.';
        }
    }

    updateGasFee();
    // Optional: refresh every 30 seconds
    setInterval(updateGasFee, 30000);
};
