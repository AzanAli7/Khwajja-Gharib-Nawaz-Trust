(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    revealOnScroll();
    scrollProgress();
    counters();
    if (fine && !reduce) magneticButtons();
  });

  // 3D reveal: cards rotate up out of the page the first time they appear.
  // After the animation ends we hand the transform back to the tilt effect.
  function revealOnScroll() {
    var targets = document.querySelectorAll('.reveal-on-scroll');
    function show(el) {
      if (reduce) { el.classList.add('revealed'); return; }
      el.classList.add('reveal');
      el.addEventListener('animationend', function () {
        el.classList.remove('reveal');
        el.classList.add('revealed');
        el.style.animationDelay = '';
      }, { once: true });
    }
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { show(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (t, i) {
      t.style.animationDelay = ((i % 3) * 90) + 'ms';
      io.observe(t);
    });
  }

  function scrollProgress() {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    function update() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? window.scrollY / h : 0) + ')';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function counters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length || !('IntersectionObserver' in window)) return;
    function run(el) {
      var end = parseInt(el.getAttribute('data-count'), 10);
      if (reduce) { el.textContent = end; return; }
      var start = performance.now(), dur = 1400;
      (function step(now) {
        var p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      })(start);
    }
    if (!reduce) els.forEach(function (el) { el.textContent = '0'; });
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  function magneticButtons() {
    document.querySelectorAll('.btn').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.18;
        var y = (e.clientY - r.top - r.height / 2) * 0.3;
        b.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }
})();
