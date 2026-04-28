import { SubpageHero } from "@/components/ui/SubpageHero";
import { CourseWithSignup } from "@/components/ui/CourseWithSignup";
import { getInstructorCourses } from "@/lib/data";
import Image from "next/image";
import type { Metadata } from "next";
import texts from "@/data/texts.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: texts.meta.instruktor.title,
  description: texts.meta.instruktor.description,
};

export default async function InstruktorPage() {
  const courses = await getInstructorCourses();
  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow={texts.instruktor.hero.eyebrow}
        title={texts.instruktor.hero.title}
        description={texts.instruktor.hero.description}
        imageSrc="/images/kurz.jpg"
        imageAlt={texts.instruktor.hero.imageAlt}
        logoSrc="/images/loga/sherpa.svg"
        logoAlt="Sherpa Ski School"
        logoWidth={130}
        logoHeight={91}
      />

      {/* Intro */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
            {texts.instruktor.intro.eyebrow}
          </span>
          <div className="text-ink-secondary">
            {texts.instruktor.intro.sections.map((section, i) => (
              <div key={i} className={i < texts.instruktor.intro.sections.length - 1 ? "mb-8" : ""}>
                <span className="block text-[9px] uppercase tracking-[0.16em] text-accent mb-2">
                  {section.label}
                </span>
                <p className="text-[14px] leading-[1.7]">
                  {section.text}
                </p>
              </div>
            ))}

            <blockquote className="border-l-2 border-accent pl-5 py-1 my-10 font-serif italic text-[18px] sm:text-[20px] leading-[1.5] text-ink">
              {texts.instruktor.intro.quote}
            </blockquote>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-8 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
            <Image
              src="/images/kurzdalsi.jpg"
              fill
              alt={texts.instruktor.intro.galleryAlt1}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              draggable={false}
            />
          </div>
          <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
            <Image
              src="/images/kurzlokal.jpg"
              fill
              alt={texts.instruktor.intro.galleryAlt2}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              draggable={false}
            />
          </div>
        </div>
      </section>

      <CourseWithSignup courses={courses} />

      {/* Pricing */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              {texts.instruktor.pricing.eyebrow}
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              {texts.instruktor.pricing.title}
            </h2>
            <div className="space-y-4">
              {texts.instruktor.pricing.packages.map((pkg) => (
                <div key={pkg.title} className="border border-line rounded-[3px] p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-[16px] font-medium">{pkg.title}</h3>
                    <span className="text-[20px] font-normal text-accent">{pkg.price}</span>
                  </div>
                  <p className="text-[12px] text-ink-muted mb-3">
                    {pkg.note}
                  </p>
                  <p className="text-[13px] text-ink-secondary leading-[1.6]">
                    {pkg.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              {texts.instruktor.pricing.includedLabel}
            </span>
            <ul className="space-y-3">
              {texts.instruktor.pricing.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13px] text-ink-secondary">
                  <span className="mt-1.5 w-[6px] h-[6px] rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-7 bg-ink text-white">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-4">
            {texts.instruktor.cta.title}
          </h2>
          <p className="text-[14px] text-white/60 leading-[1.6] mb-8 max-w-md mx-auto">
            {texts.instruktor.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#prihlaska"
              className="min-h-[44px] flex items-center bg-white text-ink text-[10px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity"
            >
              {texts.instruktor.cta.ctaPrimary}
            </a>
            <a
              href={`mailto:${texts.instruktor.cta.email}`}
              className="min-h-[44px] flex items-center text-[12px] text-white/60 hover:text-white/90 transition-colors"
            >
              {texts.instruktor.cta.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
