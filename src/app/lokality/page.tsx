import Image from "next/image";
import { SubpageHero } from "@/components/ui/SubpageHero";
import type { Metadata } from "next";
import texts from "@/data/texts.json";

export const metadata: Metadata = {
  title: texts.meta.lokality.title,
  description: texts.meta.lokality.description,
};

export default function LokalityPage() {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow={texts.lokality.hero.eyebrow}
        title={texts.lokality.hero.title}
        imageSrc="/images/karlov.jpg"
        imageAlt={texts.lokality.hero.imageAlt}
        logoSrc="/images/loga/skiarena-karlov.svg"
        logoAlt="Ski aréna Karlov"
        logoWidth={234}
        logoHeight={47}
      />

      {/* Detail */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-12">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              {texts.lokality.detail.eyebrow}
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              {texts.lokality.detail.title}
            </h2>
            <div className="space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
              {texts.lokality.detail.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
              <Image
                src="/images/jolcavyuka.jpeg"
                fill
                alt={texts.lokality.detail.imageAlt}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 44vw"
                draggable={false}
              />
            </div>

            <div className="border border-line rounded-[3px] p-6">
              <h3 className="text-[13px] font-medium tracking-[-0.01em] mb-4">
                {texts.lokality.detail.parametersTitle}
              </h3>
              <dl className="space-y-3 text-[13px]">
                {texts.lokality.detail.parameters.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt className="text-ink-muted">{label}</dt>
                    <dd className="text-right font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Ski akademie - Jeseníky */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
            {texts.lokality.akademie.eyebrow}
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
            {texts.lokality.akademie.title}
          </h2>
          <div className="max-w-2xl space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
            {texts.lokality.akademie.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Why Karlov */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            {texts.lokality.whyKarlov.eyebrow}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {texts.lokality.whyKarlov.items.map((item) => (
              <div key={item.title} className="border border-line rounded-[3px] p-6 bg-cream">
                <h3 className="text-[14px] font-medium tracking-[-0.01em] mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
