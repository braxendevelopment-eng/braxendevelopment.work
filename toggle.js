document.addEventListener('DOMContentLoaded', () => {
    const paymentType = document.getElementById('payment-type');

    const paypalSection = document.getElementById('paypal-section');
    const polygonSection = document.getElementById('polygon-section');
    const cashSection = document.getElementById('cash-section');

    // Set PayPal as default
    paymentType.value = 'paypal';

    function togglePaymentSections() {
        // Hide all sections first
        paypalSection.style.display = 'none';
        polygonSection.style.display = 'none';
        cashSection.style.display = 'none';

        // Show selected
        if(paymentType.value === 'paypal') paypalSection.style.display = 'block';
        if(paymentType.value === 'polygon') polygonSection.style.display = 'block';
        if(paymentType.value === 'cash') cashSection.style.display = 'block';
    }

    // Listen for changes
    paymentType.addEventListener('change', togglePaymentSections);

    // Initialize on page load
    togglePaymentSections();
});
