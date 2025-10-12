document.addEventListener('DOMContentLoaded', () => {
    const paymentTypeSelect = document.getElementById('payment-type');
    const paypalSection = document.getElementById('paypal-button-container');

    function togglePayPal() {
        paypalSection.style.display = (paymentTypeSelect.value === 'paypal') ? 'block' : 'none';
    }

    // Initialize
    togglePayPal();

    // Update on change
    paymentTypeSelect.addEventListener('change', togglePayPal);
});
