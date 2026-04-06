-- Contacts
INSERT INTO contacts (type, label, value, url, sort_order) VALUES
  ('phone', 'Telefon', '+420 604 681 100', 'tel:+420604681100', 1),
  ('email', 'E-mail', 'info@sherpaski.cz', 'mailto:info@sherpaski.cz', 2),
  ('address', 'Adresa', 'Karlov pod Pradědem 144, 793 26', '', 3),
  ('facebook', 'Facebook', 'Sherpaski.cz', 'https://www.facebook.com/Sherpaski.cz', 4),
  ('instagram', 'Instagram', '@terapielyzovanim', 'https://www.instagram.com/terapielyzovanim/', 5);

-- Reservation prices: individual
INSERT INTO reservation_prices (category, label, duration, price, note, sort_order) VALUES
  ('individual', '1 hodina', '50 min', '1 190 Kč', 'další osoba +790 Kč', 1),
  ('individual', '2 hodiny', '100 min', '2 300 Kč', 'další osoba +1 100 Kč', 2),
  ('individual', '4 hodiny', '200 min', '4 700 Kč', 'další osoba +1 600 Kč', 3),
  ('individual', 'Večerní lekce', '18–20h', '2 600 Kč', 'další osoba +1 100 Kč', 4);

-- Reservation prices: group
INSERT INTO reservation_prices (category, label, duration, price, note, sort_order) VALUES
  ('group', 'Skupinová lekce 2 hodiny', 'min. 3 osoby', '1 100 Kč / os.', 'Po, St, Čt 14:00–16:00', 10);

-- Reservation prices: special
INSERT INTO reservation_prices (category, label, duration, price, note, sort_order) VALUES
  ('special', 'Dětská bezpečná zóna', 'do 4 let', '1 090 Kč / hod', '', 20),
  ('special', 'Carving', 'pátek', '3 300 Kč', 'další osoba +1 700 Kč', 21),
  ('special', 'Obří slalom s trenérem', '1 hod', '1 900 Kč / hod', '', 22),
  ('special', 'Video coaching', '2 hod', '6 700 Kč', '', 23);

-- Instructor courses
INSERT INTO instructor_courses (level, subtitle, hours, description, tags, date, location, price_with_accommodation, price_without_accommodation) VALUES
  ('Kurz D', 'Instruktor základního lyžování / snowboardu (IZL/IZS)', '60 hodin',
   'Základní kurz pro budoucí instruktory. Akreditace MŠMT ČR č. 18064/2024-2. Po úspěšném absolvování získáte celoživotní licenci platnou v celé ČR.',
   ARRAY['MŠMT akreditace', '60 hodin', 'Celoživotní licence'],
   '16. – 21. prosince 2025', 'Karlov pod Pradědem', 16900, 7200),
  ('Kurz C', 'Instruktor lyžování / snowboardu (IZL/IZS) — vyšší kvalifikace', '70–100 hodin',
   'Navazující kurz pro držitele licence D. Rozšíření kompetencí, prohloubení metodiky výuky a techniky. Vyšší kvalifikační stupeň.',
   ARRAY['MŠMT akreditace', '70–100 hodin', 'Navazující'],
   '5. – 10. ledna 2026', 'Karlov pod Pradědem', 16900, 7200),
  ('Prolongace', 'Prodloužení platnosti licence', '3 dny',
   'Pro instruktory s expirující licencí. Aktualizace metodiky, nové trendy ve výuce, obnovení certifikace.',
   ARRAY['Obnovení licence', '3 dny'],
   '19. – 21. prosince 2025', 'Karlov pod Pradědem', 16900, 7200);
