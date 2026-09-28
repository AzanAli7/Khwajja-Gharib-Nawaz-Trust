// Loads the shared header/footer partials into every page and
// marks the current page's nav link as active.
// Note: this relies on fetch() over http(s), so it works once the
// site is served (e.g. GitHub Pages) but not when double-clicking
// the HTML files directly from a local filesystem.
(function () {
  function markActive() {
    var page = document.documentElement.getAttribute('data-page');
    if (!page) return;
    document.querySelectorAll('nav.primary a[data-page]').forEach(function (a) {
      if (a.getAttribute('data-page') === page) a.classList.add('active');
    });
  }

  function wireMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function inject(id, url, after) {
    var el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.outerHTML = html;
        if (after) after();
      })
      .catch(function () {
        // Fail quietly if partials can't be fetched (e.g. opened via file://)
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    inject('header-placeholder', 'partials/header.html', function () {
      markActive();
      wireMobileNav();
    });
    inject('footer-placeholder', 'partials/footer.html');
  });
})();
