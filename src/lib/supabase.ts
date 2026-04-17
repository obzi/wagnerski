import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export type SkicampTerm = {
  id: string;
  camp_type: string;
  date_from: string;
  date_to: string;
  location: string;
  price: number;
  spots: number;
  note: string;
};

export type InstructorCourse = {
  id: string;
  level: string;
  subtitle: string;
  hours: string;
  description: string;
  tags: string[];
  date: string;
  location: string;
  price_with_accommodation: number;
  price_without_accommodation: number;
};

export type Contact = {
  id: string;
  type: "phone" | "email" | "address" | "facebook" | "instagram" | "hours";
  label: string;
  value: string;
  url: string;
};

export type ReservationPrice = {
  id: string;
  category: "individual" | "group" | "special";
  label: string;
  duration: string;
  price: string;
  note: string;
};

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
