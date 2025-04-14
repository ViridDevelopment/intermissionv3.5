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

// tweaking area
document.addEventListener('DOMContentLoaded', function() {
    var customizationModal = document.getElementById("customizationMenuModal");
    var customizationButton = document.getElementById("customizationMenuButton");
    var closeSpan = customizationModal.getElementsByClassName("close")[0];

    customizationButton.onclick = function() {
        customizationModal.style.display = "block";
        document.body.classList.add('modal-open'); // Add blur effect
    }

    closeSpan.onclick = function() {
        customizationModal.style.display = "none";
        document.body.classList.remove('modal-open'); // Remove blur effect
    }

    window.onclick = function(event) {
        if (event.target == customizationModal) {
            customizationModal.style.display = "none";
            document.body.classList.remove('modal-open'); // Remove blur effect
        }
    }

    // Add event listener for form submission
    const form = document.querySelector('.custom-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        sendRequestToBackend('submitForm'); // Call the function with an action
    });
});

// Function to update the file name display and show modifications section
function updateFileName() {
    const fileInput = document.getElementById('ipa_file');
    const fileNameDisplay = document.getElementById('file_name_display');
    const modificationsSection = document.getElementById('modificationsSection');
    const submitButtonContainer = document.getElementById('submitButtonContainer');

    if (fileInput.files.length > 0) {
        fileNameDisplay.value = fileInput.files[0].name;
        modificationsSection.style.display = 'block'; // Show modifications section
        submitButtonContainer.style.display = 'block'; // Show submit button
    } else {
        fileNameDisplay.value = 'No file chosen';
        modificationsSection.style.display = 'none'; // Hide modifications section
        submitButtonContainer.style.display = 'none'; // Hide submit button
    }
}

// Function to update the icon file name display
function updateIconFileName() {
    const iconFileInput = document.getElementById('cyan_icon');
    const iconFileNameDisplay = document.getElementById('icon_file_name_display');
    iconFileNameDisplay.value = iconFileInput.files.length > 0 ? iconFileInput.files[0].name : 'No file chosen';
}

// Function to send requests to the backend
function sendRequestToBackend(action) {
    // Collecting data from the form
    const ipaFileInput = document.getElementById('ipa_file');
    const iconFileInput = document.getElementById('cyan_icon');
    const appName = document.getElementById('cyan_name').value;
    const version = document.getElementById('cyan_version').value;
    const bundleId = document.getElementById('cyan_bundle_id').value;
    const minimumOS = document.getElementById('cyan_minimum').value;
    const compressLevel = document.getElementById('cyan_compress_level').value;
    const overwrite = document.getElementById('overwriteCheckbox').checked;

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('action', action);
    formData.append('appName', appName);
    formData.append('version', version);
    formData.append('bundleId', bundleId);
    formData.append('minimumOS', minimumOS);
    formData.append('compressLevel', compressLevel);
    formData.append('overwrite', overwrite);

    // Append files if they exist
    if (ipaFileInput.files.length > 0) {
        formData.append('ipaFile', ipaFileInput.files[0]);
    }
    if (iconFileInput.files.length > 0) {
        formData.append('iconFile', iconFileInput.files[0]);
    }

    // Send the form data to the backend
    fetch('https://api.aurorasigner.xyz/modify', { // Replace with your backend URL
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        // Update the result div with the modified file information
        const resultDiv = document.getElementById('resultDiv');
        const resultContent = document.getElementById('resultContent');
        resultContent.textContent = JSON.stringify(result, null, 2); // Format the result as JSON
        resultDiv.style.display = 'block'; // Show the result div
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Accordion for Cyan Tweaks
const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        const arrow = this.querySelector(".arrow");
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            // Send request to get modified file when accordion is opened
            const action = 'getModifiedFile'; // Define the action for fetching the modified file
            sendRequestToBackend(action); // Call the function to send the request
        }
    });
}

function logCyanRequests(request) {
    console.log("Cyan request received:", request);
}

// Example of intercepting fetch requests
const originalFetch = window.fetch;
window.fetch = function(...args) {
    if (args[0].includes('cyan')) { // Check if the request URL contains 'cyan'
        logCyanRequests(args[0]);
    }
    return originalFetch.apply(this, args);
};