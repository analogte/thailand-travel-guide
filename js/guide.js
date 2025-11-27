// Guide Page Module
// Handles currency converter, weather widget, and travel tools

/**
 * Initialize guide page features
 */
function initGuidePage() {
    if (!document.querySelector('.currency-converter') && !document.querySelector('.weather-widget')) {
        return;
    }

    renderBreadcrumbs([
        { label: 'Travel Guide', url: 'guide.html' }
    ]);

    initCurrencyConverter();
    initWeatherWidget();
    initDestinationQuiz();

    console.log('✓ Guide page initialized');
}

/**
 * Initialize currency converter
 */
function initCurrencyConverter() {
    const amountInput = document.querySelector('.amount-input');
    const currencySelect = document.querySelector('.currency-select');
    const resultDisplay = document.querySelector('.result-display');

    if (!amountInput || !currencySelect || !resultDisplay) return;

    // Exchange rates (approximate, should be updated from API)
    const exchangeRates = {
        'USD': 35.5,
        'EUR': 38.2,
        'GBP': 44.8,
        'JPY': 0.24,
        'CNY': 4.9,
        'AUD': 23.5,
        'SGD': 26.3,
        'MYR': 7.8,
        'KRW': 0.027
    };

    function updateConversion() {
        const amount = parseFloat(amountInput.value);
        const currency = currencySelect.value;

        if (isNaN(amount) || amount < 0) {
            resultDisplay.textContent = '...';
            return;
        }

        const rate = exchangeRates[currency] || 1;
        const result = (amount * rate).toFixed(2);

        resultDisplay.textContent = `${result.toLocaleString()} THB`;
    }

    amountInput.addEventListener('input', updateConversion);
    currencySelect.addEventListener('change', updateConversion);

    // Initial calculation
    updateConversion();

    console.log('✓ Currency converter initialized');
}

/**
 * Initialize weather widget
 */
function initWeatherWidget() {
    const citySelect = document.getElementById('city-select');
    if (!citySelect) return;

    // Mock weather data (should be fetched from API)
    const weatherData = {
        'bangkok': {
            temp: 32,
            condition: 'Partly Cloudy',
            humidity: 75,
            icon: 'fa-cloud-sun'
        },
        'chiangmai': {
            temp: 28,
            condition: 'Clear Sky',
            humidity: 60,
            icon: 'fa-sun'
        },
        'phuket': {
            temp: 30,
            condition: 'Scattered Clouds',
            humidity: 80,
            icon: 'fa-cloud'
        },
        'pattaya': {
            temp: 31,
            condition: 'Sunny',
            humidity: 70,
            icon: 'fa-sun'
        },
        'krabi': {
            temp: 29,
            condition: 'Partly Cloudy',
            humidity: 78,
            icon: 'fa-cloud-sun'
        }
    };

    citySelect.addEventListener('change', (e) => {
        const city = e.target.value;
        const data = weatherData[city];
        const display = document.getElementById('weather-display');

        if (!data || !display) return;

        // Show loading state
        display.style.opacity = '0.5';

        setTimeout(() => {
            const tempDisplay = document.getElementById('temp-display');
            const conditionDisplay = document.getElementById('condition-display');
            const humidityDisplay = document.getElementById('humidity-display');
            const weatherIcon = document.getElementById('weather-icon');

            if (tempDisplay) tempDisplay.textContent = `${data.temp}°C`;
            if (conditionDisplay) conditionDisplay.textContent = data.condition;
            if (humidityDisplay) humidityDisplay.textContent = `Humidity: ${data.humidity}%`;
            if (weatherIcon) weatherIcon.className = `fas ${data.icon} text-6xl text-yellow-500`;

            display.style.opacity = '1';
        }, 500);
    });

    // Trigger initial load
    if (citySelect.value) {
        citySelect.dispatchEvent(new Event('change'));
    }

    console.log('✓ Weather widget initialized');
}

/**
 * Initialize destination quiz
 */
function initDestinationQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    if (quizOptions.length === 0) return;

    const quizResults = {
        'beach': {
            title: 'Beach Paradise',
            destinations: ['Phuket', 'Krabi', 'Koh Samui'],
            description: 'You love sun, sand, and sea! Thailand\'s southern islands are perfect for you.',
            icon: 'fa-umbrella-beach'
        },
        'culture': {
            title: 'Cultural Explorer',
            destinations: ['Bangkok', 'Chiang Mai', 'Ayutthaya'],
            description: 'You appreciate history and tradition. Explore ancient temples and rich heritage.',
            icon: 'fa-temple'
        },
        'adventure': {
            title: 'Adventure Seeker',
            destinations: ['Chiang Mai', 'Pai', 'Kanchanaburi'],
            description: 'You crave excitement! Try trekking, zip-lining, and outdoor activities.',
            icon: 'fa-hiking'
        },
        'food': {
            title: 'Food Enthusiast',
            destinations: ['Bangkok', 'Chiang Mai', 'Phuket'],
            description: 'You\'re all about the cuisine! Discover street food and authentic Thai flavors.',
            icon: 'fa-utensils'
        }
    };

    quizOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove active class from all
            quizOptions.forEach(opt => {
                opt.classList.remove('border-teal-600', 'bg-teal-50', 'ring-2', 'ring-teal-600');
                opt.classList.add('border-gray-200');
            });

            // Add active class to clicked
            this.classList.remove('border-gray-200');
            this.classList.add('border-teal-600', 'bg-teal-50', 'ring-2', 'ring-teal-600');

            // Get quiz result
            const preference = this.dataset.preference;
            const result = quizResults[preference];

            // Show result
            setTimeout(() => {
                const resultDiv = document.getElementById('quiz-result');
                if (resultDiv && result) {
                    resultDiv.innerHTML = `
                        <div class="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 rounded-xl">
                            <div class="flex items-center mb-4">
                                <i class="fas ${result.icon} text-4xl mr-4"></i>
                                <h3 class="text-2xl font-bold">${result.title}</h3>
                            </div>
                            <p class="text-lg mb-4">${result.description}</p>
                            <div class="bg-white/20 rounded-lg p-4">
                                <p class="font-semibold mb-2">Recommended Destinations:</p>
                                <div class="flex flex-wrap gap-2">
                                    ${result.destinations.map(dest => `
                                        <span class="bg-white/30 px-3 py-1 rounded-full text-sm">
                                            ${dest}
                                        </span>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                    resultDiv.classList.remove('hidden');
                    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 300);
        });
    });

    console.log('✓ Destination quiz initialized');
}

/**
 * Initialize travel tips accordion
 */
function initTravelTips() {
    const tipCards = document.querySelectorAll('.tip-card');

    tipCards.forEach(card => {
        card.addEventListener('click', function () {
            this.classList.toggle('expanded');
            const content = this.querySelector('.tip-content');
            if (content) {
                content.classList.toggle('hidden');
            }
        });
    });
}
