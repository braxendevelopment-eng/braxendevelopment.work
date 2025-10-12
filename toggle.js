// toggle.js
document.addEventListener('DOMContentLoaded', () => {
    const paymentTypeSelect = document.getElementById('payment-type');

    const paypalSection = document.getElementById('paypal-section');
    const polygonSection = document.getElementById('polygon-section');
    const cashSection = document.getElementById('cash-section');

    function toggleSections() {
        // Hide all sections by default
        paypalSection.style.display = 'none';
        polygonSection.style.display = 'none';
        cashSection.style.display = 'none';

        // Show only the selected payment section
        switch (paymentTypeSelect.value) {
            case 'paypal':
                paypalSection.style.display = 'block';
                if (window.paypalToggle) window.paypalToggle();
                break;
            case 'polygon':
                polygonSection.style.display = 'block';
                if (window.polygonToggle) window.polygonToggle();
                break;
            case 'cash':
                cashSection.style.display = 'block';
                if (window.cashToggle) window.cashToggle();
                break;
            default:
                break;
        }
    }

    // Initialize on page load
    toggleSections();

    // Re-toggle whenever the payment type changes
    paymentTypeSelect.addEventListener('change', toggleSections);
});
