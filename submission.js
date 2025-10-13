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

  // We intercept PayPal auto-submit to validate fields first
  form.addEventListener('submit', (e) => {
    if (!validateFormFields()) {
      e.preventDefault();
    }
  });
});
