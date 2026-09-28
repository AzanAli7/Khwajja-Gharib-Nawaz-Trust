// Builds a draggable 3D ring carousel from the accessible <ul class="ring-source">.
// The original list stays in the DOM (visually hidden once the ring is built),
// so screen readers and no-JS visitors still get the content.
(function () {
  var src = document.querySelector('.ring-source');
  var mount = document.getElementById('program-ring');
  if (!src || !mount) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var labels = [].map.call(src.querySelectorAll('li'), function (li) { return li.textContent.trim(); });
  var n = labels.length;
  if (!n) return;

  var W = 230, H = 140;
  var step = 360 / n;
  var R = Math.round((W / 2) / Math.tan(Math.PI / n)) + 24;

  var stage = document.createElement('div'); stage.className = 'ring-stage';
  var ring = document.createElement('div'); ring.className = 'ring';
  ring.style.width = W + 'px'; ring.style.height = H + 'px';
  ring.style.left = (-W / 2) + 'px'; ring.style.top = (-H / 2) + 'px';

  var items = labels.map(function (text, i) {
    var d = document.createElement('div');
    d.className = 'ring-item';
    d.setAttribute('aria-hidden', 'true');
    d.style.transform = 'rotateY(' + (i * step) + 'deg) translateZ(' + R + 'px)';
    d.textContent = text;
    ring.appendChild(d);
    return d;
  });
  stage.appendChild(ring);
  mount.appendChild(stage);
  src.classList.add('sr-only');
  mount.classList.add('ready');

  var angle = 0, vel = 0, dragging = false, lastX = 0, hover = false, last = performance.now();

  function fit() {
    var s = Math.max(0.42, Math.min(1, mount.clientWidth / 920));
    stage.style.setProperty('--s', s);
    mount.style.height = Math.round(340 * s + 30) + 'px';
  }
  fit();
  window.addEventListener('resize', fit);

  function paint() {
    ring.style.transform = 'translateZ(' + (-R) + 'px) rotateY(' + angle + 'deg)';
    for (var i = 0; i < n; i++) {
      var a = ((i * step + angle) % 360 + 360) % 360;
      var c = Math.cos(a * Math.PI / 180);
      var o = 0.28 + 0.72 * (c + 1) / 2;
      items[i].style.opacity = o.toFixed(2);
      items[i].classList.toggle('front', c > 0.94);
    }
  }

  function tick(now) {
    var dt = Math.min(now - last, 50) / 1000; last = now;
    if (!dragging) {
      angle += vel; vel *= 0.94;
      if (!hover && !reduce && Math.abs(vel) < 0.05) angle += 9 * dt;
    }
    paint();
    requestAnimationFrame(tick);
  }

  mount.addEventListener('pointerenter', function () { hover = true; });
  mount.addEventListener('pointerleave', function () { hover = false; });
  mount.addEventListener('pointerdown', function (e) {
    dragging = true; lastX = e.clientX; vel = 0;
    mount.setPointerCapture(e.pointerId); mount.classList.add('grabbing');
  });
  mount.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX; lastX = e.clientX;
    angle += dx * 0.35; vel = dx * 0.35;
  });
  function release() { dragging = false; mount.classList.remove('grabbing'); }
  mount.addEventListener('pointerup', release);
  mount.addEventListener('pointercancel', release);

  function nudge(dir) { vel += dir * (step / 14); }
  var prev = document.getElementById('ring-prev');
  var next = document.getElementById('ring-next');
  if (prev) prev.addEventListener('click', function () { nudge(1); });
  if (next) next.addEventListener('click', function () { nudge(-1); });

  requestAnimationFrame(tick);
})();
