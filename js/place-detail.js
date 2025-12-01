// Place Detail Page Module
// Handles individual place detail page functionality

let currentPlace = null;
let currentImageIndex = 0;

/**
 * Initialize place detail page
 */
async function initPlaceDetailPage() {
    // Check if we're on the place detail page
    if (!document.getElementById('place-name')) return;

    const urlParams = new URLSearchParams(window.location.search);
    const placeId = urlParams.get('id');

    if (!placeId) {
        showNotification('⚠️ Place ID not found', 'error');
        setTimeout(() => {
            window.location.href = 'destinations.html';
        }, 1500);
        return;
    }

    try {
        // Show loading state
        showLoading(document.body);

        // Load places and provinces data
        const [placesRes, provincesRes] = await Promise.all([
            fetch('data/places.json'),
            fetch('data/provinces.json')
        ]);

        if (!placesRes.ok || !provincesRes.ok) {
            throw new Error('Failed to load data');
        }

        const places = await placesRes.json();
        const provinces = await provincesRes.json();

        const place = places.find(p => p.id === placeId);

        if (!place) {
            showNotification('⚠️ Place not found', 'error');
            setTimeout(() => {
                window.location.href = 'destinations.html';
            }, 1500);
            return;
        }

        const province = provinces.find(p => p.id === place.provinceId);

        currentPlace = place;
        currentImageIndex = 0;

        // Update page title and meta
        document.title = `${place.name} - Thailand Travel Guide`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', `${place.description.substring(0, 150)}...`);
        }

        // Render Content
        renderPlaceContent(place);

        // Prepare breadcrumb items
        const breadcrumbItems = [
            { label: 'Destinations', url: 'destinations.html' }
        ];

        if (province) {
            breadcrumbItems.push({ label: province.name, url: `province-detail.html?id=${province.id}` });
        }

        breadcrumbItems.push({ label: place.name, url: null }); // Current page

        renderBreadcrumbs(breadcrumbItems);

        renderMap(place);

        // Initialize image gallery
        initImageGallery(place);

        // Initialize Get Directions button
        initGetDirectionsButton(place);

        // Render Hotels Nearby widget
        renderHotelsNearby(place);

        hideLoading(document.body);

        console.log(`✓ Place detail page loaded: ${place.name}`);
    } catch (error) {
        console.error('❌ Error loading place data:', error);
        showNotification('⚠️ Error loading place data. Please try again.', 'error');
        hideLoading(document.body);
    }
}

/**
 * Render Google Maps
 * @param {Object} place - Place data
 */
function renderMap(place) {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;

    if (place.location && place.location.lat && place.location.lng) {
        // Embed Google Maps iframe
        const iframe = document.createElement('iframe');
        iframe.className = 'w-full h-full border-0';
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        iframe.src = `https://www.google.com/maps?q=${place.location.lat},${place.location.lng}&output=embed&z=15`;
        iframe.title = `Map of ${place.name}`;
        mapContainer.appendChild(iframe);
    } else {
        mapContainer.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-100 text-gray-500"><p>Map not available for this location</p></div>';
    }
}

/**
 * Render place content
 * @param {Object} place - Place data
 */
