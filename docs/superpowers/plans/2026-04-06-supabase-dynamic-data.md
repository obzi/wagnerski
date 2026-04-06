# Supabase Dynamic Data — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Admin-edited data (skicamp terms, instructor courses, reservation prices, contacts) flows from Supabase to frontend pages so changes are visible immediately.

**Architecture:** Admin writes to Supabase tables instead of localStorage. Frontend pages fetch from Supabase at request time (SSR via Next.js server components on Vercel). Static content (page text, descriptions, features) stays hardcoded.

**Tech Stack:** Next.js 16 (App Router, server components), Supabase JS SDK 2.x, Vercel hosting

---

### Task 1: Remove static export, update next.config.ts for Vercel

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Update next.config.ts**

Remove `output: "export"` and `basePath` (Vercel uses custom domain, not GitHub Pages subpath). Keep `images.unoptimized` for now.

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 2: Verify dev server starts**

Run: `npm run dev`
Expected: Server starts without errors on localhost:3000

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "chore: remove static export and basePath for Vercel deployment"
```

---

### Task 2: Create Supabase tables

**Files:**
- Create: `supabase/migrations/001_create_tables.sql`

This SQL will be run manually in the Supabase dashboard SQL editor.

- [ ] **Step 1: Write migration SQL**

```sql
-- Skicamp terms
create table skicamp_terms (
  id uuid primary key default gen_random_uuid(),
  camp_type text not null,
  date_from text not null,
  date_to text not null,
  location text not null default 'Karlov pod Pradědem',
  price numeric not null default 0,
  spots integer not null default 0,
  note text not null default '',
  created_at timestamptz default now()
);

-- Instructor courses
create table instructor_courses (
  id uuid primary key default gen_random_uuid(),
  level text not null,
  subtitle text not null default '',
  hours text not null default '',
  description text not null default '',
  tags text[] not null default '{}',
  date text not null default '',
  location text not null default 'Karlov pod Pradědem',
  price_with_accommodation numeric not null default 0,
  price_without_accommodation numeric not null default 0,
  created_at timestamptz default now()
);

-- Reservation prices
create table reservation_prices (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('individual', 'group', 'special')),
  label text not null,
  duration text not null default '',
  price text not null,
  note text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

-- Contacts
create table contacts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('phone', 'email', 'address', 'facebook', 'instagram')),
  label text not null,
  value text not null,
  url text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

-- Enable RLS
alter table skicamp_terms enable row level security;
alter table instructor_courses enable row level security;
alter table reservation_prices enable row level security;
alter table contacts enable row level security;

-- Public read access (anon key can read)
create policy "Public read skicamp_terms" on skicamp_terms for select using (true);
create policy "Public read instructor_courses" on instructor_courses for select using (true);
create policy "Public read reservation_prices" on reservation_prices for select using (true);
create policy "Public read contacts" on contacts for select using (true);

-- Authenticated write access
create policy "Auth write skicamp_terms" on skicamp_terms for all using (auth.role() = 'authenticated');
create policy "Auth write instructor_courses" on instructor_courses for all using (auth.role() = 'authenticated');
create policy "Auth write reservation_prices" on reservation_prices for all using (auth.role() = 'authenticated');
create policy "Auth write contacts" on contacts for all using (auth.role() = 'authenticated');
```

- [ ] **Step 2: Commit**

```bash
git add supabase/migrations/001_create_tables.sql
git commit -m "chore: add Supabase migration for dynamic data tables"
```

- [ ] **Step 3: Run migration in Supabase dashboard**

Go to Supabase project → SQL Editor → paste and run the migration. Then seed with initial data (contacts, default prices, courses).

---

### Task 3: Create data fetching layer

**Files:**
- Create: `src/lib/data.ts`

Centralized server-side data fetching functions. Each function fetches from Supabase. Returns typed arrays. Handles the case where Supabase is not configured (returns empty arrays).

- [ ] **Step 1: Create src/lib/data.ts**

```ts
import { supabase } from "./supabase";
import type {
  SkicampTerm,
  InstructorCourse,
  Contact,
  ReservationPrice,
} from "./supabase";

export async function getSkicampTerms(): Promise<SkicampTerm[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("skicamp_terms")
    .select("*")
    .order("date_from", { ascending: true });
  return (data as SkicampTerm[]) ?? [];
}

