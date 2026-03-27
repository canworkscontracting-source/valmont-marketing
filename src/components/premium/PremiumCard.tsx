"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  delay?: number;
}

export default function PremiumCard({ 
  children, 
  className = "", 
  hover = true,
  glow = true,
  delay = 0 
}: PremiumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hover ? { 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
      className={`
        relative
        backdrop-blur-sm 
        bg-gradient-to-br from-white/[0.05] to-white/[0.02]
        border border-white/10
        rounded-2xl
        p-8
        transition-all duration-500
        ${hover ? 'hover:border-teal/40 hover:shadow-3d-hover' : ''}
        ${glow ? 'shadow-3d' : 'shadow-premium'}
        ${className}
      `}
    >
      {/* Inner glow effect */}
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom glow line */}
      {glow && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.div>
  );
}
