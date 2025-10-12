document.addEventListener('DOMContentLoaded', () => {
    const tierSelect = document.getElementById('tier-select');
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

    window.renderPayPalButton = function() {
        if(document.getElementById('payment-type').value !== 'paypal') return;

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
                }),
                onError: (err) => console.error(err)
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
            },
            onError: (err) => console.error(err)
        }).render('#paypal-button-container');
    };

    tierSelect.addEventListener('change', renderPayPalButton);
    document.getElementById('billing-cycle').addEventListener('change', renderPayPalButton);
});
