import { WHATSAPP } from "@/lib/contact";

// Sends each contact-form message to Hamza's WhatsApp through CallMeBot (free).
// Needs CALLMEBOT_KEY on the server (Vercel env). The email copy is sent by the form itself via Web3Forms.
// ponytail: no rate limit; add one (e.g. Vercel Firewall rule on /api/contact) if spam shows up.
export async function POST(req: Request) {
  const key = process.env.CALLMEBOT_KEY;
  if (!key) return Response.json({ ok: false, error: "not configured" }, { status: 503 });

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const s = (k: string, max: number) => String(b[k] ?? "").trim().slice(0, max);
  if (s("botcheck", 1)) return Response.json({ ok: true }); // honeypot: pretend it worked
  const name = s("name", 100);
  const email = s("email", 200);
  const message = s("message", 1500);
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) return Response.json({ ok: false }, { status: 400 });

  const text = [
    "📩 New portfolio message",
    `Type: ${s("type", 60)}`,
    `Name: ${name}`,
    `Email: ${email}`,
    s("phone", 25) ? `Phone: ${s("phone", 25)}` : null,
    s("interests", 300) ? `Interested in: ${s("interests", 300)}` : null,
    s("timeline", 60) ? `Timeline: ${s("timeline", 60)}` : null,
    "",
    message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const url = `https://api.callmebot.com/whatsapp.php?phone=%2B${WHATSAPP}&apikey=${encodeURIComponent(key)}&text=${encodeURIComponent(text)}`;
  try {
    const r = await fetch(url, { cache: "no-store" });
    return Response.json({ ok: r.ok }, { status: r.ok ? 200 : 502 });
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }
}
