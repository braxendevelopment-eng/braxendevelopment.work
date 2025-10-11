// DOM Elements
const tierSelect = document.getElementById('tier-select');
const billingCycle = document.getElementById('billing-cycle');
const paymentType = document.getElementById('payment-type');
const priceDisplay = document.getElementById('price-display');
const paypalContainer = document.getElementById('paypal-button-container');
const polygonSection = document.getElementById('polygon-section');
const cashSection = document.getElementById('cash-section');
const cashCodeInput = document.getElementById('cash-code');
const polygonHashInput = document.getElementById('polygon-hash');
const copyPolygonBtn = document.getElementById('copy-polygon');
const form = document.getElementById('quarterclub-form');

const MASTER_CASH_CODE = "YOUR_SECRET_CODE"; // Replace with your secret code

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

// ----------------- Copy Polygon -----------------
copyPolygonBtn.addEventListener('click', () => {
    polygonWallet.select();
    document.execCommand('copy');
    alert('Polygon address copied!');
});

// ----------------- Polygon Gas Fee -----------------
async function updatePolygonGasFee() {
    const gasFeeEl = document.getElementById('polygon-gas-fee');
    try {
        const gasResponse = await fetch('https://gasstation.polygon.technology/v2');
        const gasData = await gasResponse.json();
        const fastGasGwei = gasData.fast.maxFee;

        const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd');
        const priceData = await priceResponse.json();
        const maticUsd = priceData['matic-network'].usd;

        const gasMatic = fastGasGwei / 1e18;
        const gasUsd = gasMatic * maticUsd;

        gasFeeEl.textContent = `Estimated Gas Fee: ${gasMatic.toFixed(6)} MATIC (~$${gasUsd.toFixed(2)} USD)`;
    } catch (err) {
        gasFeeEl.textContent = "Estimated Gas Fee: Unavailable";
    }
}

// ----------------- Final Amount -----------------
function getFinalAmount() {
    const basePrice = parseFloat(tierSelect.value);
    if(!basePrice) return null;
    let amount = basePrice;

    if(billingCycle.value === 'annual') amount *= 12;
    if(billingCycle.value === 'monthly' && amount < 5) {
        alert('Monthly payments are only available for $5 and above.');
        return null;
    }
    return amount.toFixed(2);
}

// ----------------- Render PayPal Button -----------------
function renderPayPalButton(amount) {
    if(!amount) return;
    paypalContainer.innerHTML = '';
    paypal.Buttons({
        createOrder: (data, actions) => actions.order.create({
            purchase_units: [{ amount: { value: amount } }]
        }),
        onApprove: (data, actions) => actions.order.capture().then(details => {
            alert('Transaction completed by ' + details.payer.name.given_name);
        })
    }).render('#paypal-button-container');
}

// ----------------- Payment Type Toggle -----------------
function togglePaymentSections() {
    paypalContainer.innerHTML = '';
    polygonSection.style.display = cashSection.style.display = 'none';

    if(paymentType.value === 'paypal') {
        const amount = getFinalAmount();
        if(amount) renderPayPalButton(amount);
    }
    if(paymentType.value === 'polygon') {
        polygonSection.style.display = 'block';
        updatePolygonGasFee();
    }
    if(paymentType.value === 'cash') {
        cashSection.style.display = 'block';
    }
}

// ----------------- Form Submission -----------------
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const finalAmount = getFinalAmount();
    if(finalAmount === null) return;

    if(paymentType.value === 'cash' && cashCodeInput.value.trim() !== MASTER_CASH_CODE) {
        return alert('Invalid cash code.');
    }

    if(paymentType.value === 'polygon' && !polygonHashInput.value.trim()) {
        return alert('Enter Polygon transaction hash.');
    }

    if(paymentType.value === 'paypal') return; // Handled by PayPal SDK

    // Collect form data and submit
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
        if(!response.ok) throw new Error('Network error');
        alert(`Form submitted successfully for ${paymentType.value.toUpperCase()}.\nAmount: $${finalAmount}`);
    } catch(err) {
        console.error(err);
        alert('Error submitting data. Try again.');
    }
});

// ----------------- Event Listeners -----------------
tierSelect.addEventListener('change', () => {
    updatePrice();
    if(paymentType.value === 'paypal') renderPayPalButton(getFinalAmount());
});
billingCycle.addEventListener('change', () => {
    updatePrice();
    if(paymentType.value === 'paypal') renderPayPalButton(getFinalAmount());
});
paymentType.addEventListener('change', togglePaymentSections);

// ----------------- Initialize -----------------
window.addEventListener('DOMContentLoaded', () => {
    updatePrice();
    togglePaymentSections(); // If page loads with PayPal selected
});
