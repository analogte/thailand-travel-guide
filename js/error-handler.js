// Error Handler Module
// Comprehensive error handling and recovery system

/**
 * Error Boundary - Wraps async functions with error handling
 * @param {Function} fn - Async function to wrap
 * @param {Object} options - Error handling options
 * @returns {Function} Wrapped function with error handling
 */
function withErrorBoundary(fn, options = {}) {
    const {
        retryCount = 3,
        retryDelay = 1000,
        fallback = null,
        onError = null,
        context = 'Operation'
    } = options;

    return async function (...args) {
        let lastError;

        for (let attempt = 1; attempt <= retryCount; attempt++) {
            try {
                return await fn.apply(this, args);
            } catch (error) {
                lastError = error;
                console.error(`${context} failed (attempt ${attempt}/${retryCount}):`, error);

                // Call custom error handler if provided
                if (onError) {
                    onError(error, attempt);
                }

                // Don't retry on last attempt
                if (attempt < retryCount) {
                    // Exponential backoff
                    const delay = retryDelay * Math.pow(2, attempt - 1);
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    // Last attempt failed
                    if (fallback) {
                        console.warn(`${context} failed after ${retryCount} attempts. Using fallback.`);
                        return typeof fallback === 'function' ? fallback(error) : fallback;
                    }
                }
            }
        }

        // If we get here, all retries failed and no fallback
        throw lastError;
    };
}

/**
 * Safe Execute - Execute function with error boundary
 * @param {Function} fn - Function to execute
 * @param {Object} options - Options
 * @returns {Promise<any>}
 */
async function safeExecute(fn, options = {}) {
    const wrappedFn = withErrorBoundary(fn, options);
    return wrappedFn();
}

/**
 * Error Logger - Log errors with context
 * @param {Error} error - Error object
 * @param {Object} context - Additional context
 */
function logError(error, context = {}) {
    const errorData = {
        message: error.message,
        stack: error.stack,
        name: error.name,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...context
    };

    console.error('Error logged:', errorData);

    // Store in localStorage for debugging (keep last 10 errors)
    try {
        const errors = JSON.parse(localStorage.getItem('error_log') || '[]');
        errors.unshift(errorData);
        localStorage.setItem('error_log', JSON.stringify(errors.slice(0, 10)));
    } catch (e) {
        console.warn('Failed to store error log:', e);
    }

    // Send to analytics if available
    if (typeof gtag === 'function') {
        gtag('event', 'exception', {
            description: error.message,
            fatal: false
        });
    }
}

/**
 * Show Error UI - Display user-friendly error message
 * @param {Object} options - Error display options
 */
