// Three.js hero scene: a gold eight-pointed star (two overlaid squares,
// a classic Islamic geometric motif), orbit rings and drifting gold dust.
// Reacts to pointer and scroll. Falls back silently if WebGL is missing,
// and renders a single still frame when the visitor prefers reduced motion.
(function () {
  var hosts = document.querySelectorAll('.hero, .page-hero');
  if (!hosts.length || typeof THREE === 'undefined') return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  hosts.forEach(init);

  function squareMesh(rot, color, z) {
    var s = 1.6, sh = new THREE.Shape();
    sh.moveTo(-s, -s); sh.lineTo(s, -s); sh.lineTo(s, s); sh.lineTo(-s, s); sh.lineTo(-s, -s);
    var g = new THREE.ExtrudeGeometry(sh, {
      depth: 0.22, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 2
    });
    g.center();
    var mesh = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
      color: color, metalness: 0.85, roughness: 0.28, transparent: true, opacity: 0.92
    }));
    mesh.rotation.z = rot; mesh.position.z = z;
    var edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(g),
      new THREE.LineBasicMaterial({ color: 0xfaf7f0, transparent: true, opacity: 0.45 })
    );
    edges.rotation.z = rot; edges.position.z = z;
    return [mesh, edges];
  }

  function buildStar() {
    var group = new THREE.Group();
    squareMesh(0, 0xc8a24c, 0).forEach(function (m) { group.add(m); });
    squareMesh(Math.PI / 4, 0xe2c789, 0.14).forEach(function (m) { group.add(m); });

    var core = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 0.95, 0.4, 8),
      new THREE.MeshStandardMaterial({ color: 0x0d3b26, emissive: 0x0a2e1e, metalness: 0.4, roughness: 0.5 })
    );
    core.rotation.x = Math.PI / 2; core.rotation.y = Math.PI / 8; core.position.z = 0.3;
    group.add(core);

    var ringMat = new THREE.MeshStandardMaterial({ color: 0xc8a24c, metalness: 0.9, roughness: 0.25 });
    var ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.95, 0.025, 8, 180), ringMat);
    var ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.45, 0.015, 8, 180), ringMat);
    ring2.rotation.x = 1.1;
    group.add(ring1); group.add(ring2);
    group.userData = { ring1: ring1, ring2: ring2 };
    return group;
  }

  function buildDust() {
    var n = 520, pos = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = Math.random() * 10 - 6;
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xe2c789, size: 0.05, transparent: true, opacity: 0.75, depthWrite: false
    }));
  }

  function init(host) {
    var canvas = document.createElement('canvas');
    canvas.className = 'hero-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    host.insertBefore(canvas, host.firstChild);

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    } catch (e) { canvas.remove(); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    var big = host.classList.contains('hero');
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    var key = new THREE.PointLight(0xffe2a0, 1.5, 40); key.position.set(4, 4, 6); scene.add(key);
    var fill = new THREE.PointLight(0x5fd29a, 0.8, 40); fill.position.set(-5, -3, 4); scene.add(fill);

    var star = buildStar(); scene.add(star);
    var dust = buildDust(); scene.add(dust);

    var mx = 0, my = 0, running = false, raf = 0, t0 = performance.now();

    function layout() {
      var w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      var wide = camera.aspect > 1.25;
      var s = (big ? 1 : 0.62) * (wide ? 1 : 0.8);
      star.scale.setScalar(s);
      star.position.x = wide ? (big ? 3.7 : 4.4) : 0;
      star.position.y = wide ? 0 : (big ? 1.2 : 0);
      if (!running) draw(performance.now());
    }

    function draw(now) {
      var t = (now - t0) / 1000;
      var sy = window.scrollY || 0;
      star.rotation.y = mx * 0.55 + Math.sin(t * 0.45) * 0.28;
      star.rotation.x = -my * 0.35 + Math.cos(t * 0.35) * 0.08;
      star.rotation.z = t * 0.08 + sy * 0.0007;
      star.userData.ring1.rotation.z = t * 0.25;
      star.userData.ring2.rotation.z = -t * 0.18;
      dust.rotation.y = t * 0.02 + mx * 0.05;
      dust.position.y = sy * 0.002;
      camera.position.x += (mx * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (-my * 0.3 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }

    function loop(now) {
      if (!running) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    }

    host.addEventListener('pointermove', function (e) {
      var r = host.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });

    if ('ResizeObserver' in window) new ResizeObserver(layout).observe(host);
    else window.addEventListener('resize', layout);
    layout();

    if (reduce) { draw(performance.now()); return; }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var vis = entries[0].isIntersecting;
        if (vis && !running) { running = true; raf = requestAnimationFrame(loop); }
        else if (!vis && running) { running = false; cancelAnimationFrame(raf); }
      }, { threshold: 0.01 }).observe(host);
    } else { running = true; raf = requestAnimationFrame(loop); }
  }
})();
