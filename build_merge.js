/* ============================================================================
   Shared-core merge builder
   ----------------------------------------------------------------------------
   Composes the new app.html = prototype builder (web variant, newest UI +
   features) + extension host adapter (sandbox shim + CredifyAPI + B-hero auth
   gate), selected at runtime by window.__credifyHost ('extension' | 'web').

   Inputs:
     - PROTO : the FORM_BUILDER prototype (newest builder, web bridges)
     - BAK   : app.html.extension-auth.bak (current extension build w/ auth gate)
   Output: app.html
   ============================================================================ */
const fs = require('fs');
const norm = s => s.replace(/\r\n/g, '\n');
const PROTO = norm(fs.readFileSync(process.argv[2], 'utf8'));
const BAK   = norm(fs.readFileSync('app.html.extension-auth.bak', 'utf8'));

function slice(src, startAnchor, endAnchor, label) {
  const i = src.indexOf(startAnchor);
  if (i < 0) throw new Error('start anchor not found: ' + label);
  const j = src.indexOf(endAnchor, i);
  if (j < 0) throw new Error('end anchor not found: ' + label);
  return src.slice(i, j + endAnchor.length);
}

/* ---- reusable blocks lifted from the current extension build ---- */
const CREDIFY_API = slice(BAK,
  "(function() {\n  const API_BASE = 'https://chrome.credifyfast.com/api';",
  "  // Initialize tokens on load\n  loadTokens();\n})();", 'CredifyAPI');

const AUTH_CSS_RULES = slice(BAK, '  #auth-screen{', '</style>', 'authCss')
  .replace(/<\/style>\s*$/, '').trimEnd();

const AUTH_MARKUP = BAK.slice(
  BAK.indexOf('<!-- ====== Full-screen Auth gate ====== -->'),
  BAK.indexOf('<div class="app">')
).trimEnd();

const AUTH_CTRL = slice(BAK,
  '/* ============================================================================\n   Full-screen Auth gate (B-hero) controller',
  'company: v.company, phone: v.phone, source: v.source, sourceLabel: v.sourceLabel\n  };\n}', 'authCtrl');

/* ---- newly authored host pieces ---- */
const HOST_SHIM = `<script>
/* ──────────────────────────────────────────────────────────────────────────
   Credify host detector + (extension-only) localStorage bridge
   ----------------------------------------------------------------------------
   Sets window.__credifyHost. If real localStorage works we are a normal web
   page (cookie session) and do nothing else. If it throws — a Chrome MV3
   *sandboxed* (null-origin) page — we install an in-memory localStorage and the
   postMessage seed/persist bridge to the host (newtab.js).
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  var ext = false;
  try { window.localStorage.setItem('__cf_probe', '1'); window.localStorage.removeItem('__cf_probe'); }
  catch (e) { ext = true; }
  window.__credifyHost = ext ? 'extension' : 'web';
  if (!ext) return;

  var store = {};
  window.__credifySeedPending = true;
  window.addEventListener('message', function seedHandler(e) {
    if (!e.data || typeof e.data.__credifySeed !== 'object') return;
    window.removeEventListener('message', seedHandler);
    try { store = e.data.__credifySeed || {}; } catch (ex) { store = {}; }
    window.__credifySeedPending = false;
    window.dispatchEvent(new CustomEvent('credify:seeded'));
  });
  try { parent.postMessage({ __credifyReady: true }, '*'); } catch (e) {}
  var t = null;
  function persist() { try { if (t) clearTimeout(t); t = setTimeout(function () { try { parent.postMessage({ __credifyLS: store }, '*'); } catch (e) {} }, 50); } catch (e) {} }
  var shim = {
    getItem: function (k) { k = String(k); return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null; },
    setItem: function (k, v) { store[String(k)] = String(v); persist(); },
    removeItem: function (k) { delete store[String(k)]; persist(); },
    clear: function () { store = {}; persist(); },
    key: function (i) { var ks = Object.keys(store); return (i >= 0 && i < ks.length) ? ks[i] : null; }
  };
  Object.defineProperty(shim, 'length', { get: function () { return Object.keys(store).length; } });
  try { Object.defineProperty(window, 'localStorage', { value: shim, configurable: true, writable: true }); }
  catch (e) { try { window.localStorage = shim; } catch (e2) {} }
})();
</script>
<script>
${CREDIFY_API}
</script>
`;

/* Extension⇄web adapter — provides the globals the auth controller expects and
   bridges them to the prototype builder's localStorage-first boot. */
