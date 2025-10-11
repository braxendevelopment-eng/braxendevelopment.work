// =====================
// Elements
// =====================
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

const MASTER_CASH_CODE = "YOUR_SECRET_CODE"; // Replace with your Cloudflare secret

// =====================
// Update Tier Price
// =====================
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
        displayText = `${selectedText} — Annual Plan: $${(basePrice*12).toFixed(2)}/yr`;
    } else {
        displayText = `${selectedText} — Monthly Plan: $${basePrice}/mo`;
    }

    priceDisplay.textContent = displayText;
}

tierSelect.addEventListener('change', updatePrice);
billingCycle.addEventListener('change', updatePrice);

// =====================
// Copy Polygon Wallet
// =====================
copyPolygonBtn.addEventListener('click', () => {
    const wallet = document.getElementById('polygon-wallet');
    wallet.select();
    document.execCommand('copy');
    alert('Polygon address copied!');
});

// =====================
// Polygon Gas Fee
// =====================
async function updatePolygonGasFee() {
    const gasFeeEl = document.getElementById('polygon-gas-fee');
    try {
        const gasResponse = await fetch('https://gasstation.polygon.technology/v2');
        const gasData = await gasResponse.json();
        const fastGasGwei = gasData.fast.maxFee; // in wei

        const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd');
        const priceData = await priceResponse.json();
        const maticUsd = priceData['matic-network'].usd;

        const gasMatic = fastGasGwei / 1e18;
        const gasUsd = gasMatic * maticUsd;

        gasFeeEl.textContent = `Estimated Gas Fee: ${gasMatic.toFixed(6)} MATIC (~$${gasUsd.toFixed(2)} USD)`;
    } catch (err) {
        console.error(err);
        gasFeeEl.textContent = "Estimated Gas Fee: Unavailable";
    }
}

// Auto-update every 15s when Polygon selected
setInterval(() => {
    if(paymentType.value === 'polygon') updatePolygonGasFee();
}, 15000);

// =====================
// Toggle Payment Sections
// =====================
paymentType.addEventListener('change', () => {
    paypalContainer.innerHTML = '';
    polygonSection.style.display = cashSection.style.display = 'none';

    if(paymentType.value === 'paypal' && tierSelect.value) {
        renderPayPalButton(getFinalAmount());
    }
    if(paymentType.value === 'polygon') {
        polygonSection.style.display = 'block';
        updatePolygonGasFee();
    }
    if(paymentType.value === 'cash') {
        cashSection.style.display = 'block';
    }
});

// =====================
// Calculate Final Amount
// =====================
function getFinalAmount() {
    const basePrice = parseFloat(tierSelect.value);
    if(!basePrice) return null;
    let amount = basePrice;
    if(billingCycle.value === 'annual') amount *= 12;
    if(billingCycle.value === 'monthly' && amount < 5) {
        alert('Monthly payments are only available for $5 and above.');
        return null;
    }
    return amount;
}

// =====================
// Render PayPal Button (Dark Theme)
// =====================
function renderPayPalButton(amount) {
    if (!amount) return;
    paypalContainer.innerHTML = ""; 

    paypal.Buttons({
        style: {
            color: 'black',
            shape: 'rect',
            label: 'pay',
            height: 40
        },
        createOrder: (data, actions) => actions.order.create({
            purchase_units: [{ amount: { value: amount } }]
        }),
        onApprove: (data, actions) => actions.order.capture().then(details => {
            alert('Transaction completed by ' + details.payer.name.given_name);
        }),
        onError: (err) => {
            console.error(err);
            alert('Error processing PayPal payment.');
        }
    }).render('#paypal-button-container');
}

// =====================
// Form Submission
// =====================
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const finalAmount = getFinalAmount();
    if(finalAmount === null) return;

    const payment = paymentType.value;

    // Validate Cash
    if(payment === 'cash' && cashCodeInput.value.trim() !== MASTER_CASH_CODE) {
        return alert('Invalid cash code.');
    }

    // Validate Polygon
    if(payment === 'polygon' && !polygonHashInput.value.trim()) {
        return alert('Enter Polygon transaction hash.');
    }

    // PayPal handled separately
    if(payment === 'paypal') return renderPayPalButton(finalAmount);

    // Collect data
    const businessData = {
        name: document.getElementById('business-name').value,
        ein: document.getElementById('business-ein').value,
        email: document.getElementById('business-email').value,
        phone: document.getElementById('business-phone').value,
        address: document.getElementById('business-address').value,
        city: document.getElementById('business-city').value,
        state: document.getElementById('business-state').value,
        zip: document.getElementById('business-zip').value,
        tier: tierSelect.value,
        billingCycle: billingCycle.value,
        paymentType: payment,
        cashCode: cashCodeInput.value.trim(),
        polygonHash: polygonHashInput.value.trim()
    };

    try {
        const response = await fetch('https://api.braxendevelopment.work/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(businessData)
        });
        if(!response.ok) throw new Error('Network error');
        alert(`Form submitted successfully for ${payment.toUpperCase()}.\nAmount: $${finalAmount.toFixed(2)}`);
    } catch(err) {
        console.error(err);
        alert('Error submitting data. Try again.');
    }
});
