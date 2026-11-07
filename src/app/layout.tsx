import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter_Tight,
  Bricolage_Grotesque,
  Space_Grotesk,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hamza Tarakhan — Senior UI/UX & Product Designer",
  description: "Design systems, complex flows and bilingual Arabic/English products.",
};

// Runs before paint: restores theme / skin / direction so there is no flash.
const prefsScript = `(()=>{try{var d=document.documentElement,g=k=>localStorage.getItem(k);
var t=g('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
d.dataset.theme=t;d.dataset.skin=g('skin')||'calm';
var l=g('lang')||'en';d.lang=l;d.dir=l==='ar'?'rtl':'ltr';}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fonts = [geist, geistMono, interTight, bricolage, space, plexArabic]
    .map((f) => f.variable)
    .join(" ");
  return (
    <html lang="en" dir="ltr" data-theme="light" data-skin="calm" className={`${fonts} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
