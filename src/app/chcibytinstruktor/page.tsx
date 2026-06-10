import { SubpageHero } from "@/components/ui/SubpageHero";
import { CourseWithSignup } from "@/components/ui/CourseWithSignup";
import { Tag } from "@/components/ui/Tag";
import { Gallery } from "@/components/ui/Gallery";
import { getInstructorCourses, getCourseTypes } from "@/lib/data";
import Image from "next/image";
import type { Metadata } from "next";
import texts from "@/data/texts.json";
import { IMAGES } from "@/config/site";

const INSTRUKTOR_GALLERY = [
  { src: "/images/Galerie/chcibytinstruktor/jolcakurz.JPG", alt: "Instruktorský kurz" },
  { src: "/images/Galerie/chcibytinstruktor/Kurz_skupina_kotel.jpg", alt: "Skupina na kurzu" },
  { src: "/images/Galerie/chcibytinstruktor/Kurz_skupinovka_100lidi_kotel.JPG", alt: "Velká skupinovka kurzu" },
];

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: texts.meta.instruktor.title,
  description: texts.meta.instruktor.description,
};

export default async function InstruktorPage() {
  const [courses, courseTypes] = await Promise.all([
    getInstructorCourses(),
    getCourseTypes(),
  ]);
  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow={texts.instruktor.hero.eyebrow}
        title={texts.instruktor.hero.title}
        description={texts.instruktor.hero.description}
        imageSrc={IMAGES.kurz}
        imageAlt={texts.instruktor.hero.imageAlt}
        overlayClass="bg-gradient-to-t from-[rgb(8,10,6)]/55 to-[rgb(8,10,6)]/10"
        logoSrc={IMAGES.loga.sherpa}
        logoAlt="Sherpa Ski School"
        logoWidth={150}
        logoHeight={105}
        logoPaddingClass="pt-10 sm:pt-6"
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
              src={IMAGES.kurzdalsi}
              fill
              alt={texts.instruktor.intro.galleryAlt1}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              draggable={false}
            />
          </div>
          <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
            <Image
              src={IMAGES.kurzlokal}
              fill
              alt={texts.instruktor.intro.galleryAlt2}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* Přednášky psychologie */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Témata přednášek — vlevo */}
            <div>
              <span className="block text-[9px] uppercase tracking-[0.16em] text-accent mb-4">
                {texts.instruktor.psychology.topicsEyebrow}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {texts.instruktor.psychology.topics.map((item) => (
                  <div key={item.title} className="border border-line rounded-[3px] p-4 bg-cream">
                    <h3 className="text-[13px] font-medium mb-1">{item.title}</h3>
                    <p className="text-[11px] text-ink-secondary leading-[1.5]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Speciální program — vpravo */}
            <div>
              <span className="block text-[9px] uppercase tracking-[0.16em] text-accent mb-4">
                {texts.instruktor.psychology.eyebrow}
              </span>
              <h2 className="text-[24px] sm:text-[30px] font-normal tracking-[-0.02em] leading-[1.2] mb-4 text-ink">
                {texts.instruktor.psychology.title}
              </h2>
              {texts.instruktor.psychology.paragraphs.map((p, i) => (
                <p key={i} className="text-[13px] text-ink-secondary leading-[1.7] mb-3">{p}</p>
              ))}
              <p className="text-[11px] text-ink-muted mt-1 mb-8">
                {texts.instruktor.psychology.lecturerNote}
              </p>
              {/* Závodní freeride — stejný styl jako psychologie */}
              <div className="border-t border-line pt-8">
                <h2 className="text-[24px] sm:text-[30px] font-normal tracking-[-0.02em] leading-[1.2] mb-4 text-ink">
                  {texts.instruktor.psychology.freeride.title}
                </h2>
                {texts.instruktor.psychology.freeride.paragraphs.map((p, i) => (
                  <p key={i} className="text-[13px] text-ink-secondary leading-[1.7] mb-3">{p}</p>
                ))}
                <p className="text-[11px] text-ink-muted mt-1">
                  {texts.instruktor.psychology.freeride.lecturerNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Druhy kurzů */}
      {courseTypes.length > 0 && (
        <section className="py-16 px-7 bg-surface">
          <div className="max-w-[1280px] mx-auto">
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
              {texts.instruktor.courseTypes.eyebrow}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseTypes.map((c) => (
                <div key={c.id} className="border border-line rounded-[3px] p-6 bg-cream">
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
      )}

      <CourseWithSignup courses={courses} signupNote={texts.instruktor.signupNote} />

      {/* Co je v ceně */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
            {texts.instruktor.pricing.eyebrow}
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-10">
            {texts.instruktor.pricing.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Premium balíček */}
            <div className="border border-line rounded-[3px] p-6 bg-cream">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-[16px] font-medium">{texts.instruktor.pricing.packages[0].title}</h3>
                <span className="text-[20px] font-normal text-accent">{texts.instruktor.pricing.packages[0].price}</span>
              </div>
              <p className="text-[12px] text-ink-muted mb-5">
                {texts.instruktor.pricing.packages[0].note}
              </p>
              <ul className="space-y-2.5">
                {texts.instruktor.pricing.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-ink-secondary">
                    <span className="mt-1.5 w-[6px] h-[6px] rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Zvýhodněná cena */}
            <div className="border border-line rounded-[3px] p-6 bg-cream">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-[16px] font-medium">{texts.instruktor.pricing.packages[1].title}</h3>
                <span className="text-[20px] font-normal text-accent">{texts.instruktor.pricing.packages[1].price}</span>
              </div>
              <p className="text-[12px] text-ink-muted mb-5">
                {texts.instruktor.pricing.packages[1].note}
              </p>
              <ul className="space-y-2.5">
                {texts.instruktor.pricing.included.filter((item) => !item.toLowerCase().includes("ubytování")).map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13px] text-ink-secondary">
                    <span className="mt-1.5 w-[6px] h-[6px] rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Gallery images={INSTRUKTOR_GALLERY} eyebrow="Galerie" />

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
              href="tel:+420604220100"
              className="min-h-[44px] flex items-center text-[12px] text-white/60 hover:text-white/90 transition-colors"
            >
              {texts.instruktor.cta.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
