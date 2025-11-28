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
    RECAPTCHA_SITE_KEY: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Test Key

    // UI Configuration
    UI: {
        NOTIFICATION_DURATION: 3000, // milliseconds
        DEBOUNCE_DELAY: 300, // milliseconds
        SCROLL_OFFSET: 80, // pixels
        ANIMATION_DURATION: 500, // milliseconds
        MAX_IMAGE_SIZE: 5242880, // 5MB in bytes
        ITEMS_PER_PAGE: 12
    },

    // Events Configuration
    EVENTS: {
        SONGKRAN: '2026-04-13T00:00:00',
        LOY_KRATHONG: '2025-11-15T00:00:00'
    },

    // Rate Limiting
    RATE_LIMIT: {
        MAX_ATTEMPTS: 3,
        WINDOW_MS: 60000, // 1 minute
        COOLDOWN_MS: 300000 // 5 minutes
    },

    // Default Images
    IMAGES: {
        PLACEHOLDER: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800',
        DEFAULT_PROVINCE: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800',
        DEFAULT_PLACE: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800'
    },

    // Map Configuration
    MAP: {
        DEFAULT_ZOOM: 15,
        DEFAULT_CENTER: { lat: 13.7563, lng: 100.5018 }, // Bangkok
        TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
};
