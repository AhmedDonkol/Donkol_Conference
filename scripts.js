document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
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
        setTimeout(updateCountdown, 1000);
    }
    updateCountdown();

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.getBoundingClientRect().top;
                const headerHeight = document.querySelector('header').offsetHeight;
                const buffer = 20; // Adjust this value as needed
                const targetPosition = offsetTop + window.scrollY - headerHeight - buffer; // Adjusted position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mainNav = document.querySelector('#main-navigation');
    // Set initial aria-expanded to false and text to ☰ Menu
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    mobileMenuButton.textContent = '☰ Menu';

    mobileMenuButton.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('is-active'); // Change class here to match CSS
        this.textContent = mainNav.classList.contains('is-active') ? '✕ Close' : '☰ Menu';
    });

    // Dynamic Content Loading for Sessions
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
