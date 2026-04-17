# Wagnerski Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update branding, navigation, content across multiple pages; add course signup form with Resend email; build voucher purchase system with PDF generation and Supabase storage.

**Architecture:** Next.js 16 app router with Supabase backend. New API routes for course signup and voucher purchase/generation. Resend for transactional emails. @react-pdf/renderer for voucher PDFs. nanoid for unique voucher codes.

**Tech Stack:** Next.js 16, React 19, Tailwind 4, Supabase, Resend, @react-pdf/renderer, nanoid

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install resend, nanoid, and @react-pdf/renderer**

```bash
npm install resend nanoid @react-pdf/renderer
```

- [ ] **Step 2: Verify installation**

```bash
npm ls resend nanoid @react-pdf/renderer
```

Expected: all three packages listed without errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add resend, nanoid, @react-pdf/renderer dependencies"
```

---

### Task 2: Update Navbar branding and links

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Update logo text and navigation links**

In `src/components/layout/Navbar.tsx`:

Change the `links` array (line 6-13) to:

```tsx
const links = [
  { href: "/aktuality", label: "Aktuality" },
  { href: "/lokality", label: "Lokality" },
  { href: "/skola", label: "Škola" },
  { href: "/skicamp", label: "Skicamp" },
  { href: "/instruktor", label: "Instruktor" },
  { href: "/leto", label: "Léto" },
  { href: "/o-nas", label: "O nás" },
];
```

Change the logo Link content (lines 32-39) to:

```tsx
<Link href="/" className="flex flex-col">
  <span className="text-[11px] uppercase tracking-[0.2em] text-ink font-normal">
    Wagner
  </span>
  <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted">
    ski akademie · sherpaski · skicamp.cz · instruktor
  </span>
</Link>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: update navbar branding to Wagner + new subtitle, add Aktuality, rename Farma to Léto"
```

---

### Task 3: Create Aktuality placeholder page

**Files:**
- Create: `src/app/aktuality/page.tsx`

- [ ] **Step 1: Create the placeholder page**

Create `src/app/aktuality/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aktuality | Wagner Ski Akademie",
  description: "Aktuality a novinky z Wagner Ski Akademie.",
};

export default function AktualityPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-7 text-center">
      <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-4">
        Aktuality
      </span>
      <h1 className="text-[36px] sm:text-[48px] font-normal tracking-[-0.03em] leading-[1.1] mb-4">
        Připravujeme
      </h1>
      <p className="text-[14px] text-ink-secondary leading-[1.6] max-w-md">
        Novinky a aktuality budou brzy k dispozici.
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/aktuality/page.tsx
git commit -m "feat: add Aktuality placeholder page"
```

---

### Task 4: Rename Farma to Léto

**Files:**
- Rename: `src/app/farma/` → `src/app/leto/`
- Modify: `src/app/leto/page.tsx` (update metadata)
- Modify: `src/app/sitemap.ts` (update references)

- [ ] **Step 1: Move farma directory to leto**

```bash
git mv src/app/farma src/app/leto
```

- [ ] **Step 2: Update page metadata**

In `src/app/leto/page.tsx`, update the entire file to:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Léto | Wagner Ski Akademie",
  description: "Letní aktivity Wagner Ski Akademie — připravujeme pro vás nový projekt.",
};

export default function LetoPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-7 text-center">
      <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-4">
        Léto
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
```

- [ ] **Step 3: Update sitemap if it references /farma**

Check `src/app/sitemap.ts` and replace any `/farma` references with `/leto`. Add `/aktuality` to the sitemap.

- [ ] **Step 4: Commit**

```bash
git add src/app/leto/ src/app/sitemap.ts
git commit -m "feat: rename Farma to Léto, update sitemap"
```

---

### Task 5: Update Lokality page

**Files:**
- Modify: `src/app/lokality/page.tsx`

- [ ] **Step 1: Update main section heading and add second section**

