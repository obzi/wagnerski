import { SubpageHero } from "@/components/ui/SubpageHero";
import { Tag } from "@/components/ui/Tag";
import { instructorIncluded } from "@/data/pricing";
import { getInstructorCourses } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kurzy pro instruktory | Wagner Ski Akademie",
  description:
    "Akreditované kurzy MŠMT ČR pro instruktory lyžování a snowboardu. Kurz D (60 hod), Kurz C (70-100 hod), prolongace. Celoživotní licence.",
};

export default async function InstruktorPage() {
  const courses = await getInstructorCourses();
  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow="Chci být instruktor"
        title="Kurzy MŠMT s celoživotní licencí"
        description="Akreditované kurzy pro instruktory lyžování a snowboardu. Školíme sami, od základů."
        imageSrc="/images/kurz.jpg"
        imageAlt="Instruktorský kurz lyžování"
      />

      {/* Intro */}
      <section className="py-16 px-7">
        <div className="max-w-3xl mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
            O kurzech
          </span>
          <div className="space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
            <p>
              Pořádáme jedny z nejrespektovanějších instruktorských kurzů v České republice.
              Za více než 26 let jsme vyškolili přes 2 229 instruktorů, kteří dnes učí
              v lyžařských školách po celé ČR i v zahraničí. Náš akreditovaný kurz instruktora
              základů lyžování a snowboardingu typu D má schválení MŠMT ČR a platnost
              celoživotní — jednou získaná licence vám zůstává napořád.
            </p>
            <p>
              Kurzy vedou zkušení školitelé v čele s Ing. Petrem Wagnerem — držitelem
              IVSI Card Gold, profesionálním instruktorem a trenérem. Metodika je postavená
              na dvou desítkách let praxe přímo na svahu: učíme rozpoznávat chyby, pracovat
              s různými typy klientů a zvládat skupinu. Nejen techniku, ale i pedagogiku,
              psychologii a komunikaci.
            </p>
            <p>
              Kromě výuky na sněhu vás čekají přednášky o bezpečnosti na horách, biomechanice
              pohybu a materiálovém poradenství. Součástí programu bývají i speciální hosté —
              členové horské služby nebo účastníci Freeride World Tour. Kurz je náročný,
              ale jeho investice se vám vrátí během několika málo dnů aktivní výuky.
            </p>
            <p>
              S licencí od nás můžete učit v lyžařských školách po celé ČR, na školních
              kurzech středních i vysokých škol a také na Slovensku. Úspěšní absolventi
              pokračují na navazující kurz C nebo získávají mezinárodní certifikaci IVSI.
              Celosezónním zaměstnancům Sherpa Ski School vracíme plné kurzovné — bereme to
              jako dlouhodobé partnerství, ne jako jednorázový obchod.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-8 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
            <Image
              src="/images/kurzdalsi.jpg"
              fill
              alt="Výuka na instruktorském kurzu"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              draggable={false}
            />
          </div>
          <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
            <Image
              src="/images/kurzlokal.jpg"
              fill
              alt="Lokalita instruktorského kurzu"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Nabídka kurzů
          </span>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="border border-line rounded-[3px] bg-cream p-6 flex flex-col"
                >
                  <span className="text-[10px] uppercase tracking-[0.14em] text-accent font-medium mb-2">
                    {c.hours}
                  </span>
                  <h3 className="text-[20px] font-normal tracking-[-0.01em] mb-1">
                    {c.level}
                  </h3>
                  <p className="text-[12px] text-ink-muted mb-4">{c.subtitle}</p>
                  <p className="text-[13px] text-ink-secondary leading-[1.6] mb-4 flex-1">
                    {c.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {c.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <div className="border-t border-line pt-4 mt-auto space-y-1.5">
                    <div className="flex justify-between text-[12px]">
                      <span className="text-ink-muted">Termín</span>
                      <span className="font-medium">{c.date}</span>
                    </div>
                    <div className="flex justify-between text-[12px]">
                      <span className="text-ink-muted">Místo</span>
                      <span className="font-medium">{c.location}</span>
                    </div>
                  </div>
                  {(c.price_with_accommodation > 0 || c.price_without_accommodation > 0) && (
                    <div className="border-t border-line pt-3 mt-3 space-y-1.5">
                      {c.price_with_accommodation > 0 && (
                        <div className="flex justify-between text-[12px]">
                          <span className="text-ink-muted">S ubytováním</span>
                          <span className="font-medium text-accent">
                            {c.price_with_accommodation.toLocaleString("cs-CZ")} Kč
                          </span>
                        </div>
                      )}
                      {c.price_without_accommodation > 0 && (
                        <div className="flex justify-between text-[12px]">
                          <span className="text-ink-muted">Bez ubytování</span>
                          <span className="font-medium">
                            {c.price_without_accommodation.toLocaleString("cs-CZ")} Kč
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-ink-secondary">Termíny kurzů budou zveřejněny brzy.</p>
          )}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Ceník
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              All-inclusive cena
            </h2>
            <div className="space-y-4">
              <div className="border border-line rounded-[3px] p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-[16px] font-medium">Premium balíček</h3>
                  <span className="text-[20px] font-normal text-accent">16 900 Kč</span>
                </div>
                <p className="text-[12px] text-ink-muted mb-3">
                  Při platbě do 10. 12. — jinak 22 900 Kč na místě
                </p>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  Zahrnuje ubytování, polopenzi, skipasy, materiály, přednášky
                  a celoživotní certifikaci.
                </p>
              </div>
              <div className="border border-line rounded-[3px] p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-[16px] font-medium">Bez ubytování</h3>
                  <span className="text-[20px] font-normal text-accent">7 200 Kč</span>
                </div>
                <p className="text-[12px] text-ink-muted mb-3">
                  Pro ty, kteří si zajistí ubytování sami
                </p>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  Plná výuka, materiály a certifikace. Plná refundace při
                  celosezónním zaměstnání.
                </p>
              </div>
            </div>
          </div>

          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Co je v ceně
            </span>
            <ul className="space-y-3">
              {instructorIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13px] text-ink-secondary">
                  <span className="mt-1.5 w-[6px] h-[6px] rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-7 bg-ink text-white">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-4">
            Staň se instruktorem
          </h2>
          <p className="text-[14px] text-white/60 leading-[1.6] mb-8 max-w-md mx-auto">
            Přihlas se na kurz a získej celoživotní licenci. Každá dobrá lyžařská škola tě zaměstná.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/instruktor/prihlaska"
              className="min-h-[44px] flex items-center bg-white text-ink text-[10px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity"
            >
              Přihláška na kurz
            </Link>
            <a
              href="mailto:sherpaski@sherpaski.cz"
              className="min-h-[44px] flex items-center text-[12px] text-white/60 hover:text-white/90 transition-colors"
            >
              sherpaski@sherpaski.cz
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
