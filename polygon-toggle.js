window.polygonToggle = function() {
    const polygonSection = document.getElementById('polygon-section');
    const polygonStatus = document.getElementById('polygon-status');
    const gasFee = document.getElementById('polygon-gas-fee');
    const copyButton = document.getElementById('copy-polygon');
    const submitButton = document.getElementById('polygon-submit');

    // Show section and reset status
    polygonSection.style.display = 'block';
    polygonStatus.textContent = '';

    // Copy address logic
    copyButton.onclick = () => {
        const wallet = document.getElementById('polygon-wallet').value;
        navigator.clipboard.writeText(wallet);
        alert('Polygon wallet address copied to clipboard.');
    };

    // Fetch gas fee estimation
    async function fetchGasFee() {
        try {
            const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");
            const feeData = await provider.getFeeData();
            if (feeData.gasPrice) {
                const gwei = ethers.formatUnits(feeData.gasPrice, "gwei");
                gasFee.textContent = `Estimated Gas Fee: ${parseFloat(gwei).toFixed(2)} Gwei`;
            } else {
                gasFee.textContent = "Estimated Gas Fee: Not available.";
            }
        } catch (error) {
            console.error(error);
            gasFee.textContent = "Estimated Gas Fee: Error fetching.";
        }
    }

    fetchGasFee();

    // Handle Polygon submission
    submitButton.onclick = () => {
        const hash = document.getElementById('polygon-hash').value.trim();
        if (!hash) {
            alert('Please enter a valid transaction hash.');
            return;
        }
        polygonStatus.textContent = "Submitting Polygon payment...";
        setTimeout(() => {
            polygonStatus.textContent = "Polygon payment submitted successfully!";
            document.getElementById('quarterclub-form').submit();
        }, 1000);
    };
};
