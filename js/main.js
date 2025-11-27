// Thailand Travel Guide - Main JavaScript
// Entry point and initialization

/**
 * Initialize all features when DOM is ready
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load data first
        await loadData();

        // Initialize common UI features
        initScrollReveal();
        initSmoothScrolling();
        initMobileMenu();
        initCountdown();
        initNewsletterForm();

        // Initialize page-specific features
        await initDestinationsPage();
        initCulturePage();
        initGuidePage();
    } catch (error) {
        showNotification('⚠️ Some features may not work properly. Please refresh the page.', 'error');
    }
});

/**
 * Handle window resize events
 */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Add any resize handlers here
    }, 250);
});

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    // Handle page visibility changes
});

/**
 * Service Worker registration (PWA support)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
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
            .catch(() => {
                // Service Worker registration failed
            });
    });
}

/**
 * Global error handler
 */
window.addEventListener('error', () => {
    // Handle global errors
});

/**
 * Global unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', () => {
    // Handle unhandled promise rejections
});
