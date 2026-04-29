-- Camp types (Druhy kempů) — public skicamp page
create table camp_types (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  tags text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

-- Course types (Druhy kurzů) — public instruktor page
create table course_types (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  tags text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

alter table camp_types enable row level security;
alter table course_types enable row level security;

create policy "Public read camp_types" on camp_types for select using (true);
create policy "Public read course_types" on course_types for select using (true);

create policy "Auth write camp_types" on camp_types for all using (auth.role() = 'authenticated');
create policy "Auth write course_types" on course_types for all using (auth.role() = 'authenticated');

-- Seed defaults pulled from src/data/texts.json
insert into camp_types (title, description, tags, sort_order) values
  (
    'Ski Camp',
    'Intenzivní lyžařský kemp na ledovci.  Technická příprava, carving (race, fun, base), paralelní lyžování. Pro pokročilé lyžaře, kterým jde o to nejen lépe vypadat na lyžích, ale hlavně se lépe citít v oblouku.',
    array['Pokročilí', 'Carving', 'Technika', 'Alpy'],
    10
  ),
  (
    'SNB Camp',
    'Snowboardový kemp zaměřený na techniku jízdya freeride. Alpský terén nabízí podmínky, které v ČR nenajdete.',
    array['Snowboard', 'Freeride', 'Alpy'],
    20
  ),
  (
    'Race Camp',
    'Ledovcoý kemp. Nácvik jízd v branách SL, GS. Přípravné cvičení. Bourání bloků od začátku. Správné prvotní krůčky k závodní technice. Zažijte si pocit závodníka s trenérem AD.',
    array['Závodní příprava', 'Slalom', 'GS', 'Video analýza'],
    30
  ),
  (
    'Telemark Camp',
    'Telemarkový kemp pro všechny úrovně.',
    array['Telemark', 'Všechny úrovně', 'Alpy'],
    40
  );

insert into course_types (title, description, tags, sort_order) values
  (
    'Kurz D',
    'Základní kvalifikace pro výuku lyžování a snowboardu. Kurz zakončený zkouškou MŠMT ČR.',
    array['Lyžování', 'SNB', 'Začátečníci'],
    10
  ),
  (
    'Kurz C',
    'Rozšíření kvalifikace. Carving, metodika výuky pokročilých, závodní příprava.',
    array['Carving', 'Metodika', 'Pokročilí'],
    20
  ),
  (
    'Prolongace',
    'Povinné prodloužení licence MŠMT. Nové trendy, legislativa, praktická výuka.',
    array['Prodloužení', 'MŠMT'],
    30
  );
