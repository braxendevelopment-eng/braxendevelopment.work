document.addEventListener('DOMContentLoaded', () => {
    const paymentType = document.getElementById('payment-type');
    const submitButton = document.createElement('button');

    submitButton.type = 'button'; // will call handleSubmit manually
    submitButton.textContent = 'Submit';
    submitButton.id = 'quarterclub-submit';
    submitButton.style.display = 'none'; // hidden by default
    submitButton.style.marginTop = '10px';

    const form = document.getElementById('quarterclub-form');
    form.appendChild(submitButton);

    // Click handler calls the global handleSubmit defined in handle-submit.js
    submitButton.addEventListener('click', () => {
        if (window.handleSubmit) {
            window.handleSubmit();
        } else {
            console.error('handleSubmit is not defined');
        }
    });

    function updateSubmitButton() {
        switch (paymentType.value) {
            case 'paypal':
                submitButton.style.display = 'block';
                break;
            case 'polygon':
                const polygonHash = document.getElementById('polygon-hash').value.trim();
                submitButton.style.display = polygonHash ? 'block' : 'none';
                break;
            case 'cash':
                const cashCode = document.getElementById('cash-code').value.trim();
                submitButton.style.display = cashCode ? 'block' : 'none';
                break;
            default:
                submitButton.style.display = 'none';
        }
    }

    // Update submit button when payment type changes
    paymentType.addEventListener('change', updateSubmitButton);

    // Update dynamically for Polygon and Cash inputs
    const polygonInput = document.getElementById('polygon-hash');
    const cashInput = document.getElementById('cash-code');

    if (polygonInput) polygonInput.addEventListener('input', updateSubmitButton);
    if (cashInput) cashInput.addEventListener('input', updateSubmitButton);

    // Initial run
    updateSubmitButton();
});
