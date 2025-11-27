// Thailand Travel Guide - Main JavaScript
// Entry point and initialization

/**
 * Initialize all features when DOM is ready
 */
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🇹🇭 Thailand Travel Guide - Initializing...');

    try {
        // Initialize theme first (before rendering)
        initTheme();

        // Load data
        await loadData();

        // Initialize i18n and language switcher
        initLanguageSwitcher();
        updateTranslations();

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
