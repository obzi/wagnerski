import Image from "next/image";
import { SubpageHero } from "@/components/ui/SubpageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lokality | Wagner Ski Akademie",
  description:
    "Karlov pod Pradědem - hlavní středisko Wagner Ski Akademie v Jeseníkách. Skiaréna s kvalitním zasněžováním a ideálními podmínkami pro výuku.",
};

export default function LokalityPage() {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow="Lokality"
        title="Karlov pod Pradědem"
        imageSrc="/images/karlov.jpg"
        imageAlt="Karlov pod Pradědem - skiareál"
      />

      {/* Detail */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-12">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Hlavní středisko
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              Skiaréna Karlov
            </h2>
            <div className="space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
              <p>
                Karlov pod Pradědem je naše domovské středisko. Nachází se v srdci Jeseníků
                v nadmořské výšce 830–1 100 m n. m. Skiaréna nabízí moderní zasněžování,
                kvalitně upravené sjezdovky a ideální podmínky pro výuku lyžování
                i snowboardu.
              </p>
              <p>
                Středisko disponuje sjezdovkami různé obtížnosti — od mírných svahů
                ideálních pro začátečníky a děti, až po náročnější tratě pro pokročilé
                lyžaře. Celková délka sjezdovek přesahuje 4 km.
              </p>
              <p>
                Díky nadmořské výšce a severní expozici svahů patří Karlov k místům
                s nejdelší sezónou v České republice. Sezóna obvykle trvá od prosince
                do dubna.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
              <Image
                src="/images/jolcavyuka.jpeg"
                fill
                alt="Sjezdovky Karlov"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 44vw"
                draggable={false}
              />
            </div>

            <div className="border border-line rounded-[3px] p-6">
              <h3 className="text-[13px] font-medium tracking-[-0.01em] mb-4">
                Parametry střediska
              </h3>
              <dl className="space-y-3 text-[13px]">
                {[
                  ["Nadmořská výška", "830 – 1 100 m n. m."],
                  ["Sjezdovky", "4+ km, všechny obtížnosti"],
                  ["Zasněžování", "Moderní technické zasněžování"],
                  ["Sezóna", "Prosinec – Duben"],
                  ["Vleky", "Sedačková lanovka, kotvy, pomy"],
                  ["Region", "Jeseníky, Moravskoslezský kraj"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt className="text-ink-muted">{label}</dt>
                    <dd className="text-right font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Why Karlov */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Proč právě Karlov
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Ideální pro výuku",
                text: "Mírné svahy s dostatečným prostorem pro bezpečnou výuku začátečníků i dětí. Oddělená výuková zóna.",
              },
              {
                title: "Dlouhá sezóna",
                text: "Díky severní expozici a nadmořské výšce je sníh spolehlivý od prosince do dubna. Kvalitní zasněžování jako pojistka.",
              },
              {
                title: "Kompletní zázemí",
                text: "Půjčovna vybavení, restaurace, parkoviště. Vše na jednom místě, bez zbytečného přesunu.",
              },
              {
                title: "Sjezdovky pro všechny",
                text: "Od dětského svahu přes modré a červené sjezdovky až po náročnější tratě. Každý si najde své.",
              },
              {
                title: "Dostupnost",
                text: "Snadný příjezd z Olomouce (90 min), Ostravy (80 min) i Brna (2,5 hod). Dostatek parkovacích míst.",
              },
              {
                title: "Tradice od 2005",
                text: "Na Karlově učíme přes 20 let. Známe každý metr svahu a víme, kde se nejlépe učí.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-line rounded-[3px] p-6 bg-cream">
                <h3 className="text-[14px] font-medium tracking-[-0.01em] mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
