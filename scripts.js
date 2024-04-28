document.addEventListener('DOMContentLoaded', function() {
    // Implement the Countdown Timer with smoother animation and responsiveness
    const countdownDisplay = document.querySelector('#countdown');
    const conferenceDate = new Date('2024-06-22T09:00:00');

    function updateCountdown() {
        const now = new Date();
        const duration = conferenceDate - now;

        const days = Math.floor(duration / (1000 * 60 * 60 * 24));
        const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((duration % (1000 * 60)) / 1000);

        countdownDisplay.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until the conference starts!`;
        countdownDisplay.classList.remove('pulse-animation');
        setTimeout(() => {
            countdownDisplay.classList.add('pulse-animation');
        }, 100); // Add class back after timeout for continuous effect
        setTimeout(updateCountdown, 1000); // Update every second
    }

    updateCountdown();

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Mobile Menu Toggle with improved functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mainNav = document.querySelector('nav');
    mobileMenuButton.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.textContent = mainNav.classList.contains('active') ? '✕ Close' : '☰ Menu';
    });

    // Enhance Form Submission with Validation and responsive feedback
    const submitButton = document.querySelector('.btn');
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        const form = document.querySelector('form'); // Assuming a form exists
        if (form.checkValidity()) {
            form.submit();
            alert('Thank you for your submission!'); // Providing user feedback
        } else {
            alert('Please complete all required fields before submitting.');
        }
    });

    // Dynamic Content Loading for Sessions with better error handling
    document.querySelectorAll('.session-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sessionId = this.getAttribute('data-session-id');
            fetchSessionData(sessionId);
        });
    });

    function fetchSessionData(sessionId) {
        fetch(`https://api.yourconference.com/sessions/${sessionId}`)
            .then(response => response.json())
            .then(data => {
                displaySessionData(data);
            })
            .catch(error => {
                console.error('Error loading session data:', error);
                alert('Failed to load session data. Please try again later.');
            });
    }

    function displaySessionData(data) {
        const sessionContainer = document.querySelector('#session-info');
        sessionContainer.innerHTML = `<h2>${data.title}</h2><p>${data.description}</p>`;
        sessionContainer.classList.add('fade-in-animation');
    }
});

// Additional Interactive Features
function addInteractiveFeatures() {
    const features = ['Live Polls', 'Q&A', 'Interactive Maps'];
    features.forEach(feature => {
        console.log(`Feature available: ${feature}`);
    });
}
