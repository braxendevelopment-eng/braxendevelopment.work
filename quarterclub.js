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

const MASTER_CASH_CODE = "YOUR_SECRET_CODE";

// -------- Pricing Display ----------
function getFinalAmount() {
    const basePrice = parseFloat(tierSelect.value);
    if (!basePrice) return null;
    let amount = basePrice;
    if (billingCycle.value === 'annual') amount *= 12;
    if (billingCycle.value === 'monthly' && amount < 5) {
        alert('Monthly payments are only available for $5 and above.');
        return null;
    }
    return amount;
}

function updatePrice() {
    const selectedText = tierSelect.options[tierSelect.selectedIndex].text;
    const amount = getFinalAmount();
    if (!amount) {
        priceDisplay.textContent = 'Select a tier to view pricing.';
        return;
    }
    priceDisplay.textContent = `${selectedText} — $${amount.toFixed(2)}`;
}

tierSelect.addEventListener('change', updatePrice);
billingCycle.addEventListener('change', updatePrice);

// -------- Copy Polygon Address ----------
copyPolygonBtn.addEventListener('click', () => {
    const wallet = document.getElementById('polygon-wallet');
    wallet.select();
    document.execCommand('copy');
    alert('Polygon address copied!');
});

// -------- Payment Toggle ----------
paymentType.addEventListener('change', () => {
    paypalContainer.innerHTML = '';
    polygonSection.style.display = 'none';
    cashSection.style.display = 'none';

    const amount = getFinalAmount();
    if (paymentType.value === 'paypal' && amount) renderPayPalButton(amount);
    if (paymentType.value === 'polygon') polygonSection.style.display = 'block';
    if (paymentType.value === 'cash') cashSection.style.display = 'block';
});

// -------- PayPal Button ----------
function renderPayPalButton(amount) {
    if (!amount) return;
    paypalContainer.innerHTML = '';
    paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' },
        createOrder: (data, actions) => actions.order.create({
            purchase_units: [{ amount: { value: amount.toFixed(2) } }]
        }),
        onApprove: (data, actions) => actions.order.capture().then(details => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
        }),
        onError: (err) => {
            console.error(err);
            alert('PayPal transaction failed.');
        }
    }).render('#paypal-button-container');
}

// -------- Form Submission ----------
form.addEventListener('submit', async e => {
    e.preventDefault();
    const finalAmount = getFinalAmount();
    if (!finalAmount) return;

    const payment = paymentType.value;
    if (payment === 'cash' && cashCodeInput.value.trim() !== MASTER_CASH_CODE) {
        return alert('Invalid cash code.');
    }
    if (payment === 'polygon' && !polygonHashInput.value.trim()) {
        return alert('Enter Polygon transaction hash.');
    }
    if (payment === 'paypal') return renderPayPalButton(finalAmount);

    const businessData = Object.fromEntries(new FormData(form).entries());
    businessData.paymentType = payment;

    try {
        const response = await fetch('https://api.braxendevelopment.work/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(businessData)
        });
        if (!response.ok) throw new Error('Network error');
        alert(`Form submitted successfully for ${payment.toUpperCase()}.\nAmount: $${finalAmount.toFixed(2)}`);
    } catch (err) {
        console.error(err);
        alert('Error submitting data. Try again.');
    }
});
