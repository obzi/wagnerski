"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type {
  SkicampTerm,
  InstructorCourse,
  Contact,
  ReservationPrice,
  SiteSetting,
} from "@/lib/supabase";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Tab = "skicamp" | "kurzy" | "rezervace" | "vouchery" | "kontakty";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const STORAGE_PREFIX = "wagnerski_admin_";

function loadLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveLocal<T>(key: string, data: T) {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/* ------------------------------------------------------------------ */
/*  Supabase CRUD hook                                                 */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Default data                                                       */
/* ------------------------------------------------------------------ */

const defaultTerms: SkicampTerm[] = [];

const defaultCourses: InstructorCourse[] = [
  {
    id: "1",
    level: "D",
    subtitle: "Kvalifikační kurz instruktora",
    hours: "120 hodin",
    description:
      "Základní kvalifikace pro výuku lyžování a snowboardu. Kurz zakončený zkouškou MŠMT ČR.",
    tags: ["Lyžování", "SNB", "Začátečníci"],
    date: "Leden 2026",
    location: "Karlov pod Pradědem",
    price_with_accommodation: 16900,
    price_without_accommodation: 7200,
  },
  {
    id: "2",
    level: "C",
    subtitle: "Specializační kurz",
    hours: "80 hodin",
    description:
      "Rozšíření kvalifikace. Carving, metodika výuky pokročilých, závodní příprava.",
    tags: ["Carving", "Metodika", "Pokročilí"],
    date: "Únor 2026",
    location: "Karlov pod Pradědem",
    price_with_accommodation: 16900,
    price_without_accommodation: 7200,
  },
  {
    id: "3",
    level: "Prolongace",
    subtitle: "Prodloužení licence",
    hours: "24 hodin",
    description:
      "Povinné prodloužení licence MŠMT. Nové trendy, legislativa, praktická výuka.",
    tags: ["Prodloužení", "MŠMT"],
    date: "Prosinec 2025",
    location: "Karlov pod Pradědem",
    price_with_accommodation: 16900,
    price_without_accommodation: 7200,
  },
];

const defaultContacts: Contact[] = [
  {
    id: "1",
    type: "phone",
    label: "Telefon",
    value: "+420 604 681 100",
    url: "tel:+420604681100",
  },
  {
    id: "2",
    type: "email",
    label: "E-mail",
    value: "info@sherpaski.cz",
    url: "mailto:info@sherpaski.cz",
  },
  {
    id: "3",
    type: "address",
    label: "Adresa",
    value: "Karlov pod Pradědem 144, 793 26",
    url: "",
  },
  {
    id: "4",
    type: "facebook",
    label: "Facebook",
    value: "Sherpaski.cz",
    url: "https://www.facebook.com/Sherpaski.cz",
  },
  {
    id: "5",
    type: "instagram",
    label: "Instagram",
    value: "@terapielyzovanim",
    url: "https://www.instagram.com/terapielyzovanim/",
  },
  {
    id: "6",
    type: "hours",
    label: "Otevírací doba",
    value: "9:00 – 16:00",
    url: "",
  },
];

const defaultPrices: ReservationPrice[] = [
  {
    id: "1",
    category: "individual",
    label: "1 hodina",
    duration: "60 min",
    price: "1 190 Kč",
    note: "",
  },
  {
    id: "2",
    category: "individual",
    label: "2 hodiny",
    duration: "120 min",
    price: "1 690 Kč",
    note: "",
  },
  {
    id: "3",
    category: "individual",
    label: "4 hodiny",
    duration: "240 min",
    price: "2 600 Kč",
    note: "Celý den",
  },
  {
    id: "4",
    category: "individual",
    label: "Večerní",
    duration: "60 min",
    price: "1 490 Kč",
    note: "Po 16:00",
  },
  {
    id: "5",
    category: "group",
    label: "Skupinová",
    duration: "od 2 hod",
    price: "1 100 Kč/os",
    note: "Min. 3 osoby",
  },
  {
    id: "6",
    category: "special",
    label: "Dětská zóna",
    duration: "2 hod",
    price: "1 490 Kč",
    note: "3–6 let",
  },
  {
    id: "7",
    category: "special",
    label: "Carving kurz",
    duration: "3 hod",
    price: "1 890 Kč",
    note: "",
  },
  {
    id: "8",
    category: "special",
    label: "Slalom trénink",
    duration: "2 hod",
    price: "1 690 Kč",
    note: "",
  },
  {
    id: "9",
    category: "special",
    label: "Video koučink",
    duration: "2 hod",
    price: "1 890 Kč",
    note: "",
  },
];

const defaultVoucherSettings: SiteSetting[] = [
  { id: "1", key: "voucher_discount", value: "15" },
];

/* ------------------------------------------------------------------ */
/*  Login Component                                                    */
/* ------------------------------------------------------------------ */

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Temporary hardcoded login
    if (email === "admin" && password === "admin") {
      sessionStorage.setItem("wagnerski_auth", "1");
      onLogin();
      setLoading(false);
      return;
    }

    // Supabase login
    if (supabase) {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        setError("Neplatné přihlašovací údaje");
      } else {
        sessionStorage.setItem("wagnerski_auth", "1");
        onLogin();
      }
    } else {
      setError("Neplatné přihlašovací údaje");
    }
    setLoading(false);
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (supabase && email) {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: `${window.location.origin}/admin` }
      );
      if (resetError) {
        setError("Nepodařilo se odeslat e-mail pro reset hesla");
      } else {
        setForgotSent(true);
      }
    } else {
      setError(
        "Reset hesla vyžaduje konfiguraci Supabase. Kontaktujte administrátora."
      );
    }
    setLoading(false);
  }

  if (forgotMode) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-cream border border-line rounded-[3px] p-8">
          <h1 className="text-[20px] font-normal tracking-[-0.02em] mb-2">
            Zapomenuté heslo
          </h1>
          {forgotSent ? (
            <>
              <p className="text-[13px] text-ink-secondary mb-6">
                Odkaz pro reset hesla byl odeslán na váš e-mail.
              </p>
              <button
                onClick={() => {
                  setForgotMode(false);
                  setForgotSent(false);
                }}
                className="text-[12px] text-accent hover:underline"
              >
                Zpět na přihlášení
              </button>
            </>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <p className="text-[13px] text-ink-secondary mb-6">
                Zadejte e-mail a pošleme vám odkaz pro obnovení hesla.
              </p>
              {error && (
                <p className="text-[12px] text-red-600 mb-4">{error}</p>
              )}
              <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-line rounded-[2px] px-3 py-2.5 text-[14px] mb-4 bg-white focus:outline-none focus:border-accent"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-6 py-3 rounded-[2px] hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Odesílám..." : "Odeslat odkaz"}
              </button>
              <button
                type="button"
                onClick={() => setForgotMode(false)}
                className="block mt-4 text-[12px] text-ink-muted hover:text-ink-secondary"
              >
                Zpět na přihlášení
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-cream border border-line rounded-[3px] p-8"
      >
        <h1 className="text-[20px] font-normal tracking-[-0.02em] mb-1">
          Administrace
        </h1>
        <p className="text-[13px] text-ink-secondary mb-6">
          Wagner Ski Akademie
        </p>
        {error && <p className="text-[12px] text-red-600 mb-4">{error}</p>}
        <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1.5">
          Uživatel / E-mail
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-line rounded-[2px] px-3 py-2.5 text-[14px] mb-4 bg-white focus:outline-none focus:border-accent"
          required
        />
        <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1.5">
          Heslo
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-line rounded-[2px] px-3 py-2.5 text-[14px] mb-6 bg-white focus:outline-none focus:border-accent"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-6 py-3 rounded-[2px] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Přihlašuji..." : "Přihlásit se"}
        </button>
        <button
          type="button"
          onClick={() => setForgotMode(true)}
          className="block mt-4 text-[12px] text-ink-muted hover:text-ink-secondary"
        >
          Zapomenuté heslo
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable table / form helpers                                      */
/* ------------------------------------------------------------------ */

