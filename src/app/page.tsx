import Link from "next/link";

export default function Home() {
  return (
    <main className="grid min-h-dvh place-items-center p-6 text-center">
      <div>
        <h1 className="display text-3xl font-semibold">Home — coming in Phase 3</h1>
        <Link href="/system" className="mt-4 inline-block text-accent underline underline-offset-4">View the design system</Link>
      </div>
    </main>
  );
}
