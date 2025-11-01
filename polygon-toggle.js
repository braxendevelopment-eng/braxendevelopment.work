// polygon-toggle.js
window.polygonToggle = function() {
  const polygonSubmit = document.getElementById('polygon-submit');
  const polygonHashInput = document.getElementById('polygon-hash');
  const polygonStatus = document.getElementById('polygon-status');
  const submitButton = document.getElementById('quarterclub-submit');

  polygonSubmit.addEventListener('click', async () => {
    const hash = polygonHashInput.value.trim();
    if (!hash) {
      polygonStatus.textContent = "Please enter a transaction hash.";
      return;
    }

    polygonStatus.textContent = "Verifying transaction...";

    try {
      const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");
      const tx = await provider.getTransaction(hash);
      if (!tx) throw new Error("Transaction not found.");

      const recipient = document.getElementById('polygon-wallet').value;
      if (tx.to.toLowerCase() !== recipient.toLowerCase()) {
        throw new Error("Transaction sent to wrong address.");
      }

      polygonStatus.textContent = `Transaction confirmed: ${ethers.formatEther(tx.value)} MATIC sent.`;

      // Once verified, reveal the real Submit button
      if (submitButton) submitButton.style.display = 'block';

    } catch (err) {
      polygonStatus.textContent = "Error verifying transaction: " + err.message;
      if (submitButton) submitButton.style.display = 'none';
    }
  });
};
