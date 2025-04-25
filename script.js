// Change background color when button is clicked
const colorButton = document.getElementById('colorButton');
const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
let currentColorIndex = 0;

colorButton.addEventListener('click', () => {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[currentColorIndex];
});

// Check and display online status
const onlineStatus = document.getElementById('onlineStatus');

function updateOnlineStatus() {
    if (navigator.onLine) {
        onlineStatus.textContent = 'Online';
        onlineStatus.style.color = '#2ecc71';
    } else {
        onlineStatus.textContent = 'Offline';
        onlineStatus.style.color = '#e74c3c';
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

// PWA installation
let deferredPrompt;
const installBanner = document.getElementById('installBanner');
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show the install button
    installBanner.classList.remove('hidden');
});

installButton.addEventListener('click', async () => {
    if (!deferredPrompt) {
        return;
    }
    // Show the installation prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // We no longer need the prompt
    deferredPrompt = null;
    // Hide the install button
    installBanner.classList.add('hidden');
});

// If already installed, hide the install button
window.addEventListener('appinstalled', () => {
    installBanner.classList.add('hidden');
    console.log('PWA was installed');
});