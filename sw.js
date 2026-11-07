// Élan : cache hors-ligne. Change VERSION à chaque mise à jour.
const VERSION='elan-v4';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url);
  if(u.origin!==location.origin&&!/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) return; // la base de données passe toujours par le réseau
  if(r.mode==='navigate'){ // réseau d'abord : les mises à jour arrivent dès qu'il y a du réseau
    e.respondWith(fetch(r).then(res=>{const cp=res.clone(); caches.open(VERSION).then(c=>c.put('./index.html',cp)); return res;}).catch(()=>caches.match('./index.html')));
    return; }
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{ if(res.ok||res.type==='opaque'){const cp=res.clone(); caches.open(VERSION).then(c=>c.put(r,cp));} return res; })));
});
