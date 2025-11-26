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

        // Load places data
        const response = await fetch('data/places.json');
        if (!response.ok) {
            throw new Error('Failed to load places data');
        }

        const places = await response.json();
        const place = places.find(p => p.id === placeId);

        if (!place) {
            showNotification('⚠️ Place not found', 'error');
            setTimeout(() => {
                window.location.href = 'destinations.html';
            }, 1500);
            return;
        }

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

        // Initialize image gallery
        initImageGallery(place);

        // Initialize Get Directions button
        initGetDirectionsButton(place);

        hideLoading(document.body);

        console.log(`✓ Place detail page loaded: ${place.name}`);
    } catch (error) {
        console.error('❌ Error loading place data:', error);
        showNotification('⚠️ Error loading place data. Please try again.', 'error');
        hideLoading(document.body);
    }
}

/**
 * Render place content
 * @param {Object} place - Place data
 */
function renderPlaceContent(place) {
    // Hero Section
    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = place.image;
        mainImage.alt = place.name;
        mainImage.onerror = function() {
            this.src = 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800';
        };
    }

    // Header Info
    document.getElementById('place-name').innerText = place.name;
    document.getElementById('place-thai-name').innerText = place.thaiName;
    document.getElementById('place-rating').innerText = place.rating || 'N/A';
    document.getElementById('place-reviews').innerText = place.reviews
        ? `(${place.reviews.toLocaleString()} reviews)`
        : '';

    // Main Content
    document.getElementById('place-desc').innerText = place.description;

    // Sidebar Info
    document.getElementById('place-hours').innerText = place.openingHours || 'Not specified';
    document.getElementById('place-fee').innerText = place.entranceFee || 'Not specified';
    document.getElementById('place-dress').innerText = place.dressCode || 'Casual';
    document.getElementById('place-address').innerText = place.address || 'Address not available';

    // Highlights
    const highlightsList = document.getElementById('place-highlights');
    if (highlightsList && place.highlights) {
        highlightsList.innerHTML = '';
        place.highlights.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-teal-200 transition-colors';
            li.innerHTML = `
                <i class="fas fa-check-circle text-teal-500 mr-3 text-lg"></i>
                <span class="text-gray-700 font-medium">${item}</span>
            `;
            highlightsList.appendChild(li);
        });
    }

    // Tips
    const tipsList = document.getElementById('place-tips');
    if (tipsList && place.tips) {
        tipsList.innerHTML = '';
        place.tips.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-start';
            li.innerHTML = `
                <i class="fas fa-lightbulb text-yellow-500 mt-1 mr-3 flex-shrink-0"></i>
                <span class="text-gray-700">${item}</span>
            `;
            tipsList.appendChild(li);
        });
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

    if (!mainImage || !prevBtn || !nextBtn) return;

    const images = place.images || [place.image];

    // Hide navigation if only one image
    if (images.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    }

    // Previous image
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryImage(mainImage, images[currentImageIndex]);
    });

    // Next image
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryImage(mainImage, images[currentImageIndex]);
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
 * Update gallery image with fade effect
 * @param {HTMLElement} imgElement - Image element
 * @param {string} src - Image source
 */
function updateGalleryImage(imgElement, src) {
    imgElement.style.opacity = '0';
    setTimeout(() => {
        imgElement.src = src;
        imgElement.onerror = function() {
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
