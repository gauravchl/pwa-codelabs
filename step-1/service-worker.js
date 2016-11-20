
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

self.addEventListener('fetch', function (event) {
  console.log('serviceWorker: fetch event listener')


});
