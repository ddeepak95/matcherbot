var cacheName = 'matcherbotv3.0.1';
var filesToCache = [
  '/',
  '/index.html',
  '/sw.js',  
  '/managegame.html',
  '/gameplay.html',
  '/css/style.css',
  '/css/hover-min.css',
  '/game_data/Common_Items_demo.json',  
  '/js/artyom.window.min.js', 
  '/js/filesaver.js',
  '/js/gamescript.js',
  '/js/main.js',
  '/js/managegame.js',
  '/js/modal.js',
  '/js/selectgame.js', 
  '/js/tabulator/dist/js/tabulator.min.js', 
  '/js/tabulator/dist/css/tabulator_simple.min.css',
  '/js/tabulator/dist/css/tabulator_simple.min.css.map',                            
  '/font/Blinker-Bold.ttf',
  '/font/Blinker-Regular.ttf',
  '/images/addQues.png',
  '/images/back.png',
  '/images/bgngame.png',
  '/images/close.png',
  '/images/credit.png',
  '/images/endgame.png',
  '/images/genFile.png',
  '/images/life.png',
  '/images/logo.png',
  '/images/newGameFile.png',
  '/images/newGameSc.png',
  '/images/nolife.png',
  '/images/playagain.png',
  '/images/restrtgame.png',
  '/images/sltgame.png',
  '/images/strtgame.png',
  '/images/vconf.png',
  '/images/matcherbot-icon-144.png', 
  '/images/matcherbot-icon-152.png',
  '/images/matcherbot-icon-192.png', 
  '/images/matcherbot-icon-512.png',     
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request);
//     })
//   );
// });

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});


self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  var cacheKeeplist = [cacheName];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});