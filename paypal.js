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
        if(paymentType.value !== 'paypal') return;
        paypalContainer.innerHTML = '';

        // One-time PDF purchase
        if(tierSelect.value.includes('_pdf')) {
            paypal.Buttons({
                createOrder: (data, actions) => actions.order.create({
                    purchase_units: [{ amount: { value: '10.00' } }]
                }),
                onApprove: (data, actions) => actions.order.capture().then(() => {
                    alert(`One-time purchase completed: ${tierSelect.options[tierSelect.selectedIndex].text}`);
                    document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
                })
            }).render('#paypal-button-container');
            return;
        }

        // Recurring subscription
        const selectedPlanId = planIds[tierSelect.value];
        if(!selectedPlanId) return;

        paypal.Buttons({
            createSubscription: (data, actions) => actions.subscription.create({ plan_id: selectedPlanId }),
            onApprove: (data) => {
                paypalIdInput.value = data.subscriptionID;
                alert(`Subscription completed: ${tierSelect.options[tierSelect.selectedIndex].text}`);
                document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
            }
        }).render('#paypal-button-container');
    }

    tierSelect.addEventListener('change', renderPayPalButton);
    billingCycle.addEventListener('change', renderPayPalButton);
    paymentType.addEventListener('change', renderPayPalButton);

    // Initial render
    if(paymentType.value === 'paypal') renderPayPalButton();
});
