import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import texts from "@/data/texts.json";
import { IMAGES } from "@/config/site";

const partners = [
  { src: IMAGES.loga.wagner, alt: "Wagner Ski Akademie", width: 210, height: 70 },
  { src: IMAGES.loga.sherpa, alt: "Sherpa Ski School", width: 130, height: 92 },
  { src: IMAGES.loga.skicamp, alt: "Skicamp", width: 130, height: 52 },
  { src: IMAGES.loga.skiarenaKarlov, alt: "Ski aréna Karlov", width: 280, height: 56 },
  { src: IMAGES.loga.karlovExpress, alt: "Karlov Express", width: 180, height: 50 },
  { src: IMAGES.loga.aiss, alt: "AISS", width: 120, height: 48 },
  { src: IMAGES.loga.ivsi, alt: "IVSI", width: 80, height: 80 },
];

export function Footer({ instagramHref }: { instagramHref: string }) {
  return (
    <footer className="border-t border-line">
      {/* Legal links */}
      <div className="px-7 py-5 border-b border-line">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {texts.footer.legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.12em] text-ink-muted hover:text-ink-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div className="px-7 py-10">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6 text-center">
            {texts.footer.partnersLabel}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
            {partners.map((p) => (
              <Image
                key={p.alt}
                src={p.src}
                width={p.width}
                height={p.height}
                alt={p.alt}
                className="opacity-75 hover:opacity-100 transition-opacity"
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
            {texts.footer.copyright}
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
                href={instagramHref}
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
