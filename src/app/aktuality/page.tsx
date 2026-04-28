import type { Metadata } from "next";
import { getNews } from "@/lib/data";
import { SubpageHero } from "@/components/ui/SubpageHero";
import texts from "@/data/texts.json";

export const metadata: Metadata = {
  title: texts.meta.aktuality.title,
  description: texts.meta.aktuality.description,
};

export const revalidate = 60;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AktualityPage() {
  const news = await getNews();
  const [featured, ...rest] = news;

  return (
    <>
      <SubpageHero
        eyebrow={texts.aktuality.hero.eyebrow}
        title={texts.aktuality.hero.title}
        imageSrc="/images/tym.jpeg"
        imageAlt={texts.aktuality.hero.imageAlt}
        logoSrc="/images/loga/wagner.svg"
        logoAlt="Wagner Ski Akademie"
        logoWidth={156}
        logoHeight={52}
      />

      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto">

        {!featured ? (
          <p className="text-[14px] text-ink-secondary leading-[1.6]">
            {texts.aktuality.empty}
          </p>
        ) : (
          <div className="space-y-10">
            {/* Featured / latest */}
            <article className="border border-accent/30 bg-surface rounded-[3px] p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block bg-accent/15 text-accent text-[10px] uppercase tracking-[0.12em] font-medium px-3 py-1 rounded-[2px]">
                  {texts.aktuality.badge}
                </span>
                <time className="text-[11px] uppercase tracking-[0.1em] text-ink-muted">
                  {formatDate(featured.published_at)}
                </time>
              </div>
              <h2 className="text-[22px] sm:text-[28px] font-normal tracking-[-0.02em] leading-[1.3] mb-4">
                {featured.title}
              </h2>
              <p className="text-[15px] text-ink-secondary leading-[1.7] whitespace-pre-line">
                {featured.body}
              </p>
            </article>

            {/* Remaining items */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {rest.map((item) => (
                  <article
                    key={item.id}
                    className="border border-line rounded-[3px] p-6 bg-cream hover:border-accent/30 transition-colors"
                  >
                    <time className="block text-[10px] uppercase tracking-[0.1em] text-ink-muted mb-3">
                      {formatDate(item.published_at)}
                    </time>
                    <h2 className="text-[17px] font-normal tracking-[-0.01em] leading-[1.3] mb-3">
                      {item.title}
                    </h2>
                    <p className="text-[13px] text-ink-secondary leading-[1.7] whitespace-pre-line">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
    </>
  );
}
