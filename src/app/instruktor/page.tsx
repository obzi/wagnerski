import { SubpageHero } from "@/components/ui/SubpageHero";
import { CourseWithSignup } from "@/components/ui/CourseWithSignup";
import { Tag } from "@/components/ui/Tag";
import { getInstructorCourses, getCourseTypes } from "@/lib/data";
import Image from "next/image";
import type { Metadata } from "next";
import texts from "@/data/texts.json";

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
        imageSrc="/images/kurz.jpg"
        imageAlt={texts.instruktor.hero.imageAlt}
        logoSrc="/images/loga/sherpa.svg"
        logoAlt="Sherpa Ski School"
        logoWidth={150}
        logoHeight={105}
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

      {/* Přednášky psychologie */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-accent mb-6">
              Speciální program
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6 text-ink">
              Psychologie dítěte na svahu
            </h2>
            <p className="text-[14px] text-ink-secondary leading-[1.7] mb-4">
              Součástí vzdělávání instruktorů jsou přednášky Mgr. Lucie Sedláčkové zaměřené na psychologii dětí při výuce lyžování. Pochopení toho, jak dítě vnímá výzvu, neúspěch a motivaci, je stejně důležité jako technická dovednost instruktora.
            </p>
            <p className="text-[14px] text-ink-secondary leading-[1.7]">
              Přednášky jsou součástí kurzu a probíhají formou interaktivního workshopu. Instruktorům pomáhají lépe číst situaci na svahu a přizpůsobit přístup věku, temperamentu a aktuálnímu rozpoložení dítěte.
            </p>
          </div>
          <div className="space-y-4">
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Témata přednášek
            </span>
            {[
              { title: "Vývojová psychologie", text: "Jak dítě v různém věku vnímá výkon, riziko a sociální srovnávání — a co to znamená pro styl výuky." },
              { title: "Motivace a ztráta motivace", text: "Proč dítě najednou nechce lyžovat a jak situaci citlivě řešit bez tlaku a negativních emocí." },
              { title: "Stres a zvládání strachu", text: "Jak rozpoznat úzkost z výšky, rychlosti nebo pádu a jak dítěti pomoci strach překonat vlastním tempem." },
              { title: "Komunikace a pochvala", text: "Efektivní způsoby zpětné vazby — jaká pochvala skutečně funguje a jak kritiku formulovat konstruktivně." },
            ].map((item) => (
              <div key={item.title} className="border border-line rounded-[3px] p-5 bg-cream">
                <h3 className="text-[14px] font-medium mb-1">{item.title}</h3>
                <p className="text-[12px] text-ink-secondary leading-[1.6]">{item.text}</p>
              </div>
            ))}
            <p className="text-[11px] text-ink-muted pt-2">
              Přednášky: Mgr. Lucie Sedláčková, psycholožka se zaměřením na sport a vzdělávání dětí
            </p>
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
