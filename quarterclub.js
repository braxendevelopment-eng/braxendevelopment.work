document.addEventListener('DOMContentLoaded', () => {
  const tierSelect = document.getElementById('tier-select');
  const billingCycle = document.getElementById('billing-cycle');
  const paymentType = document.getElementById('payment-type');

  const paypalContainer = document.getElementById('paypal-button-container');
  const paypalIdInput = document.getElementById('paypal-id');

  const planIds = {
    '0.25': 'P-PLANID1',
    '1': 'P-PLANID1B',
    '2': 'P-PLANID2',
    '5': 'P-PLANID3',
    '10': 'P-PLANID4',
    '20': 'P-PLANID5',
    '50': 'P-PLANID6',
    '100': 'P-PLANID7'
  };

  function renderPayPalButton() {
    if (paymentType.value !== 'paypal') {
      paypalContainer.innerHTML = '';
      return;
    }

    paypalContainer.innerHTML = ''; // reset

    const selectedPlanId = planIds[tierSelect.value];
    if (!selectedPlanId) return;

    paypal.Buttons({
      createSubscription: (data, actions) => {
        return actions.subscription.create({ plan_id: selectedPlanId });
      },
      onApprove: (data) => {
        paypalIdInput.value = data.subscriptionID;
        alert(`Subscription completed: ${tierSelect.options[tierSelect.selectedIndex].text}`);
        document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
      },
      onError: (err) => {
        console.error(err);
        alert('PayPal subscription error.');
      }
    }).render('#paypal-button-container');
  }

  tierSelect.addEventListener('change', renderPayPalButton);
  billingCycle.addEventListener('change', renderPayPalButton);
  paymentType.addEventListener('change', renderPayPalButton);

  renderPayPalButton();
});
