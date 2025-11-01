// polygon-toggle.js
window.polygonToggle = function() {
  const polygonHashInput = document.getElementById('polygon-hash');
  const polygonStatus = document.getElementById('polygon-status');
  const submitButton = document.getElementById('quarterclub-submit');
  const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");
  const recipient = document.getElementById('polygon-wallet').value;

  polygonHashInput.addEventListener('input', async () => {
    const hash = polygonHashInput.value.trim();
    polygonStatus.style.color = 'orange';
    polygonStatus.textContent = 'Verifying transaction...';
    submitButton.style.display = 'none';

    try {
      const tx = await provider.getTransaction(hash);
      if (!tx) throw new Error('Transaction not found.');
      if (tx.to.toLowerCase() !== recipient.toLowerCase()) throw new Error('Wrong recipient address.');

      polygonStatus.textContent = '✅ Transaction verified. Recording receipt...';
      polygonStatus.style.color = 'green';

      // Submit to Worker for record and get receipt
      const formData = {
        businessName: document.getElementById('business-name').value,
        ein: document.getElementById('business-ein').value,
        email: document.getElementById('business-email').value,
        phone: document.getElementById('business-phone').value,
        address: document.getElementById('business-address').value,
        city: document.getElementById('business-city').value,
        state: document.getElementById('business-state').value,
        zip: document.getElementById('business-zip').value,
        tier: document.getElementById('tier-select').value,
        paymentMethod: 'polygon'
      };

      const response = await fetch('https://api.braxendevelopment.work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Worker failed.');

      polygonStatus.innerHTML = `✅ Payment recorded successfully.<br>Receipt ID: <strong>${result.receiptID}</strong>`;
      polygonStatus.style.color = 'green';
    } catch (err) {
      polygonStatus.textContent = `❌ ${err.message}`;
      polygonStatus.style.color = 'darkred';
    }
  });
};
