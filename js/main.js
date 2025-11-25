// Thailand Travel Guide - Main JavaScript
// Entry point and initialization

/**
 * Initialize all features when DOM is ready
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🇹🇭 Thailand Travel Guide - Initializing...');

    try {
        // Load data first
        await loadData();

        // Initialize common UI features
        initScrollReveal();
        initSmoothScrolling();
        initMobileMenu();
        initCountdown();

        // Initialize page-specific features
        await initDestinationsPage();
        initCulturePage();
        initGuidePage();

        console.log('✅ Thailand Travel Guide loaded successfully!');
    } catch (error) {
        console.error('❌ Error initializing application:', error);
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
 * Service Worker registration (for future PWA support)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

/**
 * Global unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
