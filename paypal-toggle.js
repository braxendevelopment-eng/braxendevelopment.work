window.paypalToggle = function() {
  const tierSelect = document.getElementById('tier-select');
  const paypalContainer = document.getElementById('paypal-button-container');

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
        purchase_units: [{
          amount: { value: amount.toFixed(2) }
        }]
      });
    },
    onApprove: async (data, actions) => {
      const order = await actions.order.capture();
      alert(`Payment completed: $${amount.toFixed(2)} via PayPal.`);

      // Optionally auto-store the order data
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

      // Auto-submit to your worker for record keeping only
      try {
        const response = await fetch("https://api.braxendevelopment.work", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Worker failed");

        alert(`Receipt rec
