import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f6f2",
};

export const metadata: Metadata = {
  title: "Výuka lyžování | WAGNER Ski and SNB akademie",
  description:
    "Lyžařská a snowboardová akademie od roku 2005. Sherpa Ski School v Jeseníkách, zahraniční campy v Alpách, akreditované kurzy MŠMT ČR. Jen instruktoři s licencí.",
  keywords:
    "lyžařská škola, snowboard škola, Karlov pod Pradědem, instruktor lyžování, kurz MŠMT, skicamp Alpy, telemark",
  icons: {
    icon: "/wagnerski/favicon.svg",
  },
  openGraph: {
    title: "Výuka lyžování | WAGNER Ski and SNB akademie",
    description:
      "Lyžařská a snowboardová akademie od roku 2005. Sherpa Ski School, Skicamp Alpy, kurzy MŠMT.",
    url: "https://obzi.github.io/wagnerski/",
    siteName: "Wagner Ski Akademie",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Výuka lyžování | WAGNER Ski and SNB akademie",
    description:
      "Lyžařská a snowboardová akademie od roku 2005. Jen instruktoři s licencí MŠMT.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 pt-[52px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
