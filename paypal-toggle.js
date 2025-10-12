// paypal-toggle.js
window.paypalToggle = function() {
    const tierSelect = document.getElementById('tier-select');
    const billingCycle = document.getElementById('billing-cycle');
    const paypalContainer = document.getElementById('paypal-button-container');
    const paypalIdInput = document.getElementById('paypal-id');

    function renderPayPalButton() {
        paypalContainer.innerHTML = '';

        const tierValue = tierSelect.value;

        if(!tierValue) return;

        // Determine charge amount
        let amount;
        if(tierValue.includes('_pdf')) {
            amount = 10; // One-time PDF
        } else {
            amount = parseFloat(tierValue);
            if(billingCycle.value === 'annual') amount *= 12; // Annual charges
        }

        // Render one-time PayPal button
        paypal.Buttons({
            createOrder: (data, actions) => actions.order.create({
                purchase_units: [{ amount: { value: amount.toFixed(2) } }]
            }),
            onApprove: (data, actions) => actions.order.capture().then(() => {
                alert(`Payment completed: ${tierSelect.options[tierSelect.selectedIndex].text}`);
                paypalIdInput.value = data.id;
                document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
            }),
            onError: (err) => {
                console.error(err);
                alert('PayPal error occurred.');
            }
        }).render('#paypal-button-container');
    }

    // Initial render
    renderPayPalButton();

    // Re-render on tier or billing change
    tierSelect.addEventListener('change', renderPayPalButton);
    billingCycle.addEventListener('change', renderPayPalButton);
};
