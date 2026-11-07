import type { Metadata } from "next";
import {
  Geist,
  JetBrains_Mono,
  Inter_Tight,
  Bricolage_Grotesque,
  Space_Grotesk,
  IBM_Plex_Sans_Arabic,
  Amiri_Quran,
} from "next/font/google";
import "../globals.css";
import { dirOf, getDict, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const jb = JetBrains_Mono({ variable: "--font-jb", subsets: ["latin"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["opsz"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const quran = Amiri_Quran({ variable: "--font-quran", subsets: ["arabic"], weight: "400" });

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang).meta;
  return {
    title: t.title,
    description: t.description,
    alternates: { languages: { en: "/en", ar: "/ar" } },
  };
}

// Runs before paint: restores theme + skin so there is no flash. Language comes from the URL.
const prefsScript = `(()=>{try{var d=document.documentElement,g=k=>localStorage.getItem(k);
d.dataset.theme=g('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
d.dataset.skin=g('skin')||'acid';}catch(e){}})()`;

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const fonts = [geist, jb, interTight, bricolage, space, plexArabic, quran].map((f) => f.variable).join(" ");
  return (
    <html lang={lang} dir={dirOf(lang)} data-theme="dark" data-skin="acid" className={`${fonts} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
