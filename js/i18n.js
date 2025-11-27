// i18n (Internationalization) Module
// Multi-language support for Thailand Travel Guide

const translations = {
    en: {
        // Navigation
        nav: {
            home: 'Home',
            destinations: 'Destinations',
            culture: 'Culture',
            guide: 'Travel Guide'
        },

        // Home Page
        home: {
            title: 'Discover Thailand',
            subtitle: 'Experience the magic of the Land of Smiles - from golden temples and pristine beaches to vibrant street food and rich cultural heritage.',
            exploreBtn: 'Explore Destinations',
            guideBtn: 'Travel Guide',
            mustVisit: 'Must-Visit Destinations',
            mustVisitDesc: 'From bustling cities to serene islands, explore Thailand\'s most captivating destinations that offer unforgettable experiences for every type of traveler.',
            upcomingEvents: 'Upcoming Festivals & Events',
            upcomingEventsDesc: 'Experience the soul of Thailand through its most spectacular celebrations.',
            unseenGallery: 'Unseen Thailand Gallery',
            unseenGalleryDesc: 'Discover the hidden gems and breathtaking landscapes that make Thailand a photographer\'s paradise.',
            travelTips: 'Essential Travel Tips',
            travelTipsDesc: 'Everything you need to know for an amazing Thailand adventure',
            travelerStories: 'Traveler Stories',
            travelerStoriesDesc: 'Hear from travelers around the world who have fallen in love with the Land of Smiles.',
            readyToExplore: 'Ready to Start Your Journey?',
            readyToExploreDesc: 'From planning your itinerary to learning local customs, we have everything you need for an unforgettable Thai adventure.',
            newsletterTitle: 'Subscribe to our newsletter',
            newsletterPlaceholder: 'Enter your email',
            newsletterBtn: 'Subscribe',
            newsletterDesc: 'Get the latest travel tips and hidden gems delivered to your inbox.'
        },

        // Destinations Page
        destinations: {
            title: 'Explore Provinces',
            subtitle: 'Choose a destination to discover its hidden gems, local food, and unique culture.',
            searchPlaceholder: 'Search provinces...',
            filterAll: 'All',
            filterNorth: 'North',
            filterCentral: 'Central',
            filterSouth: 'South',
            noResults: 'No provinces found',
            noResultsDesc: 'Try adjusting your search or filters',
            explorePlaces: 'Explore Places'
        },

        // Province Detail
        province: {
            backToProvinces: 'Back to All Provinces',
            allPlaces: 'All',
            temples: 'Temples',
            food: 'Food',
            cafes: 'Cafes',
            nature: 'Nature',
            culture: 'Culture',
            viewDetails: 'View Details',
            noPlaces: 'No places found in this category yet.',
            checkBackSoon: 'Check back soon for more amazing destinations!'
        },

        // Place Detail
        place: {
            reviews: 'reviews',
            about: 'About',
            highlights: 'Highlights',
            localTips: 'Local Tips',
            visitorInfo: 'Visitor Information',
            openingHours: 'Opening Hours',
            entranceFee: 'Entrance Fee',
            dressCode: 'Dress Code',
            location: 'Location',
            getDirections: 'Get Directions',
            backToProvince: 'Back to Province'
        },

        // Common
        common: {
            loading: 'Loading...',
            city: 'City',
            beach: 'Beach',
            category: 'Category',
            region: 'Region',
            central: 'Central Thailand',
            north: 'Northern Thailand',
            south: 'Southern Thailand',
            east: 'Eastern Thailand',
            northeast: 'Northeastern Thailand',
            west: 'Western Thailand'
        },

        // Travel Tips
        tips: {
            bestTime: 'Best Time to Visit',
            bestTimeDesc: 'November to February offers cool, dry weather perfect for exploring temples and beaches.',
            currency: 'Currency',
            currencyDesc: 'Thai Baht (THB) is the local currency. ATMs are widely available and cards are accepted.',
            transportation: 'Transportation',
            transportationDesc: 'Use BTS/MRT in Bangkok, tuk-tuks for short trips, and domestic flights for longer distances.',
            cultureTitle: 'Culture',
            cultureDesc: 'Dress modestly at temples, remove shoes when entering homes, and smile often!'
        },

        // Notifications
        notifications: {
            subscribeSuccess: 'Thank you for subscribing!',
            subscribeError: 'Subscription failed. Please try again later.',
            alreadySubscribed: 'You are already subscribed!',
            invalidEmail: 'Please enter a valid email address',
            rateLimitExceeded: 'Too many attempts. Please wait {seconds} seconds.',
            newVersionAvailable: 'New version available! Refresh to update.',
            openingMaps: 'Opening Google Maps...',
            locationNotAvailable: 'Location not available for this place'
        },

        // Footer
        footer: {
            tagline: 'Your comprehensive guide to exploring the Land of Smiles. Discover temples, beaches, culture, and cuisine in amazing Thailand.',
            copyright: '© 2024 Thailand Travel Guide. Made with ❤️ for travelers worldwide.'
        }
    },

    th: {
        // Navigation
        nav: {
            home: 'หน้าแรก',
            destinations: 'จังหวัด',
            culture: 'วัฒนธรรม',
            guide: 'คู่มือท่องเที่ยว'
        },

        // Home Page
        home: {
            title: 'ค้นพบประเทศไทย',
            subtitle: 'สัมผัสความมหัศจรรย์ของดินแดนแห่งรอยยิ้ม - จากวัดทองคำและชายหาดที่บริสุทธิ์ ไปจนถึงอาหารริมทางที่มีชีวิตชีวาและมรดกทางวัฒนธรรมที่อุดมสมบูรณ์',
            exploreBtn: 'สำรวจจังหวัด',
            guideBtn: 'คู่มือท่องเที่ยว',
            mustVisit: 'จุดหมายที่ต้องไป',
            mustVisitDesc: 'จากเมืองที่พลุกพล่านไปจนถึงเกาะที่เงียบสงบ สำรวจจุดหมายปลายทางที่น่าหลงใหลที่สุดของประเทศไทยที่มอบประสบการณ์ที่ไม่มีวันลืมสำหรับนักท่องเที่ยวทุกประเภท',
            upcomingEvents: 'เทศกาลและกิจกรรมที่กำลังจะมาถึง',
            upcomingEventsDesc: 'สัมผัสจิตวิญญาณของประเทศไทยผ่านการเฉลิมฉลองที่งดงามที่สุด',
            unseenGallery: 'แกลเลอรีประเทศไทยที่ไม่เคยเห็น',
            unseenGalleryDesc: 'ค้นพบอัญมณีที่ซ่อนอยู่และทิวทัศน์อันน่าทึ่งที่ทำให้ประเทศไทยเป็นสวรรค์สำหรับช่างภาพ',
            travelTips: 'เคล็ดลับการเดินทางที่จำเป็น',
            travelTipsDesc: 'ทุกสิ่งที่คุณต้องรู้สำหรับการผจญภัยในประเทศไทยที่น่าทึ่ง',
            travelerStories: 'เรื่องราวของนักท่องเที่ยว',
            travelerStoriesDesc: 'ฟังจากนักท่องเที่ยวทั่วโลกที่ตกหลุมรักดินแดนแห่งรอยยิ้ม',
            readyToExplore: 'พร้อมที่จะเริ่มต้นการเดินทางของคุณแล้วหรือยัง?',
            readyToExploreDesc: 'ตั้งแต่การวางแผนเส้นทางของคุณไปจนถึงการเรียนรู้ประเพณีท้องถิ่น เรามีทุกสิ่งที่คุณต้องการสำหรับการผจญภัยในประเทศไทยที่ไม่มีวันลืม',
            newsletterTitle: 'สมัครรับจดหมายข่าว',
            newsletterPlaceholder: 'ป้อนอีเมลของคุณ',
            newsletterBtn: 'สมัคร',
            newsletterDesc: 'รับเคล็ดลับการเดินทางล่าสุดและอัญมณีที่ซ่อนอยู่ส่งตรงถึงกล่องจดหมายของคุณ'
        },

        // Destinations Page
        destinations: {
            title: 'สำรวจจังหวัด',
            subtitle: 'เลือกจุดหมายปลายทางเพื่อค้นพบอัญมณีที่ซ่อนอยู่ อาหารท้องถิ่น และวัฒนธรรมที่เป็นเอกลักษณ์',
            searchPlaceholder: 'ค้นหาจังหวัด...',
            filterAll: 'ทั้งหมด',
            filterNorth: 'ภาคเหนือ',
            filterCentral: 'ภาคกลาง',
            filterSouth: 'ภาคใต้',
            noResults: 'ไม่พบจังหวัด',
            noResultsDesc: 'ลองปรับการค้นหาหรือตัวกรองของคุณ',
            explorePlaces: 'สำรวจสถานที่'
        },

        // Province Detail
        province: {
            backToProvinces: 'กลับไปที่จังหวัดทั้งหมด',
            allPlaces: 'ทั้งหมด',
            temples: 'วัด',
            food: 'อาหาร',
            cafes: 'คาเฟ่',
            nature: 'ธรรมชาติ',
            culture: 'วัฒนธรรม',
            viewDetails: 'ดูรายละเอียด',
            noPlaces: 'ไม่พบสถานที่ในหมวดหมู่นี้ในขณะนี้',
            checkBackSoon: 'กลับมาตรวจสอบอีกครั้งเร็วๆ นี้สำหรับจุดหมายปลายทางที่น่าทึ่งเพิ่มเติม!'
        },

        // Place Detail
        place: {
            reviews: 'รีวิว',
            about: 'เกี่ยวกับ',
            highlights: 'ไฮไลท์',
            localTips: 'เคล็ดลับท้องถิ่น',
            visitorInfo: 'ข้อมูลสำหรับผู้เยี่ยมชม',
            openingHours: 'เวลาทำการ',
            entranceFee: 'ค่าเข้าชม',
            dressCode: 'การแต่งกาย',
            location: 'ที่ตั้ง',
            getDirections: 'รับเส้นทาง',
            backToProvince: 'กลับไปที่จังหวัด'
        },

        // Common
        common: {
            loading: 'กำลังโหลด...',
            city: 'เมือง',
            beach: 'ชายหาด',
            category: 'หมวดหมู่',
            region: 'ภูมิภาค',
            central: 'ภาคกลาง',
            north: 'ภาคเหนือ',
            south: 'ภาคใต้',
            east: 'ภาคตะวันออก',
            northeast: 'ภาคตะวันออกเฉียงเหนือ',
            west: 'ภาคตะวันตก'
        },

        // Travel Tips
        tips: {
            bestTime: 'เวลาที่ดีที่สุดในการเยี่ยมชม',
            bestTimeDesc: 'พฤศจิกายนถึงกุมภาพันธ์มีอากาศเย็นและแห้งเหมาะสำหรับการสำรวจวัดและชายหาด',
            currency: 'สกุลเงิน',
            currencyDesc: 'บาทไทย (THB) เป็นสกุลเงินท้องถิ่น ตู้ ATM มีอยู่ทั่วไปและรับบัตรเครดิต',
            transportation: 'การเดินทาง',
            transportationDesc: 'ใช้ BTS/MRT ในกรุงเทพฯ ตุ๊กตุ๊กสำหรับการเดินทางระยะสั้น และเที่ยวบินภายในประเทศสำหรับระยะทางไกล',
            cultureTitle: 'วัฒนธรรม',
            cultureDesc: 'แต่งกายอย่างสุภาพที่วัด ถอดรองเท้าเมื่อเข้าบ้าน และยิ้มบ่อยๆ!'
        },

        // Notifications
        notifications: {
            subscribeSuccess: 'ขอบคุณที่สมัครรับข่าวสาร!',
            subscribeError: 'การสมัครล้มเหลว กรุณาลองใหม่ภายหลัง',
            alreadySubscribed: 'คุณได้สมัครรับข่าวสารแล้ว!',
            invalidEmail: 'กรุณาป้อนที่อยู่อีเมลที่ถูกต้อง',
            rateLimitExceeded: 'พยายามมากเกินไป กรุณารอ {seconds} วินาที',
            newVersionAvailable: 'มีเวอร์ชันใหม่! รีเฟรชเพื่ออัพเดท',
            openingMaps: 'กำลังเปิด Google Maps...',
            locationNotAvailable: 'ตำแหน่งไม่พร้อมใช้งานสำหรับสถานที่นี้'
        },

        // Footer
        footer: {
            tagline: 'คู่มือที่ครอบคลุมของคุณในการสำรวจดินแดนแห่งรอยยิ้ม ค้นพบวัด ชายหาด วัฒนธรรม และอาหารในประเทศไทยที่น่าทึ่ง',
            copyright: '© 2024 คู่มือท่องเที่ยวประเทศไทย สร้างด้วย ❤️ สำหรับนักท่องเที่ยวทั่วโลก'
        }
    },

    cn: {
        // Navigation
        nav: {
            home: '首页',
            destinations: '目的地',
            culture: '文化',
            guide: '旅游指南'
        },

        // Home Page
        home: {
            title: '探索泰国',
            subtitle: '体验微笑之国的魔力 - 从金色寺庙和原始海滩到充满活力的街头美食和丰富的文化遗产。',
            exploreBtn: '探索目的地',
            guideBtn: '旅游指南',
            mustVisit: '必游目的地',
            mustVisitDesc: '从繁华的城市到宁静的岛屿，探索泰国最迷人的目的地，为每一类旅行者提供难忘的体验。',
            upcomingEvents: '即将到来的节日和活动',
            upcomingEventsDesc: '通过最壮观的庆祝活动体验泰国的灵魂。',
            unseenGallery: '未见过的泰国画廊',
            unseenGalleryDesc: '发现隐藏的宝石和令人叹为观止的风景，使泰国成为摄影师的天堂。',
            travelTips: '基本旅行提示',
            travelTipsDesc: '您需要了解的一切，以获得惊人的泰国冒险',
            travelerStories: '旅行者故事',
            travelerStoriesDesc: '听听世界各地爱上微笑之国的旅行者的故事。',
            readyToExplore: '准备开始您的旅程了吗？',
            readyToExploreDesc: '从规划您的行程到学习当地习俗，我们拥有您所需的一切，以实现难忘的泰国冒险。',
            newsletterTitle: '订阅我们的通讯',
            newsletterPlaceholder: '输入您的电子邮件',
            newsletterBtn: '订阅',
            newsletterDesc: '获取最新的旅行提示和隐藏的宝石，直接发送到您的收件箱。'
        },

        // Destinations Page
        destinations: {
            title: '探索省份',
            subtitle: '选择一个目的地来发现其隐藏的宝石、当地美食和独特文化。',
            searchPlaceholder: '搜索省份...',
            filterAll: '全部',
            filterNorth: '北部',
            filterCentral: '中部',
            filterSouth: '南部',
            noResults: '未找到省份',
            noResultsDesc: '尝试调整您的搜索或过滤器',
            explorePlaces: '探索地点'
        },

        // Province Detail
        province: {
            backToProvinces: '返回所有省份',
            allPlaces: '全部',
            temples: '寺庙',
            food: '美食',
            cafes: '咖啡馆',
            nature: '自然',
            culture: '文化',
            viewDetails: '查看详情',
            noPlaces: '此类别中暂时没有找到地点。',
            checkBackSoon: '请尽快回来查看更多精彩的目的地！'
        },

        // Place Detail
        place: {
            reviews: '评论',
            about: '关于',
            highlights: '亮点',
            localTips: '当地提示',
            visitorInfo: '访客信息',
            openingHours: '开放时间',
            entranceFee: '入场费',
            dressCode: '着装要求',
            location: '位置',
            getDirections: '获取路线',
            backToProvince: '返回省份'
        },

        // Common
        common: {
            loading: '加载中...',
            city: '城市',
            beach: '海滩',
            category: '类别',
            region: '地区',
            central: '泰国中部',
            north: '泰国北部',
            south: '泰国南部',
            east: '泰国东部',
            northeast: '泰国东北部',
            west: '泰国西部'
        },

        // Travel Tips
        tips: {
            bestTime: '最佳访问时间',
            bestTimeDesc: '11月至2月提供凉爽干燥的天气，非常适合探索寺庙和海滩。',
            currency: '货币',
            currencyDesc: '泰铢（THB）是当地货币。ATM机广泛可用，接受卡支付。',
            transportation: '交通',
            transportationDesc: '在曼谷使用BTS/MRT，短途旅行使用嘟嘟车，长途旅行使用国内航班。',
            cultureTitle: '文化',
            cultureDesc: '在寺庙穿着得体，进入房屋时脱鞋，并经常微笑！'
        },

        // Notifications
        notifications: {
            subscribeSuccess: '感谢您的订阅！',
            subscribeError: '订阅失败。请稍后再试。',
            alreadySubscribed: '您已经订阅了！',
            invalidEmail: '请输入有效的电子邮件地址',
            rateLimitExceeded: '尝试次数过多。请等待 {seconds} 秒。',
            newVersionAvailable: '有新版本！刷新以更新。',
            openingMaps: '正在打开谷歌地图...',
            locationNotAvailable: '此地点的位置不可用'
        },

        // Footer
        footer: {
            tagline: '您全面的探索微笑之国的指南。发现泰国惊人的寺庙、海滩、文化和美食。',
            copyright: '© 2024 泰国旅游指南。用 ❤️ 为全球旅行者制作。'
        }
    }
};

