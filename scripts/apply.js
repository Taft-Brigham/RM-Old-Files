document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('talent-form');
    const formContainer = document.getElementById('form-container');
    const successMessage = document.getElementById('success-message');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page reload

            // 1. Change Button Text to Simulate Loading
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Processing Application...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";

            // 2. Simulate Network Delay (2 seconds)
            setTimeout(() => {
                // 3. Hide Form and Show Success Message
                formContainer.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll to top of message
                successMessage.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
        });
    }
});