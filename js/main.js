// Thailand Travel Guide - Main JavaScript
// Entry point and initialization

/**
 * Initialize all features when DOM is ready
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🇹🇭 Thailand Travel Guide - Initializing...');

    // Setup global error handlers first
    if (typeof setupGlobalErrorHandlers === 'function') {
        setupGlobalErrorHandlers();
    }

    try {
        // Load data with error boundary
        const loadDataSafe = typeof withErrorBoundary === 'function'
            ? withErrorBoundary(loadData, {
                retryCount: 3,
                retryDelay: 1000,
                context: 'Data Loading',
                onError: (error, attempt) => {
                    console.warn(`Data load attempt ${attempt} failed:`, error);
                }
            })
            : loadData;

        await loadDataSafe();

        // Initialize common UI features with error handling
        safeInit(initScrollReveal, 'Scroll Reveal');
        safeInit(initSmoothScrolling, 'Smooth Scrolling');
        safeInit(initMobileMenu, 'Mobile Menu');
        safeInit(initCountdown, 'Countdown Timer');
        safeInit(initNewsletterForm, 'Newsletter Form');

        // Initialize page-specific features
        if (typeof initDestinationsPage === 'function') {
            await safeInitAsync(initDestinationsPage, 'Destinations Page');
        }
        if (typeof initCulturePage === 'function') {
            safeInit(initCulturePage, 'Culture Page');
        }
        if (typeof initGuidePage === 'function') {
            safeInit(initGuidePage, 'Guide Page');
        }
        if (typeof initPlaceDetailPage === 'function') {
            await safeInitAsync(initPlaceDetailPage, 'Place Detail Page');
        }
        if (typeof initProvinceDetailPage === 'function') {
            await safeInitAsync(initProvinceDetailPage, 'Province Detail Page');
        }

        console.log('✅ Thailand Travel Guide loaded successfully!');
    } catch (error) {
        console.error('❌ Error initializing application:', error);

        if (typeof handleError === 'function') {
            handleError(error, {
                type: 'initialization',
                context: { page: window.location.pathname }
            });
        } else {
            showNotification('⚠️ Some features may not work properly. Please refresh the page.', 'error');
        }
    }
});

/**
 * Safe initialization wrapper for sync functions
 * @param {Function} fn - Function to initialize
 * @param {string} name - Feature name
 */
function safeInit(fn, name) {
    try {
        if (typeof fn === 'function') {
            fn();
        }
    } catch (error) {
        console.error(`Failed to initialize ${name}:`, error);
        if (typeof logError === 'function') {
            logError(error, { feature: name, type: 'init' });
        }
    }
}

/**
 * Safe initialization wrapper for async functions
 * @param {Function} fn - Async function to initialize
 * @param {string} name - Feature name
 */
async function safeInitAsync(fn, name) {
    try {
        if (typeof fn === 'function') {
            await fn();
        }
    } catch (error) {
        console.error(`Failed to initialize ${name}:`, error);
        if (typeof logError === 'function') {
            logError(error, { feature: name, type: 'init_async' });
        }
    }
}

/**
 * Handle window resize events
 */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('Window resized');
        // Add any resize handlers here
    }, 250);
});

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

/**
 * Service Worker registration (PWA support)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered:', registration.scope);

                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New update available
                            showNotification('🎉 New version available! Refresh to update.', 'info');
                        }
                    });
                });
            })
            .catch(err => {
                console.warn('⚠️ Service Worker registration failed:', err);
            });
    });
}

// Global error handlers are now set up in error-handler.js via setupGlobalErrorHandlers()
// This ensures consistent error handling across the application
