import { notFound } from "next/navigation";

// Catches unknown paths under /en or /ar so the branded 404 renders inside the locale layout.
export default function CatchAll() {
  notFound();
}
