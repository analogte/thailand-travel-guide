// Data Loader Module
// Handles loading and caching of JSON data

let provincesData = [];
let destinationsData = [];
let dataLoaded = false;

/**
 * Load data from JSON files
 * @returns {Promise<{provinces: Array, destinations: Array}>}
 */
async function loadData() {
    if (dataLoaded) {
        return { provinces: provincesData, destinations: destinationsData };
    }

    try {
        const [provincesRes, destinationsRes] = await Promise.all([
            fetch('data/provinces.json'),
            fetch('data/destinations.json')
        ]);

        if (!provincesRes.ok || !destinationsRes.ok) {
            throw new Error('Failed to fetch data files');
        }

        provincesData = await provincesRes.json();
        destinationsData = await destinationsRes.json();
        dataLoaded = true;

        return { provinces: provincesData, destinations: destinationsData };
    } catch (error) {
        showNotification('⚠️ Error loading data. Please refresh the page.', 'error');
        return { provinces: [], destinations: [] };
    }
}

/**
 * Get provinces data
 * @returns {Array}
 */
function getProvinces() {
    return provincesData;
}

/**
 * Get destinations data
 * @returns {Array}
 */
function getDestinations() {
    return destinationsData;
}

/**
 * Get open destinations only
 * @returns {Array}
 */
function getOpenDestinations() {
    return destinationsData.filter(d => d.isOpen === true);
}
