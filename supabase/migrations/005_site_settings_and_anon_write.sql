-- Site settings table
create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null default '',
  created_at timestamptz default now()
);

alter table site_settings enable row level security;

-- Public read access
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'site_settings' and policyname = 'Public read site_settings'
  ) then
    create policy "Public read site_settings" on site_settings for select using (true);
  end if;
end$$;

-- Anon write access (admin uses hardcoded login, not Supabase auth)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'site_settings' and policyname = 'Anon write site_settings'
  ) then
    create policy "Anon write site_settings" on site_settings for all using (true) with check (true);
  end if;
end$$;

-- News table
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  published_at text not null default '',
  created_at timestamptz default now()
);

alter table news enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'news' and policyname = 'Public read news'
  ) then
    create policy "Public read news" on news for select using (true);
  end if;
end$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'news' and policyname = 'Anon write news'
  ) then
    create policy "Anon write news" on news for all using (true) with check (true);
  end if;
end$$;

-- Vouchers table
create table if not exists vouchers (
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

alter table vouchers enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'vouchers' and policyname = 'Public read vouchers'
  ) then
    create policy "Public read vouchers" on vouchers for select using (true);
  end if;
end$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'vouchers' and policyname = 'Anon write vouchers'
  ) then
    create policy "Anon write vouchers" on vouchers for all using (true) with check (true);
  end if;
end$$;

-- Seed default site settings
insert into site_settings (key, value) values
  ('voucher_discount', '15'),
  ('news_max_display', '5'),
  ('voucher_window_enabled', 'false'),
  ('voucher_window_from', ''),
  ('voucher_window_to', ''),
  ('voucher_window_slots', '[{"from":"09:00","to":"17:00"}]')
on conflict (key) do nothing;
