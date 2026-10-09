// UMW Scaler — bramka: hasło -> odszyfrowanie (AES-256-GCM, klucz z PBKDF2-SHA256) -> obowiązkowa zgoda -> aplikacja.
// Pliki aplikacji, głowic i wag modelu leżą w repozytorium WYŁĄCZNIE w postaci zaszyfrowanej (assets/*.enc).
'use strict';
const g$ = id => document.getElementById(id);
const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));

// Hasło bez znaków diakrytycznych (np. „ę” = „e”), żeby partnerzy z zagranicy mogli je wpisać; build_site.py robi to samo.
const normPw = pw => pw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
async function deriveKey(pw, salt, iterations) {
  pw = normPw(pw);
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, base,
                                 { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
}
async function decryptUrl(url, key) {
  const buf = new Uint8Array(await (await fetch(url)).arrayBuffer());
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, key, buf.slice(12));
}

async function unlock(ev) {
  ev.preventDefault();
  g$('gate_err').textContent = '';
  g$('gate_btn').disabled = true;
  try {
    const man = await (await fetch('assets/manifest.json', { cache: 'no-store' })).json();
    const key = await deriveKey(g$('gate_pw').value, b64(man.salt), man.iterations);
    const appCode = new TextDecoder().decode(await decryptUrl(man.app, key));   // błędne hasło -> wyjątek tutaj
    g$('gate_status').textContent = T('gate_loading');
    const heads = JSON.parse(new TextDecoder().decode(await decryptUrl(man.heads, key)));
    const mj = JSON.parse(new TextDecoder().decode(await decryptUrl(man.model_json, key)));
    const parts = [];
    for (const s of man.shards) parts.push(new Uint8Array(await decryptUrl(s, key)));
    const total = parts.reduce((n, p) => n + p.length, 0), weights = new Uint8Array(total);
    let o = 0; for (const p of parts) { weights.set(p, o); o += p.length; }
    // WebGPU, a gdy niedostępne lub nie odpowiada w 5 s — WebGL
    const ok = await Promise.race([tf.setBackend('webgpu').catch(() => false), new Promise(r => setTimeout(() => r(false), 5000))]);
    if (!ok) await tf.setBackend('webgl');
    await tf.ready();
    window.UMWS_MODEL = await tf.loadGraphModel(tf.io.fromMemory({
      modelTopology: mj.modelTopology, format: mj.format, generatedBy: mj.generatedBy, convertedBy: mj.convertedBy,
      signature: mj.signature, userDefinedMetadata: mj.userDefinedMetadata,
      weightSpecs: mj.weightsManifest.flatMap(g => g.weights), weightData: weights.buffer }));
    window.UMWS_HEADS = heads;
    if (man.form) window.UMWS_FORM_URL = URL.createObjectURL(new Blob([await decryptUrl(man.form, key)], { type: 'text/html' }));
    const s = document.createElement('script');
    s.src = URL.createObjectURL(new Blob([appCode], { type: 'text/javascript' }));
    s.onload = () => { g$('gate').hidden = true; g$('consent').hidden = false; g$('consent_btn').focus(); };
    document.body.appendChild(s);
  } catch (e) {
    console.error(e);
    g$('gate_err').textContent = T('gate_wrong');
    g$('gate_status').textContent = '';
    g$('gate_btn').disabled = false;
  }
}

function showView(v) {
  document.querySelectorAll('.navbtn').forEach(b => b.classList.toggle('on', b.dataset.view === v));
  ['scaler', 'form', 'convert'].forEach(x => { g$('view-' + x).hidden = v !== x; });
}
// UMW Scaler -> formularz (ten sam origin: wspólny localStorage 'umws_results' + postMessage)
window.UMWS_toForm = slide => { showView('form'); const f = g$('formframe'); const go = () => f.contentWindow.postMessage({ type: 'umws_add', slide }, location.origin);
  if (f.dataset.ready) go(); else f.addEventListener('load', go, { once: true }); window.scrollTo(0, 0); };
function consent() {
  g$('consent').hidden = true;
  g$('app').hidden = false;
  const f = g$('formframe');
  if (window.UMWS_FORM_URL) {
    f.addEventListener('load', () => { f.dataset.ready = 1; const d = f.contentDocument;
      if (d) new ResizeObserver(() => { f.style.height = d.documentElement.scrollHeight + 'px'; }).observe(d.body); });
    f.src = window.UMWS_FORM_URL;
  }
  document.querySelectorAll('.navbtn').forEach(b => b.addEventListener('click', () => showView(b.dataset.view)));
  g$('run').onclick = window.UMWScaler.run;
  window.UMWScaler.init();
}

window.addEventListener('load', () => {
  applyI18n();
  g$('gate_form').addEventListener('submit', unlock);
  g$('consent_btn').addEventListener('click', consent);
  // okno zgody nie znika po Esc ani kliknięciu w tło — jedyne wyjście to przycisk zgody
  document.addEventListener('keydown', e => { if (!g$('consent').hidden && e.key === 'Escape') e.preventDefault(); }, true);
  document.querySelectorAll('.langbtn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
});
