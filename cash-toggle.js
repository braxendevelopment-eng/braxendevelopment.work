// cash-toggle.js
window.cashToggle = function() {
  const cashCodeInput = document.getElementById('cash-code');
  const cashStatus = document.getElementById('cash-status');
  const MASTER_CASH_CODE = '#00043000#';

  cashCodeInput.addEventListener('input', async () => {
    const code = cashCodeInput.value.trim();
    if (code !== MASTER_CASH_CODE) {
      cashStatus.textContent = '❌ Invalid or incomplete cash code.';
      cashStatus.style.color = 'darkred';
      return;
    }

    cashStatus.textContent = '✅ Cash code verified. Recording receipt...';
    cashStatus.style.color = 'green';

    try {
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
        paymentMethod: 'cash'
      };

      const response = await fetch('https://api.braxendevelopment.work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Worker failed.');

      cashStatus.innerHTML = `✅ Payment recorded successfully.<br>Receipt ID: <strong>${result.receiptID}</strong>`;
      cashStatus.style.color = 'green';
    } catch (err) {
      cashStatus.textContent = `⚠️ Logging failed: ${err.message}`;
      cashStatus.style.color = 'darkred';
    }
  });
};
