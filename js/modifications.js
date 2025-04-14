
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


applyTheme();

document.getElementById('mode-toggle').addEventListener('click', function(e) {
    document.body.classList.toggle('dark-mode');
    
 
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }

    const sunIcon = this.querySelector('.fa-sun');
    const moonIcon = this.querySelector('.fa-moon');
    sunIcon.style.display = document.body.classList.contains('dark-mode') ? 'none' : 'inline';
    moonIcon.style.display = document.body.classList.contains('dark-mode') ? 'inline' : 'none';
    
   
    this.classList.add('spin');
    
  
    setTimeout(() => {
        this.classList.remove('spin');
    }, 500); 

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
        document.body.classList.add('modal-open'); 
    }

    closeSpan.onclick = function() {
        customizationModal.style.display = "none";
        document.body.classList.remove('modal-open'); 
    }

    window.onclick = function(event) {
        if (event.target == customizationModal) {
            customizationModal.style.display = "none";
            document.body.classList.remove('modal-open'); 
        }
    }

    
    const form = document.querySelector('.custom-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        sendRequestToBackend('submitForm'); 
    });
});


function updateFileName() {
    const fileInput = document.getElementById('ipa_file');
    const fileNameDisplay = document.getElementById('file_name_display');
    const modificationsSection = document.getElementById('modificationsSection');
    const submitButtonContainer = document.getElementById('submitButtonContainer');

    if (fileInput.files.length > 0) {
        fileNameDisplay.value = fileInput.files[0].name;
        modificationsSection.style.display = 'block'; 
        submitButtonContainer.style.display = 'block'; 
    } else {
        fileNameDisplay.value = 'No file chosen';
        modificationsSection.style.display = 'none'; 
        submitButtonContainer.style.display = 'none'; 
    }
}


function updateIconFileName() {
    const iconFileInput = document.getElementById('cyan_icon');
    const iconFileNameDisplay = document.getElementById('icon_file_name_display');
    iconFileNameDisplay.value = iconFileInput.files.length > 0 ? iconFileInput.files[0].name : 'No file chosen';
}

function sendRequestToBackend(action) {
    const ipaFileInput = document.getElementById('ipa_file');
    const iconFileInput = document.getElementById('cyan_icon');
    const appName = document.getElementById('cyan_name').value;
    const version = document.getElementById('cyan_version').value;
    const bundleId = document.getElementById('cyan_bundle_id').value;
    const minimumOS = document.getElementById('cyan_minimum').value;
    const compressLevel = document.getElementById('cyan_compress_level').value;
    const overwrite = document.getElementById('overwriteCheckbox').checked;

    const formData = new FormData();
    formData.append('action', action);
    formData.append('appName', appName);
    formData.append('version', version);
    formData.append('bundleId', bundleId);
    formData.append('minimumOS', minimumOS);
    formData.append('compressLevel', compressLevel);
    formData.append('overwrite', overwrite);

    if (ipaFileInput.files.length > 0) {
        formData.append('ipaFile', ipaFileInput.files[0]);
    }
    if (iconFileInput.files.length > 0) {
        formData.append('iconFile', iconFileInput.files[0]);
    }

    fetch('https://api.aurorasigner.xyz/modify', { 
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        const resultDiv = document.getElementById('resultDiv');
        const resultContent = document.getElementById('resultContent');
        resultContent.textContent = JSON.stringify(result, null, 2); 
        resultDiv.style.display = 'block'; // Show the result div
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


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
       
            const action = 'getModifiedFile'; 
            sendRequestToBackend(action); 
        }
    });
}

function logCyanRequests(request) {
    console.log("Cyan request received:", request);
}


const originalFetch = window.fetch;
window.fetch = function(...args) {
    if (args[0].includes('cyan')) {
        logCyanRequests(args[0]);
    }
    return originalFetch.apply(this, args);
};
