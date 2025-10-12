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

        // Show the selected section
        switch (paymentTypeSelect.value) {
            case 'paypal':
                paypalSection.style.display = 'block';
                break;
            case 'polygon':
                polygonSection.style.display = 'block';
                break;
            case 'cash':
                cashSection.style.display = 'block';
                break;
            default:
                break;
        }
    }

    // Initialize the display based on the current selection
    togglePaymentSections();

    // Add event listener to update display when payment type changes
    paymentTypeSelect.addEventListener('change', togglePaymentSections);
});
