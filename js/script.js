
document.addEventListener('DOMContentLoaded', () => {
    const introVideo = document.getElementById('intro-video');
    const startButton = document.getElementById('startButton');
    const clickSound = document.getElementById('clickSound');

    // Attempt to play video. If 'muted' is removed and browser permits, sound will play.
    // No explicit .play() call needed here as 'autoplay' handles it for visual playback.
    // However, calling .play() again can help catch errors if initial autoplay with sound fails.
    introVideo.play().catch(error => {
        console.log('Помилка відтворення відео (можливо, браузер все ж блокує автозапуск звуку):', error);
    });

    // Play click sound when the Start button is clicked
    startButton.addEventListener('click', () => {
        clickSound.currentTime = 0; // Reset sound to the beginning
        clickSound.play().catch(error => {
            console.log('Не вдалося відтворити звук кліку:', error);
        });

        window.location.href = 'game.html'; // Navigate to the game page
    });

    // Register Service Worker (for PWA)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
        });
    }
});
