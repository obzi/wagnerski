-- Wagner Ski Akademie — DB update script
-- Run once in Supabase SQL editor

-- 1. Voucher discount
UPDATE site_settings SET value = '10' WHERE key = 'voucher_discount';

-- 2. Contacts — phones
-- Add Sherpa Ski School phone (sort_order 1), shift existing to sort_order 2
UPDATE contacts SET sort_order = 2, label = 'Wagner Ski Akademie' WHERE type = 'phone';
INSERT INTO contacts (type, label, value, url, sort_order)
  VALUES ('phone', 'Sherpa Ski School', '+420 604 220 100', 'tel:+420604220100', 1);

-- 3. Contacts — address
UPDATE contacts SET value = 'Karlov 183, 79336 Karlov pod Pradědem' WHERE type = 'address';

-- 4. Contacts — instagram
UPDATE contacts
  SET value = '@sherpaski', url = 'https://www.instagram.com/sherpaski/'
  WHERE type = 'instagram';

-- 5. Camp types — fix SNB Camp (remove freeride, add technika)
UPDATE camp_types
  SET
    description = 'Snowboardový kemp zaměřený na techniku jízdy a základy jízdy ve freeridu. Alpský terén nabízí podmínky, které v ČR nenajdete.',
    tags = ARRAY['Snowboard', 'Technika', 'Carving', 'Alpy']
  WHERE title = 'SNB Camp';

-- 6. Camp types — fix Race Camp typo (Ledovcoý → Ledovcový)
UPDATE camp_types
  SET description = 'Ledovcový kemp. Nácvik jízd v branách SL, GS. Přípravné cvičení. Bourání bloků od začátku. Správné prvotní krůčky k závodní technice. Zažijte si pocit závodníka s trenérem AD.'
  WHERE title = 'Race Camp';

-- 7. Course types — fix Kurz C (carving → nácvik paralelního oblouku)
UPDATE course_types
  SET
    description = 'Rozšíření kvalifikace. Nácvik paralelního oblouku, metodika výuky pokročilých, závodní příprava.',
    tags = ARRAY['Nácvik paralelního oblouku', 'Metodika', 'Pokročilí']
  WHERE title = 'Kurz C';

-- 8. Course types — add new types
INSERT INTO course_types (title, description, tags, sort_order) VALUES
  (
    'Prolongace L',
    'Povinné prodloužení licence instruktora lyžování MŠMT. Nové trendy, legislativa, praktická výuka na sněhu.',
    ARRAY['Prodloužení', 'MŠMT', 'Lyžování'],
    31
  ),
  (
    'Prolongace SNB',
    'Povinné prodloužení licence instruktora snowboardingu MŠMT. Nové trendy, legislativa, praktická výuka na sněhu.',
    ARRAY['Prodloužení', 'MŠMT', 'Snowboard'],
    32
  ),
  (
    'Přípravný kurz na profesní zkoušku',
    'Příprava ke zkoušce profesní kvalifikace — nezbytné pro otevření vlastní lyžařské školy. Kurz pokrývá lyžařskou odbornost, základy podnikání, marketing a legislativu.',
    ARRAY['Profesní zkouška', 'Podnikání', 'Marketing'],
    40
  );

-- 9. Reservation prices — workshop special categories
INSERT INTO reservation_prices (category, label, duration, price, note, sort_order) VALUES
  ('special', 'GS workshop', 'pro civil i instruktory s P.W.', 'Na vyžádání', '', 30),
  ('special', 'Carving workshop', 's lektorem Skicamp.cz', 'Na vyžádání', '', 31),
  ('special', 'Zdokonalovací workshop pro výuku v lyžařské škole', '', 'Na vyžádání', '', 32);