function renderPlaceContent(place) {
    // Validate place object
    if (!place) {
        console.error('Invalid place data');
        return;
    }

    // Hero Section
    const mainImage = document.getElementById('main-image');
    if (mainImage && place.image) {
        mainImage.src = place.image;
        mainImage.alt = place.name || 'Place image';
        mainImage.onerror = function () {
            const defaultImage = (typeof CONFIG !== 'undefined' && CONFIG.IMAGES)
                ? CONFIG.IMAGES.DEFAULT_PLACE
                : 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800';
            this.src = defaultImage;
        };
    }

    // Header Info with null checks
    const placeNameEl = document.getElementById('place-name');
    const placeThaiNameEl = document.getElementById('place-thai-name');
    const placeRatingEl = document.getElementById('place-rating');
    const placeReviewsEl = document.getElementById('place-reviews');

    if (placeNameEl) placeNameEl.textContent = place.name || 'Unknown';
    if (placeThaiNameEl) placeThaiNameEl.textContent = place.thaiName || '';
    if (placeRatingEl) placeRatingEl.textContent = place.rating || 'N/A';
    if (placeReviewsEl) {
        placeReviewsEl.textContent = place.reviews
            ? `(${place.reviews.toLocaleString()} reviews)`
            : '';
    }

    // Main Content
    const placeDescEl = document.getElementById('place-desc');
    if (placeDescEl) placeDescEl.textContent = place.description || 'No description available';

    // Sidebar Info
    const placeHoursEl = document.getElementById('place-hours');
    const placeFeeEl = document.getElementById('place-fee');
    const placeDressEl = document.getElementById('place-dress');
    const placeAddressEl = document.getElementById('place-address');

    if (placeHoursEl) placeHoursEl.textContent = place.openingHours || 'Not specified';
    if (placeFeeEl) placeFeeEl.textContent = place.entranceFee || 'Not specified';
    if (placeDressEl) placeDressEl.textContent = place.dressCode || 'Casual';
    if (placeAddressEl) placeAddressEl.textContent = place.address || 'Address not available';

    // Website Link (show only if available)
    const websiteSection = document.getElementById('website-section');
    const websiteLink = document.getElementById('place-website');
    console.log('Website check:', {
        hasWebsite: !!place.website,
        website: place.website,
        hasSection: !!websiteSection,
        hasLink: !!websiteLink
    });
    if (place.website && websiteSection && websiteLink) {
        websiteLink.href = place.website;
        websiteSection.classList.remove('hidden');
        console.log('✓ Website link displayed:', place.website);
    } else if (websiteSection) {
        websiteSection.classList.add('hidden');
        console.log('✗ Website section hidden (no website data)');
    }

    // Highlights
    const highlightsList = document.getElementById('place-highlights');
    if (highlightsList && place.highlights && Array.isArray(place.highlights)) {
        highlightsList.innerHTML = '';
        place.highlights.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-teal-200 transition-colors';

            const icon = document.createElement('i');
            icon.className = 'fas fa-check-circle text-teal-500 mr-3 text-lg';

            const span = document.createElement('span');
            span.className = 'text-gray-700 font-medium';
            span.textContent = item || '';

            li.appendChild(icon);
            li.appendChild(span);
            highlightsList.appendChild(li);
        });
    }

    // Tips
    const tipsList = document.getElementById('place-tips');
    if (tipsList && place.tips && Array.isArray(place.tips)) {
        tipsList.innerHTML = '';
        place.tips.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-start';

            const icon = document.createElement('i');
            icon.className = 'fas fa-lightbulb text-yellow-500 mt-1 mr-3 flex-shrink-0';

            const span = document.createElement('span');
            span.className = 'text-gray-700';
            span.textContent = item || '';

            li.appendChild(icon);
            li.appendChild(span);
            tipsList.appendChild(li);
        });
    }

    // Transportation
    const transportContainer = document.getElementById('place-transport');
    if (transportContainer && place.transportation && Array.isArray(place.transportation)) {
        transportContainer.innerHTML = '';
        place.transportation.forEach(item => {
            if (!item || !item.type) return;

            const div = document.createElement('div');
            div.className = 'flex items-start bg-white p-4 rounded-xl shadow-sm';

            let iconClass = 'fa-bus'; // Default icon
            const type = (item.type || '').toLowerCase();

            if (type.includes('boat') || type.includes('ferry') || type.includes('pier')) iconClass = 'fa-ship';
            else if (type.includes('train') || type.includes('mrt') || type.includes('bts') || type.includes('arl')) iconClass = 'fa-subway';
            else if (type.includes('taxi') || type.includes('grab') || type.includes('bolt') || type.includes('uber') || type.includes('car')) iconClass = 'fa-taxi';
            else if (type.includes('motorbike') || type.includes('motorcycle') || type.includes('win') || type.includes('scooter')) iconClass = 'fa-motorcycle';
            else if (type.includes('tuk') || type.includes('songthaew') || type.includes('van') || type.includes('bus')) iconClass = 'fa-shuttle-van';
            else if (type.includes('walk') || type.includes('foot')) iconClass = 'fa-walking';
            else if (type.includes('plane') || type.includes('flight')) iconClass = 'fa-plane';

            // Create icon container
            const iconContainer = document.createElement('div');
            iconContainer.className = 'w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 flex-shrink-0 mt-1 mr-4';
            const icon = document.createElement('i');
            icon.className = `fas ${iconClass}`;
            iconContainer.appendChild(icon);

            // Create content container
            const contentDiv = document.createElement('div');

            const h4 = document.createElement('h4');
            h4.className = 'font-bold text-gray-800 text-sm uppercase tracking-wide mb-1';
            h4.textContent = item.type || '';

            const p = document.createElement('p');
            p.className = 'text-gray-600 text-sm';
            p.textContent = item.detail || '';

            contentDiv.appendChild(h4);
            contentDiv.appendChild(p);

            div.appendChild(iconContainer);
            div.appendChild(contentDiv);
            transportContainer.appendChild(div);
        });
    } else if (transportContainer) {
        transportContainer.innerHTML = '<p class="text-gray-500 italic">Transportation information not available.</p>';
    }
}

/**
 * Initialize image gallery navigation
 * @param {Object} place - Place data
 */
