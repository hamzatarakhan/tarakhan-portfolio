import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { Footer, Header, wrap } from "@/components/Chrome";
import { Txt } from "@/components/Txt";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/HomeClient";

const st = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const c = t.contactPage;
  return (
    <>
      <Header lang={lang} t={t} />
      <main id="main" className={`${wrap} pt-6 pb-14`}>
        <p className="label rise inline-flex items-center gap-2 rounded-full border border-[var(--glass-line)] bg-[var(--glass)] px-3 py-1.5 text-muted" style={st(0)}>
          <span className="pulse relative size-2 rounded-full bg-accent" aria-hidden />{t.hero.status}
        </p>
        <h1 className="display rise mt-5 text-4xl font-medium sm:text-6xl" style={st(1)}>{c.title}</h1>
        <p className="rise mt-4 max-w-prose text-lg text-muted" style={st(2)}><Txt>{c.intro}</Txt></p>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="glass rise p-6 sm:p-10" style={st(3)}><ContactForm f={c.f} /></div>
          <aside className="glass rise h-fit space-y-5 p-6 sm:p-8" style={st(4)}>
            <h2 className="display text-xl font-medium">{c.direct}</h2>
            <p dir="ltr" className="break-all font-mono text-sm"><a className="underline decoration-accent underline-offset-4" href={`mailto:${t.contact.email}`}>{t.contact.email}</a></p>
            <CopyEmail email={t.contact.email} copy={t.contact.copy} copied={t.contact.copied} />
            <p><a className="underline decoration-accent underline-offset-4" href="https://linkedin.com/in/hamza-tarakhan-b8ab961a5" target="_blank" rel="noopener noreferrer">{t.contact.linkedin}</a></p>
            <p className="text-muted"><Txt>{c.whatsapp}</Txt></p>
            <p className="text-muted"><Txt>{c.cv}</Txt></p>
          </aside>
        </div>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
