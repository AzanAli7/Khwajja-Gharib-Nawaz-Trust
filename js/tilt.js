// Pointer-driven 3D tilt with a moving glare highlight.
// Only runs on devices with a fine pointer and hover, and never when the
// visitor prefers reduced motion.
(function () {
  var ok = window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
           !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!ok) return;

  var SELECTOR = '.card, .person, .bank-card, .stat, .hero-figure, ' +
                 '.project-block img, .grid-3 > img, .program-list li';

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(SELECTOR).forEach(attach);
  });

  function attach(el) {
    var big = el.tagName === 'IMG' || el.classList.contains('hero-figure');
    var max = big ? 6 : 9;
    var glare = null;

    if (el.tagName !== 'IMG') {
      glare = document.createElement('span');
      glare.className = 'tilt-glare';
      glare.setAttribute('aria-hidden', 'true');
      el.appendChild(glare);
    }
    el.classList.add('tilt');

    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      var ry = (px - 0.5) * 2 * max;
      var rx = -(py - 0.5) * 2 * max;
      el.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' +
                           ry.toFixed(2) + 'deg) translateZ(8px)';
      if (glare) {
        glare.style.background = 'radial-gradient(circle at ' + (px * 100) + '% ' + (py * 100) +
          '%, rgba(255,255,255,0.28), rgba(255,255,255,0) 55%)';
        glare.style.opacity = '1';
      }
    });

    el.addEventListener('pointerleave', function () {
      el.style.transform = '';
      if (glare) glare.style.opacity = '0';
    });
  }
})();
