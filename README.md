# nook

Landing page and Nook type reveal for Nook, built with React + Vite. Brand and style rules live in [identity.md](identity.md). The final logo is in `public/brand/` (PNG and SVG) and as the animated `src/components/Wordmark.jsx`.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint
```

Pages: the landing intro is at `/` and the Nook type reveal is at `/reveal`. The reveal currently shows a sample type (The Reading Nook); generating a type from a user's connected accounts isn't built yet.

Deploys to Vercel as a standard Vite project (build command `npm run build`, output `dist`).
