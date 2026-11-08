// Dromos : cache hors-ligne. Change VERSION à chaque mise à jour.
const VERSION='dromos-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('push',e=>{ const late=new Date().getHours()>=21;
  e.waitUntil(self.registration.showNotification(late?'Ta série est en danger':'Ta séance t’attend',{body:late?'Quelques minutes avant minuit suffisent pour la garder.':'Quelques minutes aujourd’hui, et ta série continue.',icon:'icon-192.png',badge:'icon-192.png',tag:'elan-rappel'})); });
self.addEventListener('notificationclick',e=>{ e.notification.close(); e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{ for(const c of cs){ if('focus' in c){ if('navigate' in c) c.navigate('./#seance').catch(()=>{}); return c.focus(); } } return clients.openWindow('./#seance'); })); });
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url);
  if(u.pathname.endsWith('/version.json')) return;
  if(u.origin!==location.origin&&!/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) return; // la base de données passe toujours par le réseau
  if(r.mode==='navigate'){ // réseau d'abord : les mises à jour arrivent dès qu'il y a du réseau
    e.respondWith(fetch(r.url,{cache:'no-cache',credentials:'same-origin'}).then(res=>{ if(res.ok&&res.type==='basic'&&/\/(index\.html)?$/.test(u.pathname)){const cp=res.clone(); caches.open(VERSION).then(c=>c.put('./index.html',cp));} return res;}).catch(()=>caches.match('./index.html')));
    return; }
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{ if(res.ok||res.type==='opaque'){const cp=res.clone(); caches.open(VERSION).then(c=>c.put(r,cp));} return res; })));
});
