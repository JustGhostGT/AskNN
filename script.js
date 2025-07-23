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
    { 
        title: "Break", 
        artist: "Three Days Grace",
        genre: "alternative rock",
        tempo: 125,
        style: "intense"
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
    { 
        title: "In Bloom", 
        artist: "Nirvana",
        genre: "grunge",
        tempo: 130,
        style: "raw"
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
    { 
        title: "Holiday", 
        artist: "Green Day",
        genre: "punk rock",
        tempo: 150,
        style: "rebellious"
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
    { 
        title: "CHAOS MACHINE", 
        artist: "XDEBUSTERVANDAMX",
        genre: "hardcore",
        tempo: 190,
        style: "extreme"
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
    },
    { 
        title: "WARRIOR SPIRIT", 
        artist: "BEATDOWNHEROES",
        genre: "hardcore",
        tempo: 175,
        style: "powerful"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let audioContext;
let currentOscillators = [];
let currentGain;
let animationFrameId;
let trackTimeoutId;

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
    
    // Автоматически переключаем на следующий трек через 25 секунд
    trackTimeoutId = setTimeout(() => {
        if (isPlaying) {
            nextTrack();
        }
    }, 25000);
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
    
    if (trackTimeoutId) {
        clearTimeout(trackTimeoutId);
        trackTimeoutId = null;
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

// Создание панк-рок трека (Green Day style)
function createPunkTrack(track) {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);
    masterGain.gain.value = track.tempo > 150 ? 0.6 : 0.5;
    currentGain = masterGain;
    
    // Быстрые панк барабаны
    function playPunkDrums() {
        const drumGain = audioContext.createGain();
        drumGain.connect(masterGain);
        drumGain.gain.value = 0.4;
        
        function drumBeat() {
            if (!isPlaying) return;
            
            // Быстрый кик
            const kick = audioContext.createOscillator();
            const kickGain = audioContext.createGain();
            kick.connect(kickGain);
            kickGain.connect(drumGain);
            
            kick.frequency.value = 80;
            kick.type = 'sine';
            kickGain.gain.setValueAtTime(0.8, audioContext.currentTime);
            kickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            kick.start();
            kick.stop(audioContext.currentTime + 0.2);
            currentOscillators.push(kick);
            
            // Снейр на 2 и 4
            setTimeout(() => {
                if (!isPlaying) return;
                const snare = audioContext.createOscillator();
                const snareGain = audioContext.createGain();
                snare.connect(snareGain);
                snareGain.connect(drumGain);
                
                snare.frequency.value = 250;
                snare.type = 'square';
                snareGain.gain.setValueAtTime(0.6, audioContext.currentTime);
                snareGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                
                snare.start();
                snare.stop(audioContext.currentTime + 0.15);
                currentOscillators.push(snare);
            }, track.tempo > 150 ? 300 : 500);
            
            setTimeout(drumBeat, track.tempo > 150 ? 600 : 1000);
        }
        
        drumBeat();
    }
    
    // Панк гитара с power chords
    function playPunkGuitar() {
        const guitarGain = audioContext.createGain();
        guitarGain.connect(masterGain);
        guitarGain.gain.value = 0.3;
        
        function punkRiff() {
            if (!isPlaying) return;
            
            const powerChords = [
                [164.81, 329.63], // E5
                [185.00, 369.99], // F#5
                [196.00, 392.00], // G5
                [146.83, 293.66]  // D5
            ];
            
            powerChords.forEach((chord, index) => {
                setTimeout(() => {
                    if (!isPlaying) return;
                    
                    chord.forEach(freq => {
                        const osc = audioContext.createOscillator();
                        const gain = audioContext.createGain();
                        const distortion = audioContext.createWaveShaper();
                        
                        // Панк дисторшн
                        const samples = 22050;
                        const curve = new Float32Array(samples);
                        for (let i = 0; i < samples; i++) {
                            const x = (i * 2) / samples - 1;
                            curve[i] = Math.sign(x) * Math.pow(Math.abs(x), 0.3);
                        }
                        distortion.curve = curve;
                        
                        osc.connect(distortion);
                        distortion.connect(gain);
                        gain.connect(guitarGain);
                        
                        osc.frequency.value = freq;
                        osc.type = 'square';
                        
                        gain.gain.setValueAtTime(0.2, audioContext.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
                        
                        osc.start();
                        osc.stop(audioContext.currentTime + 0.8);
                        currentOscillators.push(osc);
                    });
                }, index * (track.tempo > 150 ? 400 : 600));
            });
            
            setTimeout(punkRiff, track.tempo > 150 ? 1600 : 2400);
        }
        
        punkRiff();
    }
    
    playPunkDrums();
    playPunkGuitar();
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
            
            // Мощный кик
            const kick = audioContext.createOscillator();
            const kickGain = audioContext.createGain();
            kick.connect(kickGain);
            kickGain.connect(drumGain);
            
            kick.frequency.value = 50;
            kick.type = 'sine';
            kickGain.gain.setValueAtTime(1.0, audioContext.currentTime);
            kickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
            
            kick.start();
            kick.stop(audioContext.currentTime + 0.6);
            currentOscillators.push(kick);
            
            // Грязный снейр
            setTimeout(() => {
                if (!isPlaying) return;
                const snare = audioContext.createOscillator();
                const snareGain = audioContext.createGain();
                const noise = audioContext.createBufferSource();
                
                // Создаем шум для гранжевого снейра
                const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.3, audioContext.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < data.length; i++) {
                    data[i] = (Math.random() * 2 - 1) * 0.5;
                }
                noise.buffer = buffer;
                
                snare.connect(snareGain);
                noise.connect(snareGain);
                snareGain.connect(drumGain);
                
                snare.frequency.value = 180;
                snare.type = 'square';
                snareGain.gain.setValueAtTime(0.7, audioContext.currentTime);
                snareGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                
                snare.start();
                noise.start();
                snare.stop(audioContext.currentTime + 0.4);
                noise.stop(audioContext.currentTime + 0.4);
                
                currentOscillators.push(snare);
            }, 1200);
            
            setTimeout(drumBeat, 2400);
        }
        
        drumBeat();
    }
    
    // Гранж-гитара с характерным звуком
    function playGrungeGuitar() {
        const guitarGain = audioContext.createGain();
        guitarGain.connect(masterGain);
        guitarGain.gain.value = 0.35;
        
        function grungeRiff() {
            if (!isPlaying) return;
            
            const grungeChords = [
                [110.00, 164.81], // A3, E4
                [123.47, 185.00], // B3, F#4
                [146.83, 220.00], // D4, A4
                [98.00, 146.83]   // G3, D4
            ];
            
            grungeChords.forEach((chord, index) => {
                setTimeout(() => {
                    if (!isPlaying) return;
                    
                    chord.forEach(freq => {
                        const osc = audioContext.createOscillator();
                        const gain = audioContext.createGain();
                        const filter = audioContext.createBiquadFilter();
                        const distortion = audioContext.createWaveShaper();
                        
                        // Гранжевая дисторшн
                        const samples = 22050;
                        const curve = new Float32Array(samples);
                        for (let i = 0; i < samples; i++) {
                            const x = (i * 2) / samples - 1;
                            curve[i] = Math.sign(x) * (1 - Math.exp(-Math.abs(x) * 3));
                        }
                        distortion.curve = curve;
                        
                        osc.connect(distortion);
                        distortion.connect(filter);
                        filter.connect(gain);
                        gain.connect(guitarGain);
                        
                        osc.frequency.value = freq;
                        osc.type = 'sawtooth';
                        filter.type = 'lowpass';
                        filter.frequency.value = 1200;
                        filter.Q.value = 8;
                        
                        gain.gain.setValueAtTime(0.25, audioContext.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.8);
                        
                        osc.start();
                        osc.stop(audioContext.currentTime + 1.8);
                        currentOscillators.push(osc);
                    });
                }, index * 800);
            });
            
            setTimeout(grungeRiff, 3200);
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
    
    // Тяжелые альтернативные барабаны
    function playAltDrums() {
        const drumGain = audioContext.createGain();
        drumGain.connect(masterGain);
        drumGain.gain.value = 0.5;
        
        function drumPattern() {
            if (!isPlaying) return;
            
            // Двойной кик
            const kick = audioContext.createOscillator();
            const kickGain = audioContext.createGain();
            kick.connect(kickGain);
            kickGain.connect(drumGain);
            
            kick.frequency.value = 45;
            kick.type = 'sine';
            kickGain.gain.setValueAtTime(1.2, audioContext.currentTime);
            kickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            kick.start();
            kick.stop(audioContext.currentTime + 0.5);
            currentOscillators.push(kick);
            
            // Мощный снейр
            setTimeout(() => {
                if (!isPlaying) return;
                const snare = audioContext.createOscillator();
                const snareGain = audioContext.createGain();
                snare.connect(snareGain);
                snareGain.connect(drumGain);
                
                snare.frequency.value = 200;
                snare.type = 'square';
                snareGain.gain.setValueAtTime(0.9, audioContext.currentTime);
                snareGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                snare.start();
                snare.stop(audioContext.currentTime + 0.3);
                currentOscillators.push(snare);
            }, 600);
            
            setTimeout(drumPattern, 1200);
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
            
            const altChords = [
                [82.41, 164.81, 329.63], // E power chord
                [87.31, 174.61, 349.23], // F power chord
                [98.00, 196.00, 392.00], // G power chord
                [73.42, 146.83, 293.66]  // D power chord
            ];
            
            altChords.forEach((chord, index) => {
                setTimeout(() => {
                    if (!isPlaying) return;
                    
                    chord.forEach(freq => {
                        const osc = audioContext.createOscillator();
                        const gain = audioContext.createGain();
                        const distortion = audioContext.createWaveShaper();
                        const filter = audioContext.createBiquadFilter();
                        
                        // Тяжелая альтернативная дисторшн
                        const samples = 22050;
                        const curve = new Float32Array(samples);
                        for (let i = 0; i < samples; i++) {
                            const x = (i * 2) / samples - 1;
                            curve[i] = Math.sign(x) * Math.pow(Math.abs(x), 0.2);
                        }
                        distortion.curve = curve;
                        
                        osc.connect(distortion);
                        distortion.connect(filter);
                        filter.connect(gain);
                        gain.connect(guitarGain);
                        
                        osc.frequency.value = freq;
                        osc.type = 'square';
                        filter.type = 'lowpass';
                        filter.frequency.value = 2000;
                        filter.Q.value = 5;
                        
                        gain.gain.setValueAtTime(0.15, audioContext.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.2);
                        
                        osc.start();
                        osc.stop(audioContext.currentTime + 1.2);
                        currentOscillators.push(osc);
                    });
                }, index * 1000);
            });
            
            setTimeout(heavyRiff, 4000);
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
            
            // Blast beats - очень быстрые удары
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    if (!isPlaying) return;
                    
                    // Двойной кик
                    const kick = audioContext.createOscillator();
                    const kickGain = audioContext.createGain();
                    kick.connect(kickGain);
                    kickGain.connect(drumGain);
                    
                    kick.frequency.value = 35;
                    kick.type = 'sine';
                    kickGain.gain.setValueAtTime(1.5, audioContext.currentTime);
                    kickGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                    
                    kick.start();
                    kick.stop(audioContext.currentTime + 0.15);
                    currentOscillators.push(kick);
                    
                    // Быстрый снейр
                    const snare = audioContext.createOscillator();
                    const snareGain = audioContext.createGain();
                    snare.connect(snareGain);
                    snareGain.connect(drumGain);
                    
                    snare.frequency.value = 300;
                    snare.type = 'square';
                    snareGain.gain.setValueAtTime(1.0, audioContext.currentTime);
                    snareGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
                    
                    snare.start();
                    snare.stop(audioContext.currentTime + 0.08);
                    currentOscillators.push(snare);
                }, i * 150);
            }
            
            setTimeout(brutalBeats, 800);
        }
        
        brutalBeats();
    }
    
    // Экстремальная хардкор гитара
    function playHardcoreGuitar() {
        const guitarGain = audioContext.createGain();
        guitarGain.connect(masterGain);
        guitarGain.gain.value = 0.5;
        
        function extremeRiff() {
            if (!isPlaying) return;
            
            // Низкие частоты для брутального звука
            const brutalFreqs = [55.00, 61.74, 65.41, 73.42]; // Down-tuned
            
            brutalFreqs.forEach((freq, index) => {
                setTimeout(() => {
                    if (!isPlaying) return;
                    
                    // Создаем несколько осцилляторов для толщины звука
                    for (let oct = 0; oct < 3; oct++) {
                        const osc = audioContext.createOscillator();
                        const gain = audioContext.createGain();
                        const distortion = audioContext.createWaveShaper();
                        const filter = audioContext.createBiquadFilter();
                        
                        // Экстремальная дисторшн
                        const samples = 22050;
                        const curve = new Float32Array(samples);
                        for (let i = 0; i < samples; i++) {
                            const x = (i * 2) / samples - 1;
                            curve[i] = Math.sign(x) * (1 - Math.exp(-Math.abs(x) * 8));
                        }
                        distortion.curve = curve;
                        
                        osc.connect(distortion);
                        distortion.connect(filter);
                        filter.connect(gain);
                        gain.connect(guitarGain);
                        
                        osc.frequency.value = freq * Math.pow(2, oct);
                        osc.type = 'sawtooth';
                        filter.type = 'lowpass';
                        filter.frequency.value = 600;
                        filter.Q.value = 25;
                        
                        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                        
                        osc.start();
                        osc.stop(audioContext.currentTime + 0.4);
                        currentOscillators.push(osc);
                    }
                }, index * 200);
            });
            
            setTimeout(extremeRiff, 1000);
        }
        
        extremeRiff();
    }
    
    playHardcoreDrums();
    playHardcoreGuitar();
}

// Инициализация музыки при загрузке страницы
function initMusic() {
    const musicBtn = document.getElementById('musicToggle');
    
    // Автозапуск музыки через 2 секунды после загрузки
    if (musicBtn) {
        setTimeout(() => {
            // Проверяем, может ли браузер воспроизводить аудио без взаимодействия
            if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
                try {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    if (audioContext.state === 'suspended') {
                        // Ждем первого клика пользователя для запуска
                        document.addEventListener('click', () => {
                            if (!isPlaying) {
                                setTimeout(() => {
                                    if (!isPlaying) {
                                        isPlaying = true;
                                        playCurrentTrack();
                                        const musicIcon = document.getElementById('musicIcon');
                                        const musicText = document.getElementById('musicText');
                                        
                                        if (musicIcon && musicText) {
                                            musicIcon.textContent = '🔊';
                                            musicText.textContent = `♪ ${musicPlaylist[currentTrackIndex].artist}`;
                                            musicBtn.classList.remove('muted');
                                            musicBtn.classList.add('playing');
                                        }
                                        
                                        startVisualizer();
                                    }
                                }, 1000);
                            }
                        }, { once: true });
                    }
                } catch (error) {
                    console.log('Web Audio API не поддерживается');
                }
            }
        }, 2000);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем анимацию загрузки
    document.body.classList.add('loading');
    
    // Инициализируем музыку
    initMusic();
    
    // Показываем информацию о плейлисте
    console.log('🎸 Сайт АскНН загружен!');
    console.log('🎵 Плейлист содержит треки:');
    musicPlaylist.forEach((track, index) => {
        console.log(`${index + 1}. ${track.artist} - ${track.title} (${track.genre})`);
    });
    
    // Добавляем обработчики событий для кнопок
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Плавное появление элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами галереи
    const galleryItems = document.querySelectorAll('.image-card, .action-btn');
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
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