# 📁 СОЗДАНИЕ ПРОЕКТА АскНН ВРУЧНУЮ

## 🎯 **ЕСЛИ НЕ МОЖЕТЕ СКАЧАТЬ ZIP**

Создайте файлы вручную, скопировав код ниже:

---

### **1️⃣ СОЗДАЙТЕ ФАЙЛ `index.html`:**

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>АскНН - Аскера Нижний Новгород</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Аудио плеер с панк музыкой -->
    <audio id="backgroundMusic" loop preload="auto">
        <!-- Будем использовать Web Audio API для генерации панк музыки -->
    </audio>

    <!-- Визуальный эквалайзер -->
    <div class="music-visualizer" id="musicVisualizer">
        <div class="equalizer-bar"></div>
        <div class="equalizer-bar"></div>
        <div class="equalizer-bar"></div>
        <div class="equalizer-bar"></div>
        <div class="equalizer-bar"></div>
    </div>

    <!-- Информационный блок с ссылкой на сайт -->
    <div class="site-info">
        <div class="container">
            <p>🌐 Сайт доступен по адресу: <a href="https://asknn.github.io" target="_blank" class="site-link">asknn.github.io</a></p>
        </div>
    </div>

    <header>
        <nav class="navbar">
            <div class="container">
                <div class="nav-brand">
                    <h1>АскНН</h1>
                    <p>Аскера Нижний Новгород</p>
                </div>
                <!-- Кнопка управления музыкой -->
                <div class="music-control">
                    <button id="musicToggle" class="music-btn" onclick="toggleMusic()" title="Выключить музыку">
                        <span id="musicIcon">🔊</span>
                        <span id="musicText">МУЗЫКА ВКЛ</span>
                    </button>
                </div>
            </div>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="container">
                <h2>Добро пожаловать в мир субкультур</h2>
                <p>Место, где встречаются панки, эмо, готы и все те, кто не боится быть собой</p>
            </div>
        </section>

        <section class="gallery">
            <div class="container">
                <h3>Наши субкультуры</h3>
                <div class="image-grid">
                    <div class="image-card">
                        <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop" alt="Панки">
                        <h4>Панки</h4>
                        <p>Бунт против системы</p>
                    </div>
                    <div class="image-card">
                        <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop" alt="Эмо">
                        <h4>Эмо</h4>
                        <p>Эмоциональная глубина</p>
                    </div>
                    <div class="image-card">
                        <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop" alt="Готы">
                        <h4>Готы</h4>
                        <p>Темная романтика</p>
                    </div>
                    <div class="image-card">
                        <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop" alt="Металхеды">
                        <h4>Металхеды</h4>
                        <p>Сила металла</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="buttons">
            <div class="container">
                <h3>Полезные ссылки</h3>
                <div class="button-grid">
                    <button class="action-btn" onclick="openTelegram()">
                        <span class="btn-icon">💬</span>
                        Тг чат
                    </button>
                    <button class="action-btn" onclick="openCigarettes()">
                        <span class="btn-icon">🚬</span>
                        Купить сигареты
                    </button>
                    <button class="action-btn" onclick="openBeer()">
                        <span class="btn-icon">🍺</span>
                        Купить пиво
                    </button>
                    <button class="action-btn" onclick="openDonation()">
                        <span class="btn-icon">💰</span>
                        На развитие сайта
                    </button>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2024 АскНН - Аскера Нижний Новгород. Все права защищены.</p>
            <p>Сделано с 🤘 для панк-сообщества</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

---

### **2️⃣ СОЗДАЙТЕ ФАЙЛ `styles.css`:**

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    color: #ffffff;
    line-height: 1.6;
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Информационный блок с ссылкой на сайт */
.site-info {
    background: linear-gradient(90deg, #ff6b35, #f7931e);
    padding: 10px 0;
    text-align: center;
    box-shadow: 0 2px 10px rgba(255, 107, 53, 0.3);
}

.site-info p {
    margin: 0;
    font-weight: 500;
    color: #fff;
}

.site-link {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    padding: 2px 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    transition: all 0.3s ease;
}

.site-link:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
}

