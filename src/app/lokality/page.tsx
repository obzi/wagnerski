import { ProtectedImage } from "@/components/ui/ProtectedImage";
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
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden mt-[52px]">
        <ProtectedImage
          src="https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1600&q=85&fit=crop"
          fill
          alt="Karlov pod Pradědem - skiareál"
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(8,10,6,0.8) 0%, rgba(8,10,6,0.3) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col justify-end px-7 sm:px-9 pb-10 max-w-[1280px] mx-auto">
          <span className="text-[10px] uppercase tracking-[0.16em] text-white/70 mb-3">
            Lokality
          </span>
          <h1 className="text-[32px] sm:text-[48px] font-normal tracking-[-0.03em] leading-[1.1] text-white">
            Karlov pod Pradědem
          </h1>
        </div>
      </section>

      {/* Detail */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-12">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Hlavni stredisko
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
              <ProtectedImage
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80&fit=crop"
                fill
                alt="Sjezdovky Karlov"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 44vw"
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
            Proc prave Karlov
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
