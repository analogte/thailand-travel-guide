// Destinations Page Module
// Handles destination cards, map, search and filters

// Global filter state
let currentFilters = {
    search: '',
    province: '',
    category: '',
    sort: 'rating'
};

/**
 * Initialize Leaflet map with destination markers
 */
function initLeafletMap() {
    const mapContainer = document.getElementById('leaflet-map');
    if (!mapContainer) return;

    const openDestinations = getOpenDestinations();
    if (openDestinations.length === 0) {
        console.log('No destinations data loaded yet');
        return;
    }

    // Initialize map centered on Thailand
    const map = L.map('leaflet-map').setView([13.7563, 100.5018], 6);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 5
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.icon({
        iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMEMxOC42MjcgMCAyNCA1LjM3MyAyNCAxMmMwIDkuNDI4LTEyIDI0LTEyIDI0UzAgMjEuNDI4IDAgMTJDMCA1LjM3MyA1LjM3MyAwIDEyIDB6IiBmaWxsPSIjRkY2QjZCIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNSIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==',
        iconSize: [30, 45],
        iconAnchor: [15, 45],
        popupAnchor: [0, -45]
    });

    // Add markers for each destination
    openDestinations.forEach(dest => {
        const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], { icon: customIcon })
            .bindPopup(`
                <div style="text-align: center; padding: 8px;">
                    <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">${dest.nameEn}</h3>
                    <p style="color: #666; font-size: 13px; margin-bottom: 8px;">${dest.nameTh}</p>
                    <button onclick="scrollToElement('${dest.id}', '${dest.nameEn}')" 
                            style="background: #0D4F4C; color: white; padding: 6px 16px; border-radius: 6px; border: none; cursor: pointer; font-size: 13px;">
                        View Details
                    </button>
                </div>
            `, {
                maxWidth: 250
            })
            .addTo(map);

        // Add click event
        marker.on('click', () => {
            setTimeout(() => {
                scrollToElement(dest.id, dest.nameEn);
            }, 100);
        });
    });

    console.log(`✓ Added ${openDestinations.length} markers to map`);
}

/**
 * Create destination cards dynamically from JSON data
 * @param {Object} filters - Filter options
 */
function createDestinationCards(filters = currentFilters) {
    const container = document.getElementById('destinations-grid');
    if (!container) return;

    let filteredDestinations = [...getDestinations()];

    // Apply search filter
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredDestinations = filteredDestinations.filter(d =>
            d.nameEn.toLowerCase().includes(searchLower) ||
            d.nameTh.includes(filters.search) ||
            d.description.toLowerCase().includes(searchLower) ||
            d.category.some(c => c.toLowerCase().includes(searchLower))
        );
    }

    // Apply province filter
    if (filters.province) {
        filteredDestinations = filteredDestinations.filter(d =>
            d.provinceId === filters.province
        );
    }

    // Apply category filter
    if (filters.category) {
        filteredDestinations = filteredDestinations.filter(d =>
            d.category.includes(filters.category)
        );
    }

    // Apply sorting
    filteredDestinations.sort((a, b) => {
        switch (filters.sort) {
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            case 'name':
                return a.nameEn.localeCompare(b.nameEn);
            case 'price-low':
                const priceA = a.entranceFee?.foreigner || a.entranceFee?.thai || 0;
                const priceB = b.entranceFee?.foreigner || b.entranceFee?.thai || 0;
                return priceA - priceB;
            default:
                return 0;
        }
    });

    // Update results count
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.innerHTML = `
            <i class="fas fa-map-marked-alt mr-1"></i> 
            Showing <span class="font-bold text-yellow-600">${filteredDestinations.length}</span> destination${filteredDestinations.length !== 1 ? 's' : ''}
        `;
    }

    // Filter only open destinations
    const openDestinations = filteredDestinations.filter(d => d.isOpen);

    // Show no results message
    if (openDestinations.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-lg mb-2">No destinations found</p>
                <p class="text-gray-400">Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    // Generate cards HTML
    container.innerHTML = openDestinations.map(dest => createDestinationCard(dest)).join('');

    console.log(`✓ Showing ${openDestinations.length} destination cards`);
}

/**
 * Create a single destination card HTML
 * @param {Object} dest - Destination object
 * @returns {string} HTML string
 */
