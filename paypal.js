document.addEventListener('DOMContentLoaded', () => {
    const tierSelect = document.getElementById('tier-select');
    const priceDisplay = document.getElementById('price-display');

    const tierValues = {
        '0.25': 0.25,
        '1': 1,
        '2': 2,
        '5': 5,
        '10': 10,
        '20': 20,
        '50': 50,
        '100': 100,
        '10_pdf': 10
    };

    function updatePriceDisplay() {
        const tier = tierSelect.value;
        if (!tier) {
            priceDisplay.textContent = "Select a tier to view pricing.";
            return;
        }

        if(tier === '10_pdf') {
            priceDisplay.textContent = `One-time purchase: $10.00`;
        } else {
            const annualAmount = tierValues[tier] * 12;
            priceDisplay.textContent = `$${tierValues[tier]}/mo (billed $${annualAmount})`;
        }
    }

    tierSelect.addEventListener('change', updatePriceDisplay);
    updatePriceDisplay(); // Initial display
});
