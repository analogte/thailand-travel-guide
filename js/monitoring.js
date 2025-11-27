/**
 * Analytics & Monitoring Module
 * Handles Google Analytics, Sentry, and Performance Monitoring
 */

// Initialize Sentry (Placeholder)
function initSentry() {
    // Check if Sentry is loaded
    if (typeof Sentry !== 'undefined') {
        const dsn = (typeof CONFIG !== 'undefined') ? CONFIG.ANALYTICS.SENTRY_DSN : "https://examplePublicKey@o0.ingest.sentry.io/0";

        Sentry.init({
            dsn: dsn,
            integrations: [
                new Sentry.BrowserTracing(),
                new Sentry.Replay(),
            ],
            // Performance Monitoring
            tracesSampleRate: 1.0,
            // Session Replay
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1.0,
        });
        console.log('✓ Sentry initialized (Placeholder)');
    } else {
        console.warn('⚠️ Sentry SDK not loaded');
    }
}

// Initialize Google Analytics (Enhanced)
function initAnalytics() {
    if (typeof gtag === 'undefined') return;

    // Track custom events here
    document.addEventListener('click', (e) => {
        // Track CTA clicks
        if (e.target.closest('.cta-button') || e.target.closest('a.bg-yellow-400')) {
            const btn = e.target.closest('a') || e.target;
            gtag('event', 'click', {
                'event_category': 'CTA',
                'event_label': btn.innerText.trim()
            });
        }

        // Track Language Switch
        if (e.target.closest('.lang-btn')) {
            const btn = e.target.closest('.lang-btn');
            gtag('event', 'language_switch', {
                'language': btn.getAttribute('data-lang')
            });
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initSentry();
    initAnalytics();
});
