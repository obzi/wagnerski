import { SubpageHero } from "@/components/ui/SubpageHero";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import texts from "@/data/texts.json";

export const metadata: Metadata = {
  title: texts.meta.oNas.title,
  description: texts.meta.oNas.description,
};

export default function ONasPage() {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow={texts.oNas.hero.eyebrow}
        title={texts.oNas.hero.title}
        imageSrc="/images/uvodonas.jpg.jpeg"
        imagePositionClass="object-[85%_center] sm:object-center"
        imageAlt={texts.oNas.hero.imageAlt}
        logoSrc="/images/loga/wagner.svg"
        logoAlt="Wagner Ski Akademie"
        logoWidth={156}
        logoHeight={52}
      />

      {/* Story */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              {texts.oNas.story.eyebrow}
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              {texts.oNas.story.title}
            </h2>
            <div className="space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
              {texts.oNas.story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
            <Image
              src="/images/petrajolca.jpg"
              fill
              alt={texts.oNas.story.imageAlt}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            {texts.oNas.milestones.eyebrow}
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {texts.oNas.milestones.items.map((m) => (
              <div key={m.year} className="border-l-2 border-accent pl-5 py-1">
                <span className="block text-[24px] font-normal tracking-[-0.02em] text-accent mb-1">
                  {m.year}
                </span>
                <p className="text-[13px] text-ink-secondary leading-[1.5]">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            {texts.oNas.leadership.eyebrow}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6 items-start">
              <div className="relative w-[120px] h-[120px] rounded-[3px] overflow-hidden shrink-0">
                <Image
                  src="/petr.jpg"
                  fill
                  alt={texts.oNas.leadership.petr.name}
                  className="object-cover"
                  sizes="120px"
                  draggable={false}
                />
              </div>
              <div>
                <h3 className="text-[18px] font-normal tracking-[-0.01em] mb-1">
                  {texts.oNas.leadership.petr.name}
                </h3>
                <p className="text-[11px] text-ink-muted mb-3">
                  {texts.oNas.leadership.petr.subtitle}
                </p>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  {texts.oNas.leadership.petr.bio}
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="relative w-[120px] h-[120px] rounded-[3px] overflow-hidden shrink-0">
                <Image
                  src="/jolca.jpg"
                  fill
                  alt={texts.oNas.leadership.jolana.name}
                  className="object-cover"
                  sizes="120px"
                  draggable={false}
                />
              </div>
              <div>
                <h3 className="text-[18px] font-normal tracking-[-0.01em] mb-1">
                  {texts.oNas.leadership.jolana.name}
                </h3>
                <p className="text-[11px] text-ink-muted mb-3">
                  {texts.oNas.leadership.jolana.subtitle}
                </p>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  {texts.oNas.leadership.jolana.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            {texts.oNas.values.eyebrow}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {texts.oNas.values.items.map((v) => (
              <div key={v.title} className="border border-line rounded-[3px] p-6 bg-cream">
                <h3 className="text-[14px] font-medium tracking-[-0.01em] mb-2">
                  {v.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            {texts.oNas.whatWeDo.eyebrow}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/skola" className="group border border-line rounded-[3px] p-6 hover:border-accent transition-colors">
              <h3 className="text-[16px] font-normal tracking-[-0.01em] mb-2 group-hover:text-accent transition-colors">
                {texts.oNas.whatWeDo.items[0].title}
              </h3>
              <p className="text-[13px] text-ink-secondary leading-[1.6]">
                {texts.oNas.whatWeDo.items[0].description}
              </p>
            </Link>
            <Link href="/skicamp" className="group border border-line rounded-[3px] p-6 hover:border-accent transition-colors">
              <h3 className="text-[16px] font-normal tracking-[-0.01em] mb-2 group-hover:text-accent transition-colors">
                {texts.oNas.whatWeDo.items[1].title}
              </h3>
              <p className="text-[13px] text-ink-secondary leading-[1.6]">
                {texts.oNas.whatWeDo.items[1].description}
              </p>
            </Link>
            <Link href="/instruktor" className="group border border-line rounded-[3px] p-6 hover:border-accent transition-colors">
              <h3 className="text-[16px] font-normal tracking-[-0.01em] mb-2 group-hover:text-accent transition-colors">
                {texts.oNas.whatWeDo.items[2].title}
              </h3>
              <p className="text-[13px] text-ink-secondary leading-[1.6]">
                {texts.oNas.whatWeDo.items[2].description}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-7 bg-ink text-white">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-4">
            {texts.oNas.cta.title}
          </h2>
          <p className="text-[14px] text-white/60 leading-[1.6] mb-8 max-w-md mx-auto">
            {texts.oNas.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="tel:+420604681100"
              className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-white transition-colors"
            >
              {texts.oNas.cta.phone}
            </a>
            <a
              href={`mailto:${texts.oNas.cta.email}`}
              className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-white transition-colors"
            >
              {texts.oNas.cta.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
