(function () {
  // This bridge is the WEB runtime's server mirror + account bar (cookie session,
  // /alerts, /responses, /admin, Sign out → '/'). In the extension, persistence
  // already flows to chrome.storage through the postMessage bridge (newtab.js) and
  // auth is JWT; its server sync + account chrome are handled separately, so skip
  // this web-only wiring entirely.
  if (window.CREDIFY_RUNTIME === 'extension') return;

  var FORMS_KEY = 'credify_forms_v2', LAST_KEY = 'credify_last_form_v2';
  function api(p, o) {
    return fetch(p, Object.assign({ credentials: 'same-origin', headers: { 'Content-Type': 'application/json' } }, o || {}));
  }
  function ready(fn) {
    if (typeof window.persistForms === 'function') fn();
    else setTimeout(function () { ready(fn); }, 30);
  }
  ready(function () {
    var timer = null, busy = false, again = false;
    function read() { try { return JSON.parse(localStorage.getItem(FORMS_KEY) || '[]'); } catch (e) { return []; } }
    function push() {
      if (busy) { again = true; return; }
      busy = true;
      api('/api/forms/sync', { method: 'POST', body: JSON.stringify({ forms: read() }) })
        .catch(function (e) { console.error('Credify sync failed', e); })
        .then(function () { busy = false; if (again) { again = false; schedule(); } });
    }
    function schedule() { clearTimeout(timer); timer = setTimeout(push, 800); }

    var _persist = window.persistForms;            // original: writes localStorage
    window.persistForms = function () { try { _persist(); } catch (e) {} schedule(); };

    // Flush a final sync if the tab is closing mid-debounce.
    window.addEventListener('beforeunload', function () {
      if (timer || busy) { try { navigator.sendBeacon('/api/forms/sync', new Blob([JSON.stringify({ forms: read() })], { type: 'application/json' })); } catch (e) {} }
    });

    // Account bar + Sign out.
    var u = window.__credifyUser || {};
    var bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;top:10px;right:12px;z-index:99999;display:flex;gap:10px;align-items:center;font:500 12px/1 Sora,system-ui,sans-serif;color:#0a3d2b;background:#edfaf4;border:1px solid #d4f4e8;border-radius:999px;padding:6px;box-shadow:0 6px 18px rgba(10,61,43,.14)';
    var al = document.createElement('a'); al.href = '/alerts'; al.textContent = 'Alerts';
    al.style.cssText = 'font:600 12px Sora,system-ui,sans-serif;color:#0a3d2b;background:#fff;border:1px solid #d4f4e8;border-radius:999px;padding:6px 13px;text-decoration:none';
    bar.appendChild(al);
    var rsp = document.createElement('a'); rsp.href = '/responses'; rsp.textContent = 'Responses';
    rsp.style.cssText = 'font:600 12px Sora,system-ui,sans-serif;color:#0a3d2b;background:#fff;border:1px solid #d4f4e8;border-radius:999px;padding:6px 13px;text-decoration:none';
    bar.appendChild(rsp);
    try {
      api('/api/alerts/count').then(function (r) { return r.json(); }).then(function (d) {
        if (d && d.unread > 0) {
          var b = document.createElement('span'); b.textContent = d.unread;
          b.style.cssText = 'display:inline-flex;min-width:16px;height:16px;padding:0 4px;border-radius:999px;background:#c0392b;color:#fff;font-size:10px;font-weight:700;align-items:center;justify-content:center;margin-left:5px';
          al.appendChild(b);
        }
      }).catch(function () {});
    } catch (e) {}
    if (u.is_admin) {
      var adm = document.createElement('a'); adm.href = '/admin'; adm.textContent = 'Admin';
      adm.style.cssText = 'font:600 12px Sora,system-ui,sans-serif;color:#0a3d2b;background:#fff;border:1px solid #d4f4e8;border-radius:999px;padding:6px 13px;text-decoration:none';
      bar.appendChild(adm);
    }
    var out = document.createElement('button'); out.type = 'button'; out.textContent = 'Sign out';
    out.style.cssText = 'font:600 12px Sora,system-ui,sans-serif;color:#fff;background:#1a8a66;border:none;border-radius:999px;padding:6px 13px;cursor:pointer';
    out.onmouseenter = function () { out.style.background = '#157254'; };
    out.onmouseleave = function () { out.style.background = '#1a8a66'; };
    out.onclick = function () {
      api('/api/logout', { method: 'POST' }).then(function () {
        try { localStorage.removeItem(FORMS_KEY); localStorage.removeItem(LAST_KEY); } catch (e) {}
        window.location.href = '/';
      });
    };
    bar.appendChild(out);
    if (document.body) document.body.appendChild(bar);

    // The account bar is a fixed overlay pinned to the top-right; without this,
    // the toolbar's right-aligned buttons slide underneath it and get covered
    // (Alerts/Responses/Sign out blocking the last tool buttons). Reserve room
    // on the topbar equal to the bar's width so the toolbar stops short of it,
    // and re-run the toolbar's own overflow reflow so extras collapse into the
    // "More" menu when space is tight.
    function reserveTopbarSpace() {
      try {
        var tb = document.querySelector('.topbar');
        if (!tb) return;
        var w = bar.getBoundingClientRect().width || 0;
        tb.style.paddingRight = (w + 24) + 'px';
        if (typeof window.scheduleReflow === 'function') window.scheduleReflow();
      } catch (e) {}
    }
    // Measure after layout settles (the bar's buttons/badge affect its width).
    requestAnimationFrame(reserveTopbarSpace);
    setTimeout(reserveTopbarSpace, 300);
    window.addEventListener('resize', reserveTopbarSpace);
  });
})();