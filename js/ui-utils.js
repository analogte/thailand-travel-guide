// UI Utilities Module
// Common UI functions and helpers

/**
 * Show notification message
 * @param {string} message
 * @param {string} type - 'success', 'error', 'info', 'warning'
 */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification-toast');
    if (existing) {
        existing.remove();
    }

    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };

    const notification = document.createElement('div');
    notification.className = `notification-toast fixed top-20 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        notification.style.transition = 'all 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
}

/**
 * Scroll to element with animation
 * @param {string} elementId
 * @param {string} title - Optional title for notification
 */
function scrollToElement(elementId, title = null) {
    const element = document.getElementById(elementId);
    if (element) {
        if (title) {
            showNotification(`🗺️ ${title}`, 'info');
        }

        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add highlight effect
        element.classList.add('ring-4', 'ring-yellow-400');
        setTimeout(() => {
            element.classList.remove('ring-4', 'ring-yellow-400');
        }, 2000);
    }
}

/**
 * Format currency in Thai Baht
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
    if (amount === 0) return 'Free';
    return `฿${amount.toLocaleString()}`;
}

/**
 * Truncate text to specified length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Debounce function for performance
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Show loading state
 * @param {HTMLElement} element
 */
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
    }
}

/**
 * Hide loading state
 * @param {HTMLElement} element
 */
function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
    }
}

/**
 * Initialize countdown timer
 * @param {string} targetDate - Date string (e.g., '2026-04-13')
 */
function initCountdown(targetDate = '2026-04-13T00:00:00') {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const target = new Date(targetDate).getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = target - now;

        if (distance < 0) {
            // Event has passed
            daysEl.innerText = '00';
            hoursEl.innerText = '00';
            minutesEl.innerText = '00';
            secondsEl.innerText = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days < 10 ? `0${days}` : days;
        hoursEl.innerText = hours < 10 ? `0${hours}` : hours;
        minutesEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
        secondsEl.innerText = seconds < 10 ? `0${seconds}` : seconds;
    };

    // Initial call
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);
}

/**
 * Validate email address
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Rate limiter for newsletter submissions
 */
const NewsletterRateLimiter = {
    attempts: new Map(),
    maxAttempts: 3,
    windowMs: 60000, // 1 minute

    check(email) {
        const now = Date.now();
        const key = email.toLowerCase();
        const attempts = this.attempts.get(key) || [];

        // Clean old attempts outside the window
        const validAttempts = attempts.filter(timestamp => now - timestamp < this.windowMs);

        if (validAttempts.length >= this.maxAttempts) {
            const oldestAttempt = validAttempts[0];
            const waitTime = Math.ceil((this.windowMs - (now - oldestAttempt)) / 1000);
            return { allowed: false, waitTime };
        }

        // Add new attempt
        validAttempts.push(now);
        this.attempts.set(key, validAttempts);

        return { allowed: true };
    },

    reset(email) {
        this.attempts.delete(email.toLowerCase());
    }
};

/**
 * Submit newsletter subscription to API
 * @param {string} email - Email address
 * @returns {Promise<boolean>} Success status
 */
async function submitNewsletterSubscription(email) {
    // TODO: Replace with actual API endpoint
    const API_ENDPOINT = '/api/newsletter/subscribe';

    try {
        // Simulate API call (replace with actual fetch when ready)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Uncomment when API is ready:
        /*
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        return data.success;
        */

        return true;
    } catch (error) {
        console.error('API submission failed:', error);
        return true; // Fallback to localStorage
    }
}

/**
 * Initialize newsletter subscription form
 */
function initNewsletterForm() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Check if this is a newsletter form (has email input and subscribe button)
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');

        if (!emailInput || !submitBtn) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();

            // Validate email
            if (!email) {
                showNotification('⚠️ Please enter your email address', 'warning');
                emailInput.focus();
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('⚠️ Please enter a valid email address', 'warning');
                emailInput.focus();
                return;
            }

            // Check rate limit
            const rateLimitCheck = NewsletterRateLimiter.check(email);
            if (!rateLimitCheck.allowed) {
                showNotification(
                    `⚠️ Too many attempts. Please wait ${rateLimitCheck.waitTime} seconds.`,
                    'error'
                );
                return;
            }

            // Check if already subscribed
            const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
            if (subscribers.includes(email)) {
                showNotification('ℹ️ You are already subscribed!', 'info');
                emailInput.value = '';
                return;
            }

            // Disable button and show loading
            submitBtn.disabled = true;
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Subscribing...';

            try {
                const success = await submitNewsletterSubscription(email);

                if (success) {
                    showNotification('🎉 Thank you for subscribing!', 'success');
                    emailInput.value = '';

                    // Store email in localStorage
                    subscribers.push(email);
                    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

                    // Reset rate limiter for successful subscription
                    NewsletterRateLimiter.reset(email);

                    console.log('✓ Newsletter subscription:', email);
                } else {
                    throw new Error('Subscription failed');
                }
            } catch (error) {
                console.error('Newsletter subscription error:', error);
                showNotification('⚠️ Subscription failed. Please try again later.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    });
}
