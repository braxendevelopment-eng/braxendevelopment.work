document.addEventListener('DOMContentLoaded', () => {
    const paymentType = document.getElementById('payment-type');

    const paypalSection = document.getElementById('paypal-section');
    const polygonSection = document.getElementById('polygon-section');
    const cashSection = document.getElementById('cash-section');

    // Default: PayPal selected
    paymentType.value = 'paypal';

    function togglePaymentSections() {
        paypalSection.style.display = 'none';
        polygonSection.style.display = 'none';
        cashSection.style.display = 'none';

        if (paymentType.value === 'paypal') paypalSection.style.display = 'block';
        if (paymentType.value === 'polygon') polygonSection.style.display = 'block';
        if (paymentType.value === 'cash') cashSection.style.display = 'block';
    }

    paymentType.addEventListener('change', togglePaymentSections);

    // Show default section on load
    togglePaymentSections();
});
