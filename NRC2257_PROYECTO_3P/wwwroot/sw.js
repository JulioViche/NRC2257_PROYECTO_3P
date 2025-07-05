// Service Worker para AutosRent PWA
const CACHE_NAME = 'autosrent-v1.0.0';
const STATIC_CACHE_NAME = 'autosrent-static-v1';
const DYNAMIC_CACHE_NAME = 'autosrent-dynamic-v1';

// Archivos que se cachearán para uso offline
const STATIC_FILES = [
  '/',
  '/Login/IndexLogin',
  '/Home/Index',
  '/css/site.css',
  '/js/generic.js',
  '/js/home.js',
  '/js/login-validacion.js',
  '/lib/bootstrap/dist/css/bootstrap.min.css',
  '/lib/bootstrap/dist/js/bootstrap.bundle.min.js',
  '/lib/jquery/dist/jquery.min.js',
  '/favicon.ico',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/ag-grid-community@31.1.1/dist/styles/ag-grid.css',
  'https://cdn.jsdelivr.net/npm/ag-grid-community@31.1.1/dist/styles/ag-theme-alpine.css'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker...', event);
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('[SW] Precaching static files');
        return cache.addAll(STATIC_FILES);
      })
      .catch(error => {
        console.error('[SW] Failed to cache static files:', error);
      })
  );
  
  // Forzar la activación del nuevo SW
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker...', event);
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Eliminar caches antiguos
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('[SW] Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
  
  // Tomar control de todas las páginas inmediatamente
  return self.clients.claim();
});

// Interceptar solicitudes de red
self.addEventListener('fetch', event => {
  // Solo manejar solicitudes GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Ignorar solicitudes a dominios externos que no sean CDN conocidos
  const url = new URL(event.request.url);
  const isExternalCDN = url.hostname.includes('cdnjs.cloudflare.com') || 
                       url.hostname.includes('cdn.jsdelivr.net') ||
                       url.hostname.includes('fonts.googleapis.com') ||
                       url.hostname.includes('fonts.gstatic.com');
  
  if (url.origin !== location.origin && !isExternalCDN) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si está en cache, devolverlo
        if (response) {
          console.log('[SW] Serving from cache:', event.request.url);
          return response;
        }

        // Si no está en cache, hacer fetch y cachear dinámicamente
        return fetch(event.request)
          .then(fetchResponse => {
            // Solo cachear respuestas exitosas
            if (fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              
              caches.open(DYNAMIC_CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseClone);
                });
            }
            
            return fetchResponse;
          })
          .catch(error => {
            console.log('[SW] Fetch failed, serving offline page:', error);
            
            // Si es una página HTML, devolver página de offline
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
            
            // Para otros recursos, simplemente fallar
            throw error;
          });
      })
  );
});

// Manejar mensajes del cliente
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Manejo de notificaciones push (para futuras implementaciones)
self.addEventListener('push', event => {
  console.log('[SW] Push message received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación de AutosRent',
    icon: '/images/icon-192.png',
    badge: '/images/icon-72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalles',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/images/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('AutosRent', options)
  );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification click received:', event);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      self.clients.openWindow('/')
    );
  }
});

// Sincronización en segundo plano (para futuras implementaciones)
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Aquí podrías sincronizar datos offline
      console.log('[SW] Performing background sync')
    );
  }
});