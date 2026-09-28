# Khwajja Gharib Nawaz Trust: 3D website

Multi-page rebuild of kgntrust.org with a 3D / advanced interaction layer. Same content and pages as the standard version.

## What's 3D

- **WebGL hero scene** (`js/hero3d.js`, Three.js r128 from cdnjs): a rotating gold eight-pointed star, orbit rings and drifting gold dust on every page hero. Reacts to the pointer and to scrolling.
- **Program ring** (`js/ring.js`): the ten welfare programs on the homepage as a draggable 3D carousel, with arrow buttons. The original list stays in the page for screen readers.
- **Tilt and glare** (`js/tilt.js`): cards, trustee portraits, bank cards and project renderings tilt toward the pointer with a moving highlight (mouse devices only).
- **3D scroll reveal, depth buttons, magnetic buttons, scroll progress bar, count-up facts** (`js/main.js`, `css/style.css` "3D LAYER").

## Accessibility and performance

- `prefers-reduced-motion`: the star renders as one still frame, the ring stops auto-rotating, tilt and reveal animations are off.
- No WebGL or JS: pages still show all content; only the effects are missing.
- The 3D scene pauses when its hero is off screen.

## Structure

```
index.html, about-us.html, donate.html, our-projects.html,
gallery.html, contact-us.html, terms-and-conditions.html, privacy-policy.html
css/style.css        Base styles + 3D layer (bottom of file)
js/include.js        Shared header/footer loader, active nav, mobile menu
js/hero3d.js         Three.js hero scene
js/tilt.js           Pointer tilt + glare
js/ring.js           3D program ring
js/main.js           Reveal, progress bar, counters, magnetic buttons
partials/            Shared header and footer
```

## Deploy on GitHub Pages

Push the contents of this folder to a repo root (or `/docs`), then enable Pages in Settings. Preview locally with `python3 -m http.server 8000` (the shared header/footer need http, not file://). Three.js loads from cdnjs, so the visitor needs an internet connection for the 3D scene.

## Notes

- Gallery photos still need to be added to `gallery.html` (they load dynamically on the original site).
- The hospital, ambulance and operation theater numbers on the homepage come from the project plan text and are labelled as planned.
