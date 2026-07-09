/* Freskura — service worker
   Shell: caché primero · Datos (WFS/Overpass): red primero con respaldo
   Teselas (OSM + WMS sombra): caché primero con relleno en segundo plano */
"use strict";

const VERSION = "fk-v2";
const SHELL_CACHE = VERSION + "-shell";
const DATA_CACHE = VERSION + "-data";

const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(SHELL_CACHE)
      .then((c) => Promise.allSettled(SHELL.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" && e.request.method !== "POST") return;
  const url = new URL(e.request.url);

  /* Datos vivos: red primero, caché de respaldo (solo GET) */
  if (e.request.method === "GET" &&
      (url.hostname === "www.geobilbao.eus" && url.search.includes("WFS") ||
       url.hostname === "api.open-meteo.com")) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(DATA_CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  if (e.request.method !== "GET") return;

  /* Teselas OSM + WMS: caché primero */
  if (url.hostname.endsWith("tile.openstreetmap.org") ||
      (url.hostname === "www.geobilbao.eus" && url.search.includes("WMS"))) {
    e.respondWith(
      caches.match(e.request).then((hit) =>
        hit ||
        fetch(e.request).then((res) => {
          const copy = res.clone();
          caches.open(DATA_CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
      )
    );
    return;
  }

  /* Shell y CDN */
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
