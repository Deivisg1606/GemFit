// Private data never enter Cache Storage. Firebase auth is required on every new session.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  // Remove cached GemFit HTML and data left by the previous worker, without
  // deleting other apps' entries on the same hosting origin.
  const base=self.registration.scope;
  for(const name of await caches.keys()){
    const cache=await caches.open(name);
    for(const request of await cache.keys())if(request.url.startsWith(base))await cache.delete(request);
  }
  await self.clients.claim();
})()));
// No fetch handler: requests always go to the network.
