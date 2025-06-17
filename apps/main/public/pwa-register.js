// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          // Track the state of the installing worker
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update notification
              showUpdateNotification();
            }
          });
        });
      })
      .catch((error) => {
        console.error('ServiceWorker registration failed:', error);
      });
    
    // Handle service worker updates
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  });
}

// Function to show update notification
function showUpdateNotification() {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'pwa-update-notification';
  notification.innerHTML = `
    <div class="pwa-update-notification__content">
      <p>A new version is available!</p>
      <button id="pwa-update-button">Update Now</button>
    </div>
  `;
  
  // Add styles
  const styles = document.createElement('style');
  styles.textContent = `
    .pwa-update-notification {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #0070f3;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      display: flex;
      align-items: center;
      animation: slide-up 0.3s ease;
    }
    
    .pwa-update-notification__content {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .pwa-update-notification p {
      margin: 0;
    }
    
    #pwa-update-button {
      background-color: white;
      color: #0070f3;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    
    @keyframes slide-up {
      from {
        opacity: 0;
        transform: translate(-50%, 20px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }
    
    @media (prefers-color-scheme: dark) {
      .pwa-update-notification {
        background-color: #3291ff;
      }
      
      #pwa-update-button {
        color: #3291ff;
      }
    }
  `;
  
  // Add to document
  document.head.appendChild(styles);
  document.body.appendChild(notification);
  
  // Add update button event listener
  document.getElementById('pwa-update-button').addEventListener('click', () => {
    // Skip waiting on the service worker
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    });
    
    // Remove notification
    notification.remove();
  });
}

// Handle beforeinstallprompt event
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default browser install prompt
  e.preventDefault();
  
  // Save the event for later
  deferredPrompt = e;
  
  // Show install button if it exists
  const installButton = document.getElementById('pwa-install-button');
  if (installButton) {
    installButton.style.display = 'block';
    
    // Add click handler
    installButton.addEventListener('click', () => {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        
        // Clear the saved prompt
        deferredPrompt = null;
        
        // Hide the button
        installButton.style.display = 'none';
      });
    });
  }
});

// Handle appinstalled event
window.addEventListener('appinstalled', () => {
  // Log the installation
  console.log('PWA was installed');
  
  // Hide install button
  const installButton = document.getElementById('pwa-install-button');
  if (installButton) {
    installButton.style.display = 'none';
  }
  
  // Clear the saved prompt
  deferredPrompt = null;
}); 