"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useState, useEffect } from "react";

export default function VantixPage() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    // Set document title
    document.title = "VANTIX - Autonomous Intelligence Layer | Valmont Marketing";
    
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Floating CTA Button */}
      {showFloatingCTA && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Link
            href="/contact"
            className="px-6 py-3 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full shadow-[0_0_40px_rgba(0,212,191,0.5)] transition-all duration-300 hover:scale-105 block"
          >
            Get Started
          </Link>
        </motion.div>
      )}

      {/* SECTION 1: HERO */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 opacity-30">
          <img 
            src="/uploads/hf_20260322_111932_f135185d-634f-4697-b32b-92626c6a2bb4.png" 
            alt="" 
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020712]/50 to-[#020712]" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-teal/30 bg-teal/5 rounded-full"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.8)] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-teal">
                Autonomous Intelligence
              </span>
            </motion.div>

            {/* VANTIX LOGO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6"
            >
              <img 
                src="/uploads/hf_20260322_112241_871ac18f-61e3-42b4-aa78-0ce6a5d3a246.png" 
                alt="VANTIX" 
                className="w-64 sm:w-80 md:w-96 mx-auto"
                loading="eager"
              />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide mb-6 text-gray-200">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="block"
              >
                AI That Runs Your Growth
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed"
            >
              Automated system that finds what works and scales it automatically.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-sm sm:text-base text-gray-400 mb-10 max-w-2xl mx-auto"
            >
              VANTIX sits above marketing, data, and execution — acting as the intelligence layer that makes growth decisions for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#how-it-works"
                className="px-8 py-4 text-sm font-bold tracking-wide uppercase border border-teal/30 hover:border-teal/60 bg-teal/5 hover:bg-teal/10 rounded-full transition-all duration-300"
              >
                How It Works
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)] hover:scale-105"
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: VALUE PROP */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6">
                What VANTIX Does
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                AI system that tracks your marketing performance 24/7, finds what works, and automatically scales it to grow revenue.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <Reveal delay={0}>
                <div className="glass glass-hover rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold uppercase mb-3 text-teal">
                    Monitors Performance
                  </h3>
                  <p className="text-gray-400">
                    Tracks what's working across all channels 24/7
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="glass glass-hover rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold uppercase mb-3 text-teal">
                    Optimizes Automatically
                  </h3>
                  <p className="text-gray-400">
                    Improves campaigns while you sleep
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="glass glass-hover rounded-2xl p-8 text-center sm:col-span-2 lg:col-span-1">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold uppercase mb-3 text-teal">
                    Scales What Works
                  </h3>
                  <p className="text-gray-400">
                    Grows revenue without guesswork
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-gray-200 leading-tight mb-12">
                This is not marketing.
                <br />
                <span className="text-teal">This is growth infrastructure.</span>
              </p>
              
              {/* AI NETWORK VISUAL */}
              <div className="max-w-3xl mx-auto mt-12 rounded-2xl overflow-hidden border border-teal/20">
                <img 
                  src="/uploads/hf_20260322_111903_73a166d1-ff96-4519-af6c-014c92d14940.png" 
                  alt="VANTIX AI Network Visualization" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 3: HOW IT WORKS */}
      <Reveal>
        <section id="how-it-works" className="px-6 lg:px-8 py-20 bg-gradient-to-b from-black/20 to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6">
                How the VANTIX Intelligence Layer Operates
              </h2>
              <p className="text-lg text-gray-300">
                VANTIX connects data, decision-making, and execution into one continuous learning loop.
              </p>
            </div>

            <div className="space-y-6">
              <Reveal delay={0}>
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal/10 border-2 border-teal flex items-center justify-center">
                      <span className="text-xl font-black text-teal">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase mb-2 text-teal">Data Input</h3>
                      <p className="text-gray-300">Collects performance data from ads, content, CRM, and analytics</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="flex justify-center">
                <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              <Reveal delay={0.1}>
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal/10 border-2 border-teal flex items-center justify-center">
                      <span className="text-xl font-black text-teal">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase mb-2 text-teal">AI Analyzes</h3>
                      <p className="text-gray-300">Finds patterns, predicts outcomes, and decides next actions</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="flex justify-center">
                <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>

              <Reveal delay={0.2}>
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal/10 border-2 border-teal flex items-center justify-center">
                      <span className="text-xl font-black text-teal">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase mb-2 text-teal">Auto-Executes</h3>
                      <p className="text-gray-300">Scales winners, cuts losers, and optimizes campaigns automatically</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="flex justify-center">
                <div className="flex items-center gap-3 px-4 py-2 border border-teal/30 bg-teal/5 rounded-full">
                  <svg className="w-5 h-5 text-teal animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm font-bold uppercase text-teal">System Improves Continuously</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 4: PROOF + TRUST */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6">
                Built on 12 Specialized AI Agents
              </h2>
              <p className="text-lg text-gray-300">
                Each agent handles a specific growth function, working together as one intelligent system.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Reveal delay={0}>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2">Data & Analytics</h3>
                  <p className="text-sm text-gray-400">Collects and analyzes performance data</p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2">Ads & Content</h3>
                  <p className="text-sm text-gray-400">Optimizes campaigns and content</p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2">Conversion & Scaling</h3>
                  <p className="text-sm text-gray-400">Improves conversions and scales winners</p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2">Risk & Control</h3>
                  <p className="text-sm text-gray-400">Prevents overspending and manages risk</p>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <div className="glass rounded-3xl p-8 sm:p-12 mb-16">
                <h3 className="text-2xl sm:text-3xl font-black uppercase mb-6 text-center">
                  The VANTIX Control Center
                </h3>
                
                {/* DASHBOARD VISUAL */}
                <div className="mb-8 rounded-xl overflow-hidden border border-teal/20">
                  <img 
                    src="/uploads/hf_20260322_111911_6f38d845-09db-4261-953a-fe2c1e892184.jpeg" 
                    alt="VANTIX Control Center Dashboard" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black uppercase mb-6 text-center">
                  Security & Control
                </h3>
                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">Secure infrastructure</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">Human approval checkpoints</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">Protected data systems</span>
                  </div>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-center text-gray-200">
                  Autonomous does not mean uncontrolled.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* SECTION 5: FINAL CTA */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto glass rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6">
              Work With the System
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Built for companies that want data-driven, scalable growth.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)] hover:scale-105"
            >
              Apply to Work With Valmont
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
