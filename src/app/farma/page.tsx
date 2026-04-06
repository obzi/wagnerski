import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farma | WAGNER Ski and SNB akademie",
  description:
    "Farma Wagner Ski Akademie — připravujeme pro vás nový projekt.",
};

export default function FarmaPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-7 text-center">
      <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-4">
        Farma
      </span>
      <h1 className="text-[36px] sm:text-[48px] font-normal tracking-[-0.03em] leading-[1.1] mb-4">
        Připravujeme
      </h1>
      <p className="text-[14px] text-ink-secondary leading-[1.6] max-w-md">
        Nový projekt, na kterém právě pracujeme. Více informací brzy.
      </p>
    </section>
  );
}
