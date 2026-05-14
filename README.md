https://github.com/Losomon/Savora-Spice.git# Savora Spice (Static Site)

Savora Spice is a static, single-page storefront experience (HTML/CSS/JS). This repo contains the main production assets under `frontend/` and an additional standalone landing page `in.html`.

## Project Structure

- `frontend/`
  - `index.html`
  - `css/index.css`
  - `js/index.js`
- `in.html` - standalone page (includes its own styles/scripts)
- `LICENSE`

## Requirements

- Any modern web browser.

## Run Locally

Because this is a static site, you can open files directly in a browser.

### Option A: Open in Browser

- Open: `frontend/index.html`

### Option B: Simple Local Server (recommended)

If you want the page to load assets via an HTTP server:

- In this folder run:
  - `python -m http.server 8000`
- Then open:
  - `http://localhost:8000/frontend/index.html`

## Build / Dependencies

No build step is required.

## GitHub Publishing

When pushing to GitHub, you can publish via:

- GitHub Pages (recommended)
  - Set the Pages source to `/frontend` (if your intent is to serve only that site)

If you want GitHub Pages to serve the root using `index.html`, you can either:

- Move/copy `frontend/index.html` to the repo root and adjust paths, **or**
- Configure Pages source appropriately.

## Notes

This project does not currently include a backend. Cart actions and checkout prompts are handled client-side.

