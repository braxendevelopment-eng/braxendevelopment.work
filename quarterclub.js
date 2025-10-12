// quarterclub.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quarterclub-form');
    const tierSelect = document.getElementById('tier-select');
    const priceDisplay = document.getElementById('price-display');
    const paymentTypeSelect = document.getElementById('payment-type');

    // ----------------- Pricing Display -----------------
    function updatePriceDisplay() {
        const tierValue = tierSelect.value;
        if (!tierValue) {
            priceDisplay.textContent = "Select a tier to view pricing.";
            return;
        }

        let amount;
        if (tierValue.includes('_pdf')) {
            amount = 10; // One-time PDF
            priceDisplay.textContent = `One-time purchase: $${amount.toFixed(2)}`;
        } else {
            amount = parseFloat(tierValue) * 12; // Always annual
            priceDisplay.textContent = `$${tierValue}/mo (billed $${amount.toFixed(2)})`;
        }
    }

    tierSelect.addEventListener('change', updatePriceDisplay);
    updatePriceDisplay(); // Initial

    // ----------------- EIN Validation -----------------
    function isValidEIN(ein) {
        return /^\d{2}-\d{7}$/.test(ein);
    }

    // ----------------- Form Submission -----------------
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const einInput = document.getElementById('business-ein').value.trim();
        if (!isValidEIN(einInput)) {
            alert('Please enter a valid EIN in format XX-XXXXXXX.');
            return;
        }

        const paymentType = paymentTypeSelect.value;
        if (!paymentType) {
            alert('Please select a payment method.');
            return;
        }

        // ----------------- Payment Handling -----------------
        switch (paymentType) {
            case 'paypal':
                // PayPal handles submission itself
                if (window.paypalToggle) window.paypalToggle();
                break;

            case 'polygon':
                if (window.polygonToggle) window.polygonToggle();
                break;

            case 'cash':
                if (window.cashToggle) window.cashToggle();
                break;
        }
    });
});
