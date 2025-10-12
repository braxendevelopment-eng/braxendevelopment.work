// paypal.js
window.paypalToggle = function() {
    const tierSelect = document.getElementById('tier-select');
    const paypalContainer = document.getElementById('paypal-button-container');

    const tierValues = {
        '0.25': 0.25,
        '1': 1,
        '2': 2,
        '5': 5,
        '10': 10,
        '20': 20,
        '50': 50,
        '100': 100,
        '10_pdf': 10
    };

    function getPayPalAmount() {
        const tier = tierSelect.value;
        if (!tier) return null;
        return tier === '10_pdf' ? 10.00 : tierValues[tier] * 12;
    }

    function renderPayPalButton() {
        paypalContainer.innerHTML = '';
        const amount = getPayPalAmount();
        if (!amount) return;

        paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{ amount: { value: amount.toFixed(2) } }]
                });
            },
            onApprove: (data, actions) => {
                actions.order.capture().then(() => {
                    alert(`Payment completed: ${tierSelect.options[tierSelect.selectedIndex].text}`);
                    document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
                });
            },
            onError: (err) => {
                console.error(err);
                alert('PayPal payment error.');
            }
        }).render('#paypal-button-container');
    }

    tierSelect.addEventListener('change', renderPayPalButton);
    renderPayPalButton();
};
