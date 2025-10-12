document.addEventListener('DOMContentLoaded', () => {
  const cashSubmit = document.getElementById('cash-submit');
  const cashStatus = document.getElementById('cash-status');

  if (!cashSubmit) return;

  cashSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    const amount = document.getElementById('tier-select').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
      alert('Please enter your name and email for record keeping.');
      return;
    }

    cashStatus.textContent = 'Recording your cash pledge...';

    // Simulated form submission (replace with backend logging later)
    setTimeout(() => {
      cashStatus.textContent = 'Cash payment recorded successfully!';
      alert(`Cash pledge for $${amount} logged. Please send your payment via the listed instructions.`);
      document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
    }, 1500);
  });
});
