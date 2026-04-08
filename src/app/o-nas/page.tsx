import { SubpageHero } from "@/components/ui/SubpageHero";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nás | Wagner Ski Akademie",
  description:
    "Wagner Ski Akademie - lyžařská akademie od roku 2005. Sherpa Ski School, Skicamp Alpy, kurzy MŠMT. Petr a Jolana Wagnerovi.",
};

const milestones = [
  { year: "1999", text: "Založení Sherpa Ski School" },
  { year: "2005", text: "Vznik Wagner Ski Akademie" },
  { year: "2010", text: "První Skicamp v Alpách" },
  { year: "2024", text: "Přes 2 229 vyškolených instruktorů" },
];

const values = [
  {
    title: "Kvalita před kvantitou",
    text: "Žádní pomocníci. Žádní brigádníci. Každý náš instruktor má platnou licenci MŠMT ČR a prošel naším interním prověřením.",
  },
  {
    title: "Poctivá výuka",
    text: "Učíme správně od prvního oblouku. Moderní metodika, individuální přístup a důraz na bezpečnost. Žádné zkratky.",
  },
  {
    title: "Tradice a zkušenost",
    text: "Přes 25 let na svahu. Známe každý metr Karlova, víme jak učit děti, dospělé i budoucí instruktory.",
  },
  {
    title: "Vášeň pro hory",
    text: "Lyžování není jen sport — je to způsob života. Tu vášeň předáváme každému, kdo k nám přijde.",
  },
];

export default function ONasPage() {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow="O nás"
        title="Wagner Ski Akademie"
        imageSrc="/images/uvodonas.jpg.jpeg"
        imagePositionClass="object-right sm:object-center"
        imageAlt="Wagner Ski Akademie tým"
      />

      {/* Story */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Náš příběh
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              Od jedné lyžařské školy k akademii
            </h2>
            <div className="space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
              <p>
                Všechno začalo v roce 1999, kdy Petr Wagner založil Sherpa Ski School
                na Karlově pod Pradědem. Co začalo jako malá lyžařská škola, vyrostlo
                ve Wagner Ski Akademii — zastřešující organizaci, která dnes sdružuje
                lyžařskou školu Sherpa, zahraniční kempy Skicamp a akreditované
                instruktorské kurzy.
              </p>
              <p>
                Naším cílem vždy bylo a je učit lyžování pořádně. S kvalitními instruktory,
                moderní metodikou a upřímnou vášní pro hory. Za více než 25 let jsme
                naučili lyžovat tisíce lidí a vyškolili přes 2 200 instruktorů.
              </p>
              <p>
                Dnes působíme primárně na Karlově pod Pradědem v Jeseníkách. Naši
                instruktoři jsou výhradně držitelé licence MŠMT ČR — na tom nikdy
                nebudeme dělat kompromisy.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
            <Image
              src="/images/petrajolca.jpg"
              fill
              alt="Lyžování v horách"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Milníky
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m) => (
              <div key={m.year} className="border-l-2 border-accent pl-5 py-1">
                <span className="block text-[24px] font-normal tracking-[-0.02em] text-accent mb-1">
                  {m.year}
                </span>
                <p className="text-[13px] text-ink-secondary leading-[1.5]">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Vedení
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6 items-start">
              <div className="relative w-[120px] h-[120px] rounded-[3px] overflow-hidden shrink-0">
                <Image
                  src="/petr.jpg"
                  fill
                  alt="Petr Wagner"
                  className="object-cover"
                  sizes="120px"
                  draggable={false}
                />
              </div>
              <div>
                <h3 className="text-[18px] font-normal tracking-[-0.01em] mb-1">
                  Ing. Petr Wagner
                </h3>
                <p className="text-[11px] text-ink-muted mb-3">
                  Zakladatel · IVSI Card Gold · Trenér III. tř. · Autorizovaná osoba MŠMT ČR
                </p>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  Více než 26 let praxe ve výuce lyžování. Profesionální instruktor,
                  trenér a školitel. Licence MŠMT 74-040-M. Vede instruktorské kurzy
                  a zodpovídá za kvalitu výuky v celé akademii.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="relative w-[120px] h-[120px] rounded-[3px] overflow-hidden shrink-0">
                <Image
                  src="/jolca.jpg"
                  fill
                  alt="Jolana Wagnerová"
                  className="object-cover"
                  sizes="120px"
                  draggable={false}
                />
              </div>
              <div>
                <h3 className="text-[18px] font-normal tracking-[-0.01em] mb-1">
                  Jolana Wagnerová
                </h3>
                <p className="text-[11px] text-ink-muted mb-3">
                  Učitel lyžování · Cvičitel SNB · Lektor carvingu · Terapie lyžováním
                </p>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  18 let praxe ve výuce. Specializuje se na dechové metody a terapii
                  lyžováním. Lektorka carvingu a snowboardu. Vede dětské programy
                  a individuální výuku.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Naše hodnoty
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="border border-line rounded-[3px] p-6 bg-cream">
                <h3 className="text-[14px] font-medium tracking-[-0.01em] mb-2">
                  {v.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Co děláme
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/skola" className="group border border-line rounded-[3px] p-6 hover:border-accent transition-colors">
              <h3 className="text-[16px] font-normal tracking-[-0.01em] mb-2 group-hover:text-accent transition-colors">
                Sherpa Ski School
              </h3>
              <p className="text-[13px] text-ink-secondary leading-[1.6]">
                Lyžařská a snowboardová škola na Karlově. Výuka pro děti i dospělé.
              </p>
            </Link>
            <Link href="/skicamp" className="group border border-line rounded-[3px] p-6 hover:border-accent transition-colors">
              <h3 className="text-[16px] font-normal tracking-[-0.01em] mb-2 group-hover:text-accent transition-colors">
                Skicamp Alpy
              </h3>
              <p className="text-[13px] text-ink-secondary leading-[1.6]">
                Zahraniční lyžařské a snowboardové kempy v alpském terénu.
              </p>
            </Link>
            <Link href="/instruktor" className="group border border-line rounded-[3px] p-6 hover:border-accent transition-colors">
              <h3 className="text-[16px] font-normal tracking-[-0.01em] mb-2 group-hover:text-accent transition-colors">
                Instruktorské kurzy
              </h3>
              <p className="text-[13px] text-ink-secondary leading-[1.6]">
                Akreditované kurzy MŠMT s celoživotní licencí.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-7 bg-ink text-white">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-4">
            Ozvěte se nám
          </h2>
          <p className="text-[14px] text-white/60 leading-[1.6] mb-8 max-w-md mx-auto">
            Máte dotaz ohledně výuky, kurzů nebo kempů? Rádi vám poradíme.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="tel:+420604681100"
              className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-white transition-colors"
            >
              +420 604 681 100
            </a>
            <a
              href="mailto:sherpaski@sherpaski.cz"
              className="min-h-[44px] flex items-center text-[14px] text-white/80 hover:text-white transition-colors"
            >
              sherpaski@sherpaski.cz
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
