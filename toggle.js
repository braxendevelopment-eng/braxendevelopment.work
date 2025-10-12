// toggle.js - main toggle controller
document.addEventListener('DOMContentLoaded', () => {
    const paymentTypeSelect = document.getElementById('payment-type');
    const paypalSection = document.getElementById('paypal-button-container');
    const polygonSection = document.getElementById('polygon-section');
    const cashSection = document.getElementById('cash-section');

    function togglePaymentSections() {
        // Hide all sections first
        paypalSection.style.display = 'none';
        polygonSection.style.display = 'none';
        cashSection.style.display = 'none';

        // Show the selected section
        switch (paymentTypeSelect.value) {
            case 'paypal':
                paypalSection.style.display = 'block';
                if (typeof window.paypalToggle === 'function') window.paypalToggle();
                break;
            case 'polygon':
                polygonSection.style.display = 'block';
                if (typeof window.polygonToggle === 'function') window.polygonToggle();
                break;
            case 'cash':
                cashSection.style.display = 'block';
                if (typeof window.cashToggle === 'function') window.cashToggle();
                break;
        }
    }

    // Initialize display on page load
    togglePaymentSections();

    // Update display when selection changes
    paymentTypeSelect.addEventListener('change', togglePaymentSections);
});
