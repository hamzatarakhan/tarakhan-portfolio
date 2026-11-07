import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { Footer, Header, wrap } from "@/components/Chrome";
import { Txt } from "@/components/Txt";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/HomeClient";

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const c = t.contactPage;
  return (
    <>
      <Header lang={lang} t={t} />
      <main id="main" className={`${wrap} pt-12 pb-20`}>
        <h1 className="display text-3xl font-semibold sm:text-4xl">{c.title}</h1>
        <p className="mt-3 max-w-prose text-muted"><Txt>{c.intro}</Txt></p>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_20rem]">
          <ContactForm f={c.f} />
          <aside className="space-y-4">
            <h2 className="display text-lg font-semibold">{c.direct}</h2>
            <p dir="ltr" className="font-mono"><a className="underline underline-offset-4" href={`mailto:${t.contact.email}`}>{t.contact.email}</a></p>
            <CopyEmail email={t.contact.email} copy={t.contact.copy} copied={t.contact.copied} />
            <p><a className="underline underline-offset-4" href="https://linkedin.com/in/hamza-tarakhan-b8ab961a5" target="_blank" rel="noopener noreferrer">{t.contact.linkedin}</a></p>
            <p className="text-muted"><Txt>{c.whatsapp}</Txt></p>
            <p className="text-muted"><Txt>{c.cv}</Txt></p>
          </aside>
        </div>
      </main>
      <Footer lang={lang} t={t} />
    </>
  );
}
