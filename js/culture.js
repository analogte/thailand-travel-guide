// Culture Page Module
// Handles Thai phrase book and cultural information

const thaiPhrases = [
    { thai: "สวัสดี", roman: "Sawasdee", english: "Hello" },
    { thai: "ขอบคุณ", roman: "Khop Khun", english: "Thank you" },
    { thai: "ขอโทษ", roman: "Khor Thot", english: "Sorry/Excuse me" },
    { thai: "เท่าไหร่", roman: "Tao Rai?", english: "How much?" },
    { thai: "อร่อย", roman: "Aroi", english: "Delicious" },
    { thai: "ไม่เผ็ด", roman: "Mai Phet", english: "Not spicy" },
    { thai: "ห้องน้ำ", roman: "Hong Nam", english: "Bathroom" },
    { thai: "ช่วยด้วย", roman: "Chuay Duay", english: "Help!" },
    { thai: "ใช่", roman: "Chai", english: "Yes" },
    { thai: "ไม่ใช่", roman: "Mai Chai", english: "No" },
    { thai: "ไม่เป็นไร", roman: "Mai Pen Rai", english: "No problem/It's okay" },
    { thai: "สบายดีไหม", roman: "Sabai Dee Mai?", english: "How are you?" }
];

let currentPhraseIndex = 0;

/**
 * Initialize culture page features
 */
function initCulturePage() {
    if (!document.querySelector('.phrase-card')) return;

    initPhraseBook();
}

/**
 * Initialize Thai phrase book
 */
function initPhraseBook() {
    const thaiText = document.getElementById('thai-text');
    const romanText = document.getElementById('roman-text');
    const englishText = document.getElementById('english-text');
    const nextBtn = document.getElementById('next-phrase');
    const prevBtn = document.getElementById('prev-phrase');
    const playBtn = document.getElementById('play-audio');

    if (!thaiText) return;

    // Display current phrase
    function displayPhrase() {
        const phrase = thaiPhrases[currentPhraseIndex];
        
        // Fade out
        thaiText.style.opacity = '0';
        romanText.style.opacity = '0';
        englishText.style.opacity = '0';

        setTimeout(() => {
            thaiText.textContent = phrase.thai;
            romanText.textContent = phrase.roman;
            englishText.textContent = phrase.english;

            // Fade in
            thaiText.style.opacity = '1';
            romanText.style.opacity = '1';
            englishText.style.opacity = '1';
        }, 300);
    }

    // Next phrase
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentPhraseIndex = (currentPhraseIndex + 1) % thaiPhrases.length;
            displayPhrase();
        });
    }

    // Previous phrase
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentPhraseIndex = (currentPhraseIndex - 1 + thaiPhrases.length) % thaiPhrases.length;
            displayPhrase();
        });
    }

    // Play audio (simulated)
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            const icon = playBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-volume-up fa-beat';
            }

            const phrase = thaiPhrases[currentPhraseIndex];
            showNotification(`🔊 Playing: ${phrase.roman}`, 'info');

            // Try to use Web Speech API if available
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(phrase.thai);
                utterance.lang = 'th-TH';
                utterance.rate = 0.8;
                window.speechSynthesis.speak(utterance);
            }

            setTimeout(() => {
                if (icon) {
                    icon.className = 'fas fa-volume-up';
                }
            }, 1000);
        });
    }

    // Initialize with first phrase
    displayPhrase();
}
