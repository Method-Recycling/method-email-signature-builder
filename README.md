# Method Recycling — Email Signature Builder

A web-based email signature generator for Method Recycling employees.
Fill in your details, pick a banner (optional), copy to Gmail or HubSpot.

## Run locally

The app is static HTML/CSS/JS — no build step. Two options:

**Quick (double-click):**
Open `dist/index.html` in your browser.
Caveat: the "Copy" buttons use the Clipboard API, which some browsers only enable on `http(s)://` origins, not `file://`. If copying fails, use the server option below.

**Local server (recommended):**

```sh
# Python (bundled on macOS)
python3 -m http.server 8000 --directory dist

# or Node
npx --yes serve dist
```

Then open <http://localhost:8000>.

## Lint / format

```sh
npm install           # one-time
npm run lint          # Biome check
npm run lint:fix      # auto-fix what it can
npm run format        # format only
```

CI runs `biome ci` on every push to `main` and blocks the deploy on failure.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) publishes `dist/` to GitHub Pages on every push to `main`.
Live site: <https://method-recycling.github.io/method-email-signature-builder/>

## Project layout

```
dist/           # deployed site — edit here
  index.html
  script.js
  style.css (under css/)
  images/
.github/        # CI workflow
biome.json      # lint + format config
package.json    # dev dependencies (Biome only)
```

## Credits

Originally forked from Svyatoslav Semenov's [CodePen signature builder](https://codepen.io/svyatoff/pen/wdRzWw).
UI kit: [Bulma](https://bulma.io) by Jeremy Thomas.