Replace the entire content of `src/app/lokality/page.tsx` with:

```tsx
import Image from "next/image";
import { SubpageHero } from "@/components/ui/SubpageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lokality | Wagner Ski Akademie",
  description:
    "Sherpaski - Ski aréna Karlov pod Pradědem a Ski akademie v Jeseníkách. Hlavní střediska Wagner Ski Akademie.",
};

export default function LokalityPage() {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow="Lokality"
        title="Kde nás najdete"
        imageSrc="/images/karlov.jpg"
        imageAlt="Karlov pod Pradědem - skiareál"
      />

      {/* Section 1: Sherpaski - Ski aréna Karlov */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[5fr_4fr] gap-12">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Hlavní středisko
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              Sherpaski — Ski aréna Karlov pod Pradědem
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

      {/* Section 2: Ski akademie - Jeseníky */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
            Výuka kdekoliv v Jeseníkách
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
            Ski akademie — Jeseníky
          </h2>
          <div className="max-w-2xl space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
            <p>
              Služby Wagner Ski Akademie si můžete objednat v jakémkoliv středisku
              v Jeseníkách — dle individuální domluvy. Ať už lyžujete na Ovčárně,
              Dolní Moravě, Ramzové nebo kdekoliv jinde, přijedeme za vámi.
            </p>
            <p>
              Stačí nás kontaktovat, domluvit termín a místo. Přizpůsobíme se vašim
              potřebám a zajistíme stejně kvalitní výuku jako v našem domovském středisku.
            </p>
          </div>
        </div>
      </section>

      {/* Why Karlov */}
      <section className="py-16 px-7">
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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/lokality/page.tsx
git commit -m "feat: update Lokality with Sherpaski heading and Ski akademie Jeseníky section"
```

---

### Task 6: Update Škola page with prominent location

**Files:**
- Modify: `src/app/skola/page.tsx`

- [ ] **Step 1: Add prominent location block after hero**

In `src/app/skola/page.tsx`, add a location banner between the hero and the intro section. After the `<SubpageHero ... />` closing tag and before `{/* Intro */}`, add:

```tsx
      {/* Location banner */}
      <section className="bg-ink text-white py-6 px-7">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent shrink-0">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span className="text-[13px] sm:text-[14px] tracking-[-0.01em]">
              Působíme ve <strong className="font-medium">Ski aréně Karlov pod Pradědem</strong> — srdce Jeseníků
            </span>
          </div>
          <a
            href="/lokality"
            className="text-[11px] uppercase tracking-[0.14em] text-accent hover:text-white transition-colors shrink-0"
          >
            Více o lokalitě →
          </a>
        </div>
      </section>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/skola/page.tsx
git commit -m "feat: add prominent Karlov pod Pradědem location banner to Škola page"
```

---

### Task 7: Create Supabase vouchers table

**Files:**
- Modify: `src/lib/supabase.ts` (add Voucher type)

- [ ] **Step 1: Create vouchers table in Supabase**

Run this SQL in the Supabase SQL editor (dashboard):

```sql
CREATE TABLE vouchers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text UNIQUE NOT NULL,
  service_label text NOT NULL,
  duration_minutes int NOT NULL,
  original_price int NOT NULL,
  discounted_price int NOT NULL,
  buyer_name text NOT NULL,
  buyer_email text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'redeemed', 'expired')),
  valid_from timestamptz NOT NULL DEFAULT now(),
  valid_until timestamptz NOT NULL,
  redeemed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_vouchers_code ON vouchers (code);
CREATE INDEX idx_vouchers_status ON vouchers (status);

-- Enable RLS
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon (for the purchase flow)
CREATE POLICY "Allow insert vouchers" ON vouchers FOR INSERT TO anon WITH CHECK (true);

-- Allow reading own voucher by code
CREATE POLICY "Allow read voucher by code" ON vouchers FOR SELECT TO anon USING (true);
```

