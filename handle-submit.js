// handle-submit.js
window.handleSubmit = async function() {
    const form = document.getElementById('quarterclub-form');

    // Gather form data
    const data = {
        businessName: document.getElementById('business-name').value,
        ein: document.getElementById('business-ein').value,
        email: document.getElementById('business-email').value,
        phone: document.getElementById('business-phone').value,
        address: document.getElementById('business-address').value,
        city: document.getElementById('business-city').value,
        state: document.getElementById('business-state').value,
        zip: document.getElementById('business-zip').value,
        tier: document.getElementById('tier-select').value,
        paymentMethod: document.getElementById('payment-type').value
    };

    try {
        const response = await fetch("https://api.braxendevelopment.work", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`Server responded with ${response.status}`);

        const result = await response.json();

        alert(`Submission sent successfully! Receipt ID: ${result.receiptID}`);
        form.reset();

    } catch (err) {
        console.error(err);
        alert("Error submitting form: " + err.message);
    }
};

