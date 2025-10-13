document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quarterclub-form');

  function isValidEIN(ein) {
    return /^\d{2}-\d{7}$/.test(ein);
  }

  function validateFormFields() {
    const ein = document.getElementById('business-ein').value.trim();
    if (!isValidEIN(ein)) {
      alert('Please enter a valid EIN in format XX-XXXXXXX.');
      return false;
    }
    // Add other validations if needed
    return true;
  }

  async function handleSubmit() {
    // Run validation first
    if (!validateFormFields()) return;

    const data = {
      businessName: document.getElementById("business-name").value,
      ein: document.getElementById("business-ein").value,
      email: document.getElementById("business-email").value,
      phone: document.getElementById("business-phone").value,
      address: document.getElementById("business-address").value,
      city: document.getElementById("business-city").value,
      state: document.getElementById("business-state").value,
      zip: document.getElementById("business-zip").value,
      tier: document.getElementById("tier-select").value,
      paymentMethod: document.getElementById("payment-type").value
    };

    try {
      await fetch("https://braxen.YOUR_WORKER.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      alert("Submission sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    }
  }

  // Standard form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit();
  });

  // Override PayPal auto-submit
  if (window.paypal) {
    const originalSubmit = form.submit;
    form.submit = () => {
      handleSubmit(); // run the same logic as normal submit
    };
  }
});
