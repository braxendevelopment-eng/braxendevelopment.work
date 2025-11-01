window.paypalToggle = function() {
  const tierSelect = document.getElementById('tier-select');
  const paypalContainer = document.getElementById('paypal-button-container');

  let receiptDisplay = document.getElementById('paypal-receipt');
  if (!receiptDisplay) {
    receiptDisplay = document.createElement('p');
    receiptDisplay.id = 'paypal-receipt';
    receiptDisplay.style.marginTop = '10px';
    receiptDisplay.style.fontWeight = 'bold';
    paypalContainer.insertAdjacentElement('afterend', receiptDisplay);
  }

  const amounts = {
    '0.25': 3,
    '1': 12,
    '2': 24,
    '5': 60,
    '10': 120,
    '20': 240,
    '50': 600,
    '100': 1200,
    '10_pdf': 10
  };

  paypalContainer.innerHTML = '';
  const amount = amounts[tierSelect.value];
  if (!amount) return;

  paypal.Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{ amount: { value: amount.toFixed(2) } }]
      });
    },
    onApprove: async (data, actions) => {
      const order = await actions.order.capture();

      receiptDisplay.textContent = `✅ Payment completed: $${amount.toFixed(2)} via PayPal. Recording receipt...`;
      receiptDisplay.style.color = '#1f7a1f';

      const formData = {
        businessName: document.getElementById("business-name").value,
        ein: document.getElementById("business-ein").value,
        email: document.getElementById("business-email").value,
        phone: document.getElementById("business-phone").value,
        address: document.getElementById("business-address").value,
        city: document.getElementById("business-city").value,
        state: document.getElementById("business-state").value,
        zip: document.getElementById("business-zip").value,
        tier: document.getElementById("tier-select").value,
        paymentMethod: "paypal"
      };

      try {
        const response = await fetch("https://api.braxendevelopment.work", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Worker failed");

        // Use the *same* receipt ID returned by the Worker
        receiptDisplay.innerHTML = `✅ Payment recorded successfully.<br>Receipt ID: <strong>${result.receiptID}</strong>`;
        receiptDisplay.style.color = "green";

      } catch (err) {
        receiptDisplay.textContent = `⚠️ Payment succeeded but logging failed: ${err.message}`;
        receiptDisplay.style.color = "darkred";
      }
    },
    onError: (err) => {
      console.error(err);
      receiptDisplay.textContent = "❌ PayPal error occurred. Please try again.";
      receiptDisplay.style.color = "darkred";
    }
  }).render('#paypal-button-container');
};

