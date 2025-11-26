// Provinces Page Module
// Handles provinces listing, search, and filtering

let allProvinces = [];

/**
 * Initialize provinces page
 */
async function initProvincesPage() {
    // Check if we're on the provinces page
    if (!document.getElementById('provinces-grid')) return;

    try {
        // Show loading
        showLoading(document.getElementById('provinces-grid'));

        // Initialize Vanta.js background
        initVantaBackground();

        // Load provinces data
        await loadData();
        allProvinces = getProvinces();

        if (allProvinces.length === 0) {
            throw new Error('No provinces data loaded');
        }

        // Render all provinces initially
        renderProvinces(allProvinces);

        // Initialize search and filters
        initProvinceFilters();

        // Initialize mobile menu
        initMobileMenuToggle();

        // Navbar scroll effect
        initNavbarScroll();

        hideLoading(document.getElementById('provinces-grid'));

        console.log(`✓ Provinces page initialized with ${allProvinces.length} provinces`);
    } catch (error) {
        console.error('❌ Error initializing provinces page:', error);
        const grid = document.getElementById('provinces-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <i class="fas fa-exclamation-circle text-6xl text-red-400 mb-4"></i>
                    <p class="text-red-600 text-lg font-semibold">Failed to load provinces data</p>
                    <p class="text-gray-500 mt-2">Please refresh the page to try again</p>
                </div>
            `;
        }
        showNotification('⚠️ Error loading provinces. Please refresh.', 'error');
    }
}

/**
 * Initialize Vanta.js animated background
 */
function initVantaBackground() {
    if (typeof VANTA === 'undefined') {
        console.warn('Vanta.js not loaded');
        return;
    }

    try {
        VANTA.WAVES({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x0d4f4c,
            shininess: 35.00,
            waveHeight: 20.00,
            waveSpeed: 0.75,
            zoom: 0.65
        });
        console.log('✓ Vanta.js background initialized');
    } catch (error) {
        console.error('Vanta.js initialization failed:', error);
    }
}

/**
 * Render provinces grid
 * @param {Array} provinces - Provinces data to render
 */
function renderProvinces(provinces) {
    const grid = document.getElementById('provinces-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (provinces.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-20">
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-lg">No provinces found</p>
                <p class="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    provinces.forEach(province => {
        const card = document.createElement('div');
        card.className = 'group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2';
        card.onclick = () => window.location.href = `province-detail.html?id=${province.id}`;

        const imageUrl = province.image || 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800';

        card.innerHTML = `
            <div class="h-64 overflow-hidden relative">
                <img src="${imageUrl}"
                     alt="${province.name} - ${province.thaiName}"
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white">
                    <h3 class="text-2xl font-bold font-display">${province.name}</h3>
                    <p class="text-sm opacity-90">${province.thaiName}</p>
                </div>
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-teal-800 uppercase tracking-wide">
                    ${province.region}
                </div>
            </div>
            <div class="p-6">
                <p class="text-gray-600 line-clamp-2 mb-4">${province.description}</p>
                <div class="flex items-center text-teal-600 font-semibold group-hover:translate-x-2 transition-transform">
                    Explore Places <i class="fas fa-arrow-right ml-2"></i>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    console.log(`✓ Rendered ${provinces.length} province cards`);
}

/**
 * Initialize province filters (search + region)
 */
function initProvinceFilters() {
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!searchInput || !filterBtns.length) {
        console.warn('Filter elements not found');
        return;
    }

    let currentRegion = 'all';

    // Search functionality
    searchInput.addEventListener('input', debounce((e) => {
        const searchTerm = e.target.value.toLowerCase();
        filterAndRender(searchTerm, currentRegion);
    }, 300));

    // Region filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => {
                b.classList.remove('bg-teal-50', 'border-teal-500', 'text-teal-700', 'active');
                b.classList.add('border-gray-300');
            });
            btn.classList.remove('border-gray-300');
            btn.classList.add('bg-teal-50', 'border-teal-500', 'text-teal-700', 'active');

            // Update current region
            currentRegion = btn.dataset.region;
            const searchTerm = searchInput.value.toLowerCase();
            filterAndRender(searchTerm, currentRegion);

            // Show notification
            const regionName = currentRegion === 'all' ? 'All Provinces' : currentRegion.charAt(0).toUpperCase() + currentRegion.slice(1);
            showNotification(`Showing ${regionName}`, 'info');
        });
    });

    console.log('✓ Province filters initialized');
}

/**
 * Filter and render provinces
 * @param {string} searchTerm - Search term
 * @param {string} region - Region filter
 */
function filterAndRender(searchTerm, region) {
    let filtered = allProvinces;

    // Apply region filter
    if (region !== 'all') {
        filtered = filtered.filter(p => p.region === region);
    }

    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.thaiName.includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    renderProvinces(filtered);
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenuToggle() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        const icon = btn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.add('hidden');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

/**
 * Initialize navbar scroll effect
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/90', 'shadow-sm');
            navbar.querySelector('.font-display').classList.remove('text-white');
            navbar.querySelector('.font-display').classList.add('text-gray-800');
            navbar.querySelectorAll('.nav-link').forEach(link => {
                if (!link.classList.contains('text-yellow-400')) {
                    link.classList.remove('text-white');
                    link.classList.add('text-gray-600');
                }
            });
        } else {
            navbar.classList.remove('bg-white/90', 'shadow-sm');
            navbar.querySelector('.font-display').classList.remove('text-gray-800');
            navbar.querySelector('.font-display').classList.add('text-white');
            navbar.querySelectorAll('.nav-link').forEach(link => {
                if (!link.classList.contains('text-yellow-400')) {
                    link.classList.remove('text-gray-600');
                    link.classList.add('text-white');
                }
            });
        }
    });
}
