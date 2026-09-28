# Khwajja Gharib Nawaz Trust — website

A multi-page rebuild of kgntrust.org, ready to deploy on GitHub Pages.

## Structure

```
index.html                 Home
about-us.html               About Us (mission, vision, leadership legacy)
donate.html                 Donate (impact list, bank details, donation form link)
our-projects.html           Our Projects (township, school, hospital, diagnostic lab, ambulance bay)
gallery.html                Gallery (text content; photo grid ready for images — see note below)
contact-us.html             Contact Us
terms-and-conditions.html   Terms and Conditions
privacy-policy.html         Privacy Policy
css/style.css               Shared stylesheet (brand colors, type, layout, animation)
js/include.js               Loads the shared header/footer into every page, highlights the active nav link, wires the mobile menu
js/main.js                  Scroll-reveal animation for cards/sections
partials/header.html        Shared top bar + navigation (edit once, applies everywhere)
partials/footer.html        Shared footer (offices, socials, links)
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Copy everything in this folder into the repository root (or into a `/docs` folder if you'd rather keep it alongside other code).
3. Commit and push.
4. In the repo's **Settings → Pages**, set the source to the branch/folder you used (e.g. `main` / `/` or `main` / `docs`).
5. GitHub will publish the site at `https://<username>.github.io/<repo>/` within a minute or two.

Because the shared header/footer are loaded with `fetch()` in `js/include.js`, they only render when the site is served over `http(s)` — that's automatic on GitHub Pages, but if you open the HTML files directly by double-clicking them on your computer, the nav bar and footer won't appear (a browser security restriction on `file://` pages). To preview locally first, run a tiny local server from this folder, e.g. `python3 -m http.server 8000`, then visit `http://localhost:8000`.

## Known gap: Gallery photos

The live site's Gallery page loads its event photos dynamically, and they weren't retrievable through a plain fetch of the page. `gallery.html` includes all of the page's text content and a ready-made photo grid (`.grid.grid-3` in `css/style.css`) — once you have the actual image files, add a `gallery/` folder and drop in `<img>` tags.

## Editing content

- To change something that appears on every page (logo, nav links, footer contact info), edit `partials/header.html` or `partials/footer.html` once.
- To change a single page's content, edit that page's `.html` file directly — there's no build step, it's plain HTML/CSS/JS.
- Brand colors, fonts, and spacing all live in `css/style.css` under the `:root` custom properties at the top.
