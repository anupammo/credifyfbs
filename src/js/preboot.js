(function () {
  // Extension runtime seeds the working store from chrome.storage via the
  // postMessage handshake in runtime.js — there is no cookie session and a
  // synchronous /api/me probe (and /login redirect) would be wrong here. Web
  // runtime falls through to the cookie pre-seed below.
  if (window.CREDIFY_RUNTIME === 'extension') return;

  var FORMS_KEY = 'credify_forms_v2', LAST_KEY = 'credify_last_form_v2';
  function getSync(url) {
    try {
      var x = new XMLHttpRequest();
      x.open('GET', url, false); x.withCredentials = true; x.send();
      return { status: x.status, text: x.responseText };
    } catch (e) { return { status: 0, text: '' }; }
  }
  try {
    var me = getSync('/api/me');
    if (me.status === 401) { window.location.replace('/login'); return; }
    try { window.__credifyUser = JSON.parse(me.text).user; } catch (e) {}

    var f = getSync('/api/forms');
    if (f.status === 200) {
      var forms = [];
      try { forms = JSON.parse(f.text).forms || []; } catch (e) {}
      try {
        localStorage.setItem(FORMS_KEY, JSON.stringify(forms));
        if (forms.length && forms[0] && forms[0].id) localStorage.setItem(LAST_KEY, forms[0].id);
        else localStorage.removeItem(LAST_KEY);
      } catch (e) {}
    }
  } catch (e) { /* offline → builder uses whatever is already in localStorage */ }
})();