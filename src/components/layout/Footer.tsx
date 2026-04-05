import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line px-7 py-[22px]">
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted">
          Wagner Ski Akademie · wagnerski.cz
        </span>
        <div className="flex gap-6">
          {[
            { href: "https://sherpaski.cz", label: "sherpaski.cz" },
            { href: "https://skicamp.cz", label: "skicamp.cz" },
            { href: "https://chcibytinstruktor.cz", label: "chcibytinstruktor.cz" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[9px] uppercase tracking-[0.16em] text-ink-muted hover:text-ink-secondary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
