document.addEventListener('DOMContentLoaded', () => {
    const paymentTypeSelect = document.getElementById('payment-type');

    const paypalSection = document.getElementById('paypal-section');
    const polygonSection = document.getElementById('polygon-section');
    const cashSection = document.getElementById('cash-section');

    function toggleSections() {
        paypalSection.style.display = 'none';
        polygonSection.style.display = 'none';
        cashSection.style.display = 'none';

        switch(paymentTypeSelect.value) {
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
        }
    }

    toggleSections(); // Initialize
    paymentTypeSelect.addEventListener('change', toggleSections);
});
