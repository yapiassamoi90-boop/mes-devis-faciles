const CACHE_NAME = "devis-app-v1";

// Liste des fichiers à mettre en cache pour le mode hors-ligne
const urlsToCache = [
  "./",
  "./devis.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Installation : Mise en cache des ressources
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cache ouvert");
        return cache.addAll(urlsToCache);
      })
  );
});

// Stratégie de récupération : Cache en priorité, sinon Réseau
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si le fichier est dans le cache, on le renvoie, sinon on va sur le web
        return response || fetch(event.request);
      })
  );
});