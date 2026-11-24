const V="erudite-v1",SHELL=["/","/icon-192.png","/icon-512.png","/manifest.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Network first, so new versions always load; the cache is only the offline fallback.
// Other sites (Supabase, fonts) are never touched.
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{
    if(res.ok&&res.type==="basic"){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}
    return res;
  }).catch(()=>caches.match(r).then(m=>m||(r.mode==="navigate"?caches.match("/"):Response.error()))));
});