/* Навигация */
.navbar {
    background: rgba(0, 0, 0, 0.9);
    padding: 1rem 0;
    box-shadow: 0 2px 20px rgba(255, 107, 53, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-brand h1 {
    color: #ff6b35;
    font-size: 2.5rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 0.5rem;
}

.nav-brand p {
    color: #cccccc;
    font-size: 1.1rem;
    margin: 0;
}

/* Кнопка управления музыкой */
.music-control {
    margin-right: 20px;
}

.music-btn {
    background: linear-gradient(45deg, #ff6b35, #f7931e);
    border: none;
    color: white;
    padding: 12px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.music-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
}

.music-btn.muted {
    background: linear-gradient(45deg, #666, #888);
    box-shadow: 0 4px 15px rgba(102, 102, 102, 0.3);
}

#musicIcon {
    font-size: 1.2rem;
}

/* Анимация пульсации для кнопки музыки при воспроизведении */
@keyframes musicPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.music-btn.playing {
    animation: musicPulse 1s ease-in-out infinite;
}

/* Визуальный эквалайзер */
.music-visualizer {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 30px;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.music-visualizer.active {
    opacity: 1;
}

.equalizer-bar {
    width: 3px;
    background: linear-gradient(to top, #ff6b35, #ff8c42);
    border-radius: 2px;
    animation: equalizerBounce 0.8s ease-in-out infinite alternate;
}

.equalizer-bar:nth-child(1) { animation-delay: 0s; height: 10px; }
.equalizer-bar:nth-child(2) { animation-delay: 0.1s; height: 20px; }
.equalizer-bar:nth-child(3) { animation-delay: 0.2s; height: 15px; }
.equalizer-bar:nth-child(4) { animation-delay: 0.3s; height: 25px; }
.equalizer-bar:nth-child(5) { animation-delay: 0.4s; height: 18px; }

@keyframes equalizerBounce {
    from { height: 5px; }
    to {
        height: var(--bar-height, 25px);
    }
}

/* Герой секция */
.hero {
    text-align: center;
    padding: 4rem 0;
    background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="%23ff6b35" points="0,1000 1000,0 1000,1000"/></svg>');
    background-size: cover;
}

.hero h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #ff6b35, #f7931e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero p {
    font-size: 1.3rem;
    color: #cccccc;
    max-width: 600px;
    margin: 0 auto;
}

/* Галерея */
.gallery, .buttons {
    padding: 4rem 0;
}

.gallery h3, .buttons h3 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #ff6b35;
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.image-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    backdrop-filter: blur(10px);
}

.image-card:hover {
    transform: translateY(-10px);
    border-color: #ff6b35;
    box-shadow: 0 15px 35px rgba(255, 107, 53, 0.3);
}

.image-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1rem;
}

.image-card h4 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #ff6b35;
}

.image-card p {
    color: #cccccc;
}

/* Кнопки */
.button-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.action-btn {
    background: linear-gradient(45deg, #ff6b35, #f7931e);
    border: none;
    color: white;
    padding: 1.5rem 2rem;
    border-radius: 15px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
}

.action-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(255, 107, 53, 0.5);
}

.btn-icon {
    font-size: 1.5rem;
}

/* Футер */
footer {
    background: rgba(0, 0, 0, 0.9);
    text-align: center;
    padding: 2rem 0;
    margin-top: 4rem;
    border-top: 2px solid #ff6b35;
}

footer p {
    color: #cccccc;
    margin-bottom: 0.5rem;
}

/* Адаптивность */
@media (max-width: 768px) {
    .container {
        padding: 0 15px;
    }

    .hero h2 {
        font-size: 2rem;
    }

    .hero p {
        font-size: 1.1rem;
    }

    .nav-brand h1 {
        font-size: 2rem;
    }

    .image-grid, .button-grid {
        grid-template-columns: 1fr;
    }

    .gallery h3, .buttons h3 {
        font-size: 2rem;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 15px;
    }

    .hero {
        padding: 2rem 0;
    }

    .hero h2 {
        font-size: 1.8rem;
    }

    .gallery,
    .buttons {
        padding: 2rem 0;
    }

    .music-control {
        margin-right: 10px;
    }

    .music-btn {
        padding: 8px 12px;
        font-size: 0.8rem;
    }

    #musicText {
        display: none; /* Скрываем текст на мобильных */
    }
}
```

---

### **3️⃣ СОЗДАЙТЕ ФАЙЛ `script.js`:**

```javascript
// Функции для кнопок
function openTelegram() {
    window.open('https://t.me/mixyesosii', '_blank');
}

