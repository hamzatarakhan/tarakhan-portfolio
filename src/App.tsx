import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Colophon from "@/pages/Colophon";
import System from "@/pages/System";
import CaseStudy from "@/pages/CaseStudy";
import NotFound from "@/pages/NotFound";

// Same URLs as the Next.js build: everything lives under /en or /ar.
// "/" opens English, or Arabic if the visitor chose it with the language button (lang cookie).
const home = () => (/(^|;\s*)lang=ar\b/.test(document.cookie) ? "/ar" : "/en");

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={home()} replace />} />
        <Route path="/:lang" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="colophon" element={<Colophon />} />
          <Route path="system" element={<System />} />
          <Route path="work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
