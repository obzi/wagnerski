import Link from "next/link";
import { SubpageHero } from "@/components/ui/SubpageHero";
import texts from "@/data/texts.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: texts.meta.provozniRad.title,
  description: texts.meta.provozniRad.description,
};

export default function ProvozniRadPage() {
  return (
    <>
      <SubpageHero
        eyebrow={texts.provozniRad.hero.eyebrow}
        title={texts.provozniRad.hero.title}
        imageSrc="/images/skola-uvod.jpg"
        imageAlt={texts.provozniRad.hero.imageAlt}
        imagePositionClass="object-center"
      />

      <section className="py-16 px-7">
        <div className="max-w-[800px] mx-auto space-y-10">
          {texts.provozniRad.articles.map((article) => (
            <div key={article.number}>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-[11px] uppercase tracking-[0.14em] text-ink-muted font-medium">
                  Článek {article.number}
                </span>
                <h2 className="text-[18px] font-medium tracking-[-0.01em]">
                  {article.title}
                </h2>
              </div>
              <p className="text-[14px] text-ink-secondary leading-[1.7]">
                {article.text}
                {article.number === "IV" && (
                  <>
                    {" "}
                    <Link
                      href="/pravidla-fis"
                      className="underline underline-offset-2 hover:text-ink transition-colors"
                    >
                      Zobrazit pravidla FIS →
                    </Link>
                  </>
                )}
                {article.number === "IX" && (
                  <>
                    {" "}
                    <Link
                      href="/gdpr"
                      className="underline underline-offset-2 hover:text-ink transition-colors"
                    >
                      Zobrazit GDPR →
                    </Link>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