// Current language (default: English)
let currentLanguage = localStorage.getItem('language') || 'en';

/**
 * Get translation for a key
 * @param {string} key - Translation key (e.g., 'nav.home')
 * @returns {string} Translated text
 */
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];

    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            console.warn(`Translation not found: ${key} for language: ${currentLanguage}`);
            return key;
        }
    }

    return value;
}

/**
 * Change language
 * @param {string} lang - Language code (en, th, cn)
 */
function changeLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Language not supported: ${lang}`);
        return;
    }

    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update all translatable elements
    updateTranslations();

    // Show notification
    const langNames = { en: 'English', th: 'ไทย', cn: '中文' };
    showNotification(`🌍 Language changed to ${langNames[lang]}`, 'success');

    console.log(`✓ Language changed to: ${lang}`);
}

/**
 * Update all translatable elements on the page
 */
function updateTranslations() {
    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });

    // Update all elements with data-i18n-html attribute (for HTML content)
    const htmlElements = document.querySelectorAll('[data-i18n-html]');
    htmlElements.forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        element.innerHTML = t(key);
    });
}

/**
 * Initialize language switcher
 */
function initLanguageSwitcher() {
    const switcher = document.getElementById('language-switcher');
    if (!switcher) return;

    // Create language buttons if not already created
    if (!switcher.querySelector('.lang-btn')) {
        switcher.innerHTML = `
            <div class="flex items-center space-x-2">
                <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
                    EN
                </button>
                <button class="lang-btn ${currentLanguage === 'th' ? 'active' : ''}" data-lang="th">
                    ไทย
                </button>
                <button class="lang-btn ${currentLanguage === 'cn' ? 'active' : ''}" data-lang="cn">
                    中文
                </button>
            </div>
        `;
    }

    // Add click handlers
    const langButtons = switcher.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');

            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Change language
            changeLanguage(lang);
        });
    });

    console.log('✓ Language switcher initialized');
}

/**
 * Get current language
 * @returns {string} Current language code
 */
function getCurrentLanguage() {
    return currentLanguage;
}
