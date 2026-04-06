export const individualPrices = [
  { service: "1 hodina (50 min)", price: "1 190 Kč", note: "další osoba +790 Kč" },
  { service: "2 hodiny", price: "2 300 Kč", note: "další osoba +1 100 Kč", highlight: true },
  { service: "4 hodiny", price: "4 700 Kč", note: "další osoba +1 600 Kč" },
  { service: "Večerní lekce (18–20h)", price: "2 600 Kč", note: "další osoba +1 100 Kč" },
];

export const specialPrices = [
  { service: "Dětská bezpečná zóna (do 4 let)", price: "1 090 Kč / hod" },
  { service: "Carving (pátek)", price: "3 300 Kč", note: "další osoba +1 700 Kč" },
  { service: "Obří slalom s trenérem", price: "1 900 Kč / hod" },
  { service: "Video coaching (2 hod)", price: "6 700 Kč" },
];

export const groupPrices = [
  { service: "Skupinová lekce 2 hodiny (min. 3 osoby)", price: "1 100 Kč / os.", note: "Po, St, Čt 14:00–16:00" },
];

export const instructorCourses = [
  {
    level: "Kurz D",
    subtitle: "Instruktor základního lyžování / snowboardu (IZL/IZS)",
    hours: "60 hodin",
    description:
      "Základní kurz pro budoucí instruktory. Akreditace MŠMT ČR č. 18064/2024-2. Po úspěšném absolvování získáte celoživotní licenci platnou v celé ČR.",
    tags: ["MŠMT akreditace", "60 hodin", "Celoživotní licence"],
    date: "16. – 21. prosince 2025",
    location: "Karlov pod Pradědem",
  },
  {
    level: "Kurz C",
    subtitle: "Instruktor lyžování / snowboardu (IZL/IZS) — vyšší kvalifikace",
    hours: "70–100 hodin",
    description:
      "Navazující kurz pro držitele licence D. Rozšíření kompetencí, prohloubení metodiky výuky a techniky. Vyšší kvalifikační stupeň.",
    tags: ["MŠMT akreditace", "70–100 hodin", "Navazující"],
    date: "5. – 10. ledna 2026",
    location: "Karlov pod Pradědem",
  },
  {
    level: "Prolongace",
    subtitle: "Prodloužení platnosti licence",
    hours: "3 dny",
    description:
      "Pro instruktory s expirující licencí. Aktualizace metodiky, nové trendy ve výuce, obnovení certifikace.",
    tags: ["Obnovení licence", "3 dny"],
    date: "19. – 21. prosince 2025",
    location: "Karlov pod Pradědem",
  },
];

export const instructorIncluded = [
  "Ubytování v hotelovém komplexu s polopenzí",
  "Skipasy po celou dobu kurzu",
  "Výukové materiály a skripta",
  "Odborné přednášky (psychologie, horská služba, Freeride World Tour)",
  "Celoživotně platná certifikace v celé ČR",
  "Bonusový carvingový workshop",
  "Speciální tričko absolventa",
  "Možnost wellness v hotelu",
];
