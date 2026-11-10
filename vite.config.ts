import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Lovable-style setup: Vite + React + Tailwind, "@/" points at src.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  // Tools that assign a port (e.g. the Claude preview) pass it in PORT and get exactly that port.
  // Otherwise 8080, or the next free port if another app already uses it (Vite prints the URL).
  server: { port: Number(process.env.PORT) || 8080, strictPort: !!process.env.PORT },
});
