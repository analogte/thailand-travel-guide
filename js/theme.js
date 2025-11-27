// Theme Module
// Dark/Light mode toggle for Thailand Travel Guide

let currentTheme = localStorage.getItem('theme') || 'light';

/**
 * Initialize theme on page load
 */
function initTheme() {
    // Apply saved theme
    applyTheme(currentTheme);

    // Initialize theme toggle button
    initThemeToggle();

    console.log(`✓ Theme initialized: ${currentTheme}`);
}

/**
 * Apply theme to document
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    currentTheme = theme;
    localStorage.setItem('theme', theme);

    // Update theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#1a202c' : '#0D4F4C');
    }
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);

    // Update toggle button state
    updateThemeToggleButton();

    // Show notification
    const themeNames = { light: '☀️ Light Mode', dark: '🌙 Dark Mode' };
    showNotification(`${themeNames[newTheme]} activated`, 'success');

    console.log(`✓ Theme toggled to: ${newTheme}`);
}

/**
 * Initialize theme toggle button
 */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    // Create button content if not already created
    if (!toggleBtn.querySelector('.theme-icon')) {
        updateThemeToggleButton();
    }

    // Add click handler
    toggleBtn.addEventListener('click', toggleTheme);

    console.log('✓ Theme toggle initialized');
}

/**
 * Update theme toggle button appearance
 */
function updateThemeToggleButton() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const icon = currentTheme === 'light' ? '🌙' : '☀️';
    const title = currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';

    toggleBtn.innerHTML = `<span class="theme-icon">${icon}</span>`;
    toggleBtn.setAttribute('title', title);
    toggleBtn.setAttribute('aria-label', title);
}

/**
 * Get current theme
 * @returns {string} Current theme ('light' or 'dark')
 */
function getCurrentTheme() {
    return currentTheme;
}

/**
 * Check system preference for dark mode
 * @returns {boolean} True if system prefers dark mode
 */
function prefersDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Auto-detect and apply system theme preference
 */
function applySystemTheme() {
    const systemTheme = prefersDarkMode() ? 'dark' : 'light';
    applyTheme(systemTheme);
    console.log(`✓ Applied system theme: ${systemTheme}`);
}

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            // Only auto-apply if user hasn't manually set a preference
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
            updateThemeToggleButton();
            console.log(`✓ System theme changed to: ${newTheme}`);
        }
    });
}
