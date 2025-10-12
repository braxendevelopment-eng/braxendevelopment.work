// quarterclub.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quarterclub-form');
    const tierSelect = document.getElementById('tier-select');
    const billingCycle = document.getElementById('billing-cycle');
    const priceDisplay = document.getElementById('price-display');

    // ----------------- Pricing Display -----------------
    function updatePriceDisplay() {
        const tierValue = tierSelect.value;
        if(!tierValue) {
            priceDisplay.textContent = "Select a tier to view pricing.";
            return;
        }

        let amount;
        if(tierValue.includes('_pdf')) {
            amount = 10; // One-time PDF
            priceDisplay.textContent = `One-time purchase: $${amount.toFixed(2)}`;
        } else {
            amount = parseFloat(tierValue);
            if(billingCycle.value === 'annual') amount *= 12;
            priceDisplay.textContent = billingCycle.value === 'monthly'
                ? `$${tierValue}/mo`
                : `$${amount.toFixed(2)}/yr`;
        }
    }

    tierSelect.addEventListener('change', updatePriceDisplay);
    billingCycle.addEventListener('change', updatePriceDisplay);
    updatePriceDisplay(); // Initial

    // ----------------- EIN Validation -----------------
    function isValidEIN(ein) {
        // Format: XX-XXXXXXX
        return /^\d{2}-\d{7}$/.test(ein);
    }

    // ----------------- Form Submission -----------------
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const einInput = document.getElementById('business-ein').value.trim();
        if(!isValidEIN(einInput)) {
            alert('Please enter a valid EIN in format XX-XXXXXXX.');
            return;
        }

        // Optional: additional validations
        // const email = document.getElementById('business-email').value.trim();
        // const phone = document.getElementById('business-phone').value.trim();
        // etc.

        // Determine payment type
        const paymentType = document.getElementById('payment-type').value;
        if(!paymentType) {
            alert('Please select a payment method.');
            return;
        }

        // Dispatch to payment handler
        switch(paymentType) {
            case 'paypal':
                if(window.paypalToggle) window.paypalToggle();
                break;
            case 'polygon':
                if(window.polygonToggle) window.polygonToggle();
                break;
            case 'cash':
                if(window.cashToggle) window.cashToggle();
                break;
        }
    });
});
