/**
 * Blog Page JavaScript
 * Handles blog posts loading and display
 */

// Sample blog posts data (SEO-optimized content)
const blogPosts = [
    {
        id: 1,
        title: "10 Must-Visit Temples in Bangkok: A Complete Guide",
        slug: "bangkok-temples-guide",
        excerpt: "Discover the most stunning temples in Bangkok, from the iconic Wat Phra Kaew to hidden gems. Complete with visiting hours, entrance fees, and insider tips.",
        category: "Travel Guides",
        categorySlug: "guides",
        author: "Thailand Guide Team",
        date: "2024-11-15",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1563492065213-f0e8c1c5b8e2?w=800&auto=format&fit=crop",
        featured: true,
        tags: ["Bangkok", "Temples", "Culture", "Sightseeing"]
    },
    {
        id: 2,
        title: "Where to Stay in Phuket: Best Areas and Hotels for Every Budget",
        slug: "phuket-hotels-guide",
        excerpt: "From luxury beachfront resorts to budget-friendly hostels, find the perfect accommodation in Phuket. Includes neighborhood guides and hotel recommendations.",
        category: "Hotels",
        categorySlug: "hotels",
        author: "Sarah Johnson",
        date: "2024-11-20",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
        featured: true,
        tags: ["Phuket", "Hotels", "Accommodation", "Beach"]
    },
    {
        id: 3,
        title: "The Ultimate Bangkok Street Food Guide: 15 Dishes You Must Try",
        slug: "bangkok-street-food-guide",
        excerpt: "Navigate Bangkok's incredible street food scene like a local. From Pad Thai to Mango Sticky Rice, discover the best dishes and where to find them.",
        category: "Food & Dining",
        categorySlug: "food",
        author: "Michael Chen",
        date: "2024-11-25",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop",
        featured: true,
        tags: ["Bangkok", "Food", "Street Food", "Local Cuisine"]
    },
    {
        id: 4,
        title: "Chiang Mai Digital Nomad Guide: Best Cafes, Coworking Spaces & Neighborhoods",
        slug: "chiang-mai-digital-nomad-guide",
        excerpt: "Everything digital nomads need to know about living and working in Chiang Mai. Includes visa information, cost of living, and best places to work.",
        category: "Travel Tips",
        categorySlug: "tips",
        author: "Emma Wilson",
        date: "2024-11-28",
        readTime: "15 min read",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop",
        featured: false,
        tags: ["Chiang Mai", "Digital Nomad", "Remote Work", "Cafes"]
    },
    {
        id: 5,
        title: "Island Hopping in Thailand: The Perfect 2-Week Itinerary",
        slug: "thailand-island-hopping-itinerary",
        excerpt: "Plan the ultimate island-hopping adventure through Thailand's most beautiful islands. Includes Phuket, Krabi, Koh Samui, and hidden gems.",
        category: "Travel Guides",
        categorySlug: "guides",
        author: "Thailand Guide Team",
        date: "2024-12-01",
        readTime: "14 min read",
        image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&auto=format&fit=crop",
        featured: false,
        tags: ["Islands", "Itinerary", "Beach", "Adventure"]
    },
    {
        id: 6,
        title: "Thai Massage Guide: What to Expect and Best Spas in Bangkok",
        slug: "thai-massage-guide-bangkok",
        excerpt: "Learn about traditional Thai massage, what to expect during your first session, and discover the best spas in Bangkok for authentic experiences.",
        category: "Culture",
        categorySlug: "culture",
        author: "Sarah Johnson",
        date: "2024-11-10",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop",
        featured: false,
        tags: ["Massage", "Wellness", "Bangkok", "Culture"]
    },
    {
        id: 7,
        title: "Songkran Festival 2025: Complete Guide to Thailand's Water Festival",
        slug: "songkran-festival-guide-2025",
        excerpt: "Everything you need to know about celebrating Songkran in Thailand. Best cities to visit, what to bring, and how to join the world's biggest water fight.",
        category: "Culture",
        categorySlug: "culture",
        author: "Michael Chen",
        date: "2024-11-05",
        readTime: "9 min read",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop",
        featured: false,
        tags: ["Songkran", "Festival", "Culture", "Events"]
    },
    {
        id: 8,
        title: "Budget Travel Thailand: How to Explore on $30 a Day",
        slug: "budget-travel-thailand-guide",
        excerpt: "Discover how to travel Thailand on a shoestring budget. Tips for cheap accommodation, transportation, food, and activities without sacrificing experience.",
        category: "Travel Tips",
        categorySlug: "tips",
        author: "Emma Wilson",
        date: "2024-10-30",
        readTime: "11 min read",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop",
        featured: false,
        tags: ["Budget Travel", "Backpacking", "Money Saving", "Tips"]
    }
];

