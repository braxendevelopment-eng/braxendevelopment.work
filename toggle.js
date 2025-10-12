document.addEventListener('DOMContentLoaded', () => {
    const paymentType = document.getElementById('payment-type');

    const paypalSection = document.getElementById('paypal-button-container');
    const polygonSection = document.getElementById('polygon-section');
    const cashSection = document.getElementById('cash-section');

    function togglePaymentSections() {
        // Hide all sections by default
        paypalSection.style.display = 'none';
        polygonSection.style.display = 'none';
        cashSection.style.display = 'none';

        // Show selected section
        if(paymentType.value === 'paypal') paypalSection.style.display = 'block';
        if(paymentType.value === 'polygon') polygonSection.style.display = 'block';
        if(paymentType.value === 'cash') cashSection.style.display = 'block';
    }

    // Listen for changes on payment type
    paymentType.addEventListener('change', togglePaymentSections);

    // Initialize on page load
    togglePaymentSections();
});
