document.addEventListener('DOMContentLoaded', () => {
  const polygonForm = document.getElementById('polygon-form');
  const polygonSubmit = document.getElementById('polygon-submit');
  const polygonStatus = document.getElementById('polygon-status');

  if (!polygonForm || !polygonSubmit) return;

  polygonSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    polygonStatus.textContent = 'Processing Polygon payment...';

    try {
      // Simulated Polygon network payment logic
      // Replace with your real API endpoint or WalletConnect setup later
      const response = await fetch('/polygon/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: document.getElementById('polygon-wallet').value,
          amount: document.getElementById('tier-select').value,
        }),
      });

      if (!response.ok) throw new Error('Network response failed');
      const result = await response.json();

      polygonStatus.textContent = 'Polygon payment successful!';
      alert(`Polygon payment completed — Txn ID: ${result.txnId || 'TEMP12345'}`);
      document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
    } catch (error) {
      console.error(error);
      polygonStatus.textContent = 'Polygon payment failed.';
      alert('Polygon payment error — please try again.');
    }
  });
});
