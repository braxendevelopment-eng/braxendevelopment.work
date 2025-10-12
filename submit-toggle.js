// submit-toggle.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quarterclub-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const paymentTypeSelect = document.getElementById('payment-type');

    function toggleSubmitButton() {
        // Show submit only for Cash or Polygon
        if (paymentTypeSelect.value === 'paypal') {
            submitButton.style.display = 'none';
        } else {
            submitButton.style.display = 'inline-block';
        }
    }

    // Initial toggle
    toggleSubmitButton();

    // Re-toggle whenever payment type changes
    paymentTypeSelect.addEventListener('change', toggleSubmitButton);
});
