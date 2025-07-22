// Функция для перехода в Telegram чат
function openTelegram() {
    window.open('https://t.me/mixyesosii', '_blank');
}

// Функция для перехода на сайт с сигаретами
function openCigarettes() {
    // Открываем популярный сайт с табачными изделиями
    window.open('https://www.ozon.ru/category/tabachnye-izdeliya-10566/', '_blank');
}

// Функция для перехода на сайт с пивом и алкоголем
function openBeer() {
    // Открываем популярный сайт с алкогольными напитками
    window.open('https://www.perekrestok.ru/cat/alkogol', '_blank');
}

// Функция для перехода на страницу пожертвований
function openDonation() {
    window.open('https://www.donationalerts.com/r/sasavotik', '_blank');
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
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(drumGain);
            
            osc.frequency.setValueAtTime(60, audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 0.1);
            
            gain.gain.setValueAtTime(0.5, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + 0.1);
        }
        
        function snare() {
            const noise = audioContext.createBufferSource();
            const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.1, audioContext.sampleRate);
            const data = noiseBuffer.getChannelData(0);
            
            for (let i = 0; i < data.length; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            noise.buffer = noiseBuffer;
            
            const snareGain = audioContext.createGain();
            noise.connect(snareGain);
            snareGain.connect(drumGain);
            
            snareGain.gain.setValueAtTime(0.2, audioContext.currentTime);
            snareGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            noise.start(audioContext.currentTime);
        }
        
        // Панк ритм: бочка на 1 и 3, снейр на 2 и 4
        function drumLoop() {
            if (!isPlaying) return;
            
            kickDrum(); // Бочка на 1
            setTimeout(() => {
                if (isPlaying) snare(); // Снейр на 2
            }, 250);
            setTimeout(() => {
                if (isPlaying) kickDrum(); // Бочка на 3
            }, 500);
            setTimeout(() => {
                if (isPlaying) snare(); // Снейр на 4
            }, 750);
            
            setTimeout(drumLoop, 1000); // Повтор каждую секунду
        }
        
        drumLoop();
    }
    
    // Создаем басовую линию
    function playBass() {
        const bassGain = audioContext.createGain();
        bassGain.connect(audioContext.destination);
        bassGain.gain.value = 0.2;
        
        function bassNote(freq, duration) {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(bassGain);
            
            osc.frequency.value = freq;
            osc.type = 'square';
            
            gain.gain.setValueAtTime(0.3, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + duration);
        }
        
        function bassLoop() {
            if (!isPlaying) return;
            
            bassNote(82.41, 0.5);  // E2
            setTimeout(() => {
                if (isPlaying) bassNote(87.31, 0.5);  // F2
            }, 500);
            setTimeout(() => {
                if (isPlaying) bassNote(98.00, 0.5);  // G2
            }, 1000);
            setTimeout(() => {
                if (isPlaying) bassNote(82.41, 0.5);  // E2
            }, 1500);
            
            setTimeout(bassLoop, 2000);
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
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                const distortion = audioContext.createWaveShaper();
                
                // Создаем эффект дисторшна
                const samples = 44100;
                const curve = new Float32Array(samples);
                const deg = Math.PI / 180;
                for (let i = 0; i < samples; i++) {
                    const x = (i * 2) / samples - 1;
                    curve[i] = ((3 + 20) * x * 20 * deg) / (Math.PI + 20 * Math.abs(x));
                }
                distortion.curve = curve;
                distortion.oversample = '4x';
                
                osc.connect(distortion);
                distortion.connect(gain);
                gain.connect(guitarGain);
                
                osc.frequency.value = freq;
                osc.type = 'square';
                
                gain.gain.setValueAtTime(0.1, audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                osc.start(audioContext.currentTime);
                osc.stop(audioContext.currentTime + duration);
            });
        }
        
        function guitarLoop() {
            if (!isPlaying) return;
            
            powerChord(164.81, 207.65, 0.8);  // E5
            setTimeout(() => {
                if (isPlaying) powerChord(174.61, 220.00, 0.8);  // F5
            }, 1000);
            setTimeout(() => {
                if (isPlaying) powerChord(196.00, 246.94, 0.8);  // G5
            }, 2000);
            setTimeout(() => {
                if (isPlaying) powerChord(164.81, 207.65, 0.8);  // E5
            }, 3000);
            
            setTimeout(guitarLoop, 4000);
        }
        
        guitarLoop();
    }
    
    // Запускаем все инструменты
    playDrums();
    playBass();
    playGuitar();
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
});

// Функция для создания частиц (декоративный эффект)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '1';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.backgroundColor = '#ff6b35';
            particle.style.borderRadius = '50%';
            particle.style.opacity = '0.6';
            
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight;
            
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            particlesContainer.appendChild(particle);
            
            // Анимация частицы
            let y = startY;
            let opacity = 0.6;
            
            const animate = () => {
                y -= 2;
                opacity -= 0.005;
                
                particle.style.top = y + 'px';
                particle.style.opacity = opacity;
                
                if (y > -10 && opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            animate();
        }, i * 500);
    }
}

// Запускаем создание частиц при загрузке
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createParticles, 2000);
    
    // Повторяем каждые 10 секунд
    setInterval(createParticles, 10000);
});