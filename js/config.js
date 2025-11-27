// Application Configuration
const CONFIG = {
    // API Configuration
    API_BASE_URL: 'https://api.thailand-travel-guide.com/v1', // Placeholder
    ENDPOINTS: {
        NEWSLETTER: '/newsletter/subscribe',
        CONTACT: '/contact/submit',
        WEATHER: '/weather'
    },

    // Analytics & Monitoring
    ANALYTICS: {
        GA_ID: 'G-1QNPEXBSDS',
        SENTRY_DSN: 'https://examplePublicKey@o0.ingest.sentry.io/0'
    },

    // Feature Flags
    FEATURES: {
        ENABLE_NEWSLETTER: true,
        ENABLE_DARK_MODE: true,
        ENABLE_PWA: false
    },

    // External Services
    RECAPTCHA_SITE_KEY: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // Test Key
};
