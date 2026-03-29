"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import PremiumCard from "@/components/premium/PremiumCard";
import GradientText from "@/components/premium/GradientText";
import GlowButton from "@/components/premium/GlowButton";

export default function IntelligencePage() {
  return (
    <>
      <main className="min-h-screen relative overflow-hidden bg-[#050a0f]">
        {/* Enhanced particle backgrounds - BLUE/PURPLE */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/15 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="floating-particle absolute w-1 h-1 bg-blue-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* 1. HERO */}
        <section className="hero-section relative px-4 sm:px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <p className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-blue-400/70 mb-8 animate-fade-in">
                  INTELLIGENCE
                </p>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase mb-8 leading-[1.1] break-words">
                  <span className="text-white">Run on </span>
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                    Intelligence.
                  </span>
                  <br />
                  <span className="text-white/60">Not Guesswork.</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6 max-w-2xl break-words">
                  VANTIX AI monitors, analyzes, and improves your systems, marketing, automation, and operations.
                </p>
                
                <p className="text-base sm:text-lg font-bold text-blue-400 mb-10">
                  This is not reporting.
                  <br />
                  This is operational intelligence.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <GlowButton href="/contact" variant="primary" size="lg">
                    Book Consultation
                  </GlowButton>
                  <GlowButton href="/systems" variant="secondary" size="lg">
                    View Systems
                  </GlowButton>
                </div>
              </motion.div>

              {/* Right: Animated Dashboard Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="hidden lg:block"
              >
                <PremiumCard glow={true} hover={false} className="p-8 card-dramatic bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-blue-500/20">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                        <span className="text-sm font-mono text-blue-400">VANTIX AI</span>
                      </div>
                      <span className="text-xs text-gray-500">LIVE</span>
                    </div>
                    
                    {[89, 67, 94, 78].map((val, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Metric {i + 1}</span>
                          <span className="text-blue-400 font-mono">{val}%</span>
                        </div>
                        <div className="h-1.5 bg-blue-950/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${val}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </PremiumCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. WHY INTELLIGENCE */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                    Why Intelligence Matters
                  </h2>
                  
                  <p className="text-xl sm:text-2xl font-bold text-blue-400 mb-6 leading-relaxed">
                    Most companies run campaigns.
                    <br />
                    Advanced companies run intelligence.
                  </p>
                  
                  <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                    <p>Without intelligence → You guess.</p>
                    <p>With intelligence → You decide using data.</p>
                    <p className="pt-4">
                      VANTIX AI analyzes performance, behavior, conversions, and systems to guide decisions.
                    </p>
                  </div>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 pb-2 border-b border-gray-700">Traditional</div>
                    {["Run Ads", "Post Content", "Collect Leads", "Reports", "Manual Decisions"].map((item, i) => (
                      <PremiumCard key={i} className="p-4 bg-red-500/5 border-red-500/20">
                        <p className="text-sm text-gray-400">{item}</p>
                      </PremiumCard>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-400 pb-2 border-b border-blue-500/20">With VANTIX AI</div>
                    {["Optimize Ads", "Track Performance", "Analyze Behavior", "Predictions", "Data Decisions"].map((item, i) => (
                      <PremiumCard key={i} className="p-4 bg-blue-500/5 border-blue-500/20 card-glow">
                        <p className="text-sm text-blue-300 font-medium">{item}</p>
                      </PremiumCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 3. WHAT VANTIX AI ANALYZES */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none shimmer-bg" />
            
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                  What VANTIX AI Analyzes
                </h2>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
                    title: "Performance",
                    desc: "System & campaign performance"
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
                    title: "Audience",
                    desc: "Audience behavior"
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />,
                    title: "Funnel",
                    desc: "Conversion tracking"
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
                    title: "Budget",
                    desc: "Spend efficiency"
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />,
                    title: "Creative",
                    desc: "Creative performance"
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
                    title: "Alerts",
                    desc: "Risk detection"
                  }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.1} className="card-dramatic-hover h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 icon-float border border-blue-500/20">
                        <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold uppercase mb-2 text-blue-300">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </PremiumCard>
                ))}
              </div>

              <p className="text-center text-gray-400 mt-12 max-w-3xl mx-auto">
                VANTIX AI monitors these data points continuously and identifies problems, opportunities, and improvements.
              </p>
            </div>
          </section>
        </Reveal>

        {/* 4. WHAT VANTIX AI DOES */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                  What VANTIX AI Does
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Monitor", desc: "Tracks everything" },
                  { title: "Analyze", desc: "Finds patterns" },
                  { title: "Predict", desc: "Forecasts results" },
                  { title: "Recommend", desc: "Suggests actions" },
                  { title: "Automate", desc: "Improves workflows" },
                  { title: "Report", desc: "Generates insights" }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.1} className="card-dramatic-hover bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                    <h3 className="text-2xl font-black uppercase mb-2 text-blue-300">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </PremiumCard>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-xl font-bold text-blue-400 mb-2">
                  VANTIX AI is not a dashboard.
                </p>
                <p className="text-xl font-bold text-white">
                  It is a decision engine.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 5. VANTIX AI SYSTEM DIAGRAM - PALANTIR STYLE */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none shimmer-bg" />
            
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                  VANTIX AI System Architecture
                </h2>
              </div>

              <PremiumCard glow={true} hover={false} className="p-8 sm:p-12 lg:p-16 card-dramatic bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                <div className="flex flex-col items-center space-y-8">
                  {/* Top: VANTIX AI Core */}
                  <div className="relative">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center node-glow-pulse border-2 border-blue-400/50">
                      <div className="text-center">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <p className="text-white font-black text-sm sm:text-base">VANTIX AI</p>
                        <p className="text-blue-200 text-xs">Intelligence Layer</p>
                      </div>
                    </div>
                  </div>

                  {/* Connection Line Down */}
                  <div className="connection-line w-0.5 h-12 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 relative overflow-hidden">
                    <div className="flow-dot absolute w-2 h-2 bg-blue-400 rounded-full -left-[3px]"></div>
                  </div>

                  {/* Middle: Systems Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
                    {["Website", "CRM", "Automation", "Ads", "Content", "Analytics"].map((system, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center hover:bg-blue-500/20 transition-all duration-300">
                          <p className="text-xs sm:text-sm font-bold text-blue-300 text-center px-2">{system}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connection Line Down */}
                  <div className="connection-line w-0.5 h-12 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 relative overflow-hidden">
                    <div className="flow-dot-reverse absolute w-2 h-2 bg-purple-400 rounded-full -left-[3px]"></div>
                  </div>

                  {/* Bottom: Customers */}
                  <div className="w-32 h-16 sm:w-40 sm:h-20 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
                    <p className="text-base sm:text-lg font-bold text-purple-300">Customers</p>
                  </div>

                  {/* Connection Line Back Up (Data Loop) */}
                  <div className="connection-line w-0.5 h-12 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 relative overflow-hidden">
                    <div className="flow-dot-reverse absolute w-2 h-2 bg-purple-400 rounded-full -left-[3px]"></div>
                  </div>

                  {/* Feedback Loop Text */}
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">↑ Data Feedback Loop ↑</p>
                    <div className="w-24 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <p className="text-xs font-bold text-blue-400">VANTIX AI</p>
                    </div>
                  </div>
                </div>

                <p className="text-center text-gray-400 mt-12 max-w-2xl mx-auto">
                  VANTIX AI connects, monitors, and improves every part of the system continuously.
                </p>
              </PremiumCard>
            </div>
          </section>
        </Reveal>

        {/* 6. CONSULTING SERVICES */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                  Consulting Services
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Growth Strategy", desc: "How to grow" },
                  { title: "Marketing Audit", desc: "What's working" },
                  { title: "Funnel Strategy", desc: "Improve conversion" },
                  { title: "Offer Positioning", desc: "Improve pricing" },
                  { title: "Automation Consulting", desc: "Reduce manual work" },
                  { title: "Scale Strategy", desc: "Prepare for scale" },
                  { title: "AI Integration", desc: "Add AI into operations" }
                ].map((service, i) => (
                  <Link key={i} href="/contact">
                    <PremiumCard glow hover delay={i * 0.1} className="card-dramatic-hover h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20 cursor-pointer group">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold uppercase mb-2 text-blue-300 group-hover:text-blue-200 transition-colors">{service.title}</h3>
                          <p className="text-sm text-gray-400">{service.desc}</p>
                        </div>
                        <svg className="w-5 h-5 text-blue-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </PremiumCard>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 7. CONTROL & SAFETY */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
            
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                  Control & Safety
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  VANTIX AI operates with monitoring, alerts, reporting, and human oversight.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { title: "Monitoring", desc: "Systems monitored" },
                  { title: "Alerts", desc: "Risk alerts" },
                  { title: "Reporting", desc: "Performance reports" },
                  { title: "Human Oversight", desc: "Strategic control" },
                  { title: "Data Privacy", desc: "Secure systems" }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.05} className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20 text-center">
                    <h3 className="text-sm font-bold uppercase mb-2 text-blue-300">{item.title}</h3>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 8. REPORTING & INTELLIGENCE OUTPUTS */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                  Intelligence Outputs
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto mb-8">
                  Reports generated by VANTIX AI:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Performance Reports",
                  "Funnel Reports",
                  "Ads Reports",
                  "Audience Reports",
                  "Automation Reports",
                  "Growth Reports",
                  "Risk Reports",
                  "Strategy Reports"
                ].map((report, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.05} className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm text-blue-300">{report}</p>
                    </div>
                  </PremiumCard>
                ))}
              </div>

              <p className="text-center text-gray-400 mt-12 max-w-3xl mx-auto">
                VANTIX AI produces intelligence reports that help leadership make decisions.
              </p>
            </div>
          </section>
        </Reveal>

        {/* 9. CTA */}
        <Reveal>
          <section className="px-4 sm:px-6 py-24 sm:py-32">
            <div className="max-w-[1200px] mx-auto">
              <PremiumCard glow={true} hover={false} className="p-10 sm:p-16 lg:p-24 text-center card-dramatic bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight break-words">
                  <span className="text-white">Run Your Company on </span>
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                    Intelligence.
                  </span>
                  <br />
                  <span className="text-white/60">Not Guesswork.</span>
                </h2>
                
                <p className="text-xl text-blue-400 font-bold mb-12">
                  Powered by VANTIX AI.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  <GlowButton href="/contact" variant="primary" size="lg">
                    Book Consultation
                  </GlowButton>
                  <GlowButton href="/systems" variant="secondary" size="lg">
                    View Systems
                  </GlowButton>
                </div>
              </PremiumCard>
            </div>
          </section>
        </Reveal>

        {/* Positioning Lines Throughout Page */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none hidden lg:block">
          <div className="bg-blue-950/90 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-2">
            <p className="text-xs text-blue-300 font-mono">
              Intelligence is the infrastructure behind growth.
            </p>
          </div>
        </div>
      </main>

      {/* PALANTIR-LEVEL ANIMATIONS */}
      <style jsx global>{`
        /* Floating particles */
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-100px) translateX(50px); opacity: 0.8; }
        }
        .floating-particle {
          animation: float linear infinite;
        }

        /* Flowing dots */
        @keyframes flow {
          0% { top: -10px; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .flow-dot {
          animation: flow 2s ease-in-out infinite;
        }
        
        .flow-dot-reverse {
          animation: flow-reverse 2s ease-in-out infinite;
        }
        
        @keyframes flow-reverse {
          0% { bottom: -10px; opacity: 0; }
          50% { opacity: 1; }
          100% { bottom: 100%; opacity: 0; }
        }

        /* Node glow pulse */
        @keyframes node-glow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.5),
                        0 0 60px rgba(168, 85, 247, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.7),
                        0 0 80px rgba(168, 85, 247, 0.5),
                        inset 0 0 30px rgba(59, 130, 246, 0.3);
          }
        }
        .node-glow-pulse {
          animation: node-glow 2s ease-in-out infinite;
        }

        /* Card glow */
        .card-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
        }

        /* Dramatic card hover */
        .card-dramatic-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-dramatic-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            0 20px 60px -15px rgba(59, 130, 246, 0.4),
            0 0 40px rgba(168, 85, 247, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        /* Card dramatic */
        .card-dramatic {
          box-shadow: 
            0 10px 40px -10px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(59, 130, 246, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        /* Icon float */
        @keyframes icon-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .icon-float:hover {
          animation: icon-float 1s ease-in-out infinite;
        }

        /* Gradient shift */
        @keyframes gradient-shift {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(15deg); }
        }
        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        /* Shimmer bg */
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .shimmer-bg::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(59, 130, 246, 0.05),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        /* DESKTOP LAYOUT */
        @media (min-width: 1024px) {
          .hero-section {
            padding-top: 12rem;
            padding-bottom: 10rem;
          }
          
          .section-spacing {
            padding-top: 5rem;
            padding-bottom: 5rem;
          }
        }
      `}</style>
    </>
  );
}
