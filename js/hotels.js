// Hotels Module
// Handles hotel search and booking platform integration

/**
 * Initialize hotels page
 */
async function initHotelsPage() {
    if (!document.getElementById('popular-destinations-grid')) return;

    try {
        // Load provinces data
        await loadData();
        const provinces = getProvinces();

        // Render popular destinations
        renderPopularDestinations(provinces);

        // Set default dates (today + 1 day for check-in, today + 2 days for check-out)
        setDefaultDates();

        console.log('✓ Hotels page initialized');
    } catch (error) {
        console.error('❌ Error initializing hotels page:', error);
        if (typeof handleError === 'function') {
            handleError(error, { type: 'init', context: { page: 'hotels' } });
        }
    }
}

/**
 * Set default check-in and check-out dates
 */
function setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const checkinEl = document.getElementById('checkin');
    const checkoutEl = document.getElementById('checkout');

    if (checkinEl) {
        checkinEl.value = tomorrow.toISOString().split('T')[0];
        checkinEl.min = today.toISOString().split('T')[0];
    }

    if (checkoutEl) {
        checkoutEl.value = dayAfter.toISOString().split('T')[0];
        checkoutEl.min = tomorrow.toISOString().split('T')[0];
    }

    // Update checkout min date when checkin changes
    if (checkinEl && checkoutEl) {
        checkinEl.addEventListener('change', () => {
            const checkinDate = new Date(checkinEl.value);
            const minCheckout = new Date(checkinDate);
            minCheckout.setDate(minCheckout.getDate() + 1);
            checkoutEl.min = minCheckout.toISOString().split('T')[0];

            // Update checkout if it's before new minimum
            if (new Date(checkoutEl.value) <= checkinDate) {
                checkoutEl.value = minCheckout.toISOString().split('T')[0];
            }
        });
    }
}

/**
 * Render popular destinations
 * @param {Array} provinces - Array of province data
 */
