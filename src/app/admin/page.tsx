"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import type {
  SkicampTerm,
  InstructorCourse,
  Contact,
  ReservationPrice,
  SiteSetting,
  NewsItem,
  CampType,
  CourseType,
} from "@/lib/supabase";
import texts from "@/data/texts.json";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Tab =
  | "aktuality"
  | "skicamp"
  | "kurzy"
  | "rezervace"
  | "nastaveni"
  | "kontakty";

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

const defaultCampTypes: CampType[] = texts.skicamp.camps.items.map((c, i) => ({
  id: String(i + 1),
  title: c.title,
  description: c.description,
  tags: c.tags,
  sort_order: (i + 1) * 10,
}));

const defaultCourseTypes: CourseType[] = [
  {
    id: "1",
    title: "Kurz D",
    description:
      "Základní kvalifikace pro výuku lyžování a snowboardu. Kurz zakončený zkouškou MŠMT ČR.",
    tags: ["Lyžování", "SNB", "Začátečníci"],
    sort_order: 10,
  },
  {
    id: "2",
    title: "Kurz C",
    description:
      "Rozšíření kvalifikace. Carving, metodika výuky pokročilých, závodní příprava.",
    tags: ["Carving", "Metodika", "Pokročilí"],
    sort_order: 20,
  },
  {
    id: "3",
    title: "Prolongace",
    description:
      "Povinné prodloužení licence MŠMT. Nové trendy, legislativa, praktická výuka.",
    tags: ["Prodloužení", "MŠMT"],
    sort_order: 30,
  },
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
        setError("${texts.admin.login.invalidCredentials}");
      } else {
        sessionStorage.setItem("wagnerski_auth", "1");
        onLogin();
      }
    } else {
      setError("${texts.admin.login.invalidCredentials}");
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
        setError(texts.admin.login.forgotError);
      } else {
        setForgotSent(true);
      }
    } else {
      setError(texts.admin.login.forgotNoSupabase);
    }
    setLoading(false);
  }

  if (forgotMode) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-cream border border-line rounded-[3px] p-8">
          <h1 className="text-[20px] font-normal tracking-[-0.02em] mb-2">
            {texts.admin.login.forgotTitle}
          </h1>
          {forgotSent ? (
            <>
              <p className="text-[13px] text-ink-secondary mb-6">
                {texts.admin.login.forgotSuccess}
              </p>
              <button
                onClick={() => {
                  setForgotMode(false);
                  setForgotSent(false);
                }}
                className="text-[12px] text-accent hover:underline"
              >
                {texts.admin.login.forgotBack}
              </button>
            </>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <p className="text-[13px] text-ink-secondary mb-6">
                {texts.admin.login.forgotDescription}
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
                {loading ? texts.admin.login.forgotSubmitting : texts.admin.login.forgotSubmit}
              </button>
              <button
                type="button"
                onClick={() => setForgotMode(false)}
                className="block mt-4 text-[12px] text-ink-muted hover:text-ink-secondary"
              >
                {texts.admin.login.forgotBack}
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
          {texts.admin.login.title}
        </h1>
        <p className="text-[13px] text-ink-secondary mb-6">
          {texts.admin.login.subtitle}
        </p>
        {error && <p className="text-[12px] text-red-600 mb-4">{error}</p>}
        <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1.5">
          {texts.admin.login.usernameLabel}
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-line rounded-[2px] px-3 py-2.5 text-[14px] mb-4 bg-white focus:outline-none focus:border-accent"
          required
        />
        <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1.5">
          {texts.admin.login.passwordLabel}
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
          {loading ? texts.admin.login.submitting : texts.admin.login.submitButton}
        </button>
        <button
          type="button"
          onClick={() => setForgotMode(true)}
          className="block mt-4 text-[12px] text-ink-muted hover:text-ink-secondary"
        >
          {texts.admin.login.forgotPassword}
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
    return <p className="text-[13px] text-ink-muted">{texts.admin.common.loading}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-normal tracking-[-0.01em]">
          {texts.admin.skicamp.title}
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
          {texts.admin.skicamp.addButton}
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
          {texts.admin.skicamp.empty}
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
                {texts.admin.common.edit}
              </button>
              <button className={btnDanger} onClick={() => handleDelete(t.id)}>
                {texts.admin.common.delete}
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
          {texts.admin.common.save}
        </button>
        <button className={btnSecondary} onClick={onCancel}>
          {texts.admin.common.cancel}
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
    return <p className="text-[13px] text-ink-muted">{texts.admin.common.loading}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-normal tracking-[-0.01em]">
          {texts.admin.courses.title}
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
          {texts.admin.courses.addButton}
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
                {texts.admin.common.edit}
              </button>
              <button className={btnDanger} onClick={() => handleDelete(c.id)}>
                {texts.admin.common.delete}
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
          {texts.admin.common.save}
        </button>
        <button className={btnSecondary} onClick={onCancel}>
          {texts.admin.common.cancel}
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
    { key: "individual" as const, label: texts.admin.reservation.categories.individual },
    { key: "group" as const, label: texts.admin.reservation.categories.group },
    { key: "special" as const, label: texts.admin.reservation.categories.special },
  ];

  if (loading) {
    return <p className="text-[13px] text-ink-muted">{texts.admin.common.loading}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-normal tracking-[-0.01em]">
          {texts.admin.reservation.title}
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
          {texts.admin.reservation.addButton}
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
                      {texts.admin.common.edit}
                    </button>
                    <button
                      className={btnDanger}
                      onClick={() => handleDelete(p.id)}
                    >
                      {texts.admin.common.delete}
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
          {texts.admin.common.save}
        </button>
        <button className={btnSecondary} onClick={onCancel}>
          {texts.admin.common.cancel}
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
    return <p className="text-[13px] text-ink-muted">{texts.admin.common.loading}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-normal tracking-[-0.01em]">
          {texts.admin.contacts.title}
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
          {texts.admin.contacts.addButton}
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
                {texts.admin.common.edit}
              </button>
              <button className={btnDanger} onClick={() => handleDelete(c.id)}>
                {texts.admin.common.delete}
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
          {texts.admin.common.save}
        </button>
        <button className={btnSecondary} onClick={onCancel}>
          {texts.admin.common.cancel}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Voucher Settings Manager                                           */
/* ------------------------------------------------------------------ */

function SettingsManager() {
  const { items: settings, loading, add, update } = useSupabaseTable<SiteSetting>("site_settings", defaultVoucherSettings);
  const [discountValue, setDiscountValue] = useState("");
  const [newsMaxValue, setNewsMaxValue] = useState("5");
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    const discount = settings.find((s) => s.key === "voucher_discount");
    if (discount) setDiscountValue(discount.value);
    const newsMax = settings.find((s) => s.key === "news_max_display");
    if (newsMax) setNewsMaxValue(newsMax.value);
  }, [settings]);

  async function saveSetting(key: string, value: string) {
    const existing = settings.find((s) => s.key === key);
    if (existing) {
      await update(existing.id, { value });
    } else {
      await add({ key, value });
    }
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  }

  if (loading) {
    return <p className="text-[13px] text-ink-muted">{texts.admin.common.loading}</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[18px] font-normal tracking-[-0.01em] mb-6">
          {texts.admin.settings.title}
        </h2>
      </div>

      <div className="border border-line rounded-[3px] p-6 bg-white max-w-md">
        <h3 className="text-[13px] font-medium tracking-[-0.01em] mb-4">{texts.admin.settings.voucher.title}</h3>
        <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
          {texts.admin.settings.voucher.discountLabel}
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
          <button className={btnPrimary} onClick={() => saveSetting("voucher_discount", discountValue)}>
            {texts.admin.common.save}
          </button>
          {saved === "voucher_discount" && (
            <span className="text-[12px] text-accent">{texts.admin.common.saved}</span>
          )}
        </div>
        <p className="text-[11px] text-ink-muted mt-2">
          {texts.admin.settings.voucher.discountNote}
        </p>
      </div>

      <div className="border border-line rounded-[3px] p-6 bg-white max-w-md">
        <h3 className="text-[13px] font-medium tracking-[-0.01em] mb-4">{texts.admin.settings.news.title}</h3>
        <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
          {texts.admin.settings.news.maxLabel}
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="number"
            min="1"
            max="20"
            value={newsMaxValue}
            onChange={(e) => setNewsMaxValue(e.target.value)}
            className={inputCls + " max-w-[120px]"}
          />
          <button className={btnPrimary} onClick={() => saveSetting("news_max_display", newsMaxValue)}>
            {texts.admin.common.save}
          </button>
          {saved === "news_max_display" && (
            <span className="text-[12px] text-accent">{texts.admin.common.saved}</span>
          )}
        </div>
        <p className="text-[11px] text-ink-muted mt-2">
          {texts.admin.settings.news.maxNote}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  News Manager                                                       */
/* ------------------------------------------------------------------ */

function NewsManager() {
  const { items: news, loading, add, update, remove } = useSupabaseTable<NewsItem>("news", []);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  async function handleDelete(id: string) {
    await remove(id);
  }

  async function handleSave(item: NewsItem) {
    if (isNew) {
      const { id: _id, ...rest } = item;
      await add(rest);
    } else {
      const { id, ...changes } = item;
      await update(id, changes);
    }
    setEditing(null);
    setIsNew(false);
  }

  if (loading) {
    return <p className="text-[13px] text-ink-muted">{texts.admin.common.loading}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-normal tracking-[-0.01em]">
          {texts.admin.news.title}
        </h2>
        <button
          className={btnPrimary}
          onClick={() => {
            setIsNew(true);
            setEditing({
              id: uid(),
              title: "",
              body: "",
              published_at: new Date().toISOString().split("T")[0],
            });
          }}
        >
          {texts.admin.news.addButton}
        </button>
      </div>

      {editing && (
        <NewsForm
          item={editing}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setIsNew(false); }}
        />
      )}

      {news.length === 0 && !editing && (
        <p className="text-[13px] text-ink-muted">
          {texts.admin.news.empty}
        </p>
      )}

      <div className="space-y-3">
        {[...news].sort((a, b) => b.published_at.localeCompare(a.published_at)).map((n) => (
          <div
            key={n.id}
            className="border border-line rounded-[3px] p-4 bg-white flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <span className="text-[14px] font-medium">{n.title}</span>
                <span className="text-[11px] text-ink-muted">
                  {new Date(n.published_at).toLocaleDateString("cs-CZ")}
                </span>
              </div>
              <p className="text-[12px] text-ink-secondary line-clamp-2">
                {n.body}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                className={btnSecondary}
                onClick={() => { setIsNew(false); setEditing(n); }}
              >
                {texts.admin.common.edit}
              </button>
              <button className={btnDanger} onClick={() => handleDelete(n.id)}>
                {texts.admin.common.delete}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsForm({
  item,
  onSave,
  onCancel,
}: {
  item: NewsItem;
  onSave: (n: NewsItem) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState(item);
  const set = (k: keyof NewsItem, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  return (
    <div className="border border-accent/30 rounded-[3px] p-5 mb-6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="sm:col-span-2">
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Nadpis
          </label>
          <input
            className={inputCls}
            value={data.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Nadpis aktuality"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Datum publikace
          </label>
          <input
            type="date"
            className={inputCls}
            value={data.published_at.split("T")[0]}
            onChange={(e) => set("published_at", e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
          Text
        </label>
        <textarea
          className={inputCls + " min-h-[120px]"}
          value={data.body}
          onChange={(e) => set("body", e.target.value)}
          placeholder="Text aktuality..."
        />
      </div>
      <div className="flex gap-3">
        <button className={btnPrimary} onClick={() => onSave(data)}>
          {texts.admin.common.save}
        </button>
        <button className={btnSecondary} onClick={onCancel}>
          {texts.admin.common.cancel}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Type Card Manager (shared by Camp Types & Course Types)            */
/* ------------------------------------------------------------------ */

type TypeCard = CampType | CourseType;

function TypeCardManager<T extends TypeCard>({
  table,
  defaults,
  labels,
}: {
  table: string;
  defaults: T[];
  labels: { title: string; addButton: string; empty: string; placeholder: string };
}) {
  const { items, loading, add, update, remove } = useSupabaseTable<T>(table, defaults);
  const [editing, setEditing] = useState<T | null>(null);
  const [isNew, setIsNew] = useState(false);
  const seeded = useRef(false);

  useEffect(() => {
    if (!supabase) return;
    if (loading || seeded.current) return;
    if (items.length > 0) {
      seeded.current = true;
      return;
    }
    seeded.current = true;
    (async () => {
      for (const d of defaults) {
        const { id: _id, ...rest } = d;
        await add(rest as Omit<T, "id">);
      }
    })();
  }, [loading, items, defaults, add]);

  async function handleSave(card: T) {
    if (isNew) {
      const { id: _id, ...rest } = card;
      await add(rest as Omit<T, "id">);
    } else {
      const { id, ...changes } = card;
      await update(id, changes as Partial<T>);
    }
    setEditing(null);
    setIsNew(false);
  }

  if (loading) {
    return <p className="text-[13px] text-ink-muted">{texts.admin.common.loading}</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[18px] font-normal tracking-[-0.01em]">{labels.title}</h2>
        <button
          className={btnPrimary}
          onClick={() => {
            setIsNew(true);
            setEditing({
              id: uid(),
              title: "",
              description: "",
              tags: [] as string[],
              sort_order: (items.length + 1) * 10,
            } as unknown as T);
          }}
        >
          {labels.addButton}
        </button>
      </div>

      {editing && (
        <TypeCardForm
          card={editing}
          placeholder={labels.placeholder}
          onSave={handleSave}
          onCancel={() => { setEditing(null); setIsNew(false); }}
        />
      )}

      {items.length === 0 && !editing && (
        <p className="text-[13px] text-ink-muted">{labels.empty}</p>
      )}

      <div className="space-y-3">
        {items.map((c) => (
          <div
            key={c.id}
            className="border border-line rounded-[3px] p-4 bg-white flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <span className="text-[14px] font-medium">{c.title}</span>
                <span className="text-[11px] text-ink-muted">#{c.sort_order}</span>
              </div>
              <p className="text-[12px] text-ink-secondary line-clamp-2 mb-2">
                {c.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span key={t} className="text-[10px] uppercase tracking-[0.1em] text-ink-muted border border-line rounded-[2px] px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                className={btnSecondary}
                onClick={() => { setIsNew(false); setEditing(c); }}
              >
                {texts.admin.common.edit}
              </button>
              <button className={btnDanger} onClick={() => remove(c.id)}>
                {texts.admin.common.delete}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeCardForm<T extends TypeCard>({
  card,
  placeholder,
  onSave,
  onCancel,
}: {
  card: T;
  placeholder: string;
  onSave: (c: T) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState(card);
  const [tagsStr, setTagsStr] = useState(card.tags.join(", "));
  const set = <K extends keyof T>(k: K, v: T[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  return (
    <div className="border border-accent/30 rounded-[3px] p-5 mb-6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Název
          </label>
          <input
            className={inputCls}
            value={data.title}
            onChange={(e) => set("title", e.target.value as T[keyof T])}
            placeholder={placeholder}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Pořadí
          </label>
          <input
            type="number"
            className={inputCls}
            value={data.sort_order || 0}
            onChange={(e) => set("sort_order", Number(e.target.value) as T[keyof T])}
          />
        </div>
        <div className="sm:col-span-2">
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
                  .filter(Boolean) as T[keyof T]
              );
            }}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
          Popis
        </label>
        <textarea
          className={inputCls + " min-h-[100px]"}
          value={data.description}
          onChange={(e) => set("description", e.target.value as T[keyof T])}
        />
      </div>
      <div className="flex gap-3">
        <button className={btnPrimary} onClick={() => onSave(data)}>
          {texts.admin.common.save}
        </button>
        <button className={btnSecondary} onClick={onCancel}>
          {texts.admin.common.cancel}
        </button>
      </div>
    </div>
  );
}

function CampTypesManager() {
  return (
    <TypeCardManager<CampType>
      table="camp_types"
      defaults={defaultCampTypes}
      labels={{
        title: texts.admin.campTypes.title,
        addButton: texts.admin.campTypes.addButton,
        empty: texts.admin.campTypes.empty,
        placeholder: texts.admin.campTypes.form.titlePlaceholder,
      }}
    />
  );
}

function CourseTypesManager() {
  return (
    <TypeCardManager<CourseType>
      table="course_types"
      defaults={defaultCourseTypes}
      labels={{
        title: texts.admin.courseTypes.title,
        addButton: texts.admin.courseTypes.addButton,
        empty: texts.admin.courseTypes.empty,
        placeholder: texts.admin.courseTypes.form.titlePlaceholder,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("aktuality");

  const tabs = texts.admin.tabs as { key: Tab; label: string }[];

  return (
    <div className="min-h-screen bg-surface">
      <header className="bg-cream border-b border-line px-4 sm:px-7 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink">
              {texts.admin.header.title}
            </span>
            <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted ml-3">
              {texts.admin.header.subtitle}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="text-[11px] uppercase tracking-[0.14em] text-ink-muted hover:text-ink transition-colors"
          >
            {texts.admin.header.logout}
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

        {tab === "aktuality" && <NewsManager />}
        {tab === "skicamp" && (
          <div className="space-y-12">
            <SkicampManager />
            <CampTypesManager />
          </div>
        )}
        {tab === "kurzy" && (
          <div className="space-y-12">
            <CoursesManager />
            <CourseTypesManager />
          </div>
        )}
        {tab === "rezervace" && <ReservationManager />}
        {tab === "nastaveni" && <SettingsManager />}
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
