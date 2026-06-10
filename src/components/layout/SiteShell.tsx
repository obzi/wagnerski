"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isSherpaSki = pathname === "/skola" || pathname === "/chcibytinstruktor" || pathname?.startsWith("/chcibytinstruktor/");
  const instagramHref = isSherpaSki
    ? "https://www.instagram.com/sherpaski/"
    : "https://www.instagram.com/terapielyzovanim/";

  if (isAdmin) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[52px]">{children}</main>
      <Footer instagramHref={instagramHref} />
    </>
  );
}
