"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedMetricProps {
  value: string | number;
  label: string;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

export default function AnimatedMetric({ 
  value, 
  label, 
  suffix = "", 
  prefix = "",
  delay = 0 
}: AnimatedMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  // Extract numeric value
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[^0-9.]/g, '')) 
    : value;

  const displayValue = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView && !isNaN(numericValue)) {
      setTimeout(() => {
        motionValue.set(numericValue);
      }, delay * 1000);
    }
  }, [isInView, numericValue, motionValue, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (displayValue.current) {
        // Handle decimal places
        const formatted = latest % 1 !== 0 
          ? latest.toFixed(1) 
          : Math.floor(latest).toString();
        displayValue.current.textContent = prefix + formatted + suffix;
      }
    });

    return () => unsubscribe();
  }, [springValue, prefix, suffix]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="text-center group"
    >
      {/* Animated background glow */}
      <div className="relative">
        <div className="absolute inset-0 bg-teal/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-teal/30 transition-all duration-500">
          {/* Value */}
          <div className="text-5xl md:text-6xl font-black mb-2">
            <span 
              ref={displayValue}
              className="bg-gradient-to-br from-teal-300 via-teal-400 to-teal-600 bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {prefix}{numericValue}{suffix}
            </span>
          </div>
          
          {/* Label */}
          <div className="text-xs font-medium uppercase tracking-wider text-gray-400">
            {label}
          </div>

          {/* Animated bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
            className="h-1 w-full bg-gradient-to-r from-teal/20 via-teal/60 to-teal/20 rounded-full mt-4 origin-left"
          />
        </div>
      </div>
    </motion.div>
  );
}
