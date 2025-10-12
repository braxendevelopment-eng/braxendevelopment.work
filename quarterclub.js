// quarterclub.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quarterclub-form');
    const tierSelect = document.getElementById('tier-select');
    const priceDisplay = document.getElementById('price-display');

    // ----------------- Pricing Display -----------------
    function updatePriceDisplay() {
        const tierValue = tierSelect.value;
        if (!tierValue) {
            priceDisplay.textContent = "Select a tier to view pricing.";
            return;
        }

        let amount;
        if (tierValue.includes('_pdf')) {
            amount = 10;
            priceDisplay.textContent = `One-time purchase: $${amount.toFixed(2)}`;
        } else {
            amount = parseFloat(tierValue) * 12; // Always annual
            priceDisplay.textContent = `$${tierValue}/mo (billed $${amount.toFixed(2)})`;
        }
    }

    tierSelect.addEventListener('change', updatePriceDisplay);
    updatePriceDisplay(); // initial

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

        const paymentType = document.getElementById('payment-type').value;
        if (!paymentType) {
            alert('Please select a payment method.');
            return;
        }

        // Only dispatch for non-PayPal payments
        if (paymentType === 'polygon' && window.polygonToggle) window.polygonToggle();
        if (paymentType === 'cash' && window.cashToggle) window.cashToggle();
    });
});
