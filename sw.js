// sw.js - Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Listen for messages from the main page
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'FETCH_TARGET') {
        const targetUrl = event.data.url;
        
        // Create payload for the challenge server
        const formData = new FormData();
        formData.append('url', 'http://coderzonora.github.io'); // Replace with your GitHub.io URL
        
        // Make request to the target
        fetch(targetUrl, {
            method: 'POST',
            body: formData,
            // Ensure no CORS issues with mode
            mode: 'no-cors'
        })
        .then(response => response.text())
        .then(data => {
            // Send response back to the page
            event.ports[0].postMessage(data);
        })
        .catch(error => {
            event.ports[0].postMessage('Error: ' + error.message);
        });
    }
});

// Intercept and handle network requests
self.addEventListener('fetch', (event) => {
    // Let the browser handle all requests normally
    event.respondWith(fetch(event.request));
});
