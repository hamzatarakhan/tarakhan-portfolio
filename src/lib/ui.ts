// Language, theme and colour-skin switchers are hidden for now: everyone gets English, dark, indigo.
// Flip to true to bring the buttons (header, mobile menu, Ctrl K actions) back; then also restore the
// saved-choice lines noted in src/app/[lang]/layout.tsx (prefsScript) and src/proxy.ts.
// Lives in a plain module (not "use client") so server components read the real value.
export const SWITCHERS = false;
