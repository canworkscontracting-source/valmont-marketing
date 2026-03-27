"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">VALMONT</span>
            <span className="text-[10px] text-gray-500 tracking-wider">Powered by VANTIX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/systems" 
              className="text-sm text-gray-300 hover:text-teal transition-colors"
            >
              Systems
            </Link>
            <Link 
              href="/intelligence" 
              className="text-sm text-gray-300 hover:text-teal transition-colors"
            >
              Intelligence
            </Link>
            <Link 
              href="/assurance" 
              className="text-sm text-gray-300 hover:text-teal transition-colors"
            >
              VANTIX
            </Link>
            <Link 
              href="/contact" 
              className="text-sm text-gray-300 hover:text-teal transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-teal transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/systems" 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm text-gray-300 hover:text-teal transition-colors py-2"
              >
                Systems
              </Link>
              <Link 
                href="/intelligence" 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm text-gray-300 hover:text-teal transition-colors py-2"
              >
                Intelligence
              </Link>
              <Link 
                href="/assurance" 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm text-gray-300 hover:text-teal transition-colors py-2"
              >
                VANTIX
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm text-gray-300 hover:text-teal transition-colors py-2"
              >
                Contact
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="px-5 py-3 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300 text-center"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
