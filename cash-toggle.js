window.cashToggle = function() {
    const cashSection = document.getElementById('cash-section');
    const cashStatus = document.getElementById('cash-status');
    const submitButton = document.getElementById('cash-submit');

    // Show section and reset text
    cashSection.style.display = 'block';
    cashStatus.textContent = '';

    // Handle Cash submission
    submitButton.onclick = () => {
        const code = document.getElementById('cash-code').value.trim();
        if (!code) {
            alert('Please enter your Cash Code before submitting.');
            return;
        }
        cashStatus.textContent = "Submitting Cash payment...";
        setTimeout(() => {
            cashStatus.textContent = "Cash payment submitted successfully!";
            document.getElementById('quarterclub-form').submit();
        }, 1000);
    };
};
