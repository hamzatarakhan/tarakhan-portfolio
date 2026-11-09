## Stack (Lovable-compatible)

Vite + React 19 + TypeScript + Tailwind CSS v4 (`@tailwindcss/vite`) + React Router + shadcn/ui conventions
(`components.json`, `cn()` in `src/lib/utils.ts`, `@/` → `src/`).

- Pages: `src/pages/*`, routes in `src/App.tsx` (everything under `/en` or `/ar`), shared shell in `src/components/Layout.tsx`.
- Text: `src/dictionaries/{en,ar}.json`; current language via `useLang()` from `src/lib/i18n.ts`.
- Page titles: `setMeta()` from `src/lib/meta.ts`.
- Styles and tokens: `src/index.css` (+ `src/styles/*.css`). Fonts load in `index.html`.
- Contact WhatsApp relay: Vercel Function `api/contact.ts` (needs `CALLMEBOT_KEY`); email via Web3Forms (`VITE_WEB3FORMS_KEY`).
- Dev: `npm run dev` (port 8080). Build: `npm run build` → `dist/`. Hosting: Vercel (`vercel.json`, SPA rewrites).
