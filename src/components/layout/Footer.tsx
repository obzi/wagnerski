import Image from "next/image";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

const partners = [
  { src: "/images/loga/sherpa.svg", alt: "Sherpa Ski School", width: 90, height: 64 },
  { src: "/images/loga/skiarena-karlov.svg", alt: "Ski aréna Karlov", width: 200, height: 40 },
  { src: "/images/loga/wagner.svg", alt: "Wagner Ski Akademie", width: 150, height: 50 },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      {/* Partners */}
      <div className="px-7 py-10">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6 text-center">
            Partneři
          </span>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
            {partners.map((p) => (
              <Image
                key={p.alt}
                src={p.src}
                width={p.width}
                height={p.height}
                alt={p.alt}
                className="opacity-50 hover:opacity-80 transition-opacity"
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-line px-7 py-[22px]">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted">
            Wagner Ski Akademie · wagnerski.cz
          </span>
          <div className="flex items-center gap-0">
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
      </div>
    </footer>
  );
}
