# Portfolio: Phase 1 plan (research, directions, sitemap, outlines, tech)

## 1. Research note
Sources: Awwwards Portfolio Honors listings (2026), a Jan 2026 agency write-up on 2025 SOTY winners, UXfolio State of UX Portfolios 2026, Muzli/Toptal/Uxcel/UX Planet portfolio guides. Search results were thin on Awwwards' own criteria, so some points below are my judgment.

What the best do well
- Make role and positioning legible on the first screen; the meaning is compressed into one line.
- Treat the portfolio as an experience (interactive, scroll-driven), not a gallery.
- Show process as a story with decisions, not a phase checklist.
- 3-5 deep projects beat many shallow ones.
- Name the business problem and the outcome up front; reviewers scan, they do not read.
- Typography does heavy lifting; restraint over decoration.
- Personality shows in details (cursor, copy, 404), not in noise.

What is overdone
- Dark page + giant name + floating blobs/gradients.
- Custom cursors and scroll-jacking that block reading.
- Process diagrams (empathize/define/ideate) with no real decisions.
- Mockups in device frames with no explanation.
- Heavy WebGL that fails Lighthouse and on mid-range phones.
- AI-generated filler copy; reviewers spot it.

How this concept beats them
- The theme engine + Inspect mode are the proof of systems thinking, not a claim about it.
- Bilingual RTL done properly is rare and directly matches the target role (MENA telecom/fintech).
- Case studies lead with decisions (options -> choice -> why), each with a working mini-artifact.
- Performance and accessibility as a visible feature (colophon shows scores).

## 2. Visual directions (pick one)
**A. "Calm Instrument"** (recommended; matches your calm-UI taste)
Soft blue-grey surfaces, hairline borders, one accent per skin, lots of air. Type: Inter Tight or Geist (Latin display) + IBM Plex Sans Arabic. Motion: short, spring-based, reveals and layout transitions, no parallax excess. Reads senior and precise; the skins make the accent swap dramatic by contrast.

**B. "Editorial Grid"**
Warm off-white paper, black ink, big serif display (Fraunces / Instrument Serif) with a grotesk for UI, Arabic via Readex Pro / Noto Naskh pairing. Visible 12-col grid lines (ties into Inspect mode). Motion: type-led, masked line reveals, slow easing. Most distinctive, riskiest for Arabic pairing.

**C. "Blueprint"**
Technical drafting look: dotted grid, mono labels (token names always visible), cobalt/orange accent, dark and light both. Motion: snap/linear measured, annotations drawing in. Strongest "design system" signal, but closest to the overdone dark-tech look if not restrained.

## 3. Sitemap
/{en|ar}/ Home - /work/[slug] x4 - /about - /contact - /colophon - /system (hidden) - 404. Cmd+K everywhere. CV download, email copy, theme/lang/skin switches in the palette.

Home order: Hero -> proof strip -> 4 case cards -> what I do -> how I work -> playground -> about teaser -> contact CTA.

## 4. Case-study outlines (template per brief)
1. **SalesPoint: dealer platform UX** - problem: high-volume dealers, KYC/activation/billing/wallet across roles. Found: business rules, approval stages. Decisions: 5 activation flows tested, 5 credit-limit patterns, 2 migration models (12 variants). Artifact: SIM activation stepper + A/B variant switcher. Impact: {{TODO numbers}}.
2. **SalesPoint design system** - problem: 5 operators, one team. Decisions: token layering, governance gate, RTL/multi-font strategy. Artifact: interactive token-architecture diagram with live brand switch. Impact: each operator launched on existing components (no figures invented).
3. **Shamat** - Arabic typography, RTL-first reading UX. Artifact: Mushaf reader mini-demo (needs your text/screens).
4. **Flowance** - finance tracker end to end, design + build. Artifact: transaction add/insight widget.

## 5. Tech plan
Next.js (App Router, TS, static export) - Tailwind v4 on CSS-variable tokens (primitive -> semantic -> component) - Motion for UI, GSAP only where needed, Lenis - next-intl with /en /ar routes, logical properties - MDX case studies - Web3Forms/Formspree for the form (static host) - Vercel + Vercel Analytics - Playwright smoke tests (2 locales x 2 themes) - ESLint/Prettier. I will verify current versions before installing.

## 6. Needed from you to start Phase 2
Direction pick (A/B/C), project folder location, NDA answers, photo, CV, WhatsApp, domain (see /assets-needed.md in Phase 2).
