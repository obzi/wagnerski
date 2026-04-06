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
