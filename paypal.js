document.addEventListener('DOMContentLoaded', () => {
    const tierSelect = document.getElementById('tier-select');
    const billingCycle = document.getElementById('billing-cycle');
    const paymentType = document.getElementById('payment-type');
    const paypalContainer = document.getElementById('paypal-button-container');

    const planIds = {
        '0.25': 'P-PLANID1',   // Founders’ Circle
        '1': 'P-PLANID1B',     // Dollar Bill
        '2': 'P-PLANID2',      // Bread & Butter
        '5': 'P-PLANID3',      // Startup Lane
        '10': 'P-PLANID4',     // Builder’s Foundation
        '20': 'P-PLANID5',     // Growth Track
        '50': 'P-PLANID6',     // Pro Business
        '100': 'P-PLANID7'     // Executive Class
    };

    window.renderPayPalButton = function() {
        if(paymentType.value !== 'paypal') return;

        paypalContainer.innerHTML = ''; // Clear previous buttons

        const amount = parseFloat(tierSelect.value);
        if(!amount && !tierSelect.value.includes('_pdf')) return;

        // One-time PDF purchase
        if(tierSelect.value.includes('_pdf')) {
            paypal.Buttons({
                createOrder: (data, actions) => actions.order.create({
                    purchase_units: [{ amount: { value: '10.00' } }]
                }),
                onApprove: (data, actions) => actions.order.capture().then(details => {
                    alert(`One-time purchase completed: ${tierSelect.options[tierSelect.selectedIndex].text}`);
                    document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
                }),
                onError: (err) => {
                    console.error(err);
                    alert('PayPal error.');
                }
            }).render('#paypal-button-container');
            return;
        }

        // Recurring subscription
        const selectedPlanId = planIds[tierSelect.value];
        paypal.Buttons({
            createSubscription: (data, actions) => actions.subscription.create({ plan_id: selectedPlanId }),
            onApprove: (data, actions) => {
                document.getElementById('paypal-id').value = data.subscriptionID;
                alert(`Subscription completed: ${tierSelect.options[tierSelect.selectedIndex].text}`);
                document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
            },
            onError: (err) => {
                console.error(err);
                alert('PayPal subscription error.');
            }
        }).render('#paypal-button-container');
    };

    tierSelect.addEventListener('change', renderPayPalButton);
    billingCycle.addEventListener('change', renderPayPalButton);
    paymentType.addEventListener('change', renderPayPalButton);

    // Initial render if PayPal is selected
    renderPayPalButton();
});
