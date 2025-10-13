// submission.js
window.handleSubmit = async function() {
    const form = document.getElementById('quarterclub-form');

    // Gather all form data
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
        const response = await fetch('https://quarterclub-worker.braxendevelopment.workers.dev/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

        if (!response.ok) throw new Error("Failed to submit form");

        alert("Submission sent successfully!");
        form.reset(); // optional: reset the form after successful submission
    } catch (err) {
        console.error(err);
        alert("Error submitting form: " + err.message);
    }
};
