const CACHE_NAME = 'to-do-app-v1';

self.addEventListener('install', (event) => {
    event.waitUntil((async ()=> {
        const cache =  await caches.open(CACHE_NAME);
        cache.addAll([
            '/',
            'script.js',
            'style.css'
        ]);
    })());
});

self.addEventListener('fetch', (event) => {

    event.respondWith((async ()=> {
        const cache =  await caches.open(CACHE_NAME);

        const cachedResponce = await cache.match(event.request);
        if(cachedResponce) {
            return cachedResponce;
        } else {
            try {
                const fetchResponce = await fetch(event.request);

                cache.put(event.request, fetchResponce.clone());
                return fetchResponce;
            } catch (e) {
                console.log(e);
            }
        }

    })());
});