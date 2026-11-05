# Severain Portfolio

A React + Vite portfolio for Severain, a full-stack developer from Rwanda. The page features a responsive dark editorial design, React code typing animation, selected work, skills, experience, and a contact form that opens an email client.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

To test the production build:

```bash
npm run build
npm run preview
```

## Deploy on Render

Create a **Static Site** connected to this GitHub repository, then set:

- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Root Directory:** leave blank

No start command is needed. Render will automatically redeploy from the connected branch when you push updates.

## Project structure

- `src/App.jsx` — React portfolio sections, code animation, project filters, and contact form.
- `src/style.css` — responsive visual design and motion styles.
- `index.html` — document metadata, title, and favicon.
