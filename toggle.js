document.addEventListener('DOMContentLoaded', () => {
    const paymentTypeSelect = document.getElementById('payment-type');
    const paypalSection = document.getElementById('paypal-button-container');
    const polygonSection = document.getElementById('polygon-section');
    const cashSection = document.getElementById('cash-section');

    function togglePaymentSections() {
        // Hide all sections initially
        paypalSection.style.display = 'none';
        polygonSection.style.display = 'none';
        cashSection.style.display = 'none';

        // Show the selected section and activate relevant functionality
        switch (paymentTypeSelect.value) {
            case 'paypal':
                paypalSection.style.display = 'block';
                // Trigger PayPal button render if function exists
                if (typeof renderPayPalButton === 'function') {
                    renderPayPalButton();
                }
                break;
            case 'polygon':
                polygonSection.style.display = 'block';
                // Trigger gas fee update if function exists
                if (typeof updatePolygonGasFee === 'function') {
                    updatePolygonGasFee();
                }
                break;
            case 'cash':
                cashSection.style.display = 'block';
                // Nothing extra needed for cash
                break;
            default:
                break;
        }
    }

    // Initialize display based on the current selection
    togglePaymentSections();

    // Update display whenever the payment type changes
    paymentTypeSelect.addEventListener('change', togglePaymentSections);
});