const inputCls =
  "w-full border border-line rounded-[2px] px-3 py-2 text-[13px] bg-white focus:outline-none focus:border-accent";
const btnPrimary =
  "bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-5 py-2.5 rounded-[2px] hover:opacity-90 transition-opacity";
const btnDanger =
  "bg-red-600 text-white text-[11px] uppercase tracking-[0.14em] px-4 py-2 rounded-[2px] hover:opacity-90 transition-opacity";
const btnSecondary =
  "border border-line text-ink text-[11px] uppercase tracking-[0.14em] px-5 py-2.5 rounded-[2px] hover:bg-surface transition-colors";

/* ------------------------------------------------------------------ */
/*  Skicamp Terms Manager                                              */
/* ------------------------------------------------------------------ */

function SkicampManager() {
  const { items: terms, loading, add, update, remove } = useSupabaseTable<SkicampTerm>("skicamp_terms", defaultTerms);
  const [editing, setEditing] = useState<SkicampTerm | null>(null);
  const [isNew, setIsNew] = useState(false);

  async function handleDelete(id: string) {
    await remove(id);
  }

  async function handleSave(term: SkicampTerm) {
    if (isNew) {
      const { id: _id, ...rest } = term;
      await add(rest);
    } else {
      const { id, ...changes } = term;
      await update(id, changes);
    }
    setEditing(null);
    setIsNew(false);
  }

  if (loading) {
    return <p className="text-[13px] text-ink-muted">Načítání...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-normal tracking-[-0.01em]">
          Termíny Skicamp
        </h2>
        <button
          className={btnPrimary}
          onClick={() => {
            setIsNew(true);
            setEditing({
              id: uid(),
              camp_type: "Ski Camp",
              date_from: "",
              date_to: "",
              location: "",
              price: 0,
              spots: 0,
              note: "",
            });
          }}
        >
          + Přidat termín
        </button>
      </div>

      {editing && (
        <TermForm
          term={editing}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setIsNew(false); }}
        />
      )}

      {terms.length === 0 && !editing && (
        <p className="text-[13px] text-ink-muted">
          Žádné termíny. Přidejte první termín.
        </p>
      )}

      <div className="space-y-3">
        {terms.map((t) => (
          <div
            key={t.id}
            className="border border-line rounded-[3px] p-4 bg-white flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 min-w-0">
              <span className="text-[14px] font-medium">{t.camp_type}</span>
              <span className="text-[12px] text-ink-muted">
                {t.date_from} — {t.date_to}
              </span>
              <span className="text-[12px] text-ink-secondary">
                {t.location}
              </span>
              {t.price > 0 && (
                <span className="text-[12px] text-accent">
                  {t.price.toLocaleString("cs-CZ")} Kč
                </span>
              )}
              {t.spots > 0 && (
                <span className="text-[12px] text-ink-muted">
                  ({t.spots} míst)
                </span>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                className={btnSecondary}
                onClick={() => { setIsNew(false); setEditing(t); }}
              >
                Upravit
              </button>
              <button className={btnDanger} onClick={() => handleDelete(t.id)}>
                Smazat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TermForm({
  term,
  onSave,
  onCancel,
}: {
  term: SkicampTerm;
  onSave: (t: SkicampTerm) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState(term);
  const set = (k: keyof SkicampTerm, v: string | number) =>
    setData((d) => ({ ...d, [k]: v }));

  return (
    <div className="border border-accent/30 rounded-[3px] p-5 mb-6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Typ kempu
          </label>
          <select
            value={data.camp_type}
            onChange={(e) => set("camp_type", e.target.value)}
            className={inputCls}
          >
            <option>Ski Camp</option>
            <option>SNB Camp</option>
            <option>Race Camp</option>
            <option>Telemark Camp</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Lokalita
          </label>
          <input
            className={inputCls}
            value={data.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="např. Stubai, Rakousko"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Datum od
          </label>
          <input
            type="date"
            className={inputCls}
            value={data.date_from}
            onChange={(e) => set("date_from", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Datum do
          </label>
          <input
            type="date"
            className={inputCls}
            value={data.date_to}
            onChange={(e) => set("date_to", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Cena (Kč)
          </label>
          <input
            type="number"
            className={inputCls}
            value={data.price || ""}
            onChange={(e) => set("price", Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Počet míst
          </label>
          <input
            type="number"
            className={inputCls}
            value={data.spots || ""}
            onChange={(e) => set("spots", Number(e.target.value))}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
          Poznámka
        </label>
        <input
          className={inputCls}
          value={data.note}
          onChange={(e) => set("note", e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <button className={btnPrimary} onClick={() => onSave(data)}>
          Uložit
        </button>
        <button className={btnSecondary} onClick={onCancel}>
          Zrušit
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Instructor Courses Manager                                         */
/* ------------------------------------------------------------------ */

function CoursesManager() {
  const { items: courses, loading, add, update, remove } = useSupabaseTable<InstructorCourse>("instructor_courses", defaultCourses);
  const [editing, setEditing] = useState<InstructorCourse | null>(null);
  const [isNew, setIsNew] = useState(false);

  async function handleDelete(id: string) {
    await remove(id);
  }

  async function handleSave(course: InstructorCourse) {
    if (isNew) {
      const { id: _id, ...rest } = course;
      await add(rest);
    } else {
      const { id, ...changes } = course;
      await update(id, changes);
    }
    setEditing(null);
    setIsNew(false);
  }

  if (loading) {
    return <p className="text-[13px] text-ink-muted">Načítání...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-normal tracking-[-0.01em]">
          Kurzy instruktorů
        </h2>
        <button
          className={btnPrimary}
          onClick={() => {
            setIsNew(true);
            setEditing({
              id: uid(),
              level: "",
              subtitle: "",
              hours: "",
              description: "",
              tags: [],
              date: "",
              location: "Karlov pod Pradědem",
              price_with_accommodation: 0,
              price_without_accommodation: 0,
            });
          }}
        >
          + Přidat kurz
        </button>
      </div>

      {editing && (
        <CourseForm
          course={editing}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setIsNew(false); }}
        />
      )}

      <div className="space-y-3">
        {courses.map((c) => (
          <div
            key={c.id}
            className="border border-line rounded-[3px] p-4 bg-white flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 min-w-0">
              <span className="text-[14px] font-medium">
                Kurz {c.level}
              </span>
              <span className="text-[12px] text-ink-secondary">
                {c.subtitle}
              </span>
              <span className="text-[12px] text-ink-muted">
                {c.hours}
              </span>
              <span className="text-[12px] text-ink-muted">{c.date}</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                className={btnSecondary}
                onClick={() => { setIsNew(false); setEditing(c); }}
              >
                Upravit
              </button>
              <button className={btnDanger} onClick={() => handleDelete(c.id)}>
                Smazat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseForm({
  course,
  onSave,
  onCancel,
}: {
  course: InstructorCourse;
  onSave: (c: InstructorCourse) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState(course);
  const [tagsStr, setTagsStr] = useState(course.tags.join(", "));
  const set = (k: keyof InstructorCourse, v: string | number | string[]) =>
    setData((d) => ({ ...d, [k]: v }));

  return (
    <div className="border border-accent/30 rounded-[3px] p-5 mb-6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Úroveň
          </label>
          <input
            className={inputCls}
            value={data.level}
            onChange={(e) => set("level", e.target.value)}
            placeholder="např. D, C, Prolongace"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Podtitulek
          </label>
          <input
            className={inputCls}
            value={data.subtitle}
            onChange={(e) => set("subtitle", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Hodin
          </label>
          <input
            className={inputCls}
            value={data.hours}
            onChange={(e) => set("hours", e.target.value)}
            placeholder="např. 120 hodin"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Datum
          </label>
          <input
            className={inputCls}
            value={data.date}
            onChange={(e) => set("date", e.target.value)}
            placeholder="např. Leden 2026"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Lokalita
          </label>
          <input
            className={inputCls}
            value={data.location}
            onChange={(e) => set("location", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Tagy (oddělené čárkou)
          </label>
          <input
            className={inputCls}
            value={tagsStr}
            onChange={(e) => {
              setTagsStr(e.target.value);
              set(
                "tags",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              );
            }}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Cena s ubytováním (Kč)
          </label>
          <input
            type="number"
            className={inputCls}
            value={data.price_with_accommodation || ""}
            onChange={(e) =>
              set("price_with_accommodation", Number(e.target.value))
            }
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Cena bez ubytování (Kč)
          </label>
          <input
            type="number"
            className={inputCls}
            value={data.price_without_accommodation || ""}
            onChange={(e) =>
              set("price_without_accommodation", Number(e.target.value))
            }
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
          Popis
        </label>
        <textarea
          className={inputCls + " min-h-[80px]"}
          value={data.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <button className={btnPrimary} onClick={() => onSave(data)}>
          Uložit
        </button>
        <button className={btnSecondary} onClick={onCancel}>
          Zrušit
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reservation Prices Manager                                         */
/* ------------------------------------------------------------------ */

function ReservationManager() {
  const { items: prices, loading, add, update, remove } = useSupabaseTable<ReservationPrice>("reservation_prices", defaultPrices);
  const [editing, setEditing] = useState<ReservationPrice | null>(null);
  const [isNew, setIsNew] = useState(false);

  async function handleDelete(id: string) {
    await remove(id);
  }

  async function handleSave(price: ReservationPrice) {
    if (isNew) {
      const { id: _id, ...rest } = price;
      await add(rest);
    } else {
      const { id, ...changes } = price;
      await update(id, changes);
    }
    setEditing(null);
    setIsNew(false);
  }

  const categories = [
    { key: "individual" as const, label: "Individuální výuka" },
    { key: "group" as const, label: "Skupinová výuka" },
    { key: "special" as const, label: "Speciální programy" },
  ];

  if (loading) {
    return <p className="text-[13px] text-ink-muted">Načítání...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-normal tracking-[-0.01em]">
          Ceník a rezervace
        </h2>
        <button
          className={btnPrimary}
          onClick={() => {
            setIsNew(true);
            setEditing({
              id: uid(),
              category: "individual",
              label: "",
              duration: "",
              price: "",
              note: "",
            });
          }}
        >
          + Přidat položku
        </button>
      </div>

      {editing && (
        <PriceForm
          price={editing}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setIsNew(false); }}
        />
      )}

      {categories.map((cat) => {
        const items = prices.filter((p) => p.category === cat.key);
        if (items.length === 0) return null;
        return (
          <div key={cat.key} className="mb-6">
            <h3 className="text-[13px] uppercase tracking-[0.1em] text-ink-muted mb-3">
              {cat.label}
            </h3>
            <div className="space-y-2">
              {items.map((p) => (
                <div
                  key={p.id}
                  className="border border-line rounded-[3px] p-3 bg-white flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 min-w-0">
                    <span className="text-[14px] font-medium sm:w-32">
                      {p.label}
                    </span>
                    <span className="text-[12px] text-ink-muted">{p.duration}</span>
                    <span className="text-[13px] text-accent font-medium">
                      {p.price}
                    </span>
                    {p.note && (
                      <span className="text-[11px] text-ink-muted">
                        {p.note}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      className={btnSecondary}
                      onClick={() => { setIsNew(false); setEditing(p); }}
                    >
                      Upravit
                    </button>
                    <button
                      className={btnDanger}
                      onClick={() => handleDelete(p.id)}
                    >
                      Smazat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PriceForm({
  price,
  onSave,
  onCancel,
}: {
  price: ReservationPrice;
  onSave: (p: ReservationPrice) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState(price);
  const set = (k: keyof ReservationPrice, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  return (
    <div className="border border-accent/30 rounded-[3px] p-5 mb-6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Kategorie
          </label>
          <select
            value={data.category}
            onChange={(e) => set("category", e.target.value)}
            className={inputCls}
          >
            <option value="individual">Individuální</option>
            <option value="group">Skupinová</option>
            <option value="special">Speciální</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Název
          </label>
          <input
            className={inputCls}
            value={data.label}
            onChange={(e) => set("label", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Doba trvání
          </label>
          <input
            className={inputCls}
            value={data.duration}
            onChange={(e) => set("duration", e.target.value)}
            placeholder="např. 60 min"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Cena
          </label>
          <input
            className={inputCls}
            value={data.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="např. 1 190 Kč"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
          Poznámka
        </label>
        <input
          className={inputCls}
          value={data.note}
          onChange={(e) => set("note", e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <button className={btnPrimary} onClick={() => onSave(data)}>
          Uložit
        </button>
        <button className={btnSecondary} onClick={onCancel}>
          Zrušit
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Contacts Manager                                                   */
/* ------------------------------------------------------------------ */

function ContactsManager() {
  const { items: contacts, loading, add, update, remove } = useSupabaseTable<Contact>("contacts", defaultContacts);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [isNew, setIsNew] = useState(false);

  async function handleDelete(id: string) {
    await remove(id);
  }

  async function handleSave(contact: Contact) {
    if (isNew) {
      const { id: _id, ...rest } = contact;
      await add(rest);
    } else {
      const { id, ...changes } = contact;
      await update(id, changes);
    }
    setEditing(null);
    setIsNew(false);
  }

  if (loading) {
    return <p className="text-[13px] text-ink-muted">Načítání...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-normal tracking-[-0.01em]">
          Kontakty
        </h2>
        <button
          className={btnPrimary}
          onClick={() => {
            setIsNew(true);
            setEditing({
              id: uid(),
              type: "phone",
              label: "",
              value: "",
              url: "",
            });
          }}
        >
          + Přidat kontakt
        </button>
      </div>

      {editing && (
        <ContactForm
          contact={editing}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setIsNew(false); }}
        />
      )}

      <div className="space-y-3">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="border border-line rounded-[3px] p-4 bg-white flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 min-w-0">
              <span className="text-[11px] uppercase tracking-[0.1em] text-ink-muted sm:w-20">
                {c.type}
              </span>
              <span className="text-[14px] break-all">{c.label}</span>
              <span className="text-[13px] text-ink-secondary break-all">{c.value}</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                className={btnSecondary}
                onClick={() => { setIsNew(false); setEditing(c); }}
              >
                Upravit
              </button>
              <button className={btnDanger} onClick={() => handleDelete(c.id)}>
                Smazat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactForm({
  contact,
  onSave,
  onCancel,
}: {
  contact: Contact;
  onSave: (c: Contact) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState(contact);
  const set = (k: keyof Contact, v: string) =>
    setData((d) => ({ ...d, [k]: v as never }));

  return (
    <div className="border border-accent/30 rounded-[3px] p-5 mb-6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Typ
          </label>
          <select
            value={data.type}
            onChange={(e) => set("type", e.target.value)}
            className={inputCls}
          >
            <option value="phone">Telefon</option>
            <option value="email">E-mail</option>
            <option value="address">Adresa</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="hours">Otevírací doba</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Popisek
          </label>
          <input
            className={inputCls}
            value={data.label}
            onChange={(e) => set("label", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Hodnota
          </label>
          <input
            className={inputCls}
            value={data.value}
            onChange={(e) => set("value", e.target.value)}
            placeholder="např. +420 604 681 100"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            URL / odkaz
          </label>
          <input
            className={inputCls}
            value={data.url}
            onChange={(e) => set("url", e.target.value)}
            placeholder="např. tel:+420604681100"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button className={btnPrimary} onClick={() => onSave(data)}>
          Uložit
        </button>
        <button className={btnSecondary} onClick={onCancel}>
          Zrušit
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Voucher Settings Manager                                           */
/* ------------------------------------------------------------------ */

function VoucherSettingsManager() {
  const { items: settings, loading, add, update } = useSupabaseTable<SiteSetting>("site_settings", defaultVoucherSettings);
  const [discountValue, setDiscountValue] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const discount = settings.find((s) => s.key === "voucher_discount");
    if (discount) setDiscountValue(discount.value);
  }, [settings]);

  async function handleSave() {
    const existing = settings.find((s) => s.key === "voucher_discount");
    if (existing) {
      await update(existing.id, { value: discountValue });
    } else {
      await add({ key: "voucher_discount", value: discountValue });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) {
    return <p className="text-[13px] text-ink-muted">Načítání...</p>;
  }

  return (
    <div>
      <h2 className="text-[18px] font-normal tracking-[-0.01em] mb-6">
        Nastavení voucherů
      </h2>
      <div className="border border-line rounded-[3px] p-6 bg-white max-w-md">
        <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
          Sleva na vouchery (%)
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="number"
            min="0"
            max="100"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            className={inputCls + " max-w-[120px]"}
          />
          <button className={btnPrimary} onClick={handleSave}>
            Uložit
          </button>
          {saved && (
            <span className="text-[12px] text-accent">Uloženo</span>
          )}
        </div>
        <p className="text-[11px] text-ink-muted mt-2">
          Výchozí hodnota: 15 %. Sleva se aplikuje na všechny vouchery.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("skicamp");

  const tabs: { key: Tab; label: string }[] = [
    { key: "skicamp", label: "Skicamp termíny" },
    { key: "kurzy", label: "Kurzy instruktorů" },
    { key: "rezervace", label: "Ceník / rezervace" },
    { key: "vouchery", label: "Vouchery" },
    { key: "kontakty", label: "Kontakty" },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-cream border-b border-line px-4 sm:px-7 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink">
              Admin
            </span>
            <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted ml-3">
              Wagner Ski Akademie
            </span>
          </div>
          <button
            onClick={onLogout}
            className="text-[11px] uppercase tracking-[0.14em] text-ink-muted hover:text-ink transition-colors"
          >
            Odhlásit
          </button>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-7 py-6">
        <div className="flex gap-1 mb-8 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`text-[11px] uppercase tracking-[0.14em] px-5 py-2.5 rounded-[2px] whitespace-nowrap transition-colors ${
                tab === t.key
                  ? "bg-ink text-cream"
                  : "text-ink-secondary hover:bg-cream"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "skicamp" && <SkicampManager />}
        {tab === "kurzy" && <CoursesManager />}
        {tab === "rezervace" && <ReservationManager />}
        {tab === "vouchery" && <VoucherSettingsManager />}
        {tab === "kontakty" && <ContactsManager />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Admin Page                                                    */
/* ------------------------------------------------------------------ */

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("wagnerski_auth") === "1") {
      setAuthed(true);
    }
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("wagnerski_auth");
    if (supabase) supabase.auth.signOut();
    setAuthed(false);
  }

  if (!authed) {
    return <LoginForm onLogin={() => setAuthed(true)} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
