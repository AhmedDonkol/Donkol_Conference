// Enhanced interactivity: Real-time countdown
document.addEventListener('DOMContentLoaded', function() {
    const countdownDisplay = document.querySelector('#countdown');
    if (!countdownDisplay) {
        console.log('Countdown display element not found!');
        return;
    }

    const conferenceDate = new Date('2024-06-22T09:00:00'); // Conference start date
    function updateCountdown() {
        const now = new Date();
        const duration = conferenceDate - now;
        const days = Math.floor(duration / (1000 * 60 * 60 * 24));
        countdownDisplay.textContent = `${days} days until the conference starts!`;
        setTimeout(updateCountdown, 86400000); // Update every day
    }

    updateCountdown();
});


document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mainNav = document.querySelector('nav');
    mobileMenuButton.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.textContent = mainNav.classList.contains('active') ? '✕ Close' : '☰ Menu';
    });

    // Placeholder for paper submission form behavior
    const submitButton = document.querySelector('.btn');
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        // Actual form submission logic to be implemented here
        alert('Redirect to paper submission form.');
    });

    // Dynamic content loading for sessions
    // Assuming the existence of elements to load dynamically (not in the provided HTML)
    const sessionLinks = document.querySelectorAll('.session-link');
    sessionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Fetch session data and display it dynamically
            const sessionId = this.getAttribute('data-session-id');
            fetchSessionData(sessionId);
        });
    });

    // Function to fetch and display session data dynamically
    function fetchSessionData(sessionId) {
        // Placeholder URL - adjust to your API or data source
        fetch(`https://api.yourconference.com/sessions/${sessionId}`)
            .then(response => response.json())
            .then(data => {
                displaySessionData(data);
            })
            .catch(error => {
                console.error('Error loading session data:', error);
            });
    }

    // Function to display session data
    function displaySessionData(data) {
        const sessionContainer = document.querySelector('#session-info');
        sessionContainer.innerHTML = `<h2>${data.title}</h2><p>${data.description}</p>`;
        // Additional dynamic content can be added here
    }

    // Add any additional JavaScript functionality as needed
});

// Helper function to add interactive polls or Q&A
function addInteractiveFeatures() {
    // Implement features such as live polls, Q&A sessions, or other real-time interactivities
    // This function can be expanded based on specific requirements and integration points
}

// This function could be called when needed or triggered by specific actions on the page
addInteractiveFeatures();
