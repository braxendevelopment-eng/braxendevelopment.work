document.addEventListener('DOMContentLoaded', () => {
    const tierSelect = document.getElementById('tier-select');
    const billingCycle = document.getElementById('billing-cycle');
    const paymentType = document.getElementById('payment-type');

    // Containers and inputs
    const paypalContainer = document.getElementById('paypal-button-container');
    const paypalIdInput = document.getElementById('paypal-id');

    const polygonSection = document.getElementById('polygon-section');
    const polygonWallet = document.getElementById('polygon-wallet');
    const polygonHashInput = document.getElementById('polygon-hash');
    const copyPolygonBtn = document.getElementById('copy-polygon');
    const submitPolygonBtn = document.getElementById('submit-polygon');

    const cashSection = document.getElementById('cash-section');
    const cashCodeInput = document.getElementById('cash-code');
    const submitCashBtn = document.getElementById('submit-cash');
    const MASTER_CASH_CODE = "#00043000#";

    const submitPayBtn = document.querySelector('#quarterclub-form button[type="submit"]');

    const planIds = {
        '0.25': 'P-PLANID1',
        '1': 'P-PLANID1B',
        '2': 'P-PLANID2',
        '5': 'P-PLANID3',
        '10': 'P-PLANID4',
        '20': 'P-PLANID5',
        '50': 'P-PLANID6',
        '100': 'P-PLANID7'
    };

    // ----------------- Toggle Payment Sections -----------------
    function togglePaymentSections() {
        paypalContainer.style.display = 'none';
        polygonSection.style.display = 'none';
        cashSection.style.display = 'none';
        submitPayBtn.style.display = 'none';

        if(paymentType.value === 'paypal') {
            paypalContainer.style.display = 'block';
            renderPayPalButton();
            submitPayBtn.style.display = 'inline-block';
        } else if(paymentType.value === 'polygon') {
            polygonSection.style.display = 'block';
            updatePolygonGasFee();
            submitPayBtn.style.display = 'inline-block';
        } else if(paymentType.value === 'cash') {
            cashSection.style.display = 'block';
            submitPayBtn.style.display = 'inline-block';
        }
    }

    paymentType.addEventListener('change', togglePaymentSections);

    // ----------------- PayPal Button -----------------
    function renderPayPalButton() {
        paypalContainer.innerHTML = '';

        if(tierSelect.value.includes('_pdf')) {
            paypal.Buttons({
                createOrder: (data, actions) => actions.order.create({
                    purchase_units: [{ amount: { value: '10.00' } }]
                }),
                onApprove: (data, actions) => actions.order.capture().then(() => {
                    alert(`One-time purchase completed: ${tierSelect.options[tierSelect.selectedIndex].text}`);
                    document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
                }),
                onError: (err) => {
                    console.error(err);
                    alert('PayPal error.');
                }
            }).render('#paypal-button-container');
            return;
        }

        const selectedPlanId = planIds[tierSelect.value];
        if(!selectedPlanId) return;

        paypal.Buttons({
            createSubscription: (data, actions) => actions.subscription.create({ plan_id: selectedPlanId }),
            onApprove: (data) => {
                paypalIdInput.value = data.subscriptionID;
                alert(`Subscription completed: ${tierSelect.options[tierSelect.selectedIndex].text}`);
                document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
            },
            onError: (err) => {
                console.error(err);
                alert('PayPal subscription error.');
            }
        }).render('#paypal-button-container');
    }

    tierSelect.addEventListener('change', togglePaymentSections);
    billingCycle.addEventListener('change', togglePaymentSections);

    // ----------------- Polygon Section -----------------
    function updatePolygonGasFee() {
        const gasFeeEl = document.getElementById('polygon-gas-fee');
        fetch('https://gasstation.polygon.technology/v2')
            .then(res => res.json())
            .then(gasData => fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd')
                .then(res => res.json())
                .then(priceData => {
                    const fastGasGwei = gasData.fast.maxFee;
                    const maticUsd = priceData['matic-network'].usd;
                    const gasMatic = fastGasGwei / 1e9;
                    const gasUsd = gasMatic * maticUsd;
                    gasFeeEl.textContent = `Estimated Gas Fee: ${gasMatic.toFixed(6)} MATIC (~$${gasUsd.toFixed(2)} USD)`;
                })
            )).catch(() => gasFeeEl.textContent = "Estimated Gas Fee: Unavailable");
    }

    copyPolygonBtn.addEventListener('click', () => {
        polygonWallet.select();
        document.execCommand('copy');
        alert('Polygon address copied!');
    });

    submitPolygonBtn.addEventListener('click', async () => {
        if(!polygonHashInput.value.trim()) return alert('Enter transaction hash.');
        document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
    });

    // ----------------- Cash Section -----------------
    submitCashBtn.addEventListener('click', async () => {
        if(cashCodeInput.value.trim() !== MASTER_CASH_CODE) return alert('Invalid cash code.');
        document.getElementById('quarterclub-form').dispatchEvent(new Event('submit'));
    });

    // ----------------- Initialize -----------------
    // Make PayPal the default payment on load
    paymentType.value = 'paypal';
    togglePaymentSections();
});
