const FOCUSEA_CACHE = "focusea-signup-alerts-cache-1";
const FOCUSEA_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./landing.css",
  "./script.js",
  "./theme.js",
  "./monetization-config.js",
  "./monetization.js",
  "./stability.html",
  "./insurance.html",
  "./deal-surgeon.html",
  "./laytime-calculator.html",
  "./demurrage-calculator.html",
  "./voyage-estimate.html",
  "./port-intelligence.html",
  "./maritime-broker-tools.html",
  "./privacy-policy.html",
  "./terms-of-use.html",
  "./advertising-policy.html",
  "./about.html",
  "./contact.html",
  "./stability.css",
  "./insurance.css",
  "./deal-surgeon.css",
  "./stability.js",
  "./insurance.js",
  "./deal-surgeon.js",
  "./favicon-concept-b.png",
  "./stability-loadicator-basic.js",
  "./stability-3d.js",
  "./assets/brand/focusea-concept-b-mark.png",
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
      .then(() => self.clients.matchAll({ type: "window", includeUncontrolled: true }))
      .then((clients) => {
        clients.forEach((client) => {
          if (client.url && client.navigate) client.navigate(client.url);
        });
      })
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
