import type { Metadata } from "next";
import texts from "@/data/texts.json";

export const metadata: Metadata = {
  title: texts.meta.leto.title,
  description: texts.meta.leto.description,
};

export default function FarmaPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-7 text-center">
      <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-4">
        {texts.leto.eyebrow}
      </span>
      <h1 className="text-[36px] sm:text-[48px] font-normal tracking-[-0.03em] leading-[1.1] mb-4">
        {texts.leto.title}
      </h1>
      <p className="text-[14px] text-ink-secondary leading-[1.6] max-w-md">
        {texts.leto.description}
      </p>
    </section>
  );
}
