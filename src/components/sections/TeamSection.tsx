import { TeamCard } from "../ui/TeamCard";
import Link from "next/link";
import texts from "@/data/texts.json";

function yearsOfPractice(baseYears: number, baseDate: string): number {
  const [by, bm] = baseDate.split("-").map(Number);
  const now = new Date();
  const elapsedMonths = (now.getFullYear() - by) * 12 + (now.getMonth() + 1 - bm);
  return baseYears + Math.max(0, Math.floor(elapsedMonths / 12));
}

function buildBadges(person: { baseYears: number; baseDate: string; badges: string[] }): string[] {
  return [`${yearsOfPractice(person.baseYears, person.baseDate)} let praxe`, ...person.badges];
}

export function TeamSection() {
  return (
    <section className="py-20 px-7">
      <div className="max-w-[1280px] mx-auto">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-10">
          {texts.home.team.eyebrow}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <TeamCard
            name={texts.home.team.petr.name}
            roles={texts.home.team.petr.roles}
            badges={buildBadges(texts.home.team.petr)}
            imageSrc="/petr.jpg"
          />
          <TeamCard
            name={texts.home.team.jolana.name}
            roles={texts.home.team.jolana.roles}
            badges={buildBadges(texts.home.team.jolana)}
            imageSrc="/jolca.jpg"
          />
          <div className="border border-dashed border-line rounded-[3px] bg-surface/50 flex flex-col items-center justify-center p-8 text-center">
            <h3 className="text-[14px] font-normal tracking-[-0.01em] mb-2">
              {texts.home.team.teamCard.title}
            </h3>
            <p className="text-[11px] text-ink-muted leading-[1.6] mb-5">
              {texts.home.team.teamCard.description}
            </p>
            <Link
              href="/o-nas/tym"
              className="text-[10px] uppercase tracking-[0.14em] text-ink hover:text-ink-secondary transition-colors"
            >
              {texts.home.team.teamCard.link}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
