window.polygonToggle = function() {
  const polygonSubmit = document.getElementById('polygon-submit');
  const polygonHashInput = document.getElementById('polygon-hash');
  const polygonStatus = document.getElementById('polygon-status');

  // Remove previous listeners to avoid duplicates
  const newPolygonSubmit = polygonSubmit.cloneNode(true);
  polygonSubmit.parentNode.replaceChild(newPolygonSubmit, polygonSubmit);

  newPolygonSubmit.addEventListener('click', async () => {
    const hash = polygonHashInput.value.trim();
    if (!hash) {
      polygonStatus.textContent = "Please enter a transaction hash.";
      return;
    }

    polygonStatus.textContent = "Verifying transaction...";

    try {
      // Connect to Polygon provider
      const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");

      // Fetch transaction
      const tx = await provider.getTransaction(hash);
      if (!tx) throw new Error("Transaction not found.");

      // Verify recipient
      const recipient = document.getElementById('polygon-wallet').value;
      if (tx.to.toLowerCase() !== recipient.toLowerCase()) {
        throw new Error("Transaction sent to wrong address.");
      }

      polygonStatus.textContent = `Transaction confirmed: ${ethers.formatEther(tx.value)} MATIC sent.`;

      // Auto-submit form
      document.getElementById('quarterclub-form').submit();
    } catch (err) {
      polygonStatus.textContent = "Error verifying transaction: " + err.message;
    }
  });
};
