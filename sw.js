/* © 2026 Fine Print News. All rights reserved. */
/* Fine Print News service worker: lets the app open offline with the last stories it saw.
   Network first, so readers always get the newest version when online. Bump VERSION when you change files. */
const VERSION = "fpn-v19";
const SHELL = ["./", "index.html", "whats-missing.js", "whats-missing.css", "data/stories.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(fetch(req).then(res => {
    const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res;
  }).catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
});