const EXT_ADAPTER = `
/* ===== Shared-core host adapter (extension ⇄ web) ===== */
var API_MODE = false;
function updateApiStatus(){ /* status pill optional; no-op keeps the auth flow host-agnostic */ }
function updateAuthUI(){ /* extension: auth gate owns this; web: account bar owns it */ }
/* Seed the builder's working store (localStorage) from the server using the
   token-based CredifyAPI — the extension equivalent of the web pre-seed XHR. */
async function loadDataFromAPI(){
  try{
    if(!window.CredifyAPI) return;
    var res = await CredifyAPI.getForms();
    var forms = (res && res.forms) ? res.forms : [];
    var full = await Promise.all(forms.map(async function(f){
      try{ var d = await CredifyAPI.getForm(f.id); return (d && d.form) ? Object.assign({}, f, d.form) : f; }
      catch(e){ return f; }
    }));
    var mapped = full.map(function(f){
      var sc = f.schema || {};
      return { id:f.id, _apiId:f.id, title:f.title, desc:f.description||'',
        rows: sc.rows||[], weightGroups: sc.weightGroups||[], style: sc.style||{},
        scoringSections: f.scoringSections||[], ownerId: f.ownerId||(f.owner&&f.owner.id),
        shares: f.shares||[], groupId: f.groupId,
        createdAt: f.createdAt ? new Date(f.createdAt).getTime() : Date.now(),
        updatedAt: f.updatedAt ? new Date(f.updatedAt).getTime() : Date.now() };
    });
    try{ localStorage.setItem('credify_forms_v2', JSON.stringify(mapped)); }catch(e){}
  }catch(e){ console.error('loadDataFromAPI failed', e); }
}
/* Boot/refresh the builder from whatever is now in localStorage. */
function continueInit(){ if(typeof window.__credifyBuilderBoot==='function') window.__credifyBuilderBoot(); }
/* Work offline: the local seed arrives async via the shim bridge, so wait for it. */
function loginOffline(){
  API_MODE=false;
  var go=function(){ if(typeof window.__credifyBuilderBoot==='function') window.__credifyBuilderBoot(); hideAuthScreen(); toast('Working offline — changes saved locally'); };
  if(window.__credifySeedPending){ window.addEventListener('credify:seeded', go, {once:true}); } else { go(); }
}
`;

const BOOT_GLUE = `
/* ===== Dual-host builder boot ===== */
window.__credifyBuilderBoot = (function(orig){ var done=false; return function(){ if(done) return; done=true; try{ orig(); }catch(e){ console.error('builder boot failed', e); } }; })(__credifyBuilderBoot);
if (window.__credifyHost === 'web') {
  document.body.classList.remove('au-gate');   // web: builder shows immediately
  window.__credifyBuilderBoot();
} else {
  initAuthScreen();
  if (window.CredifyAPI && CredifyAPI.isLoggedIn()) {
    (async function(){ try{ API_MODE=true; await loadDataFromAPI(); }catch(e){} window.__credifyBuilderBoot(); hideAuthScreen(); updateApiStatus(true); })();
  } else {
    showAuthScreen();   // builder boots after a successful sign-in / offline
  }
}
`;

/* ---- compose ---- */
let out = PROTO;

// 1) head: host shim + CredifyAPI before the web pre-seed bridge
out = out.replace('<!-- Credify cloud bridge (pre-seed):', HOST_SHIM + '<!-- Credify cloud bridge (pre-seed):');

// 2) guard the web pre-seed IIFE so it only runs in web mode
out = out.replace(
  "(function () {\n  var FORMS_KEY = 'credify_forms_v2', LAST_KEY = 'credify_last_form_v2';\n  function getSync(url) {",
  "(function () {\n  if (window.__credifyHost !== 'web') return;\n  var FORMS_KEY = 'credify_forms_v2', LAST_KEY = 'credify_last_form_v2';\n  function getSync(url) {");

// 3) auth gate CSS before </head>
out = out.replace('</head>', '<style>\n/* ===== B-hero auth gate (extension mode) ===== */\n' + AUTH_CSS_RULES + '\n</style>\n</head>');

// 4) body class + auth gate markup
out = out.replace('<body>', '<body class="au-gate">\n' + AUTH_MARKUP + '\n');

// 5) wrap the builder boot block + inject auth controller + adapter + glue
const bootStart = out.indexOf('const stored=loadBlocks();');
const bootEndAnchor = 'applyRoleUI();\nscheduleReflow();';
const bootEnd = out.indexOf(bootEndAnchor, bootStart) + bootEndAnchor.length;
if (bootStart < 0 || bootEnd < bootEndAnchor.length) throw new Error('boot block anchors not found');
const bootBlock = out.slice(bootStart, bootEnd);
const replacement =
  '\n' + AUTH_CTRL + '\n' + EXT_ADAPTER + '\n' +
  'function __credifyBuilderBoot(){\n' + bootBlock + '\n}\n' + BOOT_GLUE + '\n';
out = out.slice(0, bootStart) + replacement + out.slice(bootEnd);

// 6) guard the web sync bridge so it only runs in web mode
out = out.replace(
  "(function () {\n  var FORMS_KEY = 'credify_forms_v2', LAST_KEY = 'credify_last_form_v2';\n  function api(p, o) {",
  "(function () {\n  if (window.__credifyHost !== 'web') return;\n  var FORMS_KEY = 'credify_forms_v2', LAST_KEY = 'credify_last_form_v2';\n  function api(p, o) {");

fs.writeFileSync('app.html', out);
console.log('merged app.html written: ' + out.split('\n').length + ' lines');
