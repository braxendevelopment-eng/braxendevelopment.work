document.addEventListener('DOMContentLoaded', () => {
    const paymentType = document.getElementById('payment-type');
    const form = document.getElementById('quarterclub-form');

    // Create a submit button if it doesn't exist
    let submitButton = document.getElementById('quarterclub-submit');
    if (!submitButton) {
        submitButton = document.createElement('button');
        submitButton.type = 'button';
        submitButton.id = 'quarterclub-submit';
        submitButton.textContent = 'Submit';
        submitButton.style.marginTop = '10px';
        submitButton.onclick = window.handleSubmit;
        form.appendChild(submitButton);
    }

    function toggleSubmit() {
        submitButton.style.display = paymentType.value ? 'block' : 'none';
    }

    // Run once on load
    toggleSubmit();

    // Listen for payment type changes
    paymentType.addEventListener('change', toggleSubmit);
});
