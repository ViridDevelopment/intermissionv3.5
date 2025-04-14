// Function to apply the theme based on localStorage
function applyTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.fa-sun').style.display = 'none';
        document.querySelector('.fa-moon').style.display = 'inline';
    } else {
        document.body.classList.remove('dark-mode');
        document.querySelector('.fa-sun').style.display = 'inline';
        document.querySelector('.fa-moon').style.display = 'none';
    }
}

// Call the function to apply the theme on page load
applyTheme();

document.getElementById('mode-toggle').addEventListener('click', function(e) {
    document.body.classList.toggle('dark-mode');
    
    // Save the theme preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }

    const sunIcon = this.querySelector('.fa-sun');
    const moonIcon = this.querySelector('.fa-moon');
    sunIcon.style.display = document.body.classList.contains('dark-mode') ? 'none' : 'inline';
    moonIcon.style.display = document.body.classList.contains('dark-mode') ? 'inline' : 'none';
    
    // Add spin class for animation
    this.classList.add('spin');
    
    // Remove spin class after animation duration
    setTimeout(() => {
        this.classList.remove('spin');
    }, 500); // Match this duration with the CSS animation duration

    const ripple = this.querySelector('.ripple');
    ripple.style.width = ripple.style.height = Math.max(window.innerWidth, window.innerHeight) + 'px';
    ripple.style.left = '0';
    ripple.style.top = '0';
    ripple.style.background = document.body.classList.contains('dark-mode') ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';
    ripple.classList.add('ripple-effect');
    setTimeout(() => {
        ripple.classList.remove('ripple-effect');
    }, 600);
});

const hamburger = document.getElementById('hamburger');
const dropdown = document.getElementById('dropdown');

hamburger.addEventListener('click', () => {
    dropdown.classList.toggle('show');
    hamburger.classList.toggle('active');
});

document.addEventListener('click', (event) => {
    if (!hamburger.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
        hamburger.classList.remove('active');
    }
});

const fadeContainers = document.querySelectorAll('.fade-container');
fadeContainers.forEach((container, index) => {
    setTimeout(() => {
        container.classList.add('fade-in');
    }, index * 2000);
});