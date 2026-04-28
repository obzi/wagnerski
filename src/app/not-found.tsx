import Link from "next/link";
import texts from "@/data/texts.json";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-7 text-center">
      <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-4">
        {texts.notFound.code}
      </span>
      <h1 className="text-[36px] sm:text-[48px] font-normal tracking-[-0.03em] leading-[1.1] mb-4">
        {texts.notFound.title}
      </h1>
      <p className="text-[14px] text-ink-secondary leading-[1.6] mb-8 max-w-md">
        {texts.notFound.description}
      </p>
      <Link
        href="/"
        className="bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-6 py-3 rounded-[2px] hover:opacity-90 transition-opacity min-h-[44px] flex items-center"
      >
        {texts.notFound.cta}
      </Link>
    </div>
  );
}
