import type { Metadata } from "next";
import { getNews } from "@/lib/data";

export const metadata: Metadata = {
  title: "Aktuality | Wagner Ski Akademie",
  description: "Aktuality a novinky z Wagner Ski Akademie.",
};

export const revalidate = 60;

export default async function AktualityPage() {
  const news = await getNews(5);

  return (
    <section className="py-16 px-7">
      <div className="max-w-[720px] mx-auto">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
          Aktuality
        </span>
        <h1 className="text-[32px] sm:text-[48px] font-normal tracking-[-0.03em] leading-[1.1] mb-10">
          Novinky
        </h1>

        {news.length === 0 ? (
          <p className="text-[14px] text-ink-secondary leading-[1.6]">
            Zatím nejsou žádné aktuality.
          </p>
        ) : (
          <div className="space-y-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="border-l-2 border-accent pl-6 py-1"
              >
                <time className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-2">
                  {new Date(item.published_at).toLocaleDateString("cs-CZ", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h2 className="text-[18px] sm:text-[22px] font-normal tracking-[-0.01em] leading-[1.3] mb-2">
                  {item.title}
                </h2>
                <p className="text-[14px] text-ink-secondary leading-[1.7] whitespace-pre-line">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
