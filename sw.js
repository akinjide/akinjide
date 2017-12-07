var cacheName = 'akinjide-resume-v1';
var cacheFiles = [
  '/',
  '/index.html',
  '/404.html',
  '/static/styles/iemobile.css',
  '/static/styles/noscript.css',
  '/static/scripts/lib/jquery.min.js',
  '/static/build/_oc2y0.min.css',
  '/static/build/_tn2fu.min.css',
  '/static/build/_6ltyr.min.js',
  '/static/build/_6kgkb.min.js',
  '/static/images/404-noise.png',
  '/static/images/404-stripe.png',
  '/static/images/akinjide-avatar.png',
  '/static/images/akinjide-loader.png',
  '/static/images/clippy.svg',
  '/static/images/header-shadow.png',
  '/static/images/icon_close_w_60x60.png',
  '/static/images/personal-info-sep.png',
  '/static/images/photo-inner.png',
  '/static/images/pin.png',
  '/static/images/tab-hover.png',
  '/static/images/tab-hover@2x.png',
  '/static/images/tooltip.svg',
  '/static/book/building-scalable-apps-with-redis-and-nodejs.png',
  '/static/book/expressjs-middleware.png',
  '/static/book/learn-python-hard-way.png',
  '/static/book/mean-machine.png',
  '/static/book/node-security.png',
  '/static/book/the-heroku-hackers-guide.png',
  '/static/portfolio/2-thumb.png',
  '/static/portfolio/2.png',
  '/static/portfolio/3-thumb.png',
  '/static/portfolio/3.png',
  '/static/portfolio/4-thumb.png',
  '/static/portfolio/4.png',
  '/static/portfolio/6-thumb.png',
  '/static/portfolio/6.png',
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
