/* ──────────────────────────────────────────────────────────────────────────
   Credify Runtime  —  dual-context boot layer  (extension ⟷ hosted web)
   ----------------------------------------------------------------------------
   The v3 builder must run in TWO environments:

     • EXTENSION  — MV3 *sandboxed* page (null origin). Real localStorage
                    throws, there is no cookie session, and auth is JWT-based
                    through chrome.credifyfast.com. Data is seeded from / mirrored
                    to chrome.storage by the host (newtab.js) over postMessage.

     • WEB        — hosted at chrome.credifyfast.com. Real localStorage works,
                    the session is a same-origin cookie, and the API is reached
                    on relative /api/* paths.

   This module is the FIRST script on the page. It:
     1. Detects the runtime  → window.CREDIFY_RUNTIME = 'extension' | 'web'
     2. In the extension, installs an in-memory localStorage shim and the
        postMessage seed handshake (so the rest of the app — which assumes a
        working localStorage — runs unchanged).
     3. Exposes window.CredifyNet — a transport every server call routes through
        so the same calling code works in both contexts:
            web        → fetch(path,        { credentials:'same-origin' })
            extension  → fetch(API_BASE+path,{ Authorization: Bearer <jwt> })
     4. Exposes window.CredifyAPI — JWT auth helpers (login / logout / refresh)
        used by the extension login path.

   Nothing here is extension-only or web-only at the call site: downstream code
   (preboot.js, cloud-sync.js, the builder) talks to CredifyNet / localStorage
   and is oblivious to which runtime it is in.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  // ── 1. Runtime detection ────────────────────────────────────────────────
  // The MV3 sandbox runs on an opaque (null) origin where touching
  // localStorage throws. A real origin (hosted web) does not.
  var isSandbox = false;
  try { window.localStorage.getItem('__credify_probe__'); }
  catch (e) { isSandbox = true; }
  var RUNTIME = isSandbox ? 'extension' : 'web';
  window.CREDIFY_RUNTIME = RUNTIME;

  // Extension API origin (JWT-authenticated). Web mode uses relative paths.
  var API_BASE = 'https://chrome.credifyfast.com/api';
  var TOKEN_KEY = 'credify_auth_tokens';

  // ── 2. Extension localStorage shim + seed handshake ─────────────────────
  // (Ported verbatim from the v1.2 extension build so the host bridge in
  //  newtab.js keeps working exactly as before.)
  if (isSandbox) {
    var store = {};
    // The builder's deferred init waits on this flag until the seed arrives.
    window.__credifySeedPending = true;

    window.addEventListener('message', function seedHandler(e) {
      if (!e.data || typeof e.data.__credifySeed !== 'object') return;
      window.removeEventListener('message', seedHandler);
      try { store = e.data.__credifySeed || {}; } catch (ex) { store = {}; }
      window.__credifySeedPending = false;
      window.dispatchEvent(new CustomEvent('credify:seeded'));
    });
    try { parent.postMessage({ __credifyReady: true }, '*'); } catch (e) {}

    var pt = null;
    function persist() {
      // Never broadcast writes up to the host before the real seed has landed —
      // a pre-seed write (e.g. first-run defaults) would clobber saved data in
      // chrome.storage. Boot is gated on the seed, so this is belt-and-braces.
      if (window.__credifySeedPending) return;
      try {
        if (pt) clearTimeout(pt);
        pt = setTimeout(function () {
          try { parent.postMessage({ __credifyLS: store }, '*'); } catch (e) {}
        }, 50);
      } catch (e) {}
    }

    var shim = {
      getItem: function (k) {
        k = String(k);
        return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null;
      },
      setItem: function (k, v) { store[String(k)] = String(v); persist(); },
      removeItem: function (k) { delete store[String(k)]; persist(); },
      clear: function () { store = {}; persist(); },
      key: function (i) { var ks = Object.keys(store); return (i >= 0 && i < ks.length) ? ks[i] : null; }
    };
    Object.defineProperty(shim, 'length', { get: function () { return Object.keys(store).length; } });

    try { Object.defineProperty(window, 'localStorage', { value: shim, configurable: true, writable: true }); }
    catch (e) { try { window.localStorage = shim; } catch (e2) {} }
  } else {
    // Web mode boots with a working localStorage and no seed gate.
    window.__credifySeedPending = false;
  }

  // ── 3. JWT token store (extension auth) ─────────────────────────────────
  var accessToken = null, refreshToken = null, currentApiUser = null, online = true;

  function loadTokens() {
    try {
      var s = window.localStorage.getItem(TOKEN_KEY);
      if (s) { var p = JSON.parse(s); accessToken = p.accessToken || null; refreshToken = p.refreshToken || null; currentApiUser = p.user || null; }
    } catch (e) {}
  }
  function saveTokens() {
    try { window.localStorage.setItem(TOKEN_KEY, JSON.stringify({ accessToken: accessToken, refreshToken: refreshToken, user: currentApiUser })); } catch (e) {}
  }
  function clearTokens() {
    accessToken = refreshToken = currentApiUser = null;
    try { window.localStorage.removeItem(TOKEN_KEY); } catch (e) {}
  }
  function isExpired(tok) {
    if (!tok) return true;
    try { return JSON.parse(atob(tok.split('.')[1])).exp * 1000 < Date.now(); }
    catch (e) { return true; }
  }
  async function refreshAccess() {
    if (!refreshToken) return false;
    try {
      var res = await fetch(API_BASE + '/auth/refresh', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refreshToken })
      });
      if (res.ok) { var d = await res.json(); accessToken = d.accessToken; refreshToken = d.refreshToken; saveTokens(); return true; }
    } catch (e) { online = false; }
    return false;
  }
  if (isSandbox) loadTokens();

  // ── 4. Unified transport ────────────────────────────────────────────────
  // path is API-relative, e.g. '/forms' or '/me'. In web mode it is fetched as
  // '/api'+path with the cookie; in the extension it is API_BASE+path + Bearer.
  async function netFetch(path, options) {
    options = options || {};
    if (RUNTIME === 'web') {
      var url = path.indexOf('/api') === 0 ? path : '/api' + path;
      var wopts = Object.assign({ credentials: 'same-origin' }, options);
      wopts.headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers || {});
      return fetch(url, wopts);
    }
    // extension: ensure a fresh JWT, then Bearer it.
    if (isExpired(accessToken)) { await refreshAccess(); }
    var apipath = path.indexOf('/api') === 0 ? path.slice(4) : path;
    var headers = Object.assign(
      { 'Content-Type': 'application/json' },
      accessToken ? { Authorization: 'Bearer ' + accessToken } : {},
      options.headers || {}
    );
    return fetch(API_BASE + apipath, Object.assign({}, options, { headers: headers }));
  }

  // Convenience JSON helper returning { ok, status, data }.
  async function netJSON(path, options) {
    try {
      var res = await netFetch(path, options);
      online = true;
      var data = null;
      try { data = await res.json(); } catch (e) {}
      return { ok: res.ok, status: res.status, data: data };
    } catch (e) {
      online = false;
      return { ok: false, status: 0, data: null, offline: true };
    }
  }

  window.CredifyNet = {
    runtime: RUNTIME,
    isExtension: function () { return RUNTIME === 'extension'; },
    isWeb: function () { return RUNTIME === 'web'; },
    fetch: netFetch,
    json: netJSON,
    isOnline: function () { return online; }
  };

  // ── 5. JWT auth surface (extension login path) ──────────────────────────
  window.CredifyAPI = {
    async login(email, password) {
      try {
        var res = await fetch(API_BASE + '/auth/login', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password })
        });
        var d = await res.json();
        if (res.ok && d.accessToken) {
          accessToken = d.accessToken; refreshToken = d.refreshToken; currentApiUser = d.user; saveTokens();
          return { success: true, user: d.user };
        }
        return { success: false, error: (d && d.error) || 'Login failed' };
      } catch (e) { return { success: false, error: 'Network error', offline: true }; }
    },
    async logout() {
      try { await netFetch('/auth/logout', { method: 'POST' }); } catch (e) {}
      clearTokens();
    },
    async getMe() { return netJSON('/auth/me'); },
    isLoggedIn: function () { return RUNTIME === 'web' || (!!accessToken && !!currentApiUser); },
    getCurrentUser: function () { return currentApiUser; },
    isOnline: function () { return online; }
  };
})();