function renderPopularDestinations(provinces) {
    const grid = document.getElementById('popular-destinations-grid');
    if (!grid) return;

    // Popular destinations (Bangkok, Chiang Mai, Phuket, Pattaya, Krabi, Ayutthaya)
    const popularIds = ['bangkok', 'chiang-mai', 'phuket', 'pattaya', 'krabi', 'ayutthaya'];
    const popular = provinces.filter(p => popularIds.includes(p.id));

    grid.innerHTML = '';

    popular.forEach(province => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer';

        const imageUrl = province.image || (typeof CONFIG !== 'undefined' && CONFIG.IMAGES ? CONFIG.IMAGES.DEFAULT_PROVINCE : '');

        card.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${escapeHtml(imageUrl)}"
                     alt="${escapeHtml(province.name)}"
                     class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                     onerror="this.src='https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 class="text-2xl font-bold mb-1">${escapeHtml(province.name)}</h3>
                    <p class="text-sm opacity-90">${escapeHtml(province.thaiName || '')}</p>
                </div>
            </div>
            <div class="p-6">
                <p class="text-gray-600 mb-4 text-sm line-clamp-2">${escapeHtml(province.description || 'Explore hotels in this beautiful destination')}</p>
                <button onclick="searchHotelsByDestination('${province.id}', '${escapeHtml(province.name)}')"
                        class="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold">
                    <i class="fas fa-search mr-2"></i>
                    Find Hotels
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

/**
 * Get form data
 * @returns {Object} Form data
 */
function getFormData() {
    const destination = document.getElementById('destination')?.value || 'bangkok';
    const checkin = document.getElementById('checkin')?.value || '';
    const checkout = document.getElementById('checkout')?.value || '';
    const hotelType = document.getElementById('hotel-type')?.value || '';

    return { destination, checkin, checkout, hotelType };
}

/**
 * Search on Agoda
 */
function searchAgoda() {
    const { destination, checkin, checkout } = getFormData();

    if (!destination) {
        if (typeof showNotification === 'function') {
            showNotification('⚠️ Please select a destination', 'warning');
        }
        return;
    }

    // Build Agoda URL
    // NOTE: Replace with actual Agoda Partner link when you have a partner ID
    // Format: https://www.agoda.com/partners/partnersearch.aspx?cid=YOUR_PARTNER_ID&city=CITY_ID...

    let url = `https://www.agoda.com/search?city=${encodeURIComponent(destination)}`;

    if (checkin) url += `&checkIn=${checkin}`;
    if (checkout) url += `&checkOut=${checkout}`;

    // Add UTM parameters for tracking
    url += `&utm_source=thailand_travel_guide&utm_medium=referral&utm_campaign=hotel_search`;

    console.log('🔗 Redirecting to Agoda:', url);

    // Open in new tab
    window.open(url, '_blank');

    // Show notification
    if (typeof showNotification === 'function') {
        showNotification('🔗 Opening Agoda in new tab...', 'info');
    }
}

/**
 * Search on Booking.com
 */
function searchBookingCom() {
    const { destination, checkin, checkout } = getFormData();

    if (!destination) {
        if (typeof showNotification === 'function') {
            showNotification('⚠️ Please select a destination', 'warning');
        }
        return;
    }

    // Build Booking.com URL
    // NOTE: Replace with actual Booking.com Partner link when you have an affiliate ID
    // Format: https://www.booking.com/searchresults.html?aid=YOUR_AID&ss=DESTINATION...

    let url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}`;

    if (checkin) url += `&checkin=${checkin}`;
    if (checkout) url += `&checkout=${checkout}`;

    // Add UTM parameters for tracking
    url += `&utm_source=thailand_travel_guide&utm_medium=referral&utm_campaign=hotel_search`;

    console.log('🔗 Redirecting to Booking.com:', url);

    // Open in new tab
    window.open(url, '_blank');

    // Show notification
    if (typeof showNotification === 'function') {
        showNotification('🔗 Opening Booking.com in new tab...', 'info');
    }
}

/**
 * Search hotels by destination (from popular destinations cards)
 * @param {string} destinationId - Destination ID
 * @param {string} destinationName - Destination name
 */
function searchHotelsByDestination(destinationId, destinationName) {
    // Set the destination in form
    const destinationEl = document.getElementById('destination');
    if (destinationEl) {
        destinationEl.value = destinationId;
    }

    // Scroll to search form
    const form = document.getElementById('hotel-search-form');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Highlight the form
    if (form) {
        form.classList.add('ring-4', 'ring-yellow-400');
        setTimeout(() => {
            form.classList.remove('ring-4', 'ring-yellow-400');
        }, 2000);
    }

    // Show notification
    if (typeof showNotification === 'function') {
        showNotification(`📍 ${destinationName} selected. Choose dates and search!`, 'info');
    }
}

/**
 * Search by category (budget, midrange, luxury)
 * @param {string} category - Hotel category
 */
function searchCategory(category) {
    const { destination, checkin, checkout } = getFormData();

    const categoryNames = {
        budget: 'Budget Hotels',
        midrange: 'Mid-Range Hotels',
        luxury: 'Luxury Hotels'
    };

    // Build search URL with price filters
    // For now, open Agoda with destination
    let url = `https://www.agoda.com/search?`;

    if (destination) {
        url += `city=${encodeURIComponent(destination)}&`;
    } else {
        url += `city=bangkok&`; // Default to Bangkok
    }

    if (checkin) url += `checkIn=${checkin}&`;
    if (checkout) url += `checkOut=${checkout}&`;

    // Add price range filters (approximate)
    if (category === 'budget') {
        url += `priceMax=1000&`;
    } else if (category === 'midrange') {
        url += `priceMin=1000&priceMax=2500&`;
    } else if (category === 'luxury') {
        url += `priceMin=2500&`;
    }

    url += `utm_source=thailand_travel_guide&utm_medium=referral&utm_campaign=category_${category}`;

    console.log(`🔗 Redirecting to ${categoryNames[category]}:`, url);

    window.open(url, '_blank');

    if (typeof showNotification === 'function') {
        showNotification(`🔗 Searching ${categoryNames[category]}...`, 'info');
    }
}

/**
 * Get hotel booking widget HTML for a specific destination
 * @param {string} destination - Destination name
 * @param {string} destinationId - Destination ID
 * @returns {string} HTML string
 */
function getHotelWidgetHTML(destination, destinationId = '') {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const checkin = tomorrow.toISOString().split('T')[0];
    const checkout = dayAfter.toISOString().split('T')[0];

    return `
        <div class="hotel-widget bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-8 shadow-lg">
            <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">
                <i class="fas fa-hotel text-teal-600 mr-2"></i>
                Find Hotels in ${escapeHtml(destination)}
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
                    <input type="date"
                           id="widget-checkin-${destinationId}"
                           value="${checkin}"
                           min="${checkin}"
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:outline-none">
                </div>
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
                    <input type="date"
                           id="widget-checkout-${destinationId}"
                           value="${checkout}"
                           min="${checkout}"
                           class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-teal-600 focus:outline-none">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onclick="searchWidgetAgoda('${destinationId}', '${escapeHtml(destination)}')"
                        class="py-4 bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold rounded-lg hover:from-pink-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl">
                    <i class="fas fa-search mr-2"></i>
                    Search on Agoda
                </button>
                <button onclick="searchWidgetBookingCom('${destinationId}', '${escapeHtml(destination)}')"
                        class="py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl">
                    <i class="fas fa-search mr-2"></i>
                    Search on Booking.com
                </button>
            </div>

            <p class="text-center text-sm text-gray-600 mt-4">
                <i class="fas fa-info-circle mr-1"></i>
                Compare prices on both platforms for the best deal
            </p>
        </div>
    `;
}

/**
 * Search from widget (Agoda)
 * @param {string} destinationId - Destination ID
 * @param {string} destinationName - Destination name
 */
function searchWidgetAgoda(destinationId, destinationName) {
    const checkinEl = document.getElementById(`widget-checkin-${destinationId}`);
    const checkoutEl = document.getElementById(`widget-checkout-${destinationId}`);

    const checkin = checkinEl ? checkinEl.value : '';
    const checkout = checkoutEl ? checkoutEl.value : '';

    let url = `https://www.agoda.com/search?city=${encodeURIComponent(destinationName)}`;
    if (checkin) url += `&checkIn=${checkin}`;
    if (checkout) url += `&checkOut=${checkout}`;
    url += `&utm_source=thailand_travel_guide&utm_medium=widget&utm_campaign=${destinationId}`;

    window.open(url, '_blank');

    if (typeof showNotification === 'function') {
        showNotification(`🔗 Searching hotels in ${destinationName}...`, 'info');
    }
}

/**
 * Search from widget (Booking.com)
 * @param {string} destinationId - Destination ID
 * @param {string} destinationName - Destination name
 */
function searchWidgetBookingCom(destinationId, destinationName) {
    const checkinEl = document.getElementById(`widget-checkin-${destinationId}`);
    const checkoutEl = document.getElementById(`widget-checkout-${destinationId}`);

    const checkin = checkinEl ? checkinEl.value : '';
    const checkout = checkoutEl ? checkoutEl.value : '';

    let url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destinationName)}`;
    if (checkin) url += `&checkin=${checkin}`;
    if (checkout) url += `&checkout=${checkout}`;
    url += `&utm_source=thailand_travel_guide&utm_medium=widget&utm_campaign=${destinationId}`;

    window.open(url, '_blank');

    if (typeof showNotification === 'function') {
        showNotification(`🔗 Searching hotels in ${destinationName}...`, 'info');
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHotelsPage);
} else {
    initHotelsPage();
}