function initImageGallery(place) {
    const mainImage = document.getElementById('main-image');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const thumbnailGallery = document.getElementById('thumbnail-gallery');
    const thumbnailContainer = document.getElementById('thumbnail-container');

    if (!mainImage || !prevBtn || !nextBtn) return;

    const images = place.images || [place.image];

    // Hide navigation if only one image
    if (images.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        if (thumbnailContainer) thumbnailContainer.style.display = 'none';
        return;
    }

    // Render thumbnails
    if (thumbnailGallery) {
        thumbnailGallery.innerHTML = images.map((img, index) => `
            <button 
                class="thumbnail-btn w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === 0 ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}"
                data-index="${index}"
            >
                <img src="${img}" alt="Thumbnail ${index + 1}" class="w-full h-full object-cover">
            </button>
        `).join('');

        // Thumbnail click events
        document.querySelectorAll('.thumbnail-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                currentImageIndex = index;
                updateGalleryImage(mainImage, images[index]);
                updateThumbnailActive(index);
            });
        });
    }

    // Previous image
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryImage(mainImage, images[currentImageIndex]);
        updateThumbnailActive(currentImageIndex);
    });

    // Next image
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryImage(mainImage, images[currentImageIndex]);
        updateThumbnailActive(currentImageIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
}

/**
 * Update active thumbnail
 * @param {number} index - Active index
 */
function updateThumbnailActive(index) {
    document.querySelectorAll('.thumbnail-btn').forEach((btn, i) => {
        if (i === index) {
            btn.classList.remove('border-transparent', 'opacity-60');
            btn.classList.add('border-white');
        } else {
            btn.classList.remove('border-white');
            btn.classList.add('border-transparent', 'opacity-60');
        }
    });
}

/**
 * Update gallery image with fade effect
 * @param {HTMLElement} imgElement - Image element
 * @param {string} src - Image source
 */
function updateGalleryImage(imgElement, src) {
    imgElement.style.opacity = '0';
    setTimeout(() => {
        imgElement.src = src;
        imgElement.onerror = function () {
            this.src = 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800';
        };
        imgElement.style.opacity = '0.8';
    }, 200);
}

/**
 * Initialize Get Directions button
 * @param {Object} place - Place data
 */
function initGetDirectionsButton(place) {
    const directionsBtn = document.querySelector('.directions-btn');
    if (!directionsBtn) return;

    directionsBtn.addEventListener('click', () => {
        if (place.location && place.location.lat && place.location.lng) {
            // Open Google Maps with coordinates
            const url = `https://www.google.com/maps/search/?api=1&query=${place.location.lat},${place.location.lng}`;
            window.open(url, '_blank');
            showNotification('🗺️ Opening Google Maps...', 'success');
        } else if (place.address) {
            // Search by address
            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`;
            window.open(url, '_blank');
            showNotification('🗺️ Opening Google Maps...', 'success');
        } else {
            showNotification('⚠️ Location not available for this place', 'warning');
        }
    });
}

/**
 * Render Hotels Nearby widget
 * @param {Object} place - Place data
 */
function renderHotelsNearby(place) {
    const container = document.getElementById('hotels-nearby-container');
    if (!container) return;

    // Get place name and location
    const placeName = place.name || 'this attraction';
    const placeId = place.id || 'place';

    // Determine destination based on place address or province
    // Try to extract city name from address
    let destination = 'Thailand';
    if (place.address) {
        // Simple extraction - look for common Thai city names
        const address = place.address.toLowerCase();
        if (address.includes('bangkok')) destination = 'Bangkok';
        else if (address.includes('chiang mai')) destination = 'Chiang Mai';
        else if (address.includes('phuket')) destination = 'Phuket';
        else if (address.includes('pattaya')) destination = 'Pattaya';
        else if (address.includes('krabi')) destination = 'Krabi';
        else if (address.includes('ayutthaya')) destination = 'Ayutthaya';
    }

    // Use the getHotelWidgetHTML function from hotels.js if available
    if (typeof getHotelWidgetHTML === 'function') {
        container.innerHTML = getHotelWidgetHTML(destination, placeId);
    } else {
        // Fallback HTML
        container.innerHTML = `
            <div class="bg-white rounded-xl p-8 shadow-lg">
                <div class="text-center mb-8">
                    <i class="fas fa-hotel text-5xl text-teal-600 mb-4"></i>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Stay Close to ${escapeHtml(placeName)}</h3>
                    <p class="text-gray-600">Find convenient hotels near this attraction</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="hotels.html" target="_blank"
                       class="block py-4 px-6 bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold rounded-lg hover:from-pink-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl text-center">
                        <i class="fas fa-search mr-2"></i>
                        Search on Agoda
                        <span class="block text-xs mt-1 opacity-90">Best prices in Asia</span>
                    </a>

                    <a href="hotels.html" target="_blank"
                       class="block py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl text-center">
                        <i class="fas fa-search mr-2"></i>
                        Search on Booking.com
                        <span class="block text-xs mt-1 opacity-90">Worldwide hotels</span>
                    </a>
                </div>

                <p class="text-center text-sm text-gray-500 mt-6">
                    <i class="fas fa-info-circle mr-1"></i>
                    Compare prices to find the best deal for your stay
                </p>
            </div>
        `;
    }

    console.log(`✓ Hotels nearby widget rendered for: ${placeName}`);
}
