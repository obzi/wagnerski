import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import texts from "@/data/texts.json";
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
  title: texts.meta.home.title,
  description: texts.meta.home.description,
  keywords: texts.meta.home.keywords,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: texts.meta.home.ogTitle,
    description: texts.meta.home.ogDescription,
    url: "https://wagnerski.vercel.app/",
    siteName: texts.meta.home.ogSiteName,
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: texts.meta.home.twitterTitle,
    description: texts.meta.home.twitterDescription,
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
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
