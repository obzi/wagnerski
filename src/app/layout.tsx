import type { Metadata } from "next";
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
});

export const metadata: Metadata = {
  title: "Wagner Ski Akademie | Lyžařská škola Sherpa · Skicamp · Kurzy MŠMT",
  description:
    "Lyžařská a snowboardová akademie od roku 2005. Sherpa Ski School v Jeseníkách, zahraniční campy v Alpách, akreditované kurzy MŠMT ČR. Jen instruktoři s licencí.",
  keywords:
    "lyžařská škola, snowboard škola, Karlov pod Pradědem, instruktor lyžování, kurz MŠMT, skicamp Alpy, telemark",
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
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
