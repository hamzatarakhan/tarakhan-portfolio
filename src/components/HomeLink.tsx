import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// The header logo: from another page it goes home; on the home page it smooth-scrolls back to the top.
export function HomeLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const path = useLocation().pathname;
  return (
    <Link
      to={href}
      className={className}
      onClick={(e) => {
        if (path !== href) return;
        e.preventDefault();
        // Drop #work etc. first: changing the URL afterwards can interrupt the smooth scroll.
        if (location.hash) history.replaceState(history.state, "", href);
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
      }}
    >
      {children}
    </Link>
  );
}
