// paypal-toggle.js
window.paypalToggle = function() {
    const tierSelect = document.getElementById('tier-select');
    const paypalContainer = document.getElementById('paypal-button-container');

    // Map tiers to one-time amounts
    const amounts = {
        '0.25': 3,     // Founders’ Circle ($0.25/mo billed $3)
        '1': 12,       // Dollar Bill
        '2': 24,       // Bread & Butter
        '5': 60,       // Startup Lane
        '10': 120,     // Builder’s Foundation
        '20': 240,     // Growth Track
        '50': 600,     // Pro Business
        '100': 1200,   // Executive Class
        '10_pdf': 10   // Path to Profit Handbook
    };

    function renderButton() {
        paypalContainer.innerHTML = ''; // Clear previous button

        const tier = tierSelect.value;
        const amount = amounts[tier];
        if (!amount) return;

        paypal.Buttons({
            createOrder: (data, actions) => actions.order.create({
                purchase_units: [{ amount: { value: amount.toFixed(2) } }]
            }),
            onApprove: (data, actions) => actions.order.capture().then(() => {
                alert(`Payment completed: $${amount.toFixed(2)}`);
                document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
            }),
            onError: (err) => {
                console.error(err);
                alert('PayPal error occurred.');
            }
        }).render('#paypal-button-container');
    }

    // Re-render button when tier changes
    tierSelect.addEventListener('change', renderButton);

    // Initial render
    renderButton();
};
