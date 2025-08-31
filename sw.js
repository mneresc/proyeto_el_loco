
const CACHE_NAME = "el-loco-a1-v20250831000849";
const PRECACHE_URLS = [
  "./index.html",
  "./offline.html",
  "./assets/css/style.css",
  "./assets/js/app.js",
  "./assets/manifest.webmanifest",
  "./assets/icons/icon-96.png",
  "./assets/icons/icon-128.png",
  "./assets/icons/icon-144.png",
  "./assets/icons/icon-152.png",
  "./assets/icons/icon-167.png",
  "./assets/icons/icon-180.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-256.png",
  "./assets/icons/icon-384.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/apple-touch-icon-180.png",
  "./assets/icons/splash-1290x2796.png",
  "./assets/icons/splash-1179x2556.png",
  "./assets/icons/splash-1170x2532.png",
  "./assets/icons/splash-2048x2732.png",
  "./images/geradas/U10_E2_nuestra_casa.png",
  "./images/geradas/U4_E1_ser_caracteristica.png",
  "./images/geradas/U4_E2_estar_estado.png",
  "./images/geradas/U4_E3_estar_ubicacion.png",
  "./images/geradas/U5_E1_hablar_presente.png",
  "./images/geradas/U5_E2_vivir_presente.png",
  "./images/geradas/U1_E1_presentarse.png",
  "./images/geradas/U1_E2_origen.png",
  "./images/geradas/U1_E3_despedida.png",
  "./images/geradas/U2_E1_deletrear.png",
  "./images/geradas/U2_E2_numero.png",
  "./images/geradas/U2_E3_cantidades.png",
  "./images/geradas/U3_E1_barra_botella.png",
  "./images/geradas/U3_E2_tarta_precio.png",
  "./images/geradas/U3_E3_la_cuenta.png",
  "./images/geradas/U6_E1_ser_adjetivo.png",
  "./images/geradas/U6_E2_tener_pelo_ojos.png",
  "./images/geradas/U6_E3_llevar_ropa.png",
  "./images/geradas/U7_E1_muestrario_colores.png",
  "./images/geradas/U7_E2_acuerdo_plural.png",
  "./images/geradas/U7_E3_compra_ropa.png",
  "./images/geradas/U8_E1_querer.png",
  "./images/geradas/U8_E2_poder_rampa.png",
  "./images/geradas/U8_E3_tener_edad.png",
  "./images/geradas/U9_E1_me_gusta.png",
  "./images/geradas/U9_E2_me_duele.png",
  "./images/geradas/U10_E1_mi_libro.png",
  "./images/geradas/S1_E1_pedir_cafe.png",
  "./images/geradas/S1_E2_cerrar_pagar.png",
  "./images/geradas/S2_E1_preferir_zumo.png",
  "./images/geradas/S2_E2_quiero_cafe_corto.png",
  "./images/geradas/S3_E1_cantidades.png",
  "./images/geradas/S3_E2_envases.png",
  "./images/geradas/S4_E1_valorar_plato.png",
  "./images/geradas/S4_E2_pedir_cuenta.png",
  "./images/geradas/4ae12389-6918-4ee9-8dbb-232020fbf81e.png",
  "./images/geradas/17ff2f3f-7a54-4dac-8336-2aadcc98c4ee.png",
  "./images/geradas/apple-touch-icon-latam.png",
  "./images/geradas/b3d7920b-d418-452c-ac2c-f9f893eef167.png",
  "./images/geradas/e55a8f95-2c8f-4c78-98a3-2d7b922288d2.png",
  "./images/geradas/icon-latam-1024.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)).then(self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return resp;
      }).catch(() => caches.match("./offline.html"));
    })
  );
});
