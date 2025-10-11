document.addEventListener('DOMContentLoaded', () => {
    const tierSelect = document.getElementById('tier-select');
    const billingCycle = document.getElementById('billing-cycle');
    const paypalContainer = document.getElementById('paypal-button-container');

    // Map tiers to PayPal plan IDs (replace with your actual PayPal subscription plan IDs)
    const planIds = {
        '0.25': 'P-PLANID1',  // Founders’ Circle
        '2': 'P-PLANID2',     // Bread & Butter
        '5': 'P-PLANID3',     // Startup Lane
        '10': 'P-PLANID4',    // Builder’s Foundation
        '20': 'P-PLANID5',    // Growth Track
        '50': 'P-PLANID6',    // Pro Business
        '100': 'P-PLANID7'    // Executive Class
    };

    function getFinalAmount() {
        const basePrice = parseFloat(tierSelect.value);
        if (!basePrice) return null;
        let amount = basePrice;
        if (billingCycle.value === 'annual') amount *= 12;
        if (billingCycle.value === 'monthly' && amount < 5) return null;
        return amount.toFixed(2);
    }

    function renderPayPalButton() {
        const amount = getFinalAmount();
        if (!amount) return;

        paypalContainer.innerHTML = '';

        // Check if one-time payment (PDF)
        if (tierSelect.value.includes('_pdf')) {
            paypal.Buttons({
                createOrder: (data, actions) => actions.order.create({
                    purchase_units: [{ amount: { value: '10.00' } }]
                }),
                onApprove: (data, actions) => actions.order.capture().then(details => {
                    alert(`One-time purchase completed: ${tierSelect.options[tierSelect.selectedIndex].text}`);
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
                alert(`Subscription completed: ${tierSelect.options[tierSelect.selectedIndex].text}`);
            },
            onError: (err) => {
                console.error(err);
                alert('PayPal subscription error.');
            }
        }).render('#paypal-button-container');
    }

    tierSelect.addEventListener('change', renderPayPalButton);
    billingCycle.addEventListener('change', renderPayPalButton);

    renderPayPalButton();
});
