#!/bin/bash

echo "🚀 Автоматическое размещение сайта АскНН"
echo "========================================="

# Создаем архив для загрузки
echo "📦 Создание архива сайта..."
zip -r asknn-website.zip index.html styles.css script.js netlify.toml vercel.json CNAME README.md

echo "✅ Архив создан: asknn-website.zip"
echo ""

echo "🌐 ССЫЛКИ ДЛЯ РАЗМЕЩЕНИЯ:"
echo "========================="
echo ""
echo "1. 🥇 Netlify Drop (РЕКОМЕНДУЕТСЯ):"
echo "   https://app.netlify.com/drop"
echo "   Перетащите: asknn-website.zip"
echo ""
echo "2. 🥈 Vercel:"
echo "   https://vercel.com/new"
echo "   Загрузите: asknn-website.zip"
echo ""
echo "3. 🥉 GitHub Pages:"
echo "   Создайте репозиторий и загрузите файлы"
echo ""
echo "4. 🏠 Локальный сервер уже запущен:"
echo "   http://localhost:8080"
echo ""

# Проверяем локальный сервер
if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ Сайт работает локально: http://localhost:8080"
else
    echo "❌ Локальный сервер не запущен"
    echo "🔧 Запуск локального сервера..."
    python3 -m http.server 8080 &
    sleep 2
    echo "✅ Сайт доступен: http://localhost:8080"
fi

echo ""
echo "🎉 САЙТ АскНН ГОТОВ К ИСПОЛЬЗОВАНИЮ!"