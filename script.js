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

// Плейлист с треками известных групп
const musicPlaylist = [
    // Three Days Grace
    { 
        title: "I Hate Everything About You", 
        artist: "Three Days Grace",
        genre: "alternative rock",
        tempo: 140,
        style: "aggressive"
    },
    { 
        title: "Animal I Have Become", 
        artist: "Three Days Grace",
        genre: "alternative rock",
        tempo: 135,
        style: "heavy"
    },
    { 
        title: "Pain", 
        artist: "Three Days Grace",
        genre: "alternative rock",
        tempo: 130,
        style: "emotional"
    },
    // Nirvana
    { 
        title: "Smells Like Teen Spirit", 
        artist: "Nirvana",
        genre: "grunge",
        tempo: 117,
        style: "iconic"
    },
    { 
        title: "Come As You Are", 
        artist: "Nirvana",
        genre: "grunge",
        tempo: 120,
        style: "melodic"
    },
    { 
        title: "Lithium", 
        artist: "Nirvana",
        genre: "grunge",
        tempo: 125,
        style: "dynamic"
    },
    // Green Day
    { 
        title: "Basket Case", 
        artist: "Green Day",
        genre: "punk rock",
        tempo: 165,
        style: "energetic"
    },
    { 
        title: "Boulevard of Broken Dreams", 
        artist: "Green Day",
        genre: "punk rock",
        tempo: 85,
        style: "melancholic"
    },
    { 
        title: "American Idiot", 
        artist: "Green Day",
        genre: "punk rock",
        tempo: 185,
        style: "political"
    },
    // XDEBUSTERVANDAMX
    { 
        title: "HARDCORE DESTRUCTION", 
        artist: "XDEBUSTERVANDAMX",
        genre: "hardcore",
        tempo: 180,
        style: "brutal"
    },
    { 
        title: "UNDERGROUND RIOT", 
        artist: "XDEBUSTERVANDAMX",
        genre: "hardcore",
        tempo: 175,
        style: "underground"
    },
    // BEATDOWNHEROES
    { 
        title: "STREET FIGHT", 
        artist: "BEATDOWNHEROES",
        genre: "hardcore",
        tempo: 170,
        style: "aggressive"
    },
    { 
        title: "NEVER SURRENDER", 
        artist: "BEATDOWNHEROES",
        genre: "hardcore",
        tempo: 165,
        style: "motivational"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let audioContext;
let currentOscillators = [];
let currentGain;
let animationFrameId;

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
            playCurrentTrack();
            
            musicBtn.classList.remove('muted');
            musicBtn.classList.add('playing');
            musicIcon.textContent = '🔊';
            musicText.textContent = `♪ ${musicPlaylist[currentTrackIndex].artist}`;
            musicBtn.title = 'Выключить музыку';
            
            // Показываем визуализатор
            startVisualizer();
            
        } catch (error) {
            console.error('Ошибка при воспроизведении музыки:', error);
            musicIcon.textContent = '🔇';
            musicText.textContent = 'ОШИБКА ЗВУКА';
        }
    } else {
        // Выключаем музыку
        stopMusic();
        isPlaying = false;
        
        musicBtn.classList.remove('playing');
        musicBtn.classList.add('muted');
        musicIcon.textContent = '🔇';
        musicText.textContent = 'МУЗЫКА ВЫКЛ';
        musicBtn.title = 'Включить музыку';
        
        stopVisualizer();
    }
}

// Функция для воспроизведения текущего трека
function playCurrentTrack() {
    stopMusic(); // Останавливаем предыдущий трек
    
    const track = musicPlaylist[currentTrackIndex];
    
    // Создаем музыку на основе характеристик трека
    switch(track.genre) {
        case 'grunge':
            createGrungeTrack(track);
            break;
        case 'punk rock':
            createPunkTrack(track);
            break;
        case 'alternative rock':
            createAlternativeTrack(track);
            break;
        case 'hardcore':
            createHardcoreTrack(track);
            break;
        default:
            createPunkTrack(track);
    }
    
    // Обновляем информацию о треке
    updateTrackInfo(track);
    
    // Автоматически переключаем на следующий трек через 30 секунд
    setTimeout(() => {
        if (isPlaying) {
            nextTrack();
        }
    }, 30000);
}

// Функция для перехода к следующему треку
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % musicPlaylist.length;
    if (isPlaying) {
        playCurrentTrack();
    }
}

// Функция для обновления информации о треке
function updateTrackInfo(track) {
    const musicText = document.getElementById('musicText');
    if (musicText) {
        musicText.textContent = `♪ ${track.artist} - ${track.title}`;
    }
    
    // Добавляем информацию о треке в консоль
    console.log(`🎵 Сейчас играет: ${track.artist} - ${track.title} (${track.genre})`);
}

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

// Функция для остановки музыки
function stopMusic() {
    if (currentOscillators.length > 0) {
        currentOscillators.forEach(osc => {
            try {
                osc.stop();
            } catch (e) {
                // Игнорируем ошибки остановки
            }
        });
        currentOscillators = [];
    }
    
    if (currentGain) {
        currentGain.disconnect();
        currentGain = null;
    }
}

// Функция для запуска визуализатора
function startVisualizer() {
    const visualizer = document.getElementById('musicVisualizer');
    if (visualizer) {
        visualizer.classList.add('active');
    }
}

// Функция для остановки визуализатора
function stopVisualizer() {
    const visualizer = document.getElementById('musicVisualizer');
    if (visualizer) {
        visualizer.classList.remove('active');
    }
    
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

// Создание гранж-трека (Nirvana style)
function createGrungeTrack(track) {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);
    masterGain.gain.value = 0.6;
    currentGain = masterGain;
    
    // Гранж-барабаны (медленнее и грязнее)
    function playGrungeDrums() {
        const drumGain = audioContext.createGain();
        drumGain.connect(masterGain);
        drumGain.gain.value = 0.4;
        
        function drumBeat() {
            if (!isPlaying) return;
            
            // Кик
            const kick = audioContext.createOscillator();
            const kickGain = audioContext.createGain();
            kick.connect(kickGain);
            kickGain.connect(drumGain);
            
            kick.frequency.value = 60;
            kick.type = 'sine';
            kickGain.gain.setValueAtTime(0.8, audioContext.currentTime);
            kickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            kick.start();
            kick.stop(audioContext.currentTime + 0.5);
            currentOscillators.push(kick);
            
            // Снейр
            setTimeout(() => {
                if (!isPlaying) return;
                const snare = audioContext.createOscillator();
                const snareGain = audioContext.createGain();
                snare.connect(snareGain);
                snareGain.connect(drumGain);
                
                snare.frequency.value = 200;
                snare.type = 'square';
                snareGain.gain.setValueAtTime(0.5, audioContext.currentTime);
                snareGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                snare.start();
                snare.stop(audioContext.currentTime + 0.3);
                currentOscillators.push(snare);
            }, 1000);
            
            setTimeout(drumBeat, 2000);
        }
        
        drumBeat();
    }
    
    // Гранж-гитара с характерным звуком
    function playGrungeGuitar() {
        const guitarGain = audioContext.createGain();
        guitarGain.connect(masterGain);
        guitarGain.gain.value = 0.3;
        
        function grungeRiff() {
            if (!isPlaying) return;
            
            const frequencies = [82.41, 110.00, 146.83, 196.00]; // E2, A2, D3, G3
            
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    if (!isPlaying) return;
                    
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    const filter = audioContext.createBiquadFilter();
                    
                    osc.connect(filter);
                    filter.connect(gain);
                    gain.connect(guitarGain);
                    
                    osc.frequency.value = freq;
                    osc.type = 'sawtooth';
                    filter.type = 'lowpass';
                    filter.frequency.value = 1500;
                    filter.Q.value = 15;
                    
                    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
                    
                    osc.start();
                    osc.stop(audioContext.currentTime + 1.5);
                    currentOscillators.push(osc);
                }, index * 500);
            });
            
            setTimeout(grungeRiff, 4000);
        }
        
        grungeRiff();
    }
    
    playGrungeDrums();
    playGrungeGuitar();
}

// Создание альтернативного рок-трека (Three Days Grace style)
function createAlternativeTrack(track) {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);
    masterGain.gain.value = 0.7;
    currentGain = masterGain;
    
    // Альтернативные барабаны
    function playAltDrums() {
        const drumGain = audioContext.createGain();
        drumGain.connect(masterGain);
        drumGain.gain.value = 0.5;
        
        function drumPattern() {
            if (!isPlaying) return;
            
            // Мощный кик
            const kick = audioContext.createOscillator();
            const kickGain = audioContext.createGain();
            kick.connect(kickGain);
            kickGain.connect(drumGain);
            
            kick.frequency.value = 50;
            kick.type = 'sine';
            kickGain.gain.setValueAtTime(1.0, audioContext.currentTime);
            kickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            
            kick.start();
            kick.stop(audioContext.currentTime + 0.4);
            currentOscillators.push(kick);
            
            // Хай-хет
            setTimeout(() => {
                if (!isPlaying) return;
                const hihat = audioContext.createOscillator();
                const hihatGain = audioContext.createGain();
                hihat.connect(hihatGain);
                hihatGain.connect(drumGain);
                
                hihat.frequency.value = 10000;
                hihat.type = 'square';
                hihatGain.gain.setValueAtTime(0.2, audioContext.currentTime);
                hihatGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                hihat.start();
                hihat.stop(audioContext.currentTime + 0.1);
                currentOscillators.push(hihat);
            }, 500);
            
            setTimeout(drumPattern, 1000);
        }
        
        drumPattern();
    }
    
    // Тяжелая альтернативная гитара
    function playAltGuitar() {
        const guitarGain = audioContext.createGain();
        guitarGain.connect(masterGain);
        guitarGain.gain.value = 0.4;
        
        function heavyRiff() {
            if (!isPlaying) return;
            
            const powerChords = [
                [82.41, 164.81], // E
                [87.31, 174.61], // F
                [98.00, 196.00], // G
                [110.00, 220.00] // A
            ];
            
            powerChords.forEach((chord, index) => {
                setTimeout(() => {
                    if (!isPlaying) return;
                    
                    chord.forEach(freq => {
                        const osc = audioContext.createOscillator();
                        const gain = audioContext.createGain();
                        const distortion = audioContext.createWaveShaper();
                        
                        // Тяжелая дисторшн
                        const samples = 22050;
                        const curve = new Float32Array(samples);
                        for (let i = 0; i < samples; i++) {
                            const x = (i * 2) / samples - 1;
                            curve[i] = Math.sign(x) * Math.pow(Math.abs(x), 0.4);
                        }
                        distortion.curve = curve;
                        
                        osc.connect(distortion);
                        distortion.connect(gain);
                        gain.connect(guitarGain);
                        
                        osc.frequency.value = freq;
                        osc.type = 'square';
                        
                        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.0);
                        
                        osc.start();
                        osc.stop(audioContext.currentTime + 1.0);
                        currentOscillators.push(osc);
                    });
                }, index * 800);
            });
            
            setTimeout(heavyRiff, 3200);
        }
        
        heavyRiff();
    }
    
    playAltDrums();
    playAltGuitar();
}

