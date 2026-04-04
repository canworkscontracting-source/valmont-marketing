"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ─── Animated Counter ─── */
function Counter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ─── Reveal wrapper ─── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── SVG Icons ─── */
const Icons = {
  connect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/>
      <path d="M8 12h10M16 6l2 6-2 6"/>
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      <path d="M6 8l3 3 3-3 4 4"/>
    </svg>
  ),
  analyze: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h3l3-7 4 14 3-7h3"/><circle cx="19" cy="12" r="2"/>
    </svg>
  ),
  decide: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
    </svg>
  ),
  automate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  ),
  improve: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12l-4-4v3H3v2h15v3z"/><path d="M2 6l4 4-4 4"/>
    </svg>
  ),
  lead: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  content: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  ads: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  crm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  research: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  performance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  funnel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/><line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="16" y2="17"/>
    </svg>
  ),
  risk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  predict: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  startup: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  university: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  business: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  ecom: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  agency: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  enterprise: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v18H3z"/><path d="M3 9h18M9 21V9"/>
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
};

/* ─── PAGE COMPONENT ─── */
export default function VantixPage() {
  return (
    <div className="relative min-h-screen" style={{ background: "#050a0f", color: "#e8f0f8" }}>

      {/* ── Global CSS ── */}
      <style>{`
        @keyframes float-up {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-28px) scale(1.1); opacity: 0.7; }
        }
        @keyframes flow-down {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes node-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,200,255,0.35), 0 0 20px rgba(0,200,255,0.2); }
          50% { box-shadow: 0 0 0 10px rgba(0,200,255,0), 0 0 40px rgba(0,200,255,0.45); }
        }
        @keyframes vantix-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(0,200,255,0.4), 0 0 60px rgba(0,200,255,0.15); }
          50% { text-shadow: 0 0 40px rgba(0,200,255,0.7), 0 0 100px rgba(0,200,255,0.3); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          0% { transform: rotate(120deg) translateX(80px) rotate(-120deg); }
          100% { transform: rotate(480deg) translateX(80px) rotate(-480deg); }
        }
        @keyframes orbit3 {
          0% { transform: rotate(240deg) translateX(55px) rotate(-240deg); }
          100% { transform: rotate(600deg) translateX(55px) rotate(-600deg); }
        }
        @keyframes data-stream {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
        @keyframes border-glow {
          0%, 100% { border-color: rgba(0,200,255,0.15); }
          50% { border-color: rgba(0,200,255,0.45); }
        }
        @keyframes scan-line {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .particle { position: absolute; border-radius: 50%; background: rgba(0,200,255,0.5); animation: float-up linear infinite; pointer-events: none; }
        .flow-dot { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: linear-gradient(135deg, #00c8ff, #0080ff); animation: flow-down 2.2s ease-in-out infinite; left: calc(50% - 3px); box-shadow: 0 0 8px rgba(0,200,255,0.8); }
        .node-vantix { animation: node-pulse 2s ease-in-out infinite; }
        .glow-text { animation: vantix-glow 3s ease-in-out infinite; }
        .card-glass {
          background: linear-gradient(135deg, rgba(0,200,255,0.04) 0%, rgba(0,128,255,0.02) 100%);
          border: 1px solid rgba(0,200,255,0.12);
          backdrop-filter: blur(12px);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
          border-radius: 16px;
        }
        .card-glass:hover {
          background: linear-gradient(135deg, rgba(0,200,255,0.09) 0%, rgba(0,128,255,0.05) 100%);
          border-color: rgba(0,200,255,0.35);
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0,200,255,0.12), 0 0 0 1px rgba(0,200,255,0.18);
        }
        .module-card {
          background: linear-gradient(135deg, rgba(0,200,255,0.05) 0%, rgba(0,128,255,0.03) 100%);
          border: 1px solid rgba(0,200,255,0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
          animation: border-glow 3s ease-in-out infinite;
        }
        .module-card:hover {
          border-color: rgba(0,200,255,0.5);
          background: linear-gradient(135deg, rgba(0,200,255,0.10) 0%, rgba(0,128,255,0.06) 100%);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0,200,255,0.15);
        }
        .btn-primary {
          background: linear-gradient(135deg, #00c8ff, #0080ff);
          color: #050a0f;
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-primary:hover { box-shadow: 0 0 30px rgba(0,200,255,0.5), 0 8px 30px rgba(0,128,255,0.3); transform: translateY(-2px); }
        .btn-outline {
          background: transparent;
          color: #00c8ff;
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 8px;
          border: 1.5px solid rgba(0,200,255,0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-outline:hover { border-color: #00c8ff; background: rgba(0,200,255,0.08); box-shadow: 0 0 20px rgba(0,200,255,0.2); }
        .section-label { color: #00c8ff; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
        .section-label::before { content: ''; display: block; width: 24px; height: 1px; background: #00c8ff; }
        .diagram-node {
          background: linear-gradient(135deg, rgba(0,200,255,0.08), rgba(0,128,255,0.05));
          border: 1px solid rgba(0,200,255,0.25);
          border-radius: 10px;
          padding: 12px 20px;
          font-size: 13px;
          font-weight: 600;
          color: #e8f0f8;
          white-space: nowrap;
          transition: all 0.3s ease;
        }
        .diagram-node:hover { border-color: rgba(0,200,255,0.6); box-shadow: 0 0 20px rgba(0,200,255,0.2); }
        .diagram-node-highlight {
          background: linear-gradient(135deg, rgba(0,200,255,0.18), rgba(0,128,255,0.12));
          border-color: rgba(0,200,255,0.5);
          color: #00c8ff;
          box-shadow: 0 0 30px rgba(0,200,255,0.25);
        }
        .positioning-line {
          border-left: 2px solid rgba(0,200,255,0.4);
          padding-left: 20px;
          color: rgba(232,240,248,0.6);
          font-size: 14px;
          font-style: italic;
        }
        .scan-overlay {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,200,255,0.6), transparent);
          animation: scan-line 4s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      {/* ── Floating Particles ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 8}s`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
        {/* Ambient glow blobs */}
        <div style={{ position: "absolute", top: "10%", left: "15%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,200,255,0.07) 0%, transparent 70%)", filter: "blur(60px)", animation: "float-up 12s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "50%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,128,255,0.06) 0%, transparent 70%)", filter: "blur(50px)", animation: "float-up 15s ease-in-out infinite 3s" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "40%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(80,0,255,0.04) 0%, transparent 70%)", filter: "blur(70px)", animation: "float-up 18s ease-in-out infinite 6s" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ════════════════════════════════════
            SECTION 1 — HERO
        ════════════════════════════════════ */}
        <section style={{ padding: "100px 0 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div className="flex flex-col lg:flex-row items-center gap-16">

              {/* Left: Text */}
              <div className="flex-1 text-center lg:text-left">
                <Reveal>
                  <div className="section-label">VANTIX AI</div>
                  <h1 style={{
                    fontSize: "clamp(48px, 7vw, 90px)",
                    fontWeight: 900,
                    lineHeight: 1.0,
                    letterSpacing: "-0.04em",
                    margin: "0 0 12px",
                    background: "linear-gradient(135deg, #ffffff 0%, #00c8ff 50%, #0080ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }} className="glow-text">
                    VANTIX AI
                  </h1>
                  <p style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 600, color: "rgba(232,240,248,0.8)", marginBottom: "24px", lineHeight: 1.3 }}>
                    The Intelligence Layer for Modern Organizations.
                  </p>
                  <p style={{ fontSize: "16px", color: "rgba(232,240,248,0.55)", lineHeight: 1.8, maxWidth: "540px", margin: "0 auto 36px" }} className="lg:mx-0">
                    VANTIX AI connects your systems, analyzes your data, automates workflows, and improves performance. It works as the intelligence engine behind your business.
                  </p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }} className="lg:justify-start">
                    <Link href="/contact"><button className="btn-primary">Request Demo</button></Link>
                    <Link href="/contact"><button className="btn-outline">Book Consultation</button></Link>
                  </div>

                  {/* Positioning line */}
                  <div className="positioning-line mt-10 hidden lg:block">
                    VANTIX AI is the intelligence layer behind your company.
                  </div>
                </Reveal>
              </div>

              {/* Right: AI Core Animation */}
              <Reveal delay={0.2} className="flex-1 flex justify-center">
                <div style={{ position: "relative", width: "320px", height: "320px" }} className="hidden lg:flex items-center justify-center">
                  {/* Orbital rings */}
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(0,200,255,0.12)" }} />
                  <div style={{ position: "absolute", inset: "30px", borderRadius: "50%", border: "1px solid rgba(0,200,255,0.08)" }} />
                  <div style={{ position: "absolute", inset: "60px", borderRadius: "50%", border: "1px solid rgba(0,200,255,0.06)" }} />

                  {/* Center core */}
                  <div className="node-vantix" style={{
                    width: "90px", height: "90px", borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(0,200,255,0.25), rgba(0,128,255,0.15))",
                    border: "2px solid rgba(0,200,255,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", zIndex: 10,
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#00c8ff", letterSpacing: "0.06em" }}>VANTIX AI</span>
                  </div>

                  {/* Orbiting nodes */}
                  {[
                    { label: "DATA", delay: "0s", anim: "orbit" },
                    { label: "ADS", delay: "0s", anim: "orbit2" },
                    { label: "CRM", delay: "0s", anim: "orbit3" },
                  ].map((n) => (
                    <div key={n.label} style={{
                      position: "absolute", inset: 0, animation: `${n.anim} 8s linear infinite`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{
                        width: "44px", height: "44px", borderRadius: "50%",
                        background: "linear-gradient(135deg, rgba(0,200,255,0.15), rgba(0,128,255,0.08))",
                        border: "1px solid rgba(0,200,255,0.35)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "9px", fontWeight: 700, color: "rgba(0,200,255,0.9)",
                        letterSpacing: "0.05em",
                      }}>
                        {n.label}
                      </div>
                    </div>
                  ))}

                  {/* Scan overlay */}
                  <div className="scan-overlay" />
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 2 — WHAT IS VANTIX AI
        ════════════════════════════════════ */}
        <section style={{ padding: "80px 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <Reveal>
              <div className="section-label">ABOUT</div>
              <div className="flex flex-col lg:flex-row gap-12 items-start">

                {/* Left: Text */}
                <div className="flex-1">
                  <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 20px", lineHeight: 1.1 }}>
                    What is VANTIX AI?
                  </h2>
                  <p style={{ color: "rgba(232,240,248,0.65)", lineHeight: 1.85, fontSize: "15px", marginBottom: "16px" }}>
                    VANTIX AI is an intelligence and automation engine. It connects marketing, sales, communication, data, and operations into one intelligent system.
                  </p>
                  <p style={{ color: "rgba(232,240,248,0.65)", lineHeight: 1.85, fontSize: "15px" }}>
                    It monitors performance, analyzes behavior, automates tasks, and provides decision support — continuously, in the background.
                  </p>
                  <div className="positioning-line mt-8">
                    This is not a marketing tool. This is an intelligence system.
                  </div>
                </div>

                {/* Right: Comparison table */}
                <div className="flex-1 max-w-lg w-full">
                  <div className="card-glass" style={{ padding: "4px", overflow: "hidden" }}>
                    {/* Header */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid rgba(0,200,255,0.1)" }}>
                      <div style={{ padding: "14px 20px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(232,240,248,0.4)", textTransform: "uppercase" }}>Without VANTIX</div>
                      <div style={{ padding: "14px 20px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#00c8ff", textTransform: "uppercase", borderLeft: "1px solid rgba(0,200,255,0.1)" }}>With VANTIX AI</div>
                    </div>
                    {[
                      ["Separate tools", "Connected system"],
                      ["Manual work", "Automated workflows"],
                      ["Reports", "Intelligence"],
                      ["Guess decisions", "Data decisions"],
                      ["Slow growth", "Optimized growth"],
                    ].map(([left, right], i) => (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: i < 4 ? "1px solid rgba(0,200,255,0.06)" : "none" }}>
                        <div style={{ padding: "14px 20px", fontSize: "13px", color: "rgba(232,240,248,0.45)", display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ color: "rgba(255,80,80,0.6)", fontSize: "16px" }}>✕</span> {left}
                        </div>
                        <div style={{ padding: "14px 20px", fontSize: "13px", color: "rgba(232,240,248,0.85)", borderLeft: "1px solid rgba(0,200,255,0.1)", display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ color: "#00c8ff", fontSize: "16px" }}>✓</span> {right}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 3 — WHAT VANTIX AI DOES
        ════════════════════════════════════ */}
        <section style={{ padding: "80px 0", background: "linear-gradient(180deg, transparent, rgba(0,200,255,0.02), transparent)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <Reveal>
              <div className="section-label">CAPABILITIES</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "8px" }}>
                What VANTIX AI Does
              </h2>
              <p style={{ color: "rgba(232,240,248,0.5)", fontSize: "14px", marginBottom: "40px" }}>
                VANTIX AI works continuously in the background, monitoring and improving your business systems.
              </p>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {[
                { icon: Icons.connect, title: "Connect", desc: "Connects all your tools, platforms, and systems into one unified intelligence layer.", delay: 0 },
                { icon: Icons.monitor, title: "Monitor", desc: "Tracks performance, behavior, and system health across every channel 24/7.", delay: 0.05 },
                { icon: Icons.analyze, title: "Analyze", desc: "Finds patterns, anomalies, and opportunities hidden in your data.", delay: 0.1 },
                { icon: Icons.decide, title: "Decide", desc: "Suggests data-driven actions and recommendations based on real signals.", delay: 0.15 },
                { icon: Icons.automate, title: "Automate", desc: "Runs workflows, follow-ups, and optimizations without manual intervention.", delay: 0.2 },
                { icon: Icons.improve, title: "Improve", desc: "Continuously optimizes performance across all connected systems.", delay: 0.25 },
              ].map((item) => (
                <Reveal key={item.title} delay={item.delay}>
                  <div className="card-glass" style={{ padding: "28px", height: "100%" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", color: "#00c8ff", flexShrink: 0 }}>
                      <div style={{ width: "22px", height: "22px" }}>{item.icon}</div>
                    </div>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", letterSpacing: "-0.01em" }}>{item.title}</h3>
                    <p style={{ fontSize: "13px", color: "rgba(232,240,248,0.55)", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 4 — MODULES
        ════════════════════════════════════ */}
        <section style={{ padding: "80px 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <Reveal>
              <div className="section-label">MODULES</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "8px" }}>
                VANTIX AI Modules
              </h2>
              <p style={{ color: "rgba(232,240,248,0.5)", fontSize: "14px", marginBottom: "40px" }}>
                Each module is a specialized intelligence layer that plugs into your existing systems.
              </p>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
              {[
                { icon: Icons.performance, title: "Performance Monitoring", desc: "Tracks performance across all channels", delay: 0 },
                { icon: Icons.lead, title: "Lead Intelligence", desc: "Tracks and scores leads in real time", delay: 0.04 },
                { icon: Icons.automate, title: "Automation Engine", desc: "Runs automated workflows end-to-end", delay: 0.08 },
                { icon: Icons.content, title: "Content Intelligence", desc: "Monitors content performance signals", delay: 0.12 },
                { icon: Icons.ads, title: "Ads Intelligence", desc: "Optimizes ad spend and targeting", delay: 0.16 },
                { icon: Icons.funnel, title: "Funnel Intelligence", desc: "Tracks conversion at every stage", delay: 0.20 },
                { icon: Icons.crm, title: "CRM Intelligence", desc: "Enriches and updates customer records", delay: 0.24 },
                { icon: Icons.report, title: "Reporting Engine", desc: "Generates structured intelligence reports", delay: 0.28 },
                { icon: Icons.risk, title: "Risk Monitoring", desc: "Detects anomalies and sends alerts", delay: 0.32 },
                { icon: Icons.predict, title: "Predictive Engine", desc: "Forecasts trends and growth opportunities", delay: 0.36 },
              ].map((mod) => (
                <Reveal key={mod.title} delay={mod.delay}>
                  <div className="module-card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ color: "#00c8ff", width: "20px", height: "20px", flexShrink: 0 }}>{mod.icon}</div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.01em" }}>{mod.title}</p>
                      <p style={{ fontSize: "12px", color: "rgba(232,240,248,0.45)", margin: 0, lineHeight: 1.5 }}>{mod.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 5 — SYSTEM DIAGRAM
        ════════════════════════════════════ */}
        <section style={{ padding: "80px 0", background: "linear-gradient(180deg, transparent, rgba(0,200,255,0.03), transparent)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <Reveal>
              <div className="section-label">ARCHITECTURE</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "8px" }}>
                VANTIX AI System Diagram
              </h2>
              <p style={{ color: "rgba(232,240,248,0.5)", fontSize: "14px", marginBottom: "48px" }}>
                VANTIX AI connects, monitors, and improves every part of the system continuously.
              </p>
            </Reveal>

            {/* Desktop diagram */}
            <Reveal delay={0.1}>
              <div className="card-glass hidden md:block" style={{ padding: "48px 40px", position: "relative", overflow: "hidden" }}>
                <div className="scan-overlay" />

                {/* VANTIX AI core */}
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <div className="node-vantix" style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    padding: "14px 32px", borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(0,200,255,0.18), rgba(0,128,255,0.12))",
                    border: "2px solid rgba(0,200,255,0.5)",
                    fontSize: "15px", fontWeight: 800, color: "#00c8ff", letterSpacing: "0.06em",
                  }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00c8ff" }} />
                    VANTIX AI — Intelligence Engine
                  </div>
                  {/* Down arrow */}
                  <div style={{ height: "32px", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                    <div style={{ width: "1px", height: "100%", background: "linear-gradient(180deg, rgba(0,200,255,0.6), rgba(0,200,255,0.1))", position: "relative" }}>
                      <div className="flow-dot" />
                    </div>
                  </div>
                </div>

                {/* System nodes row */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
                  {["Website", "CRM", "Ads", "Content", "Automation"].map((node, i) => (
                    <div key={node} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div className="diagram-node">{node}</div>
                      {i < 4 && (
                        <div style={{ color: "rgba(0,200,255,0.5)", fontSize: "18px", fontWeight: 300 }}>—</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Down arrow */}
                <div style={{ height: "32px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ width: "1px", height: "100%", background: "linear-gradient(180deg, rgba(0,200,255,0.4), rgba(0,200,255,0.1))", position: "relative" }}>
                    <div className="flow-dot" style={{ animationDelay: "1.1s" }} />
                  </div>
                </div>

                {/* Customers */}
                <div style={{ textAlign: "center", margin: "0 0 8px" }}>
                  <div className="diagram-node" style={{ display: "inline-block" }}>Customers</div>
                </div>
                <div style={{ height: "32px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ width: "1px", height: "100%", background: "linear-gradient(180deg, rgba(0,200,255,0.3), rgba(0,200,255,0.1))", position: "relative" }}>
                    <div className="flow-dot" style={{ animationDelay: "0.6s" }} />
                  </div>
                </div>

                {/* Data */}
                <div style={{ textAlign: "center", margin: "0 0 8px" }}>
                  <div className="diagram-node" style={{ display: "inline-block" }}>Data Feedback Loop</div>
                </div>
                <div style={{ height: "32px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ width: "1px", height: "100%", background: "linear-gradient(180deg, rgba(0,200,255,0.3), rgba(0,200,255,0.6))", position: "relative" }}>
                    <div className="flow-dot" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>

                {/* Back to VANTIX AI */}
                <div style={{ textAlign: "center" }}>
                  <div className="node-vantix" style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    padding: "12px 28px", borderRadius: "10px",
                    background: "linear-gradient(135deg, rgba(0,200,255,0.12), rgba(0,128,255,0.08))",
                    border: "1px solid rgba(0,200,255,0.35)",
                    fontSize: "13px", fontWeight: 700, color: "#00c8ff", letterSpacing: "0.05em",
                  }}>
                    ↺ VANTIX AI Learns &amp; Improves
                  </div>
                </div>
              </div>

              {/* Mobile vertical diagram */}
              <div className="md:hidden" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
                {[
                  { label: "VANTIX AI", highlight: true },
                  { label: "↓" },
                  { label: "Website · CRM · Ads · Content · Automation", small: true },
                  { label: "↓" },
                  { label: "Customers" },
                  { label: "↓" },
                  { label: "Data Feedback" },
                  { label: "↓" },
                  { label: "↺ VANTIX AI Learns", highlight: true },
                ].map((item, i) => (
                  item.label === "↓"
                    ? <div key={i} style={{ height: "28px", width: "1px", background: "linear-gradient(180deg, rgba(0,200,255,0.5), rgba(0,200,255,0.2))", position: "relative" }}>
                        <div className="flow-dot" style={{ animationDelay: `${i * 0.3}s` }} />
                      </div>
                    : <div key={i} className={item.highlight ? "diagram-node diagram-node-highlight" : "diagram-node"} style={{ textAlign: "center", fontSize: item.small ? "12px" : "14px", padding: "12px 18px" }}>
                        {item.label}
                      </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 6 — AI AGENTS
        ════════════════════════════════════ */}
        <section style={{ padding: "80px 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <Reveal>
              <div className="section-label">AI AGENTS</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "8px" }}>
                AI Agents
              </h2>
              <p style={{ color: "rgba(232,240,248,0.5)", fontSize: "14px", marginBottom: "40px" }}>
                AI agents handle tasks automatically, reducing manual work and improving response time.
              </p>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "14px" }}>
              {[
                { icon: Icons.lead, title: "Lead Agent", role: "Responds to new leads automatically", delay: 0 },
                { icon: Icons.email, title: "Email Agent", role: "Sends follow-up and nurture emails", delay: 0.05 },
                { icon: Icons.chat, title: "WhatsApp Agent", role: "Handles WhatsApp inquiries 24/7", delay: 0.10 },
                { icon: Icons.content, title: "Content Agent", role: "Creates and schedules content", delay: 0.15 },
                { icon: Icons.ads, title: "Ads Agent", role: "Monitors and optimizes ad campaigns", delay: 0.20 },
                { icon: Icons.data, title: "Data Agent", role: "Tracks analytics across platforms", delay: 0.25 },
                { icon: Icons.crm, title: "CRM Agent", role: "Updates CRM records in real time", delay: 0.30 },
                { icon: Icons.research, title: "Research Agent", role: "Gathers market and competitor data", delay: 0.35 },
              ].map((agent) => (
                <Reveal key={agent.title} delay={agent.delay}>
                  <div className="card-glass" style={{ padding: "22px", display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00c8ff", flexShrink: 0 }}>
                      <div style={{ width: "20px", height: "20px" }}>{agent.icon}</div>
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px" }}>{agent.title}</p>
                      <p style={{ fontSize: "12px", color: "rgba(232,240,248,0.5)", margin: 0, lineHeight: 1.5 }}>{agent.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 7 — AUTOMATION ENGINE
        ════════════════════════════════════ */}
        <section style={{ padding: "80px 0", background: "linear-gradient(180deg, transparent, rgba(0,128,255,0.03), transparent)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <Reveal>
              <div className="section-label">AUTOMATION</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "8px" }}>
                Automation Engine
              </h2>
              <p style={{ color: "rgba(232,240,248,0.5)", fontSize: "14px", marginBottom: "48px" }}>
                VANTIX AI automates workflows across marketing, sales, and communication.
              </p>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                {
                  label: "Sales Flow",
                  steps: ["Lead", "CRM", "Email", "Follow-up", "Meeting", "Proposal", "Close"],
                  delay: 0,
                },
                {
                  label: "Content Flow",
                  steps: ["Content", "Post", "Ads", "Leads", "CRM", "Retarget", "Conversion"],
                  delay: 0.1,
                },
                {
                  label: "Inquiry Flow",
                  steps: ["Inquiry", "AI Response", "Reminder", "Application", "Enrollment"],
                  delay: 0.2,
                },
              ].map((flow) => (
                <Reveal key={flow.label} delay={flow.delay}>
                  <div className="card-glass" style={{ padding: "24px" }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#00c8ff", letterSpacing: "0.15em", marginBottom: "16px", textTransform: "uppercase" }}>{flow.label}</p>
                    {/* Desktop: horizontal */}
                    <div className="hidden sm:flex items-center gap-0 flex-wrap gap-y-3">
                      {flow.steps.map((step, i) => (
                        <div key={step} style={{ display: "flex", alignItems: "center" }}>
                          <div style={{
                            padding: "8px 14px", borderRadius: "8px",
                            background: i === flow.steps.length - 1 ? "linear-gradient(135deg, rgba(0,200,255,0.2), rgba(0,128,255,0.12))" : "rgba(0,200,255,0.06)",
                            border: `1px solid ${i === flow.steps.length - 1 ? "rgba(0,200,255,0.5)" : "rgba(0,200,255,0.12)"}`,
                            fontSize: "12px", fontWeight: 600,
                            color: i === flow.steps.length - 1 ? "#00c8ff" : "rgba(232,240,248,0.7)",
                            whiteSpace: "nowrap",
                          }}>{step}</div>
                          {i < flow.steps.length - 1 && (
                            <div style={{ width: "20px", height: "1px", background: "linear-gradient(90deg, rgba(0,200,255,0.4), rgba(0,200,255,0.2))", margin: "0 2px", position: "relative" }}>
                              <div style={{ position: "absolute", right: "2px", top: "-3px", color: "rgba(0,200,255,0.6)", fontSize: "8px" }}>›</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {/* Mobile: vertical */}
                    <div className="sm:hidden flex flex-col gap-2">
                      {flow.steps.map((step, i) => (
                        <div key={step}>
                          <div style={{
                            padding: "10px 14px", borderRadius: "8px",
                            background: i === flow.steps.length - 1 ? "rgba(0,200,255,0.1)" : "rgba(0,200,255,0.04)",
                            border: `1px solid ${i === flow.steps.length - 1 ? "rgba(0,200,255,0.4)" : "rgba(0,200,255,0.1)"}`,
                            fontSize: "13px", fontWeight: 600,
                            color: i === flow.steps.length - 1 ? "#00c8ff" : "rgba(232,240,248,0.7)",
                          }}>{step}</div>
                          {i < flow.steps.length - 1 && (
                            <div style={{ paddingLeft: "20px", color: "rgba(0,200,255,0.4)", fontSize: "14px" }}>↓</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 8 — INTELLIGENCE ENGINE
        ════════════════════════════════════ */}
        <section style={{ padding: "80px 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <Reveal>
              <div className="section-label">INTELLIGENCE</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "8px" }}>
                Intelligence Engine
              </h2>
              <p style={{ color: "rgba(232,240,248,0.5)", fontSize: "14px", marginBottom: "40px" }}>
                VANTIX AI turns data into intelligence and intelligence into decisions.
              </p>
            </Reveal>

            <div className="flex flex-col lg:flex-row gap-10">
              {/* Tracks */}
              <Reveal delay={0.05} className="flex-1">
                <div className="card-glass" style={{ padding: "32px", height: "100%" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#00c8ff", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "20px" }}>What It Tracks</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {["Performance", "Leads", "Conversions", "Ads", "Content", "Audience", "Revenue", "Growth"].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00c8ff", flexShrink: 0, boxShadow: "0 0 8px rgba(0,200,255,0.6)" }} />
                        <span style={{ fontSize: "14px", color: "rgba(232,240,248,0.75)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Produces */}
              <Reveal delay={0.1} className="flex-1">
                <div className="card-glass" style={{ padding: "32px", height: "100%" }}>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: "#00c8ff", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "20px" }}>What It Produces</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {["Insights", "Reports", "Alerts", "Recommendations", "Predictions"].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0080ff", flexShrink: 0, boxShadow: "0 0 8px rgba(0,128,255,0.6)" }} />
                        <span style={{ fontSize: "14px", color: "rgba(232,240,248,0.75)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Positioning */}
              <Reveal delay={0.15} className="flex-1">
                <div className="card-glass" style={{ padding: "32px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <p style={{ fontSize: "20px", fontWeight: 700, lineHeight: 1.5, color: "rgba(232,240,248,0.9)", marginBottom: "20px" }}>
                    VANTIX AI turns data into intelligence and intelligence into decisions.
                  </p>
                  <div className="positioning-line">
                    Companies that run on intelligence scale faster.
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 9 — WHO IT'S FOR
        ════════════════════════════════════ */}
        <section style={{ padding: "80px 0", background: "linear-gradient(180deg, transparent, rgba(0,200,255,0.025), transparent)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <Reveal>
              <div className="section-label">CLIENTS</div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "8px" }}>
                Who It's For
              </h2>
              <p style={{ color: "rgba(232,240,248,0.5)", fontSize: "14px", marginBottom: "40px" }}>
                VANTIX AI is your digital operations engine.
              </p>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
              {[
                { icon: Icons.startup, type: "Startups", use: "Growth systems from day one", delay: 0 },
                { icon: Icons.university, type: "Universities", use: "Communication and enrollment systems", delay: 0.05 },
                { icon: Icons.business, type: "Businesses", use: "Automation and operational intelligence", delay: 0.10 },
                { icon: Icons.ecom, type: "E-commerce", use: "Marketing intelligence and scale", delay: 0.15 },
                { icon: Icons.agency, type: "Agencies", use: "Client automation at scale", delay: 0.20 },
                { icon: Icons.enterprise, type: "Enterprises", use: "Full intelligence infrastructure", delay: 0.25 },
              ].map((item) => (
                <Reveal key={item.type} delay={item.delay}>
                  <div className="card-glass" style={{ padding: "24px", display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(0,200,255,0.08)", border: "1px solid rgba(0,200,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00c8ff", flexShrink: 0 }}>
                      <div style={{ width: "20px", height: "20px" }}>{item.icon}</div>
                    </div>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 5px" }}>{item.type}</p>
                      <p style={{ fontSize: "13px", color: "rgba(232,240,248,0.5)", margin: 0, lineHeight: 1.5 }}>{item.use}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SECTION 10 — CTA
        ════════════════════════════════════ */}
        <section style={{ padding: "80px 0 100px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <Reveal>
              <div className="card-glass" style={{
                padding: "64px 40px", textAlign: "center",
                border: "1px solid rgba(0,200,255,0.2)",
                background: "linear-gradient(135deg, rgba(0,200,255,0.05), rgba(0,128,255,0.03))",
                position: "relative", overflow: "hidden"
              }}>
                <div className="scan-overlay" />
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,200,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div className="section-label" style={{ justifyContent: "center" }}>GET STARTED</div>
                  <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.04em", margin: "0 0 12px", lineHeight: 1.1 }}>
                    Install Intelligence.<br />
                    Automate Operations.<br />
                    <span style={{ background: "linear-gradient(135deg, #00c8ff, #0080ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Scale Systems.</span>
                  </h2>
                  <p style={{ color: "rgba(232,240,248,0.5)", fontSize: "15px", marginBottom: "8px" }}>
                    Powered by VANTIX AI.
                  </p>
                  <p style={{ color: "rgba(232,240,248,0.35)", fontSize: "13px", marginBottom: "36px" }}>
                    VANTIX AI connects data, automation, and decision-making into one system.
                  </p>
                  <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/contact"><button className="btn-primary">Request Demo</button></Link>
                    <Link href="/contact"><button className="btn-outline">Book Consultation</button></Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </div>
  );
}
