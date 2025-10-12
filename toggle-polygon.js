document.addEventListener('DOMContentLoaded', () => {
    const paymentTypeSelect = document.getElementById('payment-type');
    const polygonSection = document.getElementById('polygon-section');
    const polygonWallet = document.getElementById('polygon-wallet');
    const copyPolygonBtn = document.getElementById('copy-polygon');

    function togglePolygon() {
        polygonSection.style.display = (paymentTypeSelect.value === 'polygon') ? 'block' : 'none';
    }

    // Copy wallet button
    copyPolygonBtn.addEventListener('click', () => {
        polygonWallet.select();
        document.execCommand('copy');
        alert('Polygon address copied!');
    });

    // Initialize
    togglePolygon();

    // Update on change
    paymentTypeSelect.addEventListener('change', togglePolygon);
});
