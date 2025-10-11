// DOM Elements
const tierSelect = document.getElementById('tier-select');
const billingCycle = document.getElementById('billing-cycle');
const paymentType = document.getElementById('payment-type');
const priceDisplay = document.getElementById('price-display');
const form = document.getElementById('quarterclub-form');

// Price Display
function updatePrice() { ... }

// Final Amount
function getFinalAmount() { ... }

// Form Submission (keep generic data submission)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const finalAmount = getFinalAmount();
  if(finalAmount === null) return;

  const businessData = {};
  form.querySelectorAll('input, select').forEach(el => {
      businessData[el.id] = el.value;
  });
  
  try {
      const response = await fetch('https://api.braxendevelopment.work/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(businessData)
      });
      if(!response.ok) throw new Error('Network error');
      alert(`Form submitted successfully.\nAmount: $${finalAmount}`);
  } catch(err) {
      console.error(err);
      alert('Error submitting data. Try again.');
  }
});

// Event Listeners for tier/billing
tierSelect.addEventListener('change', updatePrice);
billingCycle.addEventListener('change', updatePrice);
