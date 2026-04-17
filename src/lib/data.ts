import { supabase } from "./supabase";
import type {
  SkicampTerm,
  InstructorCourse,
  Contact,
  ReservationPrice,
  Voucher,
  SiteSetting,
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

export async function getSiteSettings(): Promise<SiteSetting[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("site_settings")
    .select("*");
  return (data as SiteSetting[]) ?? [];
}

export async function getVoucherDiscount(): Promise<number> {
  const settings = await getSiteSettings();
  const discount = settings.find((s) => s.key === "voucher_discount");
  return discount ? parseFloat(discount.value) : 15;
}
