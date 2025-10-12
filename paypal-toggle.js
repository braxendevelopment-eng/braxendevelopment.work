window.paypalToggle = function() {
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
        paypalContainer.innerHTML = ''; // Clear previous
        const amount = amounts[tierSelect.value];
        if (!amount) return;

        paypal.Buttons({
            createOrder: (data, actions) => actions.order.create({
                purchase_units: [{ amount: { value: amount.toFixed(2) } }]
            }),
            onApprove: (data, actions) => actions.order.capture().then(() => {
                alert(`Payment completed: $${amount.toFixed(2)}`);
                // Auto-submit form after PayPal success
                document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
            }),
            onError: (err) => {
                console.error(err);
                alert('PayPal payment error.');
            }
        }).render('#paypal-button-container');
    }

    // Only render if container is visible
    if (paypalContainer.offsetParent !== null) renderButton();

    // Update button if tier changes
    tierSelect.addEventListener('change', renderButton);
};
