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

// Добавляем эффекты при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
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