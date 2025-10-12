paymentTypeSelect.addEventListener('change', () => {
    paypalSection.style.display = 'none';
    polygonSection.style.display = 'none';
    cashSection.style.display = 'none';

    switch (paymentTypeSelect.value) {
        case 'paypal':
            paypalSection.style.display = 'block';
            if (window.paypalToggle) window.paypalToggle(); // calls paypal-toggle.js
            break;
        case 'polygon':
            polygonSection.style.display = 'block';
            if (window.polygonToggle) window.polygonToggle(); // calls polygon-toggle.js
            break;
        case 'cash':
            cashSection.style.display = 'block';
            if (window.cashToggle) window.cashToggle(); // calls cash-toggle.js
            break;
    }
});
