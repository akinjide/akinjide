var cacheName = 'akinjide-resume-v1';
var cacheFiles = [
  '/',
  '/index.html',
  '/404.html',
  '/styles/iemobile.css',
  '/styles/noscript.css',
  '/scripts/lib/jquery.min.js',
  '/build/_oc2y0.min.css',
  '/build/_tn2fu.min.css',
  '/build/_6ltyr.min.js',
  '/build/_6kgkb.min.js',
  '/images/404-noise.png',
  '/images/404-stripe.png',
  '/images/akinjide-avatar.png',
  '/images/akinjide-loader.png',
  '/images/clippy.svg',
  '/images/header-shadow.png',
  '/images/icon_close_w_60x60.png',
  '/images/personal-info-sep.png',
  '/images/photo-inner.png',
  '/images/pin.png',
  '/images/tab-hover.png',
  '/images/tab-hover@2x.png',
  '/images/tooltip.svg',
  '/book/building-scalable-apps-with-redis-and-nodejs.png',
  '/book/expressjs-middleware.png',
  '/book/learn-python-hard-way.png',
  '/book/mean-machine.png',
  '/book/node-security.png',
  '/book/the-heroku-hackers-guide.png',
  '/portfolio/2-thumb.png',
  '/portfolio/2.png',
  '/portfolio/3-thumb.png',
  '/portfolio/3.png',
  '/portfolio/4-thumb.png',
  '/portfolio/4.png',
  '/portfolio/6-thumb.png',
  '/portfolio/6.png',
//   'http://html5shiv.googlecode.com/svn/trunk/html5.js',
  'https://fonts.googleapis.com/css?family=Open+Sans:400,600,300,800,700,400italic',
  'https://fonts.googleapis.com/css?family=Fira+Mono',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
  '//code.jquery.com/jquery-1.10.2.min.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');

  // Wait till promise within is resolved.
  e.waitUntil(
    caches
      .open(cacheName)
      .then(function(cache) {
        console.log('[ServiceWorker] Caching cacheFiles');
        return cache.addAll(cacheFiles);
      })
      .catch(function(error) {
        console.log('[ServiceWorker] Failed Caching cacheFiles', error);
      })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');

  e.waitUntil(
    caches
      .keys()
      .then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(thisCacheName) {
          if (thisCacheName !== cacheName) {
            console.log('[ServiceWorker] Removing Old CacheFiles', thisCacheName);
            return caches.delete(thisCacheName);
          }
        }));
      })
  );
})

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);

  e.respondWith(
    caches
      .match(e.request)
      .then(function(response) {
        if (response) {
          console.log('[ServiceWorker] Found Cache', e.request.url);
          return response;
        }

        var requestClone = e.request.clone();

        fetch(requestClone)
          .then(function(response) {
            if (!response) {
              console.log('[ServiceWorker] Fetch No Response', e.request.url);
              return response;
            }

            var responseClone = response.clone();

            caches
              .open(cacheName)
              .then(function(cache) {
                cache.put(e.request, responseClone);
                return response;
              });

          })
          .catch(function(error) {
            console.log('[ServiceWorker] Fetch & Cache Failed');
          });

      })
  );
});
