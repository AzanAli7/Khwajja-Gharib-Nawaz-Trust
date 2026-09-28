// Subtle, single-purpose motion: fade cards up into place the first
// time they enter the viewport. Respects prefers-reduced-motion via CSS.
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var targets = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window) || !targets.length) {
      targets.forEach(function (t) { t.classList.add('reveal'); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(function (t) { io.observe(t); });
  });
})();
