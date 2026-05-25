import { supabase } from "./supabase";
import type {
  SkicampTerm,
  InstructorCourse,
  Contact,
  ReservationPrice,
  Voucher,
  SiteSetting,
  NewsItem,
  CampType,
  CourseType,
} from "./supabase";

export async function getSkicampTerms(): Promise<SkicampTerm[]> {
  if (!supabase) return [];
  const today = new Date().toISOString().split("T")[0];
  const { data } = await supabase
    .from("skicamp_terms")
    .select("*")
    .order("date_from", { ascending: true });
  const all = (data as SkicampTerm[]) ?? [];

  const byType = new Map<string, SkicampTerm[]>();
  for (const t of all) {
    if (!byType.has(t.camp_type)) byType.set(t.camp_type, []);
    byType.get(t.camp_type)!.push(t);
  }

  const result: SkicampTerm[] = [];
  for (const terms of byType.values()) {
    const future = terms.filter((t) => t.date_to >= today);
    if (future.length > 0) {
      result.push(...future);
    } else {
      result.push(terms[terms.length - 1]);
    }
  }

  return result.sort((a, b) => a.date_from.localeCompare(b.date_from));
}

export async function getInstructorCourses(): Promise<InstructorCourse[]> {
  if (!supabase) return [];
  const today = new Date().toISOString().split("T")[0];
  const { data } = await supabase
    .from("instructor_courses")
    .select("*")
    .order("date", { ascending: true });
  const all = (data as InstructorCourse[]) ?? [];

  const byLevel = new Map<string, InstructorCourse[]>();
  for (const c of all) {
    if (!byLevel.has(c.level)) byLevel.set(c.level, []);
    byLevel.get(c.level)!.push(c);
  }

  const result: InstructorCourse[] = [];
  for (const courses of byLevel.values()) {
    const future = courses.filter((c) => !c.date_end || c.date_end >= today);
    if (future.length > 0) {
      result.push(...future);
    } else {
      result.push(courses[courses.length - 1]);
    }
  }

  return result.sort((a, b) => a.date.localeCompare(b.date));
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

export async function createVoucher(
  voucher: Omit<Voucher, "id" | "created_at" | "redeemed_at" | "status" | "valid_from"> & { valid_from?: string }
): Promise<Voucher | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("vouchers")
    .insert({
      ...voucher,
      status: "active",
      valid_from: voucher.valid_from ?? new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw error;
  return data as Voucher;
}

export async function getSiteSettings(): Promise<SiteSetting[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("site_settings")
    .select("*");
  return (data as SiteSetting[]) ?? [];
}

export async function getNewsMaxDisplay(): Promise<number> {
  const settings = await getSiteSettings();
  const setting = settings.find((s) => s.key === "news_max_display");
  return setting ? parseInt(setting.value, 10) : 5;
}

export async function getNews(): Promise<NewsItem[]> {
  if (!supabase) return [];
  const limit = await getNewsMaxDisplay();
  const { data } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data as NewsItem[]) ?? [];
}

export async function getVoucherDiscount(): Promise<number> {
  const settings = await getSiteSettings();
  const discount = settings.find((s) => s.key === "voucher_discount");
  return discount ? parseFloat(discount.value) : 15;
}

export type TimeSlot = { from: string; to: string };

export type VoucherWindowSettings = {
  enabled: boolean;
  from: string;
  to: string;
  slots: TimeSlot[];
};

export async function getVoucherWindowSettings(): Promise<VoucherWindowSettings> {
  const settings = await getSiteSettings();
  const enabled = settings.find((s) => s.key === "voucher_window_enabled")?.value === "true";
  const from = settings.find((s) => s.key === "voucher_window_from")?.value ?? "";
  const to = settings.find((s) => s.key === "voucher_window_to")?.value ?? "";
  const slotsRaw = settings.find((s) => s.key === "voucher_window_slots")?.value ?? "";
  let slots: TimeSlot[] = [];
  try {
    if (slotsRaw) slots = JSON.parse(slotsRaw);
  } catch {
    slots = [];
  }
  if (slots.length === 0) slots = [{ from: "09:00", to: "17:00" }];
  return { enabled, from, to, slots };
}

export async function getCampTypes(): Promise<CampType[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("camp_types")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data as CampType[]) ?? [];
}

export async function getCourseTypes(): Promise<CourseType[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("course_types")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data as CourseType[]) ?? [];
}