// Создание хардкор-трека (XDEBUSTERVANDAMX/BEATDOWNHEROES style)
function createHardcoreTrack(track) {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);
    masterGain.gain.value = 0.8;
    currentGain = masterGain;
    
    // Брутальные хардкор барабаны
    function playHardcoreDrums() {
        const drumGain = audioContext.createGain();
        drumGain.connect(masterGain);
        drumGain.gain.value = 0.6;
        
        function brutalBeats() {
            if (!isPlaying) return;
            
            // Двойной кик
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    if (!isPlaying) return;
                    const kick = audioContext.createOscillator();
                    const kickGain = audioContext.createGain();
                    kick.connect(kickGain);
                    kickGain.connect(drumGain);
                    
                    kick.frequency.value = 40;
                    kick.type = 'sine';
                    kickGain.gain.setValueAtTime(1.2, audioContext.currentTime);
                    kickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                    
                    kick.start();
                    kick.stop(audioContext.currentTime + 0.2);
                    currentOscillators.push(kick);
                }, i * 200);
            }
            
            // Blast beat snare
            setTimeout(() => {
                if (!isPlaying) return;
                for (let i = 0; i < 4; i++) {
                    setTimeout(() => {
                        if (!isPlaying) return;
                        const snare = audioContext.createOscillator();
                        const snareGain = audioContext.createGain();
                        snare.connect(snareGain);
                        snareGain.connect(drumGain);
                        
                        snare.frequency.value = 250;
                        snare.type = 'square';
                        snareGain.gain.setValueAtTime(0.8, audioContext.currentTime);
                        snareGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                        
                        snare.start();
                        snare.stop(audioContext.currentTime + 0.1);
                        currentOscillators.push(snare);
                    }, i * 100);
                }
            }, 400);
            
            setTimeout(brutalBeats, 800);
        }
        
        brutalBeats();
    }
    
    // Хардкор гитара с экстремальным звуком
    function playHardcoreGuitar() {
        const guitarGain = audioContext.createGain();
        guitarGain.connect(masterGain);
        guitarGain.gain.value = 0.5;
        
        function extremeRiff() {
            if (!isPlaying) return;
            
            const brutalsounds = [65.41, 73.42, 82.41, 98.00]; // Low tuning
            
            brutalsounds.forEach((freq, index) => {
                setTimeout(() => {
                    if (!isPlaying) return;
                    
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    const distortion = audioContext.createWaveShaper();
                    const filter = audioContext.createBiquadFilter();
                    
                    // Экстремальная дисторшн
                    const samples = 22050;
                    const curve = new Float32Array(samples);
                    for (let i = 0; i < samples; i++) {
                        const x = (i * 2) / samples - 1;
                        curve[i] = Math.sign(x) * (1 - Math.exp(-Math.abs(x) * 5));
                    }
                    distortion.curve = curve;
                    
                    osc.connect(distortion);
                    distortion.connect(filter);
                    filter.connect(gain);
                    gain.connect(guitarGain);
                    
                    osc.frequency.value = freq;
                    osc.type = 'sawtooth';
                    filter.type = 'lowpass';
                    filter.frequency.value = 800;
                    filter.Q.value = 20;
                    
                    gain.gain.setValueAtTime(0.4, audioContext.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
                    
                    osc.start();
                    osc.stop(audioContext.currentTime + 0.6);
                    currentOscillators.push(osc);
                }, index * 200);
            });
            
            setTimeout(extremeRiff, 1600);
        }
        
        extremeRiff();
    }
    
    playHardcoreDrums();
    playHardcoreGuitar();
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
                     playCurrentTrack(); // Changed from createPunkTrack to playCurrentTrack
                     musicIcon.textContent = '🔊';
                     musicText.textContent = `♪ ${musicPlaylist[currentTrackIndex].artist}`; // Changed from 'МУЗЫКА ВКЛ' to current track info
                     musicBtn.classList.remove('muted');
                     musicBtn.classList.add('playing');
                     
                     // Показываем визуализатор
                     startVisualizer();
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