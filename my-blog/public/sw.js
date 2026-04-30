const CACHE_NAME = "blog-cache-v1"
const urlsToCache = ["/", "/posts-csr", "/posts-ssr"]

// install
self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache)
    }))
})

// fetch (cache first)
self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        return response || fetch(event.request)
    }))
})