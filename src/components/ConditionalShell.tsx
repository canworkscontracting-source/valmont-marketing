"use client";
import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isVantix = pathname?.startsWith("/vantix");

  return (
    <>
      {!isVantix && <Navigation />}
      {children}
      {!isVantix && <Footer />}
    </>
  );
}
