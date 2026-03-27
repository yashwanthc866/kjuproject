document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    const formResponse = document.getElementById('formResponse');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Capture Form Data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic Client-Side Validation
        if (!name || !email || !message) {
            showMessage('Please fill out all fields.', 'error');
            return;
        }

        // Set Loading State
        setLoading(true);

        try {
            // 2. Send POST Request securely via Fetch API
            const response = await fetch('http://localhost:5000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            // 3. Parse JSON Response
            const data = await response.json();

            // 4. Handle UI based on success/error
            if (response.ok) {
                showMessage(data.message, 'success');
                contactForm.reset(); // Clear form on success
            } else {
                showMessage(data.message || 'Error sending message.', 'error');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            showMessage('Network error. Is the backend server running?', 'error');
        } finally {
            // Revert Loading State
            setLoading(false);
        }
    });

    /**
     * Toggles button loading animation
     */
    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            loader.classList.remove('hidden');
        } else {
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    }

    /**
     * Shows customized success or error message
     */
    function showMessage(msg, type) {
        formResponse.textContent = msg;
        formResponse.className = `response-message show ${type}`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formResponse.classList.remove('show');
        }, 5000);
    }
});
