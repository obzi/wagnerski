import Image from "next/image";
import { SubpageHero } from "@/components/ui/SubpageHero";
import texts from "@/data/texts.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: texts.meta.pravidlaFis.title,
  description: texts.meta.pravidlaFis.description,
};

export default function PravidlaFisPage() {
  return (
    <>
      <SubpageHero
        eyebrow={texts.pravidlaFis.hero.eyebrow}
        title={texts.pravidlaFis.hero.title}
        imageSrc="/images/karlov.jpg"
        imageAlt={texts.pravidlaFis.hero.imageAlt}
        imagePositionClass="object-center"
      />

      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-[14px] text-ink-secondary leading-[1.7] max-w-[680px] mb-12">
            {texts.pravidlaFis.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {texts.pravidlaFis.rules.map((rule) => (
              <div
                key={rule.number}
                className="flex gap-5 p-6 border border-line rounded-[3px] bg-surface"
              >
                <div className="shrink-0">
                  <Image
                    src={`/images/fis/fis-${rule.number}.jpg`}
                    width={80}
                    height={80}
                    alt={`Pravidlo ${rule.number} – ${rule.title}`}
                    className="rounded-[2px]"
                    draggable={false}
                  />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-ink-muted font-medium">
                      {rule.number}
                    </span>
                    <h2 className="text-[15px] font-medium tracking-[-0.01em]">
                      {rule.title}
                    </h2>
                  </div>
                  <p className="text-[13px] text-ink-secondary leading-[1.7]">
                    {rule.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
