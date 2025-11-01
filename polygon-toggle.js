// polygon-toggle.js
window.polygonToggle = function() {
  const polygonHashInput = document.getElementById('polygon-hash');
  const polygonStatus = document.getElementById('polygon-status');
  const submitButton = document.getElementById('quarterclub-submit'); // global submit

  const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");
  const recipient = document.getElementById('polygon-wallet').value;

  polygonHashInput.addEventListener('input', async () => {
    const hash = polygonHashInput.value.trim();
    if (!hash) {
      polygonStatus.textContent = "❌ Enter your Polygon transaction hash.";
      polygonStatus.style.color = "red";
      submitButton.style.display = "none";
      return;
    }

    polygonStatus.textContent = "Verifying transaction...";
    polygonStatus.style.color = "orange";
    submitButton.style.display = "none";

    try {
      const tx = await provider.getTransaction(hash);
      if (!tx) throw new Error("Transaction not found.");

      if (tx.to.toLowerCase() !== recipient.toLowerCase()) {
        throw new Error("Transaction sent to the wrong address.");
      }

      polygonStatus.textContent = "✅ Transaction verified. You may now submit.";
      polygonStatus.style.color = "green";
      submitButton.style.display = "block";

    } catch (err) {
      polygonStatus.textContent = "❌ " + err.message;
      polygonStatus.style.color = "red";
      submitButton.style.display = "none";
    }
  });
};
