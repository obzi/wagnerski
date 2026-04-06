import { ProtectedImage } from "@/components/ui/ProtectedImage";
import { Tag } from "@/components/ui/Tag";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skicamp Alpy | WAGNER Ski and SNB akademie",
  description:
    "Zahraniční lyžařské a snowboardové campy v Alpách. Ski, SNB, race a telemark v alpském terénu pro pokročilé lyžaře.",
};

const camps = [
  {
    title: "Ski Camp",
    description:
      "Intenzivní lyžařský kemp v alpském středisku. Technická příprava, carving, jízda v terénu. Pro pokročilé lyžaře, kteří chtějí posun na další úroveň.",
    tags: ["Pokročilí", "Carving", "Technika", "Alpy"],
  },
  {
    title: "SNB Camp",
    description:
      "Snowboardový kemp zaměřený na freestyle, freeride a techniku jízdy. Alpský terén nabízí podmínky, které v ČR nenajdete.",
    tags: ["Snowboard", "Freestyle", "Freeride", "Alpy"],
  },
  {
    title: "Race Camp",
    description:
      "Závodní příprava v alpském terénu. Slalom, obří slalom, super-G. Trénink s profesionálními trenéry a video analýzou.",
    tags: ["Závodní příprava", "Slalom", "GS", "Video analýza"],
  },
  {
    title: "Telemark Camp",
    description:
      "Telemarkový kemp pro všechny úrovně. Klasická technika volné paty v podmínkách, kde telemark vznikl — v alpském terénu.",
    tags: ["Telemark", "Všechny úrovně", "Alpy"],
  },
];

const features = [
  {
    title: "Alpský terén",
    text: "Střediska s nadmořskou výškou přes 2 500 m. Garantovaný sníh, dlouhé sjezdovky a podmínky, které ČR nenabízí.",
  },
  {
    title: "Profesionální vedení",
    text: "Campy vedou výhradně instruktoři s licencí MŠMT a mezinárodními certifikacemi. Malé skupiny, individuální přístup.",
  },
  {
    title: "Video analýza",
    text: "Každý den video rozbor techniky. Vidíte svůj pokrok a přesně víte, na čem pracovat.",
  },
  {
    title: "Kompletní servis",
    text: "Doprava, ubytování, skipasy, pojištění. Stačí přijet a soustředit se na lyžování.",
  },
];

export default function SkicampPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden mt-[52px]">
        <ProtectedImage
          src="https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1600&q=85&fit=crop"
          fill
          alt="Skicamp v Alpách"
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
            Skicamp Alpy
          </span>
          <h1 className="text-[32px] sm:text-[48px] font-normal tracking-[-0.03em] leading-[1.1] text-white mb-3">
            Zahraniční campy v Alpách
          </h1>
          <p className="text-[14px] text-white/70 max-w-lg">
            Pro ty, kdo chtějí skutečný posun. Techniku vyladíme až na doraz.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              O campech
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              Kde se opravdu posunete
            </h2>
            <div className="space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
              <p>
                Skicamp Alpy je pro ty, kteří chtějí víc než domácí kopce.
                Organizujeme lyžařské, snowboardové, závodní i telemarkové kempy
                v alpských střediscích s garantovaným sněhem a kilometry sjezdovek.
              </p>
              <p>
                Každý camp vede tým zkušených instruktorů s licencí MŠMT
                a mezinárodními certifikacemi. Skupiny jsou malé, přístup individuální.
                Denní video rozbor techniky je samozřejmostí.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
            <ProtectedImage
              src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80&fit=crop"
              fill
              alt="Alpské hory"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Camp types */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Typy campu
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {camps.map((c) => (
              <div key={c.title} className="border border-line rounded-[3px] p-6 bg-cream">
                <h3 className="text-[18px] font-normal tracking-[-0.01em] mb-3">
                  {c.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.6] mb-4">
                  {c.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Proc jet s nami
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="border-l-2 border-accent pl-5 py-1">
                <h3 className="text-[14px] font-medium tracking-[-0.01em] mb-2">
                  {f.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-7 bg-ink text-white">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-4">
            Termíny připravujeme
          </h2>
          <p className="text-[14px] text-white/60 leading-[1.6] mb-8 max-w-md mx-auto">
            Sledujte naše stránky a sociální sítě. Termíny campů na další sezónu zveřejníme brzy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/rezervace"
              className="bg-white text-ink text-[10px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity"
            >
              Kontaktujte nás
            </Link>
            <a
              href="tel:+420604681100"
              className="text-[12px] text-white/60 hover:text-white/90 transition-colors"
            >
              +420 604 681 100
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
