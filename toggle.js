document.addEventListener('DOMContentLoaded', () => {
    const paymentTypeSelect = document.getElementById('payment-type');

    // Function to hide all payment sections
    function hideAllSections() {
        const sections = document.querySelectorAll('#paypal-button-container, #polygon-section, #cash-section');
        sections.forEach(section => section.style.display = 'none');
    }

    // Function to show the section for the selected payment type
    function showSection(paymentType) {
        hideAllSections(); // hide everything first
        switch (paymentType) {
            case 'paypal':
                document.getElementById('paypal-button-container').style.display = 'block';
                if (window.renderPayPalButton) window.renderPayPalButton(); // call PayPal rendering
                break;
            case 'polygon':
                document.getElementById('polygon-section').style.display = 'block';
                if (window.updatePolygonGasFee) window.updatePolygonGasFee(); // call Polygon update
                break;
            case 'cash':
                document.getElementById('cash-section').style.display = 'block';
                break;
        }
    }

    // Initial toggle on page load
    showSection(paymentTypeSelect.value);

    // Listen for changes on the payment type select
    paymentTypeSelect.addEventListener('change', (e) => {
        showSection(e.target.value);
    });
});
