import { TeamCard } from "../ui/TeamCard";
import Link from "next/link";

export function TeamSection() {
  return (
    <section className="py-20 px-7">
      <div className="max-w-[1280px] mx-auto">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-10">
          Kdo vás bude učit
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <TeamCard
            name="Petr Wagner"
            roles="Učitel lyžování · IVSI instruktor · Trenér III. tř. · Autorizovaná osoba MŠMT ČR"
            badges={["26 let praxe", "Lic. 74-040-M"]}
            imageSrc="/petr.jpg"
          />
          <TeamCard
            name="Jolana Wagnerová"
            roles="Učitel lyžování · Cvičitel SNB · Lektor carvingu · Terapie lyžováním"
            badges={["18 let praxe", "Dechové metody"]}
            imageSrc="/jolca.jpg"
          />
          <div className="border border-dashed border-line rounded-[3px] bg-surface/50 flex flex-col items-center justify-center p-8 text-center">
            <h3 className="text-[14px] font-normal tracking-[-0.01em] mb-2">
              Náš tým instruktorů
            </h3>
            <p className="text-[11px] text-ink-muted leading-[1.6] mb-5">
              Všichni akreditovaní. Všichni prověření praxí.
            </p>
            <Link
              href="/o-nas/tym"
              className="text-[10px] uppercase tracking-[0.14em] text-ink hover:text-ink-secondary transition-colors"
            >
              Poznat tým →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