function showErrorUI(options = {}) {
    const {
        title = 'Oops! Something went wrong',
        message = 'We encountered an unexpected error. Please try again.',
        canRetry = true,
        canReload = true,
        onRetry = null,
        duration = null // null = manual dismiss
    } = options;

    // Remove existing error UI
    const existing = document.querySelector('.error-boundary-ui');
    if (existing) {
        existing.remove();
    }

    const errorUI = document.createElement('div');
    errorUI.className = 'error-boundary-ui fixed top-20 right-4 max-w-md bg-red-50 border-l-4 border-red-500 rounded-lg shadow-2xl z-50 animate-fade-in';

    const buttonsHTML = [];
    if (canRetry && onRetry) {
        buttonsHTML.push(`
            <button class="error-retry-btn px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                <i class="fas fa-redo mr-2"></i>Try Again
            </button>
        `);
    }
    if (canReload) {
        buttonsHTML.push(`
            <button class="error-reload-btn px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
                <i class="fas fa-sync mr-2"></i>Reload Page
            </button>
        `);
    }

    errorUI.innerHTML = `
        <div class="p-6">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <i class="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
                </div>
                <div class="ml-4 flex-1">
                    <h3 class="text-lg font-bold text-red-800 mb-2">${escapeHtml(title)}</h3>
                    <p class="text-red-700 mb-4">${escapeHtml(message)}</p>
                    <div class="flex gap-2 flex-wrap">
                        ${buttonsHTML.join('')}
                    </div>
                </div>
                <button class="error-close-btn ml-4 text-red-500 hover:text-red-700 transition-colors">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(errorUI);

    // Event listeners
    const closeBtn = errorUI.querySelector('.error-close-btn');
    const retryBtn = errorUI.querySelector('.error-retry-btn');
    const reloadBtn = errorUI.querySelector('.error-reload-btn');

    const removeUI = () => {
        errorUI.style.opacity = '0';
        errorUI.style.transform = 'translateX(100%)';
        errorUI.style.transition = 'all 0.3s ease';
        setTimeout(() => errorUI.remove(), 300);
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', removeUI);
    }

    if (retryBtn && onRetry) {
        retryBtn.addEventListener('click', () => {
            removeUI();
            onRetry();
        });
    }

    if (reloadBtn) {
        reloadBtn.addEventListener('click', () => {
            window.location.reload();
        });
    }

    // Auto-dismiss if duration specified
    if (duration) {
        setTimeout(removeUI, duration);
    }

    return errorUI;
}

/**
 * Network Error Handler
 * @param {Error} error - Network error
 * @param {Function} retryFn - Function to retry
 */
function handleNetworkError(error, retryFn = null) {
    const isOffline = !navigator.onLine;

    showErrorUI({
        title: isOffline ? 'No Internet Connection' : 'Network Error',
        message: isOffline
            ? 'Please check your internet connection and try again.'
            : 'Failed to connect to the server. Please try again.',
        canRetry: !!retryFn,
        canReload: true,
        onRetry: retryFn
    });

    logError(error, { type: 'network', isOffline });
}

/**
 * Data Loading Error Handler
 * @param {Error} error - Data loading error
 * @param {Function} retryFn - Function to retry
 */
function handleDataLoadError(error, retryFn = null) {
    showErrorUI({
        title: 'Failed to Load Data',
        message: 'We couldn\'t load the information you requested. This might be temporary.',
        canRetry: !!retryFn,
        canReload: true,
        onRetry: retryFn
    });

    logError(error, { type: 'data_load' });
}

/**
 * Render Error Handler
 * @param {Error} error - Rendering error
 */
function handleRenderError(error) {
    showErrorUI({
        title: 'Display Error',
        message: 'We encountered an error displaying this content. Please reload the page.',
        canRetry: false,
        canReload: true
    });

    logError(error, { type: 'render' });
}

/**
 * Generic Error Handler
 * @param {Error} error - Any error
 * @param {Object} options - Handler options
 */
function handleError(error, options = {}) {
    const { type = 'generic', retryFn = null, context = {} } = options;

    // Log the error
    logError(error, { type, ...context });

    // Show appropriate UI based on error type
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
        handleNetworkError(error, retryFn);
    } else if (type === 'data_load') {
        handleDataLoadError(error, retryFn);
    } else if (type === 'render') {
        handleRenderError(error);
    } else {
        showErrorUI({
            title: 'Unexpected Error',
            message: 'Something went wrong. Please try refreshing the page.',
            canRetry: !!retryFn,
            canReload: true,
            onRetry: retryFn
        });
    }
}

/**
 * Setup Global Error Handlers
 */
function setupGlobalErrorHandlers() {
    // Global error handler
    window.addEventListener('error', (event) => {
        console.error('Global error caught:', event.error);
        logError(event.error || new Error(event.message), {
            type: 'global',
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        const error = event.reason instanceof Error
            ? event.reason
            : new Error(String(event.reason));

        logError(error, { type: 'unhandled_promise' });

        // Show UI for critical unhandled rejections
        if (!event.reason?.handled) {
            showErrorUI({
                title: 'Unexpected Error',
                message: 'An unexpected error occurred. The page may not work correctly.',
                canRetry: false,
                canReload: true,
                duration: 5000
            });
        }
    });

    // Network status handlers
    window.addEventListener('online', () => {
        if (typeof showNotification === 'function') {
            showNotification('✓ Back online!', 'success');
        }
    });

    window.addEventListener('offline', () => {
        if (typeof showNotification === 'function') {
            showNotification('⚠️ You are offline', 'warning');
        }
    });
}

/**
 * Get Error Log (for debugging)
 * @returns {Array} Array of logged errors
 */
function getErrorLog() {
    try {
        return JSON.parse(localStorage.getItem('error_log') || '[]');
    } catch (e) {
        return [];
    }
}

/**
 * Clear Error Log
 */
function clearErrorLog() {
    localStorage.removeItem('error_log');
}

// Export functions (if using modules) or attach to window
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        withErrorBoundary,
        safeExecute,
        logError,
        showErrorUI,
        handleNetworkError,
        handleDataLoadError,
        handleRenderError,
        handleError,
        setupGlobalErrorHandlers,
        getErrorLog,
        clearErrorLog
    };
}