export async function getInstructorCourses(): Promise<InstructorCourse[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("instructor_courses")
    .select("*")
    .order("created_at", { ascending: true });
  return (data as InstructorCourse[]) ?? [];
}

export async function getReservationPrices(): Promise<ReservationPrice[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("reservation_prices")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data as ReservationPrice[]) ?? [];
}

export async function getContacts(): Promise<Contact[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("contacts")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data as Contact[]) ?? [];
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat: add server-side Supabase data fetching layer"
```

---

### Task 4: Update /skicamp page to show dynamic terms

**Files:**
- Modify: `src/app/skicamp/page.tsx`

The page is a server component. Call `getSkicampTerms()` at the top. Replace the static "Termíny připravujeme" CTA section with a dynamic terms list when terms exist, or keep the "připravujeme" message when empty.

- [ ] **Step 1: Update skicamp page**

At the top of the file, add import:
```ts
import { getSkicampTerms } from "@/lib/data";
```

Make the component async:
```ts
export default async function SkicampPage() {
  const terms = await getSkicampTerms();
```

Replace the CTA section (the `<section className="py-16 px-7 bg-ink text-white">` block) with:

```tsx
{/* Termíny */}
<section className="py-16 px-7 bg-ink text-white">
  <div className="max-w-[1280px] mx-auto text-center">
    {terms.length > 0 ? (
      <>
        <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-8">
          Termíny campů
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 text-left">
          {terms.map((t) => (
            <div key={t.id} className="border border-white/20 rounded-[3px] p-5">
              <span className="block text-[10px] uppercase tracking-[0.14em] text-white/50 mb-1">
                {t.camp_type}
              </span>
              <span className="block text-[16px] font-medium mb-2">
                {t.date_from} – {t.date_to}
              </span>
              <span className="block text-[13px] text-white/60 mb-1">{t.location}</span>
              {t.price > 0 && (
                <span className="block text-[14px] font-medium text-accent">
                  {t.price.toLocaleString("cs-CZ")} Kč
                </span>
              )}
              {t.spots > 0 && (
                <span className="block text-[11px] text-white/40 mt-1">
                  Volných míst: {t.spots}
                </span>
              )}
              {t.note && (
                <span className="block text-[11px] text-white/40 mt-1">{t.note}</span>
              )}
            </div>
          ))}
        </div>
      </>
    ) : (
      <>
        <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-4">
          Termíny připravujeme
        </h2>
        <p className="text-[14px] text-white/60 leading-[1.6] mb-8 max-w-md mx-auto">
          Sledujte naše stránky a sociální sítě. Termíny campů na další sezónu zveřejníme brzy.
        </p>
      </>
    )}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link
        href="/rezervace"
        className="min-h-[44px] flex items-center bg-white text-ink text-[10px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity"
      >
        Kontaktujte nás
      </Link>
      <a
        href="tel:+420604681100"
        className="min-h-[44px] flex items-center text-[12px] text-white/60 hover:text-white/90 transition-colors"
      >
        +420 604 681 100
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify page renders**

Run: `npm run dev`, visit `/skicamp`
Expected: "Termíny připravujeme" shows (no terms in DB yet). No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/skicamp/page.tsx
git commit -m "feat: skicamp page fetches terms from Supabase"
```

---

### Task 5: Update /instruktor page to show dynamic courses

**Files:**
- Modify: `src/app/instruktor/page.tsx`

Replace the hardcoded `instructorCourses` import from `@/data/pricing` with `getInstructorCourses()` from Supabase. Keep `instructorIncluded` hardcoded (not in admin).

- [ ] **Step 1: Update instruktor page**

Replace import:
```ts
import { instructorIncluded } from "@/data/pricing";
import { getInstructorCourses } from "@/lib/data";
```

Make component async and fetch:
```ts
export default async function InstruktorPage() {
  const courses = await getInstructorCourses();
```

The existing JSX for courses (`instructorCourses.map(...)`) stays the same structure, just uses `courses` variable instead of the imported `instructorCourses`. Also add `price_with_accommodation` and `price_without_accommodation` display to each course card.

In the course card, after the date/location section, add pricing:
```tsx
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
```

If `courses` is empty, show a fallback message instead of the grid.

- [ ] **Step 2: Verify page renders**

Run: `npm run dev`, visit `/instruktor`
Expected: Empty state or courses from DB. No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/instruktor/page.tsx
git commit -m "feat: instruktor page fetches courses from Supabase"
```

---

### Task 6: Update /rezervace page to show dynamic prices and contacts

**Files:**
- Modify: `src/app/rezervace/page.tsx`

Replace hardcoded pricing imports and contact info with Supabase data.

- [ ] **Step 1: Update rezervace page**

Replace imports:
```ts
import { getReservationPrices, getContacts } from "@/lib/data";
import type { ReservationPrice, Contact } from "@/lib/supabase";
```

Make component async:
```ts
export default async function RezervacePage() {
  const [prices, contacts] = await Promise.all([
    getReservationPrices(),
    getContacts(),
  ]);

  const individualPrices = prices.filter((p) => p.category === "individual");
  const groupPrices = prices.filter((p) => p.category === "group");
  const specialPrices = prices.filter((p) => p.category === "special");

  const phone = contacts.find((c) => c.type === "phone");
  const email = contacts.find((c) => c.type === "email");
  const address = contacts.find((c) => c.type === "address");
  const facebook = contacts.find((c) => c.type === "facebook");
  const instagram = contacts.find((c) => c.type === "instagram");
```

Update the contact section to use dynamic data (with fallbacks to hardcoded values if contacts are empty). Update pricing tables to use `prices` arrays with fields `label`, `duration`, `price`, `note`.

Each pricing row:
```tsx
<div className="px-5 py-4 flex items-center justify-between gap-4">
  <div>
    <span className="block text-[13px]">{p.label} {p.duration && `(${p.duration})`}</span>
    {p.note && <span className="block text-[11px] text-ink-muted mt-0.5">{p.note}</span>}
  </div>
  <span className="text-[15px] font-medium shrink-0">{p.price}</span>
</div>
```

- [ ] **Step 2: Verify page renders**

Run: `npm run dev`, visit `/rezervace`
Expected: Page renders. If no DB data, tables/contacts are empty but no crash.

- [ ] **Step 3: Commit**

```bash
git add src/app/rezervace/page.tsx
git commit -m "feat: rezervace page fetches prices and contacts from Supabase"
```

---

### Task 7: Refactor admin to use Supabase instead of localStorage

**Files:**
- Modify: `src/app/admin/page.tsx`

Replace `loadLocal`/`saveLocal` calls with Supabase CRUD. Each manager component needs:
- Fetch on mount: `supabase.from(table).select("*")`
- Create: `supabase.from(table).insert(...)`
- Update: `supabase.from(table).update(...).eq("id", id)`
- Delete: `supabase.from(table).delete().eq("id", id)`

Keep localStorage as fallback only when Supabase is not configured (`!supabase`).

- [ ] **Step 1: Create a helper hook**

Add at the top of admin page (or in a separate file `src/lib/admin-helpers.ts`):

```ts
function useSupabaseTable<T extends { id: string }>(
  table: string,
  defaultData: T[]
) {
  const [items, setItems] = useState<T[]>(defaultData);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!supabase) {
      setItems(loadLocal(table, defaultData));
      setLoading(false);
      return;
    }
    const { data } = await supabase.from(table).select("*").order("created_at");
    setItems((data as T[]) ?? []);
    setLoading(false);
  }, [table, defaultData]);

  useEffect(() => { refresh(); }, [refresh]);

  const add = async (item: Omit<T, "id">) => {
    if (!supabase) {
      const newItem = { ...item, id: uid() } as T;
      const updated = [...items, newItem];
      setItems(updated);
      saveLocal(table, updated);
      return;
    }
    await supabase.from(table).insert(item);
    await refresh();
  };

  const update = async (id: string, changes: Partial<T>) => {
    if (!supabase) {
      const updated = items.map((i) => (i.id === id ? { ...i, ...changes } : i));
      setItems(updated);
      saveLocal(table, updated);
      return;
    }
    await supabase.from(table).update(changes).eq("id", id);
    await refresh();
  };

  const remove = async (id: string) => {
    if (!supabase) {
      const updated = items.filter((i) => i.id !== id);
      setItems(updated);
      saveLocal(table, updated);
      return;
    }
    await supabase.from(table).delete().eq("id", id);
    await refresh();
  };

  return { items, loading, add, update, remove, refresh };
}
```

- [ ] **Step 2: Refactor each manager to use the hook**

Replace manual state management in `SkicampManager`, `CoursesManager`, `ReservationManager`, `ContactsManager` to use `useSupabaseTable`. Each manager calls `add`, `update`, `remove` from the hook instead of directly manipulating state + localStorage.

- [ ] **Step 3: Verify admin works**

Run: `npm run dev`, visit `/admin`, login, add/edit/delete items.
Expected: Data persists in Supabase (visible in Supabase dashboard).

- [ ] **Step 4: Commit**

```bash
git add src/app/admin/page.tsx
git commit -m "feat: admin CRUD uses Supabase instead of localStorage"
```

---

### Task 8: Add .env.local and Vercel env vars

**Files:**
- Create: `.env.local` (not committed, add to .gitignore)
- Create: `.env.example`

- [ ] **Step 1: Create .env.example**

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

- [ ] **Step 2: Verify .gitignore includes .env.local**

Check `.gitignore` — it should already have `.env*`. If not, add `.env.local`.

- [ ] **Step 3: Create local .env.local with real values**

Get URL and anon key from Supabase dashboard → Settings → API.

- [ ] **Step 4: Commit**

```bash
git add .env.example
git commit -m "chore: add .env.example for Supabase config"
```

---

### Task 9: Clean up unused hardcoded data

**Files:**
- Modify: `src/data/pricing.ts` — remove `individualPrices`, `specialPrices`, `groupPrices`, `instructorCourses` (now in Supabase). Keep `instructorIncluded` (not in admin).

- [ ] **Step 1: Remove migrated exports from pricing.ts**

```ts
export const instructorIncluded = [
  "Ubytování v hotelovém komplexu s polopenzí",
  "Skipasy po celou dobu kurzu",
  "Výukové materiály a skripta",
  "Odborné přednášky (psychologie, horská služba, Freeride World Tour)",
  "Celoživotně platná certifikace v celé ČR",
  "Bonusový carvingový workshop",
  "Speciální tričko absolventa",
  "Možnost wellness v hotelu",
];
```

- [ ] **Step 2: Verify no broken imports**

Run: `npm run build`
Expected: Build succeeds with no import errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/pricing.ts
git commit -m "chore: remove hardcoded pricing data migrated to Supabase"
```

---

### Task 10: Update GitHub Actions for Vercel (remove GitHub Pages deploy)

**Files:**
- Modify or delete: `.github/workflows/` files

- [ ] **Step 1: Check current workflow**

Read `.github/workflows/` and remove GitHub Pages deploy workflow. Vercel auto-deploys from git push — no CI needed for deploy.

- [ ] **Step 2: Commit**

```bash
git rm .github/workflows/nextjs.yml  # or whatever the file is named
git commit -m "chore: remove GitHub Pages workflow, deploying via Vercel"
```

---

### Task 11: Seed Supabase with initial data

- [ ] **Step 1: Write seed SQL**

Create `supabase/seed.sql` with current hardcoded data as INSERT statements for all 4 tables (contacts, reservation prices, instructor courses). Skicamp terms start empty.

- [ ] **Step 2: Run seed in Supabase SQL editor**

- [ ] **Step 3: Verify frontend pages show seeded data**

Run: `npm run dev`, check `/rezervace`, `/instruktor`, `/skicamp`
Expected: All pages display data from Supabase.

- [ ] **Step 4: Commit**

```bash
git add supabase/seed.sql
git commit -m "chore: add seed data for Supabase tables"
```

---

### Task 12: End-to-end verification

- [ ] **Step 1: Test admin → frontend flow**

1. Open `/admin`, login
2. Add a skicamp term
3. Open `/skicamp` — verify term appears
4. Edit a reservation price in admin
5. Open `/rezervace` — verify updated price shows
6. Edit a contact in admin
7. Open `/rezervace` — verify updated contact

- [ ] **Step 2: Test build**

Run: `npm run build`
Expected: Build succeeds (no static export errors).

- [ ] **Step 3: Final commit if any fixes needed**
