"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function GlowButton({ 
  children, 
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "" 
}: GlowButtonProps) {
  const sizes = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-8 py-4 text-sm",
    lg: "px-10 py-5 text-base",
  };

  const variants = {
    primary: "bg-teal hover:bg-teal-600 text-black shadow-glow hover:shadow-glow-lg",
    secondary: "bg-transparent border-2 border-teal hover:border-teal text-teal hover:bg-teal/10 shadow-glow-sm hover:shadow-glow",
  };

  const buttonClasses = `
    relative
    font-bold 
    tracking-wide 
    uppercase 
    rounded-lg
    transition-all 
    duration-300
    overflow-hidden
    group
    ${sizes[size]}
    ${variants[variant]}
    ${className}
  `;

  const content = (
    <>
      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-teal/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        <svg 
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {content}
    </button>
  );
}
