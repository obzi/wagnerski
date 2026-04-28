import Image from "next/image";
import { SubpageHero } from "@/components/ui/SubpageHero";
import { Tag } from "@/components/ui/Tag";
import Link from "next/link";
import type { Metadata } from "next";
import texts from "@/data/texts.json";

export const metadata: Metadata = {
  title: texts.meta.skola.title,
  description: texts.meta.skola.description,
};

export default function SkolaPage() {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow={texts.skola.hero.eyebrow}
        title={texts.skola.hero.title}
        description={texts.skola.hero.description}
        imageSrc="/images/vyuka.jpeg"
        imagePositionClass="object-center sm:object-[center_25%]"
        imageAlt={texts.skola.hero.imageAlt}
        logoSrc="/images/loga/sherpa.svg"
        logoAlt="Sherpa Ski School"
        logoWidth={130}
        logoHeight={91}
      />

      {/* Location banner */}
      <section className="bg-ink text-white py-6 px-7">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent shrink-0">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span className="text-[13px] sm:text-[14px] tracking-[-0.01em]">
              {texts.skola.locationBanner.textBefore}<strong className="font-medium">{texts.skola.locationBanner.textStrong}</strong>{texts.skola.locationBanner.textAfter}
            </span>
          </div>
          <a
            href="/lokality"
            className="text-[11px] uppercase tracking-[0.14em] text-accent hover:text-white transition-colors shrink-0"
          >
            {texts.skola.locationBanner.link}
          </a>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              {texts.skola.intro.eyebrow}
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              {texts.skola.intro.title}
            </h2>
            <div className="space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
              {texts.skola.intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link
              href="/rezervace"
              className="inline-block mt-8 bg-ink text-cream text-[10px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity"
            >
              {texts.skola.intro.cta}
            </Link>
          </div>
          <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
            <Image
              src="/images/ucime.jpg"
              fill
              alt={texts.skola.intro.imageAlt}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            {texts.skola.disciplines.eyebrow}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {texts.skola.disciplines.items.map((d) => (
              <div key={d.title} className="border border-line rounded-[3px] p-6 bg-cream">
                <h3 className="text-[18px] font-normal tracking-[-0.01em] mb-3">
                  {d.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.6] mb-4">
                  {d.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {d.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            {texts.skola.features.eyebrow}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {texts.skola.features.items.map((f) => (
              <div key={f.title} className="border-l-2 border-accent pl-5 py-1">
                <h3 className="text-[14px] font-medium tracking-[-0.01em] mb-2">
                  {f.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-7 bg-ink text-white">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-4">
            {texts.skola.cta.title}
          </h2>
          <p className="text-[14px] text-white/60 leading-[1.6] mb-8 max-w-md mx-auto">
            {texts.skola.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/rezervace"
              className="min-h-[44px] flex items-center bg-white text-ink text-[10px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity"
            >
              {texts.skola.cta.ctaPrimary}
            </Link>
            <a
              href="tel:+420604681100"
              className="min-h-[44px] flex items-center text-[12px] text-white/60 hover:text-white/90 transition-colors"
            >
              {texts.skola.cta.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