function createDestinationCard(dest) {
    return `
        <div id="${dest.id}" class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div class="relative h-64 bg-gradient-to-br from-teal-400 to-teal-600">
                <img src="images/destinations/${dest.images[0]}" 
                     alt="${dest.nameEn}" 
                     class="w-full h-full object-cover"
                     onerror="this.style.display='none';">
                <div class="absolute top-4 right-4">
                    <span class="bg-teal-700 text-white px-3 py-1 rounded-full text-sm capitalize">
                        ${dest.category[0]}
                    </span>
                </div>
                ${dest.rating ? `
                <div class="absolute top-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                    <i class="fas fa-star text-yellow-500"></i>
                    <span class="font-bold">${dest.rating}</span>
                </div>
                ` : ''}
            </div>
            <div class="p-6">
                <h3 class="text-2xl font-bold mb-1 text-gray-800">${dest.nameEn}</h3>
                <p class="text-gray-600 mb-3">${dest.nameTh}</p>
                <p class="text-gray-700 mb-4">${truncateText(dest.description, 150)}</p>
                
                <div class="space-y-2 mb-4 text-sm">
                    ${dest.openingHours ? `
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-clock w-5 text-teal-600"></i>
                        <span class="ml-2">${dest.openingHours}</span>
                    </div>
                    ` : ''}
                    ${dest.entranceFee && (dest.entranceFee.thai > 0 || dest.entranceFee.foreigner > 0) ? `
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-ticket-alt w-5 text-teal-600"></i>
                        <span class="ml-2">Thai: ${formatCurrency(dest.entranceFee.thai)} | Foreigner: ${formatCurrency(dest.entranceFee.foreigner)}</span>
                    </div>
                    ` : ''}
                    ${dest.averageDuration ? `
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-hourglass-half w-5 text-teal-600"></i>
                        <span class="ml-2">${dest.averageDuration}</span>
                    </div>
                    ` : ''}
                </div>
                
                ${dest.facilities && dest.facilities.length > 0 ? `
                <div class="flex flex-wrap gap-2 mb-4">
                    ${dest.facilities.slice(0, 5).map(f => `
                        <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize">
                            <i class="fas fa-check text-green-500 mr-1"></i>${f}
                        </span>
                    `).join('')}
                </div>
                ` : ''}
                
                <div class="flex gap-2">
                    ${dest.contact?.website ? `
                    <a href="${dest.contact.website}" target="_blank" 
                       class="flex-1 bg-teal-600 text-white text-center py-2 rounded-lg hover:bg-teal-700 transition">
                        <i class="fas fa-globe mr-1"></i> Website
                    </a>
                    ` : ''}
                    ${dest.contact?.googleMapsUrl ? `
                    <a href="${dest.contact.googleMapsUrl}" target="_blank"
                       class="flex-1 bg-gray-200 text-gray-800 text-center py-2 rounded-lg hover:bg-gray-300 transition">
                        <i class="fas fa-map-marker-alt mr-1"></i> Map
                    </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

/**
 * Initialize search and filter event listeners
 */
function initSearchAndFilters() {
    const searchInput = document.getElementById('destination-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const provinceFilter = document.getElementById('province-filter');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const resetBtn = document.getElementById('reset-filters');

    if (!searchInput) return;

    // Search functionality with debounce
    const debouncedSearch = debounce(() => {
        currentFilters.search = searchInput.value;
        createDestinationCards();
    }, 300);

    searchInput.addEventListener('input', (e) => {
        debouncedSearch();
        
        // Show/hide clear button
        if (clearSearchBtn) {
            clearSearchBtn.style.display = e.target.value ? 'block' : 'none';
        }
    });

    // Clear search
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentFilters.search = '';
            clearSearchBtn.style.display = 'none';
            createDestinationCards();
        });
    }

    // Province filter
    if (provinceFilter) {
        provinceFilter.addEventListener('change', (e) => {
            currentFilters.province = e.target.value;
            createDestinationCards();
        });
    }

    // Category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            createDestinationCards();
        });
    }

    // Sort filter
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            createDestinationCards();
        });
    }

    // Reset filters
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentFilters = {
                search: '',
                province: '',
                category: '',
                sort: 'rating'
            };
            
            searchInput.value = '';
            if (provinceFilter) provinceFilter.value = '';
            if (categoryFilter) categoryFilter.value = '';
            if (sortFilter) sortFilter.value = 'rating';
            if (clearSearchBtn) clearSearchBtn.style.display = 'none';
            
            createDestinationCards();
            showNotification('Filters reset', 'success');
        });
    }

    console.log('✓ Search and filters initialized');
}

/**
 * Initialize destinations page
 */
async function initDestinationsPage() {
    if (!document.getElementById('destinations-grid')) return;

    await loadData();
    createDestinationCards();
    initLeafletMap();
    initSearchAndFilters();
    
    console.log('✓ Destinations page initialized');
}
