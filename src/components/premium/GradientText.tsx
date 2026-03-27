"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export default function GradientText({ 
  children, 
  className = "",
  animate = true 
}: GradientTextProps) {
  const MotionComponent = animate ? motion.h1 : "h1";
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  } : {};

  return (
    <MotionComponent
      {...animationProps}
      className={`
        bg-gradient-to-r from-white via-teal-100 to-teal-300
        bg-clip-text text-transparent
        font-bold
        ${className}
      `}
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </MotionComponent>
  );
}
