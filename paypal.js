// paypal-toggle.js
window.paypalToggle = (function () {
    let rendered = false;
    let currentTier = null;

    const tierSelect = document.getElementById('tier-select');
    const paypalContainer = document.getElementById('paypal-button-container');

    const amounts = {
        '0.25': 3,
        '1': 12,
        '2': 24,
        '5': 60,
        '10': 120,
        '20': 240,
        '50': 600,
        '100': 1200,
        '10_pdf': 10
    };

    function renderButton() {
        const tier = tierSelect.value;
        if (!tier || tier === currentTier) return; // Skip if no change

        currentTier = tier;
        const amount = amounts[tier];
        if (!amount) return;

        // Clear existing buttons
        paypalContainer.innerHTML = '';

        paypal.Buttons({
            createOrder: (data, actions) => actions.order.create({
                purchase_units: [{ amount: { value: amount.toFixed(2) } }]
            }),
            onApprove: (data, actions) => actions.order.capture().then(() => {
                alert(`Payment completed: $${amount.toFixed(2)}`);
                // Auto-submit the form after PayPal success
                document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
            }),
            onError: (err) => {
                console.error(err);
                alert('PayPal error occurred.');
            }
        }).render('#paypal-button-container');

        rendered = true;
    }

    // Re-render button whenever tier changes
    tierSelect.addEventListener('change', renderButton);

    return renderButton;
})();
