// ================================================
// SERVICE WORKER PARA EDUPLAY
// ================================================

const CACHE_NAME = 'eduplay-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Archivos críticos para cachear
const CORE_CACHE_FILES = [
  '/',
  '/index.html',
  '/offline.html', // <-- AÑADIDO AQUÍ
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Archivos adicionales para cachear
const CACHE_FILES = [
  ...CORE_CACHE_FILES,
  '/api.php',
  '/css/styles.css',
  '/js/app.js'
];

// ================================================
// INSTALACIÓN DEL SERVICE WORKER
// ================================================

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching core files');
      return cache.addAll(CORE_CACHE_FILES);
    }).catch((error) => {
      console.error('Service Worker: Cache failed', error);
    })
  );
});

// ================================================
// ACTIVACIÓN DEL SERVICE WORKER
// ================================================

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  self.clients.claim();
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// ================================================
// INTERCEPTAR PETICIONES DE RED
// ================================================

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  if (url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(networkFirstThenCache(event.request));
    return;
  }

  if (url.pathname.includes('api.php')) {
    event.respondWith(networkOnlyWithFallback(event.request));
    return;
  }

  if (url.pathname.match(/\.(css|js|png|jpg|ico)$/)) {
    event.respondWith(cacheFirstThenNetwork(event.request));
    return;
  }

  event.respondWith(networkFirstThenCache(event.request));
});

// ================================================
// ESTRATEGIAS DE CACHE
// ================================================

async function networkFirstThenCache(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;
    if (request.destination === 'document') {
      return caches.match(OFFLINE_URL);
    }
    throw error;
  }
}

async function networkOnlyWithFallback(request) {
  try {
    return await fetch(request);
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Sin conexión a internet. Los datos se guardarán localmente.',
        offline: true
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

async function cacheFirstThenNetwork(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    fetch(request).then(async (networkResponse) => {
      if (networkResponse.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, networkResponse.clone());
      }
    }).catch(() => {});
    return cachedResponse;
  }

  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
  }
  return networkResponse;
}

// ================================================
// MENSAJES DEL CLIENTE
// ================================================

self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
    case 'GET_VERSION':
      event.ports[0].postMessage({ version: CACHE_NAME });
      break;
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ success: true, message: 'Cache cleared successfully' });
      }).catch(() => {
        event.ports[0].postMessage({ success: false, message: 'Failed to clear cache' });
      });
      break;
    case 'CACHE_GAME_DATA':
      cacheGameData(data).then(() => {
        event.ports[0].postMessage({ success: true, message: 'Game data cached' });
      }).catch(() => {
        event.ports[0].postMessage({ success: false, message: 'Failed to cache game data' });
      });
      break;
  }
});

// ================================================
// FUNCIONES AUXILIARES
// ================================================

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(cacheNames.map(name => caches.delete(name)));
}

async function cacheGameData(gameData) {
  const cache = await caches.open(CACHE_NAME);
  const response = new Response(JSON.stringify(gameData), {
    headers: { 'Content-Type': 'application/json' }
  });
  return cache.put('/cached-game-data', response);
}

// ================================================
// SYNC EN BACKGROUND
// ================================================

self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncOfflineData());
  }
});

async function syncOfflineData() {
  console.log('Service Worker: Syncing offline data...');
  const clients = await self.clients.matchAll();
  clients.forEach(client => {
    client.postMessage({ type: 'SYNC_OFFLINE_DATA' });
  });
}

// ================================================
// NOTIFICACIONES PUSH
// ================================================

self.addEventListener('push', (event) => {
  const options = {
    body: 'Tienes nuevos juegos disponibles en EduPlay!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      { action: 'explore', title: 'Jugar Ahora', icon: '/icons/action-play.png' },
      { action: 'close', title: 'Cerrar', icon: '/icons/action-close.png' }
    ]
  };

  if (event.data) {
    const payload = event.data.json();
    options.body = payload.body || options.body;
    options.title = payload.title || 'EduPlay';
  }

  event.waitUntil(
    self.registration.showNotification('EduPlay', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});

// ================================================
// LOG FINAL
// ================================================

console.log('✅ EduPlay Service Worker cargado correctamente');
console.log('📦 Cache activa:', CACHE_NAME);
console.log('📁 Archivos críticos en caché:', CORE_CACHE_FILES.length);
