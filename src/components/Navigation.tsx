"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/systems", label: "Systems" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/assurance", label: "Assurance" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-teal/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_20px_rgba(0,212,191,0.6)] animate-glow-pulse" />
            <span className="text-xl font-bold tracking-tight font-mono uppercase">
              VALMONT MARKETING
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors duration-200 ${
                    isActive
                      ? "text-teal"
                      : "text-gray-400 hover:text-teal-300"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden md:block px-6 py-2.5 text-sm font-bold tracking-wide uppercase bg-teal/10 hover:bg-teal/20 border border-teal/30 hover:border-teal/60 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,191,0.3)]"
          >
            Start a Project
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <div className="w-6 h-0.5 bg-teal mb-1.5" />
            <div className="w-6 h-0.5 bg-teal mb-1.5" />
            <div className="w-6 h-0.5 bg-teal" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