/**
 * Create blog post card HTML
 */
function createBlogCard(post, featured = false) {
    const cardClass = featured
        ? "bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        : "bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300";

    const imageHeight = featured ? "h-80" : "h-64";

    return `
        <article class="${cardClass}">
            <div class="relative ${imageHeight} overflow-hidden group">
                <img src="${post.image}" alt="${post.title}" 
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute top-4 left-4">
                    <span class="inline-block bg-${getCategoryColor(post.categorySlug)}-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        ${post.category}
                    </span>
                </div>
                ${post.featured ? '<div class="absolute top-4 right-4"><span class="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold"><i class="fas fa-star mr-1"></i>Featured</span></div>' : ''}
            </div>
            
            <div class="p-6">
                <div class="flex items-center text-sm text-gray-500 mb-3">
                    <span><i class="far fa-calendar mr-1"></i>${formatDate(post.date)}</span>
                    <span class="mx-2">•</span>
                    <span><i class="far fa-clock mr-1"></i>${post.readTime}</span>
                </div>
                
                <h3 class="font-display text-xl md:text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                    <a href="blog-post.html?slug=${post.slug}">${post.title}</a>
                </h3>
                
                <p class="text-gray-600 mb-4 leading-relaxed">
                    ${post.excerpt}
                </p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${post.tags.map(tag => `
                        <span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                            #${tag}
                        </span>
                    `).join('')}
                </div>
                
                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            ${post.author.charAt(0)}
                        </div>
                        <div>
                            <div class="text-sm font-semibold text-gray-800">${post.author}</div>
                        </div>
                    </div>
                    <a href="blog-post.html?slug=${post.slug}" 
                       class="text-blue-600 hover:text-blue-700 font-semibold flex items-center">
                        Read More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </article>
    `;
}

/**
 * Create list-style blog post HTML for recent posts
 */
function createBlogListItem(post) {
    return `
        <article class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row">
            <div class="md:w-1/3 h-64 md:h-auto relative overflow-hidden group">
                <img src="${post.image}" alt="${post.title}" 
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute top-4 left-4">
                    <span class="inline-block bg-${getCategoryColor(post.categorySlug)}-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        ${post.category}
                    </span>
                </div>
            </div>
            
            <div class="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                <div>
                    <div class="flex items-center text-sm text-gray-500 mb-3">
                        <span><i class="far fa-calendar mr-1"></i>${formatDate(post.date)}</span>
                        <span class="mx-2">•</span>
                        <span><i class="far fa-clock mr-1"></i>${post.readTime}</span>
                    </div>
                    
                    <h3 class="font-display text-2xl md:text-3xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                        <a href="blog-post.html?slug=${post.slug}">${post.title}</a>
                    </h3>
                    
                    <p class="text-gray-600 mb-4 leading-relaxed">
                        ${post.excerpt}
                    </p>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${post.tags.map(tag => `
                            <span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                                #${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div class="flex items-center">
                        <div class="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            ${post.author.charAt(0)}
                        </div>
                        <div>
                            <div class="text-sm font-semibold text-gray-800">${post.author}</div>
                        </div>
                    </div>
                    <a href="blog-post.html?slug=${post.slug}" 
                       class="text-blue-600 hover:text-blue-700 font-semibold flex items-center">
                        Read More <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </article>
    `;
}

/**
 * Get category color
 */
function getCategoryColor(categorySlug) {
    const colors = {
        guides: 'blue',
        food: 'orange',
        culture: 'purple',
        hotels: 'green',
        tips: 'yellow',
        activities: 'pink'
    };
    return colors[categorySlug] || 'gray';
}

/**
 * Format date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Load featured posts
 */
function loadFeaturedPosts() {
    const container = document.getElementById('featured-posts');
    if (!container) return;

    const featured = blogPosts.filter(post => post.featured);
    container.innerHTML = featured.map(post => createBlogCard(post, true)).join('');
}

/**
 * Load recent posts
 */
function loadRecentPosts() {
    const container = document.getElementById('recent-posts');
    if (!container) return;

    const recent = blogPosts
        .filter(post => !post.featured)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = recent.map(post => createBlogListItem(post)).join('');
}

/**
 * Initialize blog page
 */
document.addEventListener('DOMContentLoaded', function () {
    loadFeaturedPosts();
    loadRecentPosts();
});