- [ ] **Step 2: Add Voucher type to supabase.ts**

In `src/lib/supabase.ts`, add after the existing types:

```ts
export type Voucher = {
  id: string;
  code: string;
  service_label: string;
  duration_minutes: number;
  original_price: number;
  discounted_price: number;
  buyer_name: string;
  buyer_email: string;
  status: "active" | "redeemed" | "expired";
  valid_from: string;
  valid_until: string;
  redeemed_at: string | null;
  created_at: string;
};
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/supabase.ts
git commit -m "feat: add Voucher type for Supabase vouchers table"
```

---

### Task 8: Build voucher purchase API route

**Files:**
- Create: `src/app/api/voucher/purchase/route.ts`
- Modify: `src/lib/data.ts` (add createVoucher function)

- [ ] **Step 1: Add createVoucher to data.ts**

In `src/lib/data.ts`, add at the end:

```ts
import type { Voucher } from "./supabase";

export async function createVoucher(voucher: Omit<Voucher, "id" | "created_at" | "redeemed_at" | "status" | "valid_from">): Promise<Voucher | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("vouchers")
    .insert({
      ...voucher,
      status: "active",
      valid_from: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw error;
  return data as Voucher;
}
```

Also add `Voucher` to the import from `./supabase` at the top of the file.

- [ ] **Step 2: Create the API route**

Create `src/app/api/voucher/purchase/route.ts`:

```ts
import { createVoucher } from "@/lib/data";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  const body = await request.json();
  const { serviceLabel, durationMinutes, originalPrice, discountedPrice, buyerName, buyerEmail } = body;

  if (!serviceLabel || !durationMinutes || !originalPrice || !discountedPrice || !buyerName || !buyerEmail) {
    return Response.json({ error: "Chybí povinné údaje." }, { status: 400 });
  }

  const code = `SHRP-${nanoid(8).toUpperCase()}`;
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 14);

  try {
    const voucher = await createVoucher({
      code,
      service_label: serviceLabel,
      duration_minutes: durationMinutes,
      original_price: originalPrice,
      discounted_price: discountedPrice,
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      valid_until: validUntil.toISOString(),
    });

    return Response.json({ voucher });
  } catch {
    return Response.json({ error: "Nepodařilo se vytvořit voucher." }, { status: 500 });
  }
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/data.ts src/app/api/voucher/purchase/route.ts
git commit -m "feat: add voucher purchase API route with nanoid codes"
```

---

### Task 9: Build voucher PDF generation API route

**Files:**
- Create: `src/app/api/voucher/pdf/route.ts`
- Create: `src/lib/voucher-pdf.tsx`

- [ ] **Step 1: Create the PDF template**

Create `src/lib/voucher-pdf.tsx`:

```tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#f8f6f2",
  },
  header: {
    marginBottom: 30,
    borderBottom: "1 solid #e0ddd6",
    paddingBottom: 20,
  },
  brand: {
    fontSize: 14,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#111110",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#aaa89e",
  },
  title: {
    fontSize: 28,
    color: "#111110",
    marginBottom: 8,
  },
  serviceLabel: {
    fontSize: 16,
    color: "#555550",
    marginBottom: 20,
  },
  codeContainer: {
    backgroundColor: "#111110",
    padding: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  codeLabel: {
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#aaa89e",
    marginBottom: 6,
  },
  code: {
    fontSize: 24,
    color: "#f8f6f2",
    letterSpacing: 4,
    fontFamily: "Courier",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  detailItem: {
    width: "45%",
  },
  detailLabel: {
    fontSize: 8,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#aaa89e",
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 12,
    color: "#111110",
  },
  restriction: {
    backgroundColor: "#f0ede6",
    padding: 16,
    marginTop: 16,
  },
  restrictionTitle: {
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#b8965a",
    marginBottom: 6,
  },
  restrictionText: {
    fontSize: 10,
    color: "#555550",
    lineHeight: 1.6,
  },
  footer: {
    marginTop: 30,
    paddingTop: 16,
    borderTop: "1 solid #e0ddd6",
  },
  footerText: {
    fontSize: 8,
    color: "#aaa89e",
    textAlign: "center",
  },
});

interface VoucherPDFProps {
  code: string;
  serviceLabel: string;
  discountedPrice: number;
  buyerName: string;
  validFrom: string;
  validUntil: string;
}

export function VoucherPDF({
  code,
  serviceLabel,
  discountedPrice,
  buyerName,
  validFrom,
  validUntil,
}: VoucherPDFProps) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <Document>
      <Page size="A5" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>Sherpaski</Text>
          <Text style={styles.subtitle}>Lyžařská škola · Karlov pod Pradědem</Text>
        </View>

        <Text style={styles.title}>Voucher</Text>
        <Text style={styles.serviceLabel}>{serviceLabel}</Text>

        <View style={styles.codeContainer}>
          <Text style={styles.codeLabel}>Kód voucheru</Text>
          <Text style={styles.code}>{code}</Text>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Jméno</Text>
            <Text style={styles.detailValue}>{buyerName}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Cena</Text>
            <Text style={styles.detailValue}>{discountedPrice.toLocaleString("cs-CZ")} Kč</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Platný od</Text>
            <Text style={styles.detailValue}>{formatDate(validFrom)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Platný do</Text>
            <Text style={styles.detailValue}>{formatDate(validUntil)}</Text>
          </View>
        </View>

        <View style={styles.restriction}>
          <Text style={styles.restrictionTitle}>Podmínky uplatnění</Text>
          <Text style={styles.restrictionText}>
            Voucher je platný pouze v pracovní dny (pondělí – pátek) od 11:00 do 14:00 hodin.
            Uplatnitelný ve Ski aréně Karlov pod Pradědem. Předložte kód při příchodu.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Sherpa Ski School · Ski aréna Karlov pod Pradědem · wagnerski.cz
          </Text>
        </View>
      </Page>
    </Document>
  );
}
```

- [ ] **Step 2: Create the PDF API route**

Create `src/app/api/voucher/pdf/route.ts`:

