
var cacheName = 'cacheV1';

var filesToCache = [
	'./index.html',
  './js/menu.js',
  './css/styles.css',
];

self.addEventListener('install', function (event) {
  console.log('serviceWorker: install event listener')
  event.waitUntil(
  	caches.open(cacheName)
  		.then(function (cache) {
  			return cache.addAll(filesToCache)
  				.then(function () {
  					console.log("[INSTALL] Files cached");
  				})
  		})
  		.catch(function (err) {
  			console.warn("[INSTALL] Error while caching ", err);
  		})
	);

});

self.addEventListener('activate', function (event) {
  console.log('serviceWorker: activate event listener')



});

self.addEventListener('fetch', function(event) {
  console.log('[FETCH] - called')


	let req = event.request;


  event.respondWith(
    caches.match(req).then(function(res) {
			if (res) {
				console.log('[FETCH] - Found in cache');
				return res;
			}

      // Else add the request to cache and return the response
      return fetch(req).then(function(res2) {
        console.log("[FETCH] - Not found in cache, returning from network");

        // User is Online but wrong URL and page not found
        if(res2.status === 404) return new Response('[404] - Page not found');

        //Adding to cache
        var responseToCache = res2.clone();
        caches.open(cacheName).then(function (cache) {
          cache.put(req, responseToCache);
        });

        // Return the response
        return res;

      });
    })
  )


});
