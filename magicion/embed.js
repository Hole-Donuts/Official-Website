/*!
 * Magicion embed v1.1 · Holy Doughnut Studio
 *
 * Drop-in loader that places the Magicion game on any web page.
 *
 *   <div data-magicion></div>
 *   <script src="/magicion/embed.js" defer></script>
 *
 * Options (data attributes on the element):
 *   data-src            URL of the game page. Default: index.html next to this script.
 *   data-aspect         Aspect ratio on wide screens. Default "16/9".
 *   data-mobile-aspect  Aspect ratio on narrow screens. Default "9/16".
 *   data-max-width      CSS max-width of the player. Default "1100px".
 *   data-max-height     CSS max-height of the player. Default "100dvh" (never taller than the
 *                       screen). Subtract a sticky header, e.g. "calc(100dvh - 72px)".
 *   data-fullscreen     "false" hides the fullscreen button.
 *   data-autopause      "false" keeps the game running when scrolled out of view.
 *
 * Events fired on the element (listen with addEventListener):
 *   magicion:ready, magicion:runStart, magicion:bossDefeated, magicion:runEnd
 *   Each event's detail holds the data sent by the game.
 *
 * Commands:
 *   Magicion.send(element, 'pause' | 'resume' | 'mute' | 'unmute')
 *   Magicion.send(element, 'music', true|false)
 *   Magicion.send(element, 'sfx', true|false)
 *   Magicion.fullscreen(element, true|false)
 *
 * Fullscreen uses the browser's Fullscreen API. Where it is missing (iPhone
 * Safari) the player is stretched over the whole page instead. The game can
 * ask for either from its own fullscreen button.
 */
(function () {
  'use strict';
  var script = document.currentScript;
  var base = script && script.src ? script.src.replace(/[^/]*$/, '') : '';
  var players = [];

  function css(el, styles) { for (var k in styles) el.style[k] = styles[k]; }

  // Styles for fullscreen and for the page-filling fallback. Injected once.
  function injectStyles() {
    if (document.getElementById('magicion-embed-style')) return;
    var st = document.createElement('style');
    st.id = 'magicion-embed-style';
    st.textContent =
      '[data-magicion-frame]{max-height:100vh;max-height:100dvh}' +
      '[data-magicion-frame]:fullscreen{width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;aspect-ratio:auto!important;border-radius:0!important;box-shadow:none!important}' +
      '[data-magicion-frame]:-webkit-full-screen{width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;aspect-ratio:auto!important;border-radius:0!important;box-shadow:none!important}' +
      '[data-magicion-frame].magicion-fill{position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;width:100vw!important;height:100vh!important;height:100dvh!important;max-width:none!important;max-height:none!important;aspect-ratio:auto!important;margin:0!important;border-radius:0!important;box-shadow:none!important;z-index:2147483000!important}' +
      '[data-magicion-frame]:fullscreen .magicion-fs,[data-magicion-frame]:-webkit-full-screen .magicion-fs,[data-magicion-frame].magicion-fill .magicion-fs{display:none!important}' +
      'html.magicion-lock,html.magicion-lock body{overflow:hidden!important}';
    document.head.appendChild(st);
  }

  function fsElement() { return document.fullscreenElement || document.webkitFullscreenElement || null; }
  function isFull(p) { var f = fsElement(); return p.fill || (!!f && (f === p.frame || f === p.iframe)); }

  function setFill(p, on) {
    p.fill = on;
    p.frame.classList.toggle('magicion-fill', on);
    document.documentElement.classList.toggle('magicion-lock', players.some(function (x) { return x.fill; }));
    notify(p);
  }

  function enterFull(p) {
    if (isFull(p)) return;
    var req = p.frame.requestFullscreen || p.frame.webkitRequestFullscreen;
    if (!req) { setFill(p, true); return; }
    try {
      var r = req.call(p.frame);
      if (r && r.catch) r.catch(function () { setFill(p, true); });
    } catch (e) { setFill(p, true); }
    try { p.iframe.contentWindow.focus(); } catch (e) {}
  }

  function exitFull(p) {
    if (p.fill) { setFill(p, false); return; }
    if (fsElement()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  }

  function notify(p) { send(p.el, 'fullscreenState', isFull(p)); }

  function mount(el) {
    if (!el || el.__magicion) return el && el.__magicion;
    injectStyles();
    var d = el.dataset;
    var src = d.src || base + 'index.html';
    var wide = d.aspect || '16/9', tall = d.mobileAspect || '9/16';
    var mq = window.matchMedia('(max-width: 640px)');

    var frame = document.createElement('div');
    frame.setAttribute('data-magicion-frame', '');
    css(frame, { position: 'relative', width: '100%', maxWidth: d.maxWidth || '1100px', margin: '0 auto',
      borderRadius: '14px', overflow: 'hidden', background: '#120a2e', boxShadow: '0 12px 40px rgba(10,4,30,.45)' });
    if (d.maxHeight) frame.style.maxHeight = d.maxHeight;
    var setRatio = function () { frame.style.aspectRatio = mq.matches ? tall : wide; };
    setRatio();
    if (mq.addEventListener) mq.addEventListener('change', setRatio); else mq.addListener(setRatio);

    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = 'Magicion';
    iframe.setAttribute('allow', 'autoplay; fullscreen; gamepad');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'lazy');
    css(iframe, { position: 'absolute', inset: '0', width: '100%', height: '100%', border: '0', display: 'block' });
    frame.appendChild(iframe);

    var player = { el: el, frame: frame, iframe: iframe, origin: new URL(src, location.href).origin, fill: false };

    if (d.fullscreen !== 'false') {
      var fs = document.createElement('button');
      fs.type = 'button';
      fs.className = 'magicion-fs';
      fs.setAttribute('aria-label', 'Play Magicion fullscreen');
      fs.textContent = '⛶';
      css(fs, { position: 'absolute', left: '10px', bottom: '10px', zIndex: '2', width: '40px', height: '40px',
        borderRadius: '10px', border: '2px solid #fff', background: 'rgba(106,34,224,.85)', color: '#fff',
        fontSize: '20px', lineHeight: '1', cursor: 'pointer' });
      fs.addEventListener('click', function () { if (isFull(player)) exitFull(player); else enterFull(player); });
      frame.appendChild(fs);
    }

    el.innerHTML = '';
    el.appendChild(frame);
    el.__magicion = player;
    players.push(player);

    if (d.autopause !== 'false' && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.intersectionRatio < 0.3 && !isFull(player)) send(el, 'pause'); });
      }, { threshold: [0, 0.3] }).observe(frame);
    }
    return player;
  }

  function send(el, cmd, value) {
    var p = el && el.__magicion;
    if (!p || !p.iframe.contentWindow) return;
    p.iframe.contentWindow.postMessage({ target: 'magicion', cmd: cmd, value: value }, p.origin);
  }

  function fullscreen(el, on) {
    var p = el && el.__magicion;
    if (!p) return;
    if (on === false || (on === undefined && isFull(p))) exitFull(p); else enterFull(p);
  }

  window.addEventListener('message', function (ev) {
    var data = ev.data;
    if (!data || data.source !== 'magicion') return;
    players.forEach(function (p) {
      if (p.iframe.contentWindow !== ev.source || ev.origin !== p.origin) return;
      if (data.type === 'fullscreen') return enterFull(p);
      if (data.type === 'exitFullscreen') return exitFull(p);
      p.el.dispatchEvent(new CustomEvent('magicion:' + data.type, { detail: data, bubbles: true }));
    });
  });

  ['fullscreenchange', 'webkitfullscreenchange'].forEach(function (type) {
    document.addEventListener(type, function () { players.forEach(notify); });
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') players.forEach(function (p) { if (p.fill) setFill(p, false); });
  });

  function init() { document.querySelectorAll('[data-magicion]').forEach(mount); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.Magicion = { mount: mount, send: send, fullscreen: fullscreen };
})();
