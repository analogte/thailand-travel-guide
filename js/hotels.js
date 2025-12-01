/**
 * Hotels Page JavaScript
 * Handles hotel recommendations and affiliate integrations
 */

// Sample hotel data with affiliate links
const hotelRecommendations = {
    bangkok: [
        {
            name: "The Siam Hotel",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
            rating: 5,
            price: "From $250/night",
            description: "Luxury riverside boutique hotel with Art Deco design",
            features: ["Pool", "Spa", "Restaurant", "River View"],
            agodaLink: "https://www.agoda.com/the-siam-hotel/hotel/bangkok-th.html?cid=YOUR_AFFILIATE_ID",
            bookingLink: "https://www.booking.com/hotel/th/the-siam.html?aid=YOUR_AFFILIATE_ID"
        },
        {
            name: "Mandarin Oriental Bangkok",
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop",
            rating: 5,
            price: "From $300/night",
            description: "Iconic luxury hotel on the Chao Phraya River",
            features: ["Pool", "Spa", "Fine Dining", "River View"],
            agodaLink: "https://www.agoda.com/mandarin-oriental-bangkok/hotel/bangkok-th.html?cid=YOUR_AFFILIATE_ID",
            bookingLink: "https://www.booking.com/hotel/th/mandarin-oriental-bangkok.html?aid=YOUR_AFFILIATE_ID"
        },
        {
            name: "137 Pillars Suites & Residences",
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop",
            rating: 5,
            price: "From $200/night",
            description: "Modern luxury suites in the heart of Bangkok",
            features: ["Pool", "Gym", "Restaurant", "City View"],
            agodaLink: "https://www.agoda.com/137-pillars-suites-residences-bangkok/hotel/bangkok-th.html?cid=YOUR_AFFILIATE_ID",
            bookingLink: "https://www.booking.com/hotel/th/137-pillars-suites-residences-bangkok.html?aid=YOUR_AFFILIATE_ID"
        }
    ],
    phuket: [
        {
            name: "Trisara Phuket",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
            rating: 5,
            price: "From $400/night",
            description: "Ultra-luxury beachfront resort with private villas",
            features: ["Private Pool", "Beach Access", "Spa", "Fine Dining"],
            agodaLink: "https://www.agoda.com/trisara-phuket/hotel/phuket-th.html?cid=YOUR_AFFILIATE_ID",
            bookingLink: "https://www.booking.com/hotel/th/trisara.html?aid=YOUR_AFFILIATE_ID"
        },
        {
            name: "Anantara Mai Khao Phuket Villas",
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop",
            rating: 5,
            price: "From $350/night",
            description: "Beachfront villas with private pools",
            features: ["Private Pool", "Beach", "Spa", "Restaurant"],
            agodaLink: "https://www.agoda.com/anantara-mai-khao-phuket-villas/hotel/phuket-th.html?cid=YOUR_AFFILIATE_ID",
            bookingLink: "https://www.booking.com/hotel/th/anantara-phuket-villas.html?aid=YOUR_AFFILIATE_ID"
        },
        {
            name: "The Nai Harn",
            image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop",
            rating: 5,
            price: "From $280/night",
            description: "Boutique resort overlooking Nai Harn Beach",
            features: ["Pool", "Beach View", "Spa", "Restaurant"],
            agodaLink: "https://www.agoda.com/the-nai-harn-phuket/hotel/phuket-th.html?cid=YOUR_AFFILIATE_ID",
            bookingLink: "https://www.booking.com/hotel/th/the-nai-harn.html?aid=YOUR_AFFILIATE_ID"
        }
    ],
    chiangmai: [
        {
            name: "137 Pillars House",
            image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&auto=format&fit=crop",
            rating: 5,
            price: "From $220/night",
            description: "Colonial-style luxury boutique hotel",
            features: ["Pool", "Spa", "Garden", "Restaurant"],
            agodaLink: "https://www.agoda.com/137-pillars-house/hotel/chiang-mai-th.html?cid=YOUR_AFFILIATE_ID",
            bookingLink: "https://www.booking.com/hotel/th/137-pillars-house.html?aid=YOUR_AFFILIATE_ID"
        },
        {
            name: "Four Seasons Resort Chiang Mai",
            image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&auto=format&fit=crop",
            rating: 5,
            price: "From $300/night",
            description: "Luxury resort surrounded by rice paddies",
            features: ["Pool", "Spa", "Rice Paddies", "Fine Dining"],
            agodaLink: "https://www.agoda.com/four-seasons-resort-chiang-mai/hotel/chiang-mai-th.html?cid=YOUR_AFFILIATE_ID",
            bookingLink: "https://www.booking.com/hotel/th/four-seasons-resort-chiang-mai.html?aid=YOUR_AFFILIATE_ID"
        },
        {
            name: "Dhara Dhevi Chiang Mai",
            image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop",
            rating: 5,
            price: "From $250/night",
            description: "Palatial resort inspired by Lanna architecture",
            features: ["Pool", "Spa", "Cultural Activities", "Restaurant"],
            agodaLink: "https://www.agoda.com/dhara-dhevi-chiang-mai/hotel/chiang-mai-th.html?cid=YOUR_AFFILIATE_ID",
            bookingLink: "https://www.booking.com/hotel/th/mandarin-oriental-dhara-dhevi.html?aid=YOUR_AFFILIATE_ID"
        }
    ]
};

/**
 * Create hotel card HTML
 */
function createHotelCard(hotel) {
    const starsHTML = Array(hotel.rating).fill('<i class="fas fa-star text-yellow-400"></i>').join('');
    const featuresHTML = hotel.features.map(feature => 
        `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <i class="fas fa-check mr-1"></i>${feature}
        </span>`
    ).join('');

    return `
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="relative h-64 overflow-hidden group">
                <img src="${hotel.image}" alt="${hotel.name}" 
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div class="flex text-sm">
                        ${starsHTML}
                    </div>
                </div>
            </div>
            
            <div class="p-6">
                <h4 class="font-display text-xl font-bold text-gray-800 mb-2">${hotel.name}</h4>
                <p class="text-gray-600 mb-4 text-sm leading-relaxed">${hotel.description}</p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${featuresHTML}
                </div>
                
                <div class="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div>
                        <div class="text-sm text-gray-500">Price</div>
                        <div class="text-lg font-bold text-gray-800">${hotel.price}</div>
                    </div>
                </div>
                
                <div class="flex gap-2">
                    <a href="${hotel.agodaLink}" target="_blank" rel="noopener noreferrer"
                       class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 rounded-lg transition-colors">
                        <i class="fas fa-external-link-alt mr-1"></i> Agoda
                    </a>
                    <a href="${hotel.bookingLink}" target="_blank" rel="noopener noreferrer"
                       class="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center font-semibold py-3 rounded-lg transition-colors">
                        <i class="fas fa-external-link-alt mr-1"></i> Booking
                    </a>
                </div>
            </div>
        </div>
    `;
}

/**
 * Load hotel recommendations
 */
function loadHotelRecommendations() {
    // Load Bangkok hotels
    const bangkokContainer = document.getElementById('bangkok-hotels');
    if (bangkokContainer && hotelRecommendations.bangkok) {
        bangkokContainer.innerHTML = hotelRecommendations.bangkok
            .map(hotel => createHotelCard(hotel))
            .join('');
    }

    // Load Phuket hotels
    const phuketContainer = document.getElementById('phuket-hotels');
    if (phuketContainer && hotelRecommendations.phuket) {
        phuketContainer.innerHTML = hotelRecommendations.phuket
            .map(hotel => createHotelCard(hotel))
            .join('');
    }

    // Load Chiang Mai hotels
    const chiangmaiContainer = document.getElementById('chiangmai-hotels');
    if (chiangmaiContainer && hotelRecommendations.chiangmai) {
        chiangmaiContainer.innerHTML = hotelRecommendations.chiangmai
            .map(hotel => createHotelCard(hotel))
            .join('');
    }
}

/**
 * Initialize Agoda Widget (Placeholder)
 * Replace this with actual Agoda affiliate widget code
 */
function initializeAgodaWidget() {
    // This is a placeholder
    // When you get your Agoda affiliate account, replace this with their widget code
    console.log('Agoda widget placeholder - Replace with actual widget code from Agoda Partner Program');
}

/**
 * Initialize Booking.com Widget (Placeholder)
 * Replace this with actual Booking.com affiliate widget code
 */
function initializeBookingWidget() {
    // This is a placeholder
    // When you get your Booking.com affiliate account, replace this with their widget code
    console.log('Booking.com widget placeholder - Replace with actual widget code from Booking.com Partner Program');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadHotelRecommendations();
    initializeAgodaWidget();
    initializeBookingWidget();
});
