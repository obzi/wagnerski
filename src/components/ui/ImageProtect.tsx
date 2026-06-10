"use client";
import { useEffect } from "react";

export function ImageProtect() {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") e.preventDefault();
    };
    document.addEventListener("contextmenu", handle);
    return () => document.removeEventListener("contextmenu", handle);
  }, []);
  return null;
}
