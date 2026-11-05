# Severain Portfolio

React/Vite-powered portfolio entry point for **Severain**. The existing self-contained portfolio page is preserved at `portiforio.html` and hosted inside the React app while its interactive sections are migrated incrementally. React also adds the looping React-code typing effect and the supplied-style logo in the home header; the logo is used as the browser-tab favicon.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To verify the production build locally:

```bash
npm run build
npm run preview
```

The build copies `portiforio.html` into `dist/`, where Vite's React entry page can load it.

## Deploy to Render

1. Push this repository to GitHub.
2. In Render, choose **New + → Static Site** and connect `severain34/portiforio`.
3. Set **Build Command** to `npm install && npm run build`.
4. Set **Publish Directory** to `dist`.
5. Leave the Root Directory blank, then create the site. No start command is needed for a static site.
6. After deployment, open the Render URL and confirm the React page, favicon, portfolio, logo, and typing animation load.

For future pushes, Render can redeploy automatically when connected to the repository.

## Project files

- `index.html` — React app document, page title, and favicon.
- `src/App.jsx` — React root and portfolio iframe effects.
- `src/style.css` — React app shell styles.
- `portiforio.html` — original standalone portfolio.
- `scripts/copy-portfolio.mjs` — copies the original page into the production output.