```ts
import { renderToBuffer } from "@react-pdf/renderer";
import { VoucherPDF } from "@/lib/voucher-pdf";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const serviceLabel = searchParams.get("serviceLabel");
  const discountedPrice = Number(searchParams.get("discountedPrice"));
  const buyerName = searchParams.get("buyerName");
  const validFrom = searchParams.get("validFrom");
  const validUntil = searchParams.get("validUntil");

  if (!code || !serviceLabel || !discountedPrice || !buyerName || !validFrom || !validUntil) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  const buffer = await renderToBuffer(
    VoucherPDF({ code, serviceLabel, discountedPrice, buyerName, validFrom, validUntil })
  );

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="voucher-${code}.pdf"`,
    },
  });
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/voucher-pdf.tsx src/app/api/voucher/pdf/route.ts
git commit -m "feat: add voucher PDF generation with @react-pdf/renderer"
```

---

### Task 10: Build voucher email sending

**Files:**
- Create: `src/app/api/voucher/email/route.ts`

- [ ] **Step 1: Create the email API route**

Create `src/app/api/voucher/email/route.ts`:

```ts
import { Resend } from "resend";
import { renderToBuffer } from "@react-pdf/renderer";
import { VoucherPDF } from "@/lib/voucher-pdf";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { code, serviceLabel, discountedPrice, buyerName, buyerEmail, validFrom, validUntil } = body;

  if (!code || !serviceLabel || !buyerName || !buyerEmail || !validFrom || !validUntil) {
    return Response.json({ error: "Chybí povinné údaje." }, { status: 400 });
  }

  const pdfBuffer = await renderToBuffer(
    VoucherPDF({ code, serviceLabel, discountedPrice, buyerName, validFrom, validUntil })
  );

  try {
    await resend.emails.send({
      from: "Sherpa Ski School <noreply@wagnerski.cz>",
      to: buyerEmail,
      subject: `Váš voucher Sherpaski — ${code}`,
      html: `
        <div style="font-family: sans-serif; color: #111110;">
          <h2>Dobrý den, ${buyerName}!</h2>
          <p>Děkujeme za zakoupení voucheru na <strong>${serviceLabel}</strong>.</p>
          <p>Váš kód: <strong style="font-size: 20px; letter-spacing: 2px;">${code}</strong></p>
          <p>Platnost: do ${new Date(validUntil).toLocaleDateString("cs-CZ")}</p>
          <p><strong>Podmínky:</strong> Voucher je platný pouze Po–Pá, 11:00–14:00.</p>
          <p>PDF voucher naleznete v příloze.</p>
          <hr style="border: none; border-top: 1px solid #e0ddd6; margin: 20px 0;" />
          <p style="color: #aaa89e; font-size: 12px;">Sherpa Ski School · Ski aréna Karlov pod Pradědem</p>
        </div>
      `,
      attachments: [
        {
          filename: `voucher-${code}.pdf`,
          content: Buffer.from(pdfBuffer),
        },
      ],
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Nepodařilo se odeslat email." }, { status: 500 });
  }
}
```

- [ ] **Step 2: Add RESEND_API_KEY to .env.local**

Append to `.env.local`:

```
RESEND_API_KEY=re_YOUR_KEY_HERE
```

The user needs to replace this with their actual Resend API key from https://resend.com/api-keys.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/voucher/email/route.ts
git commit -m "feat: add voucher email sending via Resend with PDF attachment"
```

---

### Task 11: Build voucher purchase UI on Rezervace page

**Files:**
- Create: `src/components/ui/VoucherPurchase.tsx`
- Modify: `src/app/rezervace/page.tsx`

- [ ] **Step 1: Create VoucherPurchase client component**

Create `src/components/ui/VoucherPurchase.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { ReservationPrice } from "@/lib/supabase";

interface VoucherPurchaseProps {
  prices: ReservationPrice[];
}

type Step = "select" | "form" | "success";

export function VoucherPurchase({ prices }: VoucherPurchaseProps) {
  const [step, setStep] = useState<Step>("select");
  const [selectedPrice, setSelectedPrice] = useState<ReservationPrice | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [error, setError] = useState("");

  const discount = 0.15;

  const getDiscountedPrice = (priceStr: string) => {
    const num = parseInt(priceStr.replace(/\D/g, ""), 10);
    return Math.round(num * (1 - discount));
  };

  const handleSelect = (price: ReservationPrice) => {
    setSelectedPrice(price);
    setStep("form");
    setError("");
  };

  const handlePurchase = async () => {
    if (!selectedPrice || !name.trim() || !email.trim()) {
      setError("Vyplňte prosím všechna pole.");
      return;
    }

    setLoading(true);
    setError("");

    const originalPrice = parseInt(selectedPrice.price.replace(/\D/g, ""), 10);
    const discountedPrice = getDiscountedPrice(selectedPrice.price);
    const durationMinutes = parseInt(selectedPrice.duration?.replace(/\D/g, "") || "50", 10);

    try {
      // 1. Create voucher in DB
      const purchaseRes = await fetch("/api/voucher/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceLabel: `${selectedPrice.label} (${selectedPrice.duration})`,
          durationMinutes,
          originalPrice,
          discountedPrice,
          buyerName: name,
          buyerEmail: email,
        }),
      });

      const { voucher, error: purchaseError } = await purchaseRes.json();
      if (purchaseError || !voucher) throw new Error(purchaseError);

      // 2. Send email with PDF
      await fetch("/api/voucher/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: voucher.code,
          serviceLabel: voucher.service_label,
          discountedPrice: voucher.discounted_price,
          buyerName: voucher.buyer_name,
          buyerEmail: voucher.buyer_email,
          validFrom: voucher.valid_from,
          validUntil: voucher.valid_until,
        }),
      });

      setVoucherCode(voucher.code);
      setStep("success");
    } catch {
      setError("Něco se pokazilo. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!selectedPrice || !voucherCode) return;
    const discountedPrice = getDiscountedPrice(selectedPrice.price);
    const now = new Date().toISOString();
    const validUntil = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
    const params = new URLSearchParams({
      code: voucherCode,
      serviceLabel: `${selectedPrice.label} (${selectedPrice.duration})`,
      discountedPrice: String(discountedPrice),
      buyerName: name,
      validFrom: now,
      validUntil,
    });
    window.open(`/api/voucher/pdf?${params}`, "_blank");
  };

  if (step === "success") {
    return (
      <div className="border border-line rounded-[3px] p-8 bg-surface text-center">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-accent mb-4">
          Voucher zakoupen
        </span>
        <h2 className="text-[20px] font-normal tracking-[-0.01em] mb-2">
          Děkujeme!
        </h2>
        <p className="text-[13px] text-ink-secondary leading-[1.6] mb-4">
          Váš voucher byl vytvořen a odeslán na <strong>{email}</strong>.
        </p>
        <div className="bg-ink text-cream py-3 px-6 inline-block rounded-[2px] mb-4">
          <span className="text-[10px] uppercase tracking-[0.14em] block mb-1 text-white/50">Kód</span>
          <span className="text-[20px] tracking-[0.1em] font-mono">{voucherCode}</span>
        </div>
        <p className="text-[11px] text-ink-muted mb-4">
          Platný Po–Pá, 11:00–14:00 · 14 dní od nákupu
        </p>
        <button
          onClick={handleDownloadPdf}
          className="min-h-[44px] bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-8 py-[12px] rounded-[2px] hover:opacity-90 transition-opacity"
        >
          Stáhnout PDF
        </button>
      </div>
    );
  }

  if (step === "form" && selectedPrice) {
    const discountedPrice = getDiscountedPrice(selectedPrice.price);
    return (
      <div className="border border-line rounded-[3px] p-8 bg-surface">
        <button
          onClick={() => setStep("select")}
          className="text-[11px] text-ink-muted hover:text-ink transition-colors mb-4"
        >
          ← Zpět na výběr
        </button>
        <h2 className="text-[20px] font-normal tracking-[-0.01em] mb-1">
          {selectedPrice.label}
        </h2>
        <p className="text-[13px] text-ink-secondary mb-1">
          {selectedPrice.duration}
        </p>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-[11px] text-ink-muted line-through">{selectedPrice.price}</span>
          <span className="text-[18px] font-medium text-accent">{discountedPrice.toLocaleString("cs-CZ")} Kč</span>
          <span className="text-[10px] uppercase tracking-[0.1em] text-accent">−15 %</span>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
              Jméno a příjmení
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
              placeholder="Jan Novák"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
              placeholder="jan@email.cz"
            />
          </div>
        </div>
        <p className="text-[11px] text-ink-muted mb-4">
          Platný Po–Pá, 11:00–14:00 · 14 dní od nákupu
        </p>
        {error && (
          <p className="text-[12px] text-red-600 mb-4">{error}</p>
        )}
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="min-h-[44px] w-full bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-8 py-[12px] rounded-[2px] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Zpracovávám..." : "Zakoupit voucher"}
        </button>
      </div>
    );
  }

  // Step: select
  return (
    <div>
      <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-4">
        Vouchery – sleva 15 %
      </span>
      <p className="text-[13px] text-ink-secondary leading-[1.6] mb-2">
        Zvýhodněné vouchery na výuku. Platné Po–Pá, 11:00–14:00.
      </p>
      <div className="space-y-3">
        {prices.map((p) => {
          const discounted = getDiscountedPrice(p.price);
          return (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className="w-full border border-line rounded-[3px] p-4 bg-cream hover:border-accent transition-colors text-left flex items-center justify-between gap-4"
            >
              <div>
                <span className="block text-[13px]">{p.label}</span>
                <span className="block text-[11px] text-ink-muted">{p.duration}</span>
              </div>
              <div className="text-right">
                <span className="block text-[11px] text-ink-muted line-through">{p.price}</span>
                <span className="block text-[15px] font-medium text-accent">
                  {discounted.toLocaleString("cs-CZ")} Kč
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update Rezervace page to use VoucherPurchase**

In `src/app/rezervace/page.tsx`, replace the voucher section (the `{/* Voucher */}` div, lines 101-125) with:

```tsx
          {/* Voucher */}
          <div>
            <VoucherPurchase prices={[...individualPrices, ...groupPrices]} />
          </div>
```

Add the import at the top of the file:

```tsx
import { VoucherPurchase } from "@/components/ui/VoucherPurchase";
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/VoucherPurchase.tsx src/app/rezervace/page.tsx
git commit -m "feat: add voucher purchase flow with service selection, form, and PDF download"
```

---

### Task 12: Build course signup form for Instruktor page

**Files:**
- Create: `src/components/ui/CourseSignupForm.tsx`
- Create: `src/app/api/course-signup/route.ts`
- Modify: `src/app/instruktor/page.tsx`

- [ ] **Step 1: Create the API route**

Create `src/app/api/course-signup/route.ts`:

```ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, courseLevel, courseDate } = body;

  if (!name || !email || !phone || !courseLevel) {
    return Response.json({ error: "Chybí povinné údaje." }, { status: 400 });
  }

  try {
    // Send to Wagner admin
    await resend.emails.send({
      from: "Wagner Ski Akademie <noreply@wagnerski.cz>",
      to: "chcibytinstruktor@wagnerski.cz",
      subject: `Nová přihláška na kurz: ${courseLevel}`,
      html: `
        <div style="font-family: sans-serif; color: #111110;">
          <h2>Nová přihláška na instruktorský kurz</h2>
          <table style="border-collapse: collapse;">
            <tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Jméno:</td><td>${name}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">E-mail:</td><td>${email}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Telefon:</td><td>${phone}</td></tr>
            <tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Kurz:</td><td>${courseLevel}</td></tr>
            ${courseDate ? `<tr><td style="padding: 4px 12px 4px 0; color: #aaa89e;">Termín:</td><td>${courseDate}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    // Send confirmation to applicant
    await resend.emails.send({
      from: "Wagner Ski Akademie <noreply@wagnerski.cz>",
      to: email,
      subject: "Potvrzení přihlášky na instruktorský kurz",
      html: `
        <div style="font-family: sans-serif; color: #111110;">
          <h2>Dobrý den, ${name}!</h2>
          <p>Vaše přihláška na kurz <strong>${courseLevel}</strong> byla přijata.</p>
          <p>Ozveme se vám s dalšími informacemi na váš e-mail nebo telefon.</p>
          <hr style="border: none; border-top: 1px solid #e0ddd6; margin: 20px 0;" />
          <p style="color: #aaa89e; font-size: 12px;">Wagner Ski Akademie · chcibytinstruktor@wagnerski.cz</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Nepodařilo se odeslat přihlášku." }, { status: 500 });
  }
}
```

- [ ] **Step 2: Create CourseSignupForm component**

Create `src/components/ui/CourseSignupForm.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { InstructorCourse } from "@/lib/supabase";

interface CourseSignupFormProps {
  courses: InstructorCourse[];
}

export function CourseSignupForm({ courses }: CourseSignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !selectedCourse) {
      setError("Vyplňte prosím všechna pole.");
      return;
    }

    setLoading(true);
    setError("");

    const course = courses.find((c) => c.id === selectedCourse);

    try {
      const res = await fetch("/api/course-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          courseLevel: course?.level ?? selectedCourse,
          courseDate: course?.date ?? "",
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSuccess(true);
    } catch {
      setError("Něco se pokazilo. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="border border-line rounded-[3px] p-8 bg-surface text-center">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-accent mb-4">
          Přihláška odeslána
        </span>
        <h3 className="text-[20px] font-normal tracking-[-0.01em] mb-2">
          Děkujeme!
        </h3>
        <p className="text-[13px] text-ink-secondary leading-[1.6]">
          Vaše přihláška byla odeslána. Ozveme se vám s dalšími informacemi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line rounded-[3px] p-8 bg-surface">
      <h3 className="text-[18px] font-normal tracking-[-0.01em] mb-6">
        Přihláška na kurz
      </h3>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Kurz
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
          >
            <option value="">Vyberte kurz...</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.level} — {c.date} ({c.location})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Jméno a příjmení
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
            placeholder="Jan Novák"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
            placeholder="jan@email.cz"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Telefon
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
            placeholder="+420 123 456 789"
          />
        </div>
      </div>
      {error && (
        <p className="text-[12px] text-red-600 mb-4">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="min-h-[44px] w-full bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-8 py-[12px] rounded-[2px] hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Odesílám..." : "Odeslat přihlášku"}
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Add signup form to Instruktor page**

In `src/app/instruktor/page.tsx`:

Add import at top:
```tsx
import { CourseSignupForm } from "@/components/ui/CourseSignupForm";
```

Replace the CTA section (the last `<section>` with `bg-ink text-white`, lines 246-269) with:

```tsx
      {/* Signup Form */}
      <section className="py-16 px-7 bg-surface" id="prihlaska">
        <div className="max-w-xl mx-auto">
          <CourseSignupForm courses={courses} />
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
            <a
              href="#prihlaska"
              className="min-h-[44px] flex items-center bg-white text-ink text-[10px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity"
            >
              Přihláška na kurz
            </a>
            <a
              href="mailto:chcibytinstruktor@wagnerski.cz"
              className="min-h-[44px] flex items-center text-[12px] text-white/60 hover:text-white/90 transition-colors"
            >
              chcibytinstruktor@wagnerski.cz
            </a>
          </div>
        </div>
      </section>
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/CourseSignupForm.tsx src/app/api/course-signup/route.ts src/app/instruktor/page.tsx
git commit -m "feat: add course signup form on Instruktor page with Resend email"
```

---

### Task 13: Update ParallaxHero branding

**Files:**
- Modify: `src/components/ui/ParallaxHero.tsx`

- [ ] **Step 1: Update hero text**

In `src/components/ui/ParallaxHero.tsx`, change the eyebrow text (line 37) from:

```tsx
          Lyžařská akademie · Morava · od roku 2005
```

to:

```tsx
          Wagner · ski akademie · sherpaski · skicamp.cz · instruktor
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ParallaxHero.tsx
git commit -m "feat: update ParallaxHero eyebrow to new Wagner branding"
```

---

### Task 14: Add RESEND_API_KEY to Vercel environment and deploy

**Files:**
- No code changes

- [ ] **Step 1: Add env vars to Vercel**

Via Vercel dashboard or CLI, add `RESEND_API_KEY` environment variable to the wagnerski project.

The user must:
1. Sign up at https://resend.com
2. Verify the domain `wagnerski.cz` in Resend
3. Create an API key
4. Add it to Vercel project settings → Environment Variables

- [ ] **Step 2: Push and deploy**

```bash
git push origin main
```

Vercel will auto-deploy from push.

- [ ] **Step 3: Verify deployment**

Check the Vercel deployment succeeds and test the live site.
