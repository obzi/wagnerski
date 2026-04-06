import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  return (
    <footer className="border-t border-line px-7 py-[22px]">
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted">
          Wagner Ski Akademie · wagnerski.cz
        </span>
        <div className="flex items-center gap-6">
          {[
            { href: "https://sherpaski.cz", label: "sherpaski.cz" },
            { href: "https://skicamp.cz", label: "skicamp.cz" },
            { href: "https://chcibytinstruktor.cz", label: "chcibytinstruktor.cz" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[9px] uppercase tracking-[0.16em] text-ink-muted hover:text-ink-secondary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://www.facebook.com/Sherpaski.cz"
            className="text-ink-muted hover:text-ink-secondary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/terapielyzovanim/"
            className="text-ink-muted hover:text-ink-secondary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
