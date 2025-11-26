// Service Worker for Thailand Travel Guide
// Provides offline support and caching

const CACHE_NAME = 'thailand-guide-v1.0';
const CACHE_VERSION = '1.0.0';

// Files to cache for offline use
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/destinations.html',
    '/culture.html',
    '/guide.html',
    '/province-detail.html',
    '/place-detail.html',
    '/css/styles.css',
    '/js/main.js',
    '/js/ui-utils.js',
    '/js/data-loader.js',
    '/js/province-detail.js',
    '/js/place-detail.js',
    '/js/provinces.js',
    '/js/destinations.js',
    '/js/culture.js',
    '/js/guide.js',
    '/data/provinces.json',
    '/data/places.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...', CACHE_VERSION);

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Installation complete');
                return self.skipWaiting(); // Activate immediately
            })
            .catch((error) => {
                console.error('[SW] Installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...', CACHE_VERSION);

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Activation complete');
                return self.clients.claim(); // Take control immediately
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip external resources (CDN, APIs)
    if (!url.origin.includes(self.location.origin)) {
        return;
    }

    // Network First strategy for API data
    if (url.pathname.includes('/data/')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clone response and cache it
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if network fails
                    return caches.match(request);
                })
        );
        return;
    }

    // Cache First strategy for static assets
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version
                    return cachedResponse;
                }

                // Fetch from network
                return fetch(request)
                    .then((response) => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone and cache the response
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone);
                        });

                        return response;
                    })
                    .catch((error) => {
                        console.error('[SW] Fetch failed:', error);

                        // Return offline page for navigation requests
                        if (request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_VERSION });
    }
});

// Background sync for newsletter subscriptions (future enhancement)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-newsletter') {
        event.waitUntil(syncNewsletterSubscriptions());
    }
});

async function syncNewsletterSubscriptions() {
    try {
        // Get pending subscriptions from IndexedDB (future implementation)
        console.log('[SW] Syncing newsletter subscriptions...');
        // TODO: Implement actual API call
    } catch (error) {
        console.error('[SW] Sync failed:', error);
    }
}
