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
