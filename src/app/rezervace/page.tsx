import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rezervace | WAGNER Ski and SNB akademie",
  description:
    "Rezervujte si hodinu lyžování nebo snowboardu. Ceník individuální a skupinové výuky. Kontakty na Sherpa Ski School.",
};

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const individualPrices = [
  { service: "1 hodina (50 min)", price: "1 190 Kč", note: "další osoba +790 Kč" },
  { service: "2 hodiny", price: "2 300 Kč", note: "další osoba +1 100 Kč", highlight: true },
  { service: "4 hodiny", price: "4 700 Kč", note: "další osoba +1 600 Kč" },
  { service: "Večerní lekce (18–20h)", price: "2 600 Kč", note: "další osoba +1 100 Kč" },
];

const specialPrices = [
  { service: "Dětská bezpečná zóna (do 4 let)", price: "1 090 Kč / hod" },
  { service: "Carving (pátek)", price: "3 300 Kč", note: "další osoba +1 700 Kč" },
  { service: "Obří slalom s trenérem", price: "1 900 Kč / hod" },
  { service: "Video coaching (2 hod)", price: "6 700 Kč" },
];

const groupPrices = [
  { service: "Skupinová lekce 2 hodiny (min. 3 osoby)", price: "1 100 Kč / os.", note: "Po, St, Čt 14:00–16:00" },
];

export default function RezervacePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-ink text-white pt-[80px] pb-12 px-7">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[10px] uppercase tracking-[0.16em] text-white/50 mb-4">
            Rezervace
          </span>
          <h1 className="text-[32px] sm:text-[48px] font-normal tracking-[-0.03em] leading-[1.1] mb-4">
            Rezervujte si hodinu
          </h1>
          <p className="text-[14px] text-white/60 max-w-lg leading-[1.6]">
            Zavolejte nám nebo napište. Domluvíme termín, instruktora i disciplínu přesně podle vašich potřeb.
          </p>
        </div>
      </section>

      {/* Contact + Voucher */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contacts */}
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Kontakt
            </span>
            <div className="space-y-5">
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-1">Telefon</span>
                <a href="tel:+420604681100" className="text-[18px] font-medium hover:text-accent transition-colors">
                  +420 604 681 100
                </a>
              </div>
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-1">E-mail</span>
                <a href="mailto:sherpaski@sherpaski.cz" className="text-[16px] hover:text-accent transition-colors">
                  sherpaski@sherpaski.cz
                </a>
              </div>
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-1">Adresa</span>
                <p className="text-[14px] text-ink-secondary">
                  Skiaréna Karlov pod Pradědem<br />
                  793 26 Karlov pod Pradědem
                </p>
              </div>
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-3">Sociální sítě</span>
                <div className="flex items-center gap-4">
                  <Link
                    href="https://www.facebook.com/Sherpaski.cz"
                    className="flex items-center gap-2 text-ink-secondary hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon />
                    <span className="text-[13px]">Sherpaski.cz</span>
                  </Link>
                  <Link
                    href="https://www.instagram.com/terapielyzovanim/"
                    className="flex items-center gap-2 text-ink-secondary hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon />
                    <span className="text-[13px]">@terapielyzovanim</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Voucher */}
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Online rezervace
            </span>
            <div className="border border-line rounded-[3px] p-8 bg-surface text-center">
              <h2 className="text-[20px] font-normal tracking-[-0.01em] mb-3">
                Koupit hodinu přes voucher
              </h2>
              <p className="text-[13px] text-ink-secondary leading-[1.6] mb-6">
                Zakupte si vouchery na výuku online. Ideální i jako dárek.
              </p>
              <button
                disabled
                className="bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-8 py-[12px] rounded-[2px] opacity-50 cursor-not-allowed"
              >
                Připravujeme
              </button>
              <p className="text-[11px] text-ink-muted mt-3">
                Online prodej voucherů bude brzy k dispozici.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Ceník výuky
          </span>
          <p className="text-[12px] text-ink-muted mb-8">
            Skipas je zahrnut ve všech cenách. Jedna vyučovací hodina = 50 minut.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Individual */}
            <div>
              <h3 className="text-[16px] font-medium tracking-[-0.01em] mb-4">
                Individuální výuka (1–2 osoby)
              </h3>
              <div className="border border-line rounded-[3px] bg-cream overflow-hidden">
                {individualPrices.map((p, i) => (
                  <div
                    key={p.service}
                    className={`px-5 py-4 flex items-center justify-between gap-4 ${
                      i < individualPrices.length - 1 ? "border-b border-line" : ""
                    } ${p.highlight ? "bg-accent/5" : ""}`}
                  >
                    <div>
                      <span className="block text-[13px]">{p.service}</span>
                      {p.note && <span className="block text-[11px] text-ink-muted mt-0.5">{p.note}</span>}
                    </div>
                    <span className={`text-[15px] font-medium shrink-0 ${p.highlight ? "text-accent" : ""}`}>
                      {p.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group */}
            <div>
              <h3 className="text-[16px] font-medium tracking-[-0.01em] mb-4">
                Skupinová výuka (3+ osob)
              </h3>
              <div className="border border-line rounded-[3px] bg-cream overflow-hidden mb-8">
                {groupPrices.map((p) => (
                  <div key={p.service} className="px-5 py-4 flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[13px]">{p.service}</span>
                      {p.note && <span className="block text-[11px] text-ink-muted mt-0.5">{p.note}</span>}
                    </div>
                    <span className="text-[15px] font-medium shrink-0">{p.price}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-[16px] font-medium tracking-[-0.01em] mb-4">
                Speciální programy
              </h3>
              <div className="border border-line rounded-[3px] bg-cream overflow-hidden">
                {specialPrices.map((p, i) => (
                  <div
                    key={p.service}
                    className={`px-5 py-4 flex items-center justify-between gap-4 ${
                      i < specialPrices.length - 1 ? "border-b border-line" : ""
                    }`}
                  >
                    <div>
                      <span className="block text-[13px]">{p.service}</span>
                      {p.note && <span className="block text-[11px] text-ink-muted mt-0.5">{p.note}</span>}
                    </div>
                    <span className="text-[15px] font-medium shrink-0">{p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