function openCigarettes() {
    window.open('https://www.ozon.ru/search/?text=сигареты', '_blank');
}

function openBeer() {
    window.open('https://www.perekrestok.ru/cat/alkogol/', '_blank');
}

function openDonation() {
    window.open('https://www.donationalerts.com/r/sasavotik', '_blank');
}

// Переменные для Web Audio API
let audioContext = null;
let punkTrackSource = null;
let isPlaying = false;

// Создание панк-рок трека с помощью Web Audio API
function createPunkTrack() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Создаем барабанный ритм
    function playDrums() {
        const drumGain = audioContext.createGain();
        drumGain.connect(audioContext.destination);
        drumGain.gain.value = 0.3;

        function kickDrum() {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            oscillator.connect(gain);
            gain.connect(drumGain);
            
            oscillator.frequency.setValueAtTime(60, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            gain.gain.setValueAtTime(1, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }

        function snare() {
            const bufferSize = audioContext.sampleRate * 0.1;
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = buffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                output[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
            }
            
            const noise = audioContext.createBufferSource();
            const gain = audioContext.createGain();
            
            noise.buffer = buffer;
            noise.connect(gain);
            gain.connect(drumGain);
            
            gain.gain.setValueAtTime(0.8, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            noise.start(audioContext.currentTime);
        }

        function drumLoop() {
            if (!isPlaying) return;
            
            kickDrum();
            setTimeout(() => { if (isPlaying) snare(); }, 500);
            setTimeout(() => { if (isPlaying) kickDrum(); }, 1000);
            setTimeout(() => { if (isPlaying) snare(); }, 1500);
            
            setTimeout(() => { if (isPlaying) drumLoop(); }, 2000);
        }
        
        drumLoop();
    }

    // Создаем басовую линию
    function playBass() {
        const bassGain = audioContext.createGain();
        bassGain.connect(audioContext.destination);
        bassGain.gain.value = 0.2;

        function bassNote(freq, duration) {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            oscillator.connect(gain);
            gain.connect(bassGain);
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            oscillator.type = 'sawtooth';
            
            gain.gain.setValueAtTime(0.8, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }

        function bassLoop() {
            if (!isPlaying) return;
            
            bassNote(82.41, 0.5);  // E2
            setTimeout(() => { if (isPlaying) bassNote(110, 0.5); }, 500);    // A2
            setTimeout(() => { if (isPlaying) bassNote(98, 0.5); }, 1000);    // G2
            setTimeout(() => { if (isPlaying) bassNote(73.42, 0.5); }, 1500); // D2
            
            setTimeout(() => { if (isPlaying) bassLoop(); }, 2000);
        }
        
        bassLoop();
    }

    // Создаем гитарные аккорды
    function playGuitar() {
        const guitarGain = audioContext.createGain();
        guitarGain.connect(audioContext.destination);
        guitarGain.gain.value = 0.15;

        function powerChord(freq1, freq2, duration) {
            [freq1, freq2].forEach(freq => {
                const oscillator = audioContext.createOscillator();
                const gain = audioContext.createGain();
                const waveshaper = audioContext.createWaveShaper();
                
                // Создаем дисторшн
                const samples = 44100;
                const curve = new Float32Array(samples);
                const deg = Math.PI / 180;
                
                for (let i = 0; i < samples; i++) {
                    const x = (i * 2) / samples - 1;
                    curve[i] = ((3 + 20) * x * 20 * deg) / (Math.PI + 20 * Math.abs(x));
                }
                
                waveshaper.curve = curve;
                waveshaper.oversample = '4x';
                
                oscillator.connect(waveshaper);
                waveshaper.connect(gain);
                gain.connect(guitarGain);
                
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                oscillator.type = 'square';
                
                gain.gain.setValueAtTime(0.6, audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            });
        }

        function guitarLoop() {
            if (!isPlaying) return;
            
            powerChord(164.81, 196, 0.8);  // E3-G3
            setTimeout(() => { if (isPlaying) powerChord(220, 261.63, 0.8); }, 1000);    // A3-C4
            setTimeout(() => { if (isPlaying) powerChord(196, 233.08, 0.8); }, 2000);    // G3-Bb3
            setTimeout(() => { if (isPlaying) powerChord(146.83, 174.61, 0.8); }, 3000); // D3-F3
            
            setTimeout(() => { if (isPlaying) guitarLoop(); }, 4000);
        }
        
        guitarLoop();
    }

    // Запускаем все инструменты
    playDrums();
    playBass();
    playGuitar();
}

// Функция для управления фоновой музыкой
function toggleMusic() {
    const musicBtn = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');

    if (!isPlaying) {
        // Включаем музыку
        try {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }

            // Возобновляем контекст если он приостановлен
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            isPlaying = true;
            createPunkTrack();

            musicBtn.classList.remove('muted');
            musicBtn.classList.add('playing');
            musicIcon.textContent = '🔊';
            musicText.textContent = 'МУЗЫКА ВКЛ';
            musicBtn.title = 'Выключить музыку';

            // Показываем визуализатор
            const visualizer = document.getElementById('musicVisualizer');
            if (visualizer) {
                visualizer.classList.add('active');
            }

            console.log('Панк музыка включена');
        } catch (error) {
            console.log('Ошибка включения музыки:', error);
            musicIcon.textContent = '🔇';
            musicText.textContent = 'ОШИБКА АУДИО';
            musicBtn.classList.add('muted');
        }
    } else {
        // Выключаем музыку
        isPlaying = false;

        if (audioContext) {
            audioContext.suspend();
        }

        musicBtn.classList.add('muted');
        musicBtn.classList.remove('playing');
        musicIcon.textContent = '🔇';
        musicText.textContent = 'МУЗЫКА ВЫКЛ';
        musicBtn.title = 'Включить музыку';

        // Скрываем визуализатор
        const visualizer = document.getElementById('musicVisualizer');
        if (visualizer) {
            visualizer.classList.remove('active');
        }

        console.log('Панк музыка выключена');
    }
}

// Инициализация музыки при загрузке страницы
function initMusic() {
    const musicBtn = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');

    try {
        // Проверяем поддержку Web Audio API
        if (window.AudioContext || window.webkitAudioContext) {
            console.log('Web Audio API поддерживается');

            // Автоматический запуск музыки (может быть заблокирован браузером)
            setTimeout(() => {
                if (!isPlaying) {
                    isPlaying = true;
                    createPunkTrack();
                    musicIcon.textContent = '🔊';
                    musicText.textContent = 'МУЗЫКА ВКЛ';
                    musicBtn.classList.remove('muted');
                    musicBtn.classList.add('playing');

                    // Показываем визуализатор
                    const visualizer = document.getElementById('musicVisualizer');
                    if (visualizer) {
                        visualizer.classList.add('active');
                    }
                }
            }, 1000);

        } else {
            throw new Error('Web Audio API не поддерживается');
        }
    } catch (error) {
        console.log('Ошибка инициализации аудио:', error);
        musicBtn.classList.add('muted');
        musicIcon.textContent = '🔇';
        musicText.textContent = 'МУЗЫКА НЕДОСТУПНА';
        musicBtn.disabled = true;
    }
}

// Создание декоративных частиц
function createParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: #ff6b35;
            pointer-events: none;
            z-index: -1;
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            opacity: ${0.3 + Math.random() * 0.7};
        `;
        
        document.body.appendChild(particle);
    }
    
    // Добавляем CSS анимацию для частиц
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Добавляем эффекты при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация музыки
    initMusic();

    // Анимация появления карточек
    const cards = document.querySelectorAll('.image-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Анимация появления кнопок
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'scale(0.8)';

        setTimeout(() => {
            button.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        }, 1000 + index * 150);
    });

    // Добавляем звуковые эффекты при наведении на кнопки
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Можно добавить звуковой эффект здесь, если нужно
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Создание декоративных частиц
    createParticles();
});
```

---

## **🚀 ГОТОВО!**

Скопируйте код выше и создайте 3 файла:
1. **index.html** - главная страница
2. **styles.css** - стили
3. **script.js** - функциональность

Поместите их в одну папку и заархивируйте для размещения на Netlify!

**Время создания: 3-5 минут** ⚡