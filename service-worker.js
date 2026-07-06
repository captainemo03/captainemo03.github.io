const FOCUSEA_CACHE = "focusea-news-live-1";
const FOCUSEA_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./stability.html",
  "./stability.css",
  "./stability.js",
  "./stability-3d.js",
  "./assets/brand/focusea-mark.svg",
  "./assets/brand/focusea-mark.png",
  "./assets/brand/focusea-logo.png",
  "./assets/hero/focusea-command-hero.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(FOCUSEA_CACHE)
      .then((cache) => cache.addAll(FOCUSEA_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== FOCUSEA_CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(FOCUSEA_CACHE).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => (
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        if (event.request.mode === "navigate") return caches.match("./index.html");
        return caches.match("./index.html");
      })
    ))
  );
});
