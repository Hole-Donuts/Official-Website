/*!
 * Magicion embed v1.0 · Holy Doughnut Studio
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
 */
(function () {
  'use strict';
  var script = document.currentScript;
  var base = script && script.src ? script.src.replace(/[^/]*$/, '') : '';
  var players = [];

  function css(el, styles) { for (var k in styles) el.style[k] = styles[k]; }

  function mount(el) {
    if (!el || el.__magicion) return el && el.__magicion;
    var d = el.dataset;
    var src = d.src || base + 'index.html';
    var wide = d.aspect || '16/9', tall = d.mobileAspect || '9/16';
    var mq = window.matchMedia('(max-width: 640px)');

    var frame = document.createElement('div');
    css(frame, { position: 'relative', width: '100%', maxWidth: d.maxWidth || '1100px', margin: '0 auto',
      borderRadius: '14px', overflow: 'hidden', background: '#120a2e', boxShadow: '0 12px 40px rgba(10,4,30,.45)' });
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

    if (d.fullscreen !== 'false') {
      var fs = document.createElement('button');
      fs.type = 'button';
      fs.setAttribute('aria-label', 'Play Magicion fullscreen');
      fs.textContent = '⛶';
      css(fs, { position: 'absolute', left: '10px', bottom: '10px', zIndex: '2', width: '40px', height: '40px',
        borderRadius: '10px', border: '2px solid #fff', background: 'rgba(106,34,224,.85)', color: '#fff',
        fontSize: '20px', lineHeight: '1', cursor: 'pointer' });
      fs.addEventListener('click', function () {
        var t = frame;
        if (document.fullscreenElement) { document.exitFullscreen(); return; }
        var req = t.requestFullscreen || t.webkitRequestFullscreen;
        if (req) { var r = req.call(t); if (r && r.catch) r.catch(function () {}); }
        else window.open(src, '_blank');
        try { iframe.contentWindow.focus(); } catch (e) {}
      });
      frame.appendChild(fs);
    }

    el.innerHTML = '';
    el.appendChild(frame);

    var player = { el: el, iframe: iframe, origin: new URL(src, location.href).origin };
    el.__magicion = player;
    players.push(player);

    if (d.autopause !== 'false' && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.intersectionRatio < 0.3) send(el, 'pause'); });
      }, { threshold: [0, 0.3] }).observe(frame);
    }
    return player;
  }

  function send(el, cmd, value) {
    var p = el && el.__magicion;
    if (!p || !p.iframe.contentWindow) return;
    p.iframe.contentWindow.postMessage({ target: 'magicion', cmd: cmd, value: value }, p.origin);
  }

  window.addEventListener('message', function (ev) {
    var data = ev.data;
    if (!data || data.source !== 'magicion') return;
    players.forEach(function (p) {
      if (p.iframe.contentWindow === ev.source && ev.origin === p.origin) {
        p.el.dispatchEvent(new CustomEvent('magicion:' + data.type, { detail: data, bubbles: true }));
      }
    });
  });

  function init() { document.querySelectorAll('[data-magicion]').forEach(mount); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.Magicion = { mount: mount, send: send };
})();
