import { SubpageHero } from "@/components/ui/SubpageHero";
import { Tag } from "@/components/ui/Tag";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getSkicampTerms, getCampTypes } from "@/lib/data";
import texts from "@/data/texts.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: texts.meta.skicamp.title,
  description: texts.meta.skicamp.description,
};

export default async function SkicampPage() {
  const [terms, campTypes] = await Promise.all([
    getSkicampTerms(),
    getCampTypes(),
  ]);
  const camps =
    campTypes.length > 0
      ? campTypes.map((c) => ({ title: c.title, description: c.description, tags: c.tags }))
      : texts.skicamp.camps.items;
  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow={texts.skicamp.hero.eyebrow}
        title={texts.skicamp.hero.title}
        description={texts.skicamp.hero.description}
        imageSrc="/images/asikaprun.jpg"
        imagePositionClass="object-[center_75%]"
        imageAlt={texts.skicamp.hero.imageAlt}
        logoSrc="/images/loga/skicamp.svg"
        logoAlt="Skicamp"
        logoWidth={140}
        logoHeight={56}
      />

      {/* Intro */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              {texts.skicamp.intro.eyebrow}
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              {texts.skicamp.intro.title}
            </h2>
            <div className="space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
              {texts.skicamp.intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
            <Image
              src="/images/skicampnakaprunu.jpg"
              fill
              alt={texts.skicamp.intro.imageAlt}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* Camp types */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            {texts.skicamp.camps.eyebrow}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {camps.map((c) => (
              <div key={c.title} className="border border-line rounded-[3px] p-6 bg-cream">
                <h3 className="text-[18px] font-normal tracking-[-0.01em] mb-3">
                  {c.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.6] mb-4">
                  {c.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
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
            {texts.skicamp.features.eyebrow}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {texts.skicamp.features.items.map((f) => (
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

      {/* Termíny */}
      <section className="py-16 px-7 bg-ink text-white">
        <div className="max-w-[1280px] mx-auto text-center">
          {terms.length > 0 ? (
            <>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-8">
                {texts.skicamp.terms.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 text-left">
                {terms.map((t) => (
                  <div key={t.id} className="border border-white/20 rounded-[3px] p-5">
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-white/50 mb-1">
                      {t.camp_type}
                    </span>
                    <span className="block text-[16px] font-medium mb-2">
                      {t.date_from} – {t.date_to}
                    </span>
                    <span className="block text-[13px] text-white/60 mb-1">{t.location}</span>
                    {t.price > 0 && (
                      <span className="block text-[14px] font-medium text-accent">
                        {t.price.toLocaleString("cs-CZ")} Kč
                      </span>
                    )}
                    {t.spots > 0 && (
                      <span className="block text-[11px] text-white/40 mt-1">
                        {texts.skicamp.terms.spotsLabel} {t.spots}
                      </span>
                    )}
                    {t.note && (
                      <span className="block text-[11px] text-white/40 mt-1">{t.note}</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-4">
                {texts.skicamp.terms.emptyTitle}
              </h2>
              <p className="text-[14px] text-white/60 leading-[1.6] mb-8 max-w-md mx-auto">
                {texts.skicamp.terms.emptyDescription}
              </p>
            </>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/rezervace"
              className="min-h-[44px] flex items-center bg-white text-ink text-[10px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity"
            >
              {texts.skicamp.terms.ctaPrimary}
            </Link>
            <a
              href="tel:+420604681100"
              className="min-h-[44px] flex items-center text-[12px] text-white/60 hover:text-white/90 transition-colors"
            >
              {texts.skicamp.terms.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
