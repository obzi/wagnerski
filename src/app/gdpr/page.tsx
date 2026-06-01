import { SubpageHero } from "@/components/ui/SubpageHero";
import texts from "@/data/texts.json";
import type { Metadata } from "next";
import { IMAGES } from "@/config/site";

export const metadata: Metadata = {
  title: texts.meta.gdpr.title,
  description: texts.meta.gdpr.description,
};

export default function GdprPage() {
  return (
    <>
      <SubpageHero
        eyebrow={texts.gdpr.hero.eyebrow}
        title={texts.gdpr.hero.title}
        imageSrc={IMAGES.karlov}
        imageAlt={texts.gdpr.hero.imageAlt}
        imagePositionClass="object-center"
      />

      <section className="py-16 px-7">
        <div className="max-w-[800px] mx-auto space-y-10">
          {texts.gdpr.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-[18px] font-medium tracking-[-0.01em] mb-3">
                {section.title}
              </h2>
              <p className="text-[14px] text-ink-secondary leading-[1.7]">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
