
const CACHE_NAME = 'weeclash-cache-v2'; // Змініть версію кешу при оновленні файлів
const urlsToCache = [
  '/',
  '/index.html',
  '/game.html', // Додано сторінку гри
  '/manifest.json',
  '/ico.png', // Ваша іконка
  '/media/intro.mp4', // Додано інтро-відео
  '/media/click.mp3', // Додано звук кліку
  '/media/background.mp3', // Додано фонову музику
  '/media/fon.png' // Додано фонове зображення для гри
  // Додайте тут будь-які інші статичні файли, які ви хочете кешувати (наприклад, CSS, JavaScript, інші зображення)
  // Наприклад:
  // '/css/main.css',
  // '/js/app.js'
];

self.addEventListener('install', event => {
  // Ця подія спрацьовує, коли Service Worker вперше встановлюється.
  // Кешуємо всі важливі ресурси.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Відкрито кеш');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Ця подія спрацьовує при кожному мережевому запиті.
  // Ми перехоплюємо запити і, якщо ресурс є в кеші, повертаємо його звідти.
  // В іншому випадку, робимо запит до мережі.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Якщо ресурс знайдено в кеші, повертаємо його.
        if (response) {
          console.log('Service Worker: Ресурс завантажено з кешу:', event.request.url);
          return response;
        }
        // Якщо ресурсу немає в кеші, робимо звичайний мережевий запит.
        console.log('Service Worker: Ресурс завантажено з мережі:', event.request.url);
        return fetch(event.request);
      })
      .catch(error => {
        // Обробка помилок мережі (наприклад, офлайн)
        console.error('Service Worker: Помилка при отриманні ресурсу:', error);
        // Тут можна повернути офлайн-сторінку, якщо користувач без інтернету
        // return caches.match('/offline.html'); 
      })
  );
});

self.addEventListener('activate', event => {
  // Ця подія спрацьовує, коли Service Worker активується.
  // Видаляємо старі версії кешу.
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Видалення старого кешу:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
