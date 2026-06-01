-- Wagner Ski Akademie — kompletní schema pro nový Supabase projekt
-- Spusť celý tento soubor v SQL Editoru nového projektu (jednorázově)
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. Základní tabulky ──────────────────────────────────────────────────────

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

create table instructor_courses (
  id uuid primary key default gen_random_uuid(),
  level text not null,
  subtitle text not null default '',
  hours text not null default '',
  description text not null default '',
  tags text[] not null default '{}',
  date text not null default '',
  date_end date,
  location text not null default 'Karlov pod Pradědem',
  price_with_accommodation numeric not null default 0,
  price_without_accommodation numeric not null default 0,
  created_at timestamptz default now()
);

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

-- 'hours' je součástí check hned od začátku (oproti originálním migracím)
create table contacts (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('phone', 'email', 'address', 'facebook', 'instagram', 'hours')),
  label text not null,
  value text not null,
  url text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

create table camp_types (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  tags text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

create table course_types (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  tags text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

create table site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null default '',
  created_at timestamptz default now()
);

create table news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  published_at text not null default '',
  created_at timestamptz default now()
);

create table vouchers (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  service_label text not null default '',
  duration_minutes integer not null default 60,
  original_price numeric not null default 0,
  discounted_price numeric not null default 0,
  buyer_name text not null default '',
  buyer_email text not null default '',
  status text not null default 'active' check (status in ('active', 'redeemed', 'expired')),
  valid_from text not null default '',
  valid_until text not null default '',
  redeemed_at timestamptz,
  created_at timestamptz default now()
);

-- ── 2. Row Level Security ────────────────────────────────────────────────────

alter table skicamp_terms enable row level security;
alter table instructor_courses enable row level security;
alter table reservation_prices enable row level security;
alter table contacts enable row level security;
alter table camp_types enable row level security;
alter table course_types enable row level security;
alter table site_settings enable row level security;
alter table news enable row level security;
alter table vouchers enable row level security;

-- Veřejné čtení pro všechny tabulky
create policy "Public read skicamp_terms"      on skicamp_terms      for select using (true);
create policy "Public read instructor_courses" on instructor_courses  for select using (true);
create policy "Public read reservation_prices" on reservation_prices  for select using (true);
create policy "Public read contacts"           on contacts            for select using (true);
create policy "Public read camp_types"         on camp_types          for select using (true);
create policy "Public read course_types"       on course_types        for select using (true);
create policy "Public read site_settings"      on site_settings       for select using (true);
create policy "Public read news"               on news                for select using (true);
create policy "Public read vouchers"           on vouchers            for select using (true);

-- Zápis jen pro přihlášeného admina
create policy "Auth write skicamp_terms"      on skicamp_terms      for all using (auth.role() = 'authenticated');
create policy "Auth write instructor_courses" on instructor_courses  for all using (auth.role() = 'authenticated');
create policy "Auth write reservation_prices" on reservation_prices  for all using (auth.role() = 'authenticated');
create policy "Auth write contacts"           on contacts            for all using (auth.role() = 'authenticated');
create policy "Auth write camp_types"         on camp_types          for all using (auth.role() = 'authenticated');
create policy "Auth write course_types"       on course_types        for all using (auth.role() = 'authenticated');

-- Anon zápis (admin panel nepoužívá Supabase auth)
create policy "Anon write site_settings" on site_settings for all using (true) with check (true);
create policy "Anon write news"          on news          for all using (true) with check (true);
create policy "Anon write vouchers"      on vouchers      for all using (true) with check (true);

-- ── 3. Výchozí data ─────────────────────────────────────────────────────────

insert into site_settings (key, value) values
  ('voucher_discount',        '15'),
  ('news_max_display',        '5'),
  ('voucher_window_enabled',  'false'),
  ('voucher_window_from',     ''),
  ('voucher_window_to',       ''),
  ('voucher_window_slots',    '[{"from":"09:00","to":"17:00"}]')
on conflict (key) do nothing;
