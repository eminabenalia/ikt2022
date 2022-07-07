self.addEventListener('install', function(event) {
    console.log('service worker --> installing ...', event);
})

self.addEventListener('activate', function(event) {
    console.log('service worker --> activating ...', event);
    return self.clients.claim();
})