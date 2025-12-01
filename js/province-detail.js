// Province Detail Page Module
// Handles province detail page functionality

/**
 * Initialize province detail page
 */
async function initProvinceDetailPage() {
    // Check if we're on the province detail page
    if (!document.getElementById('province-name')) return;

    // Get Province ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('id');

    if (!provinceId) {
        showNotification('⚠️ Province ID not found', 'error');
        setTimeout(() => {
            window.location.href = 'destinations.html';
        }, 1500);
        return;
    }

    try {
        // Load data
        await loadData();

        // Load places data
        const placesRes = await fetch('data/places.json');
        if (!placesRes.ok) {
            throw new Error('Failed to load places data');
        }
        const places = await placesRes.json();

        // Get province from loaded data
        const provinces = getProvinces();
        const province = provinces.find(p => p.id === provinceId);
        const provincePlaces = places.filter(p => p.provinceId === provinceId);

        if (!province) {
            showNotification('⚠️ Province not found', 'error');
            setTimeout(() => {
                window.location.href = 'destinations.html';
            }, 1500);
            return;
        }

        // Update page title
        document.title = `${province.name} - Thailand Travel Guide`;

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', `Discover ${province.name} (${province.thaiName}) - ${province.description}`);
        }

        // Render Header with null checks
        const provinceNameEl = document.getElementById('province-name');
        const provinceThaiNameEl = document.getElementById('province-thai-name');
        const provinceDescEl = document.getElementById('province-desc');
        const provinceCoverEl = document.getElementById('province-cover');

        if (provinceNameEl) provinceNameEl.textContent = province.name || 'Unknown';
        if (provinceThaiNameEl) provinceThaiNameEl.textContent = province.thaiName || '';
        if (provinceDescEl) provinceDescEl.textContent = province.description || '';
        if (provinceCoverEl) {
            provinceCoverEl.src = province.coverImage || province.image || '';
            provinceCoverEl.alt = `${province.name} - ${province.thaiName}`;
        }

        // Render Breadcrumbs
        renderBreadcrumbs([
            { label: 'Destinations', url: 'destinations.html' },
            { label: province.name, url: null }
        ]);

        // Render Places
        renderPlaces(provincePlaces);

        // Tab Logic
        initCategoryTabs(provincePlaces);

        console.log(`✓ Province detail page loaded: ${province.name}`);
    } catch (error) {
        console.error('❌ Error loading province data:', error);
        showNotification('⚠️ Error loading province data. Please try again.', 'error');
    }
}

/**
 * Render places grid
 * @param {Array} data - Places data
 */
function renderPlaces(data) {
    const grid = document.getElementById('places-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (data.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-10">
                <i class="fas fa-map-marked-alt text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-lg">No places found in this category yet.</p>
                <p class="text-gray-400 text-sm mt-2">Check back soon for more amazing destinations!</p>
            </div>
        `;
        return;
    }

    data.forEach(place => {
        // Validate place object
        if (!place || !place.id) {
            console.warn('Invalid place data:', place);
            return;
        }

        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer';

        // Add image error handling with escaping
        const defaultImage = (typeof CONFIG !== 'undefined' && CONFIG.IMAGES)
            ? CONFIG.IMAGES.DEFAULT_PLACE
            : 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800';
        const imageUrl = place.image || defaultImage;
        const placeName = escapeHtml(place.name || 'Unknown');
        const placeDescription = escapeHtml(place.description || 'No description available');
        const placeCategory = escapeHtml(place.category || 'general');
        const placeRating = place.rating ? escapeHtml(String(place.rating)) : 'N/A';
        const placeId = encodeURIComponent(place.id);

        card.innerHTML = `
            <div class="h-48 overflow-hidden relative">
                <img src="${escapeHtml(imageUrl)}"
                     alt="${placeName}"
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                     loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800'">
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 flex items-center shadow-sm">
                    <i class="fas fa-star text-yellow-400 mr-1"></i> ${placeRating}
                </div>
            </div>
            <div class="p-5">
                <div class="text-xs font-bold text-teal-600 uppercase tracking-wide mb-1">
                    <i class="fas ${getCategoryIcon(place.category)} mr-1"></i>${placeCategory}
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">${placeName}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${placeDescription}</p>
                <button onclick="window.location.href='place-detail.html?id=${placeId}'"
                        class="w-full py-2 rounded-lg border border-teal-600 text-teal-600 font-semibold hover:bg-teal-600 hover:text-white transition-colors">
                    View Details
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

/**
 * Initialize category filter tabs
 * @param {Array} allPlaces - All places for this province
 */
function initCategoryTabs(allPlaces) {
    const tabs = document.querySelectorAll('.tab-btn');
    const placesGrid = document.getElementById('places-grid');

    tabs.forEach((tab, index) => {
        // Click handler
        tab.addEventListener('click', () => {
            activateTab(tab, tabs, allPlaces, placesGrid);
        });

        // Keyboard navigation
        tab.addEventListener('keydown', (e) => {
            let targetTab;

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                targetTab = tabs[(index + 1) % tabs.length];
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                targetTab = tabs[(index - 1 + tabs.length) % tabs.length];
            } else if (e.key === 'Home') {
                e.preventDefault();
                targetTab = tabs[0];
            } else if (e.key === 'End') {
                e.preventDefault();
                targetTab = tabs[tabs.length - 1];
            }

            if (targetTab) {
                targetTab.focus();
                activateTab(targetTab, tabs, allPlaces, placesGrid);
            }
        });
    });
}

/**
 * Activate a tab and update ARIA attributes
 * @param {HTMLElement} tab - Tab to activate
 * @param {NodeList} allTabs - All tab elements
 * @param {Array} allPlaces - All places data
 * @param {HTMLElement} placesGrid - Places grid element
 */
function activateTab(tab, allTabs, allPlaces, placesGrid) {
    // Update Active State
    allTabs.forEach(t => {
        t.classList.remove('bg-teal-600', 'text-white', 'shadow-md');
        t.classList.add('bg-white', 'text-gray-600', 'hover:bg-gray-100');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
    });

    tab.classList.remove('bg-white', 'text-gray-600', 'hover:bg-gray-100');
    tab.classList.add('bg-teal-600', 'text-white', 'shadow-md');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');

    const category = tab.dataset.category;

    // Handle Hotels tab specially
    if (category === 'hotels') {
        // Hide places grid, show hotels container
        if (placesGrid) placesGrid.classList.add('hidden');

        const hotelsContainer = document.getElementById('hotels-container');
        if (hotelsContainer) {
            hotelsContainer.classList.remove('hidden');
            hotelsContainer.setAttribute('aria-labelledby', tab.id);

            // Render hotels widget if not already rendered
            if (!hotelsContainer.hasAttribute('data-initialized')) {
                renderHotelsWidget(hotelsContainer);
                hotelsContainer.setAttribute('data-initialized', 'true');
            }
        }

        // Show notification
        if (typeof showNotification === 'function') {
            showNotification('🏨 Find hotels in this province', 'info');
        }
    } else {
        // Show places grid, hide hotels container
        if (placesGrid) {
            placesGrid.classList.remove('hidden');
            placesGrid.setAttribute('aria-labelledby', tab.id);
        }

        const hotelsContainer = document.getElementById('hotels-container');
        if (hotelsContainer) {
            hotelsContainer.classList.add('hidden');
        }

        // Filter and render places
        const filtered = category === 'all'
            ? allPlaces
            : allPlaces.filter(p => p.category === category);

        renderPlaces(filtered);

        // Show notification
        const categoryName = category === 'all' ? 'All Places' : category.charAt(0).toUpperCase() + category.slice(1);
        if (typeof showNotification === 'function') {
            showNotification(`Showing ${filtered.length} ${categoryName}`, 'info');
        }
    }
}

/**
 * Render hotels widget for the current province
 * @param {HTMLElement} container - Hotels container element
 */
function renderHotelsWidget(container) {
    if (!container) return;

    // Get current province info from page
    const provinceNameEl = document.getElementById('province-name');
    const provinceName = provinceNameEl ? provinceNameEl.textContent : 'Thailand';

    // Get province ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const provinceId = urlParams.get('id') || 'bangkok';

    // Use the getHotelWidgetHTML function from hotels.js
    if (typeof getHotelWidgetHTML === 'function') {
        container.innerHTML = getHotelWidgetHTML(provinceName, provinceId);
    } else {
        // Fallback if hotels.js is not loaded
        container.innerHTML = `
            <div class="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-8 shadow-lg text-center">
                <i class="fas fa-hotel text-6xl text-teal-600 mb-4"></i>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">Find Hotels in ${escapeHtml(provinceName)}</h3>
                <p class="text-gray-600 mb-6">Search for the best hotel deals in this province</p>
                <div class="flex gap-4 justify-center flex-wrap">
                    <a href="hotels.html" target="_blank"
                       class="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold">
                        <i class="fas fa-search mr-2"></i>
                        Search Hotels
                    </a>
                </div>
            </div>
        `;
    }
}

/**
 * Get icon for category
 * @param {string} category
 * @returns {string} Font Awesome icon class
 */
function getCategoryIcon(category) {
    const icons = {
        temple: 'fa-place-of-worship',
        food: 'fa-utensils',
        cafe: 'fa-coffee',
        nature: 'fa-tree',
        culture: 'fa-masks-theater',
        beach: 'fa-umbrella-beach',
        shopping: 'fa-shopping-bag',
        nightlife: 'fa-moon'
    };
    return icons[category] || 'fa-map-marker-alt';
}
