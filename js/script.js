document.addEventListener('DOMContentLoaded', () => {
    const introVideo = document.getElementById('intro-video');
    const startButton = document.getElementById('startButton');
    const clickSound = document.getElementById('clickSound');

    // Telegram WebApp API
    const tg = window.Telegram.WebApp;
    tg.expand();

    // ✅ Автоматичний перехід, якщо авторизовано
    const user = tg.initDataUnsafe.user;
    if (user) {
        console.log("Автоматичний вхід як:", user.username || user.first_name);
        window.location.href = 'game.html';
        return; // Зупиняємо подальше виконання
    }

    // Відтворення відео
    introVideo.play().catch(error => {
        console.log('Помилка відтворення відео:', error);
    });

    // Натискання кнопки "Старт"
    startButton.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play().catch(error => {
            console.log('Не вдалося відтворити звук кліку:', error);
        });

        if (user) {
            window.location.href = 'game.html';
        } else {
            alert("Відкрийте гру через Telegram бот для авторизації.");
        }
    });

    // Реєстрація Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker зареєстрований:', registration.scope);
                })
                .catch(error => {
                    console.log('Помилка ServiceWorker:', error);
                });
        });
    }
});
