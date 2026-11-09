import en from "@/dictionaries/en.json";
import ar from "@/dictionaries/ar.json";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export type Dict = typeof en;

const dicts: Record<Locale, Dict> = { en, ar };
export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const getDict = (l: Locale): Dict => dicts[l];
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

// Current page language from the URL (/en/… or /ar/…). Layout already redirects anything else to English.
import { useParams } from "react-router-dom";
export const useLang = (): Locale => {
  const { lang = "en" } = useParams();
  return isLocale(lang) ? lang : "en";
};
