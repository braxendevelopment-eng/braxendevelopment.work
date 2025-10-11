// ----------------- DOM Elements -----------------
const tierSelect = document.getElementById('tier-select');
const billingCycle = document.getElementById('billing-cycle');
const paymentType = document.getElementById('payment-type');
const priceDisplay = document.getElementById('price-display');
const form = document.getElementById('quarterclub-form');

// ----------------- Price Display -----------------
function updatePrice() {
    const selectedValue = tierSelect.value;
    const selectedText = tierSelect.options[tierSelect.selectedIndex].text;
    const billing = billingCycle.value;

    if (!selectedValue) {
        priceDisplay.textContent = 'Select a tier to view pricing.';
        return;
    }

    if (selectedValue.includes('_pdf')) {
        priceDisplay.textContent = 'Path to Profit Handbook — $10 one-time payment.';
        return;
    }

    const basePrice = parseFloat(selectedValue);
    let displayText = '';

    if (billing === 'monthly' && basePrice < 5) {
        displayText = `${selectedText} — *Monthly billing not available for this tier.*`;
    } else if (billing === 'annual') {
        const annualPrice = (basePrice * 12).toFixed(2);
        displayText = `${selectedText} — Annual Plan: $${annualPrice}/yr`;
    } else {
        displayText = `${selectedText} — Monthly Plan: $${basePrice}/mo`;
    }

    priceDisplay.textContent = displayText;
}

// ----------------- Final Amount -----------------
function getFinalAmount() {
    const basePrice = parseFloat(tierSelect.value);
    if (!basePrice) return null;

    let amount = basePrice;
    if (billingCycle.value === 'annual') amount *= 12;
    if (billingCycle.value === 'monthly' && amount < 5) {
        alert('Monthly payments are only available for $5 and above.');
        return null;
    }
    return amount.toFixed(2);
}

// ----------------- Conditional Payment Loader -----------------
function loadPaymentScript(method) {
    const existingScript = document.getElementById('payment-script');
    if (existingScript) existingScript.remove();

    if (!method) return;

    let src = '';
    switch (method) {
        case 'paypal': src = 'js/paypal.js'; break;
        case 'polygon': src = 'js/polygon.js'; break;
        case 'cash': src = 'js/cash.js'; break;
        default: return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.id = 'payment-script';
    script.defer = true;
    document.body.appendChild(script);
}

// ----------------- Form Submission -----------------
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const finalAmount = getFinalAmount();
    if (finalAmount === null) return;

    // Collect form data
    const businessData = {};
    form.querySelectorAll('input, select').forEach(el => {
        businessData[el.id] = el.value;
    });

    try {
        const response = await fetch('https://api.braxendevelopment.work/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(businessData)
        });
        if (!response.ok) throw new Error('Network error');
        alert(`Form submitted successfully.\nAmount: $${finalAmount}`);
    } catch (err) {
        console.error(err);
        alert('Error submitting data. Try again.');
    }
});

// ----------------- Event Listeners -----------------
tierSelect.addEventListener('change', updatePrice);
billingCycle.addEventListener('change', updatePrice);

paymentType.addEventListener('change', () => {
    // Load payment script dynamically
    loadPaymentScript(paymentType.value);
});

// ----------------- Initialize -----------------
window.addEventListener('DOMContentLoaded', () => {
    updatePrice();
    if (paymentType.value) loadPaymentScript(paymentType.value);
});
