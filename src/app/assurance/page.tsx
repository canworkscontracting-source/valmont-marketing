"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import PremiumCard from "@/components/premium/PremiumCard";
import GradientText from "@/components/premium/GradientText";
import GlowButton from "@/components/premium/GlowButton";

export default function VantixPage() {
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
                  VANTIX AI
                </p>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase mb-8 leading-[1.1] break-words">
                  <span className="text-white">The </span>
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                    Intelligence Layer
                  </span>
                  <br />
                  <span className="text-white">for Modern Organizations.</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6 max-w-2xl break-words">
                  VANTIX AI connects your systems, analyzes your data, automates workflows, and improves performance.
                </p>
                
                <p className="text-base sm:text-lg font-bold text-blue-400 mb-10">
                  It works as the intelligence engine behind your business.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <GlowButton href="/contact" variant="primary" size="lg">
                    Request Demo
                  </GlowButton>
                  <GlowButton href="/contact" variant="secondary" size="lg">
                    Book Consultation
                  </GlowButton>
                </div>
              </motion.div>

              {/* Right: AI Network Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="hidden lg:block"
              >
                <PremiumCard glow={true} hover={false} className="p-8 card-dramatic bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(9)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className={`w-full aspect-square rounded-lg ${
                          i === 4 
                            ? 'bg-gradient-to-br from-blue-500 to-purple-500 node-glow-pulse' 
                            : 'bg-blue-500/10 border border-blue-500/20'
                        } flex items-center justify-center`}
                      >
                        {i === 4 && (
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-center text-xs text-blue-400 font-mono mt-6">AI CORE</p>
                </PremiumCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. WHAT IS VANTIX AI */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                    What is VANTIX AI
                  </h2>
                  
                  <p className="text-xl sm:text-2xl font-bold text-blue-400 mb-6 leading-relaxed">
                    VANTIX AI is an intelligence and automation engine.
                  </p>
                  
                  <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                    <p>
                      It connects marketing, sales, communication, data, and operations into one intelligent system.
                    </p>
                    <p className="pt-4">
                      It monitors performance, analyzes behavior, automates tasks, and provides decision support.
                    </p>
                  </div>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 pb-2 border-b border-gray-700">Without VANTIX</div>
                    {["Separate tools", "Manual work", "Reports", "Guess decisions", "Slow growth"].map((item, i) => (
                      <PremiumCard key={i} className="p-4 bg-red-500/5 border-red-500/20">
                        <p className="text-sm text-gray-400">{item}</p>
                      </PremiumCard>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-400 pb-2 border-b border-blue-500/20">With VANTIX AI</div>
                    {["Connected system", "Automated workflows", "Intelligence", "Data decisions", "Optimized growth"].map((item, i) => (
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

        {/* 3. WHAT VANTIX AI DOES */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none shimmer-bg" />
            
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                  What VANTIX AI Does
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Connect", desc: "Connects all systems", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /> },
                  { title: "Monitor", desc: "Tracks performance", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /> },
                  { title: "Analyze", desc: "Finds patterns", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
                  { title: "Decide", desc: "Suggests actions", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
                  { title: "Automate", desc: "Runs workflows", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /> },
                  { title: "Improve", desc: "Optimizes performance", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /> }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.1} className="card-dramatic-hover bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-black uppercase mb-2 text-blue-300">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  </PremiumCard>
                ))}
              </div>

              <p className="text-center text-gray-400 mt-12 max-w-3xl mx-auto">
                VANTIX AI works continuously in the background, monitoring and improving your business systems.
              </p>
            </div>
          </section>
        </Reveal>

        {/* 4. VANTIX AI MODULES */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                  VANTIX AI Modules
                </h2>
                <p className="text-gray-400">Enterprise-grade intelligence modules</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[
                  { module: "Performance Monitoring", desc: "Tracks performance" },
                  { module: "Lead Intelligence", desc: "Tracks leads" },
                  { module: "Automation Engine", desc: "Runs workflows" },
                  { module: "Content Intelligence", desc: "Content performance" },
                  { module: "Ads Intelligence", desc: "Ads optimization" },
                  { module: "Funnel Intelligence", desc: "Conversion tracking" },
                  { module: "CRM Intelligence", desc: "Customer tracking" },
                  { module: "Reporting Engine", desc: "Reports" },
                  { module: "Risk Monitoring", desc: "Alerts" },
                  { module: "Predictive Engine", desc: "Forecasts" }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.05} className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20 hover:border-blue-400/40 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <h3 className="text-sm font-bold uppercase text-blue-300">{item.module}</h3>
                    </div>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 5. VANTIX AI SYSTEM DIAGRAM - MOST IMPORTANT */}
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
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center node-glow-pulse border-2 border-blue-400/50">
                      <div className="text-center">
                        <svg className="w-16 h-16 sm:w-20 sm:h-20 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <p className="text-white font-black text-lg">VANTIX AI</p>
                        <p className="text-blue-200 text-xs">Intelligence Engine</p>
                      </div>
                    </div>
                  </div>

                  {/* Connection Line Down */}
                  <div className="connection-line w-0.5 h-12 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 relative overflow-hidden">
                    <div className="flow-dot absolute w-2 h-2 bg-blue-400 rounded-full -left-[3px]"></div>
                  </div>

                  {/* Middle: Systems Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                    {["Website", "CRM", "Ads", "Content", "Automation"].map((system, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center hover:bg-blue-500/20 transition-all duration-300">
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
                  <div className="w-40 h-20 sm:w-48 sm:h-24 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center">
                    <p className="text-lg font-bold text-purple-300">Customers</p>
                  </div>

                  {/* Connection Line Back Up */}
                  <div className="connection-line w-0.5 h-12 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 relative overflow-hidden">
                    <div className="flow-dot-reverse absolute w-2 h-2 bg-purple-400 rounded-full -left-[3px]"></div>
                  </div>

                  {/* Feedback Text */}
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">↑ Data Feedback Loop ↑</p>
                    <div className="w-32 h-14 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <p className="text-sm font-bold text-blue-400">VANTIX AI</p>
                    </div>
                  </div>
                </div>

                <p className="text-center text-gray-400 mt-12 max-w-2xl mx-auto leading-relaxed">
                  VANTIX AI connects systems, collects data, and continuously improves performance.
                </p>
              </PremiumCard>
            </div>
          </section>
        </Reveal>

        {/* 6. AI AGENTS */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                  AI Agents
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  AI agents handle tasks automatically, reducing manual work and improving response time.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { agent: "Lead Agent", role: "Responds to leads" },
                  { agent: "Email Agent", role: "Sends follow-ups" },
                  { agent: "WhatsApp Agent", role: "Handles inquiries" },
                  { agent: "Content Agent", role: "Creates content" },
                  { agent: "Ads Agent", role: "Optimizes ads" },
                  { agent: "Data Agent", role: "Tracks analytics" },
                  { agent: "CRM Agent", role: "Updates CRM" },
                  { agent: "Research Agent", role: "Market research" }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.05} className="card-dramatic-hover bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold uppercase text-blue-300">{item.agent}</h3>
                        <p className="text-xs text-gray-400">{item.role}</p>
                      </div>
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 7. AUTOMATION ENGINE */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
            
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                  Automation Engine
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  VANTIX AI automates workflows across marketing, sales, and communication.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { workflow: "Lead → CRM → Email → Follow-up → Meeting → Proposal → Close" },
                  { workflow: "Content → Post → Ads → Leads → CRM → Retarget → Conversion" },
                  { workflow: "Inquiry → AI Response → Reminder → Application → Enrollment" }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.1} className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-500/20">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm sm:text-base text-blue-300 font-mono">{item.workflow}</p>
                      <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 8. INTELLIGENCE ENGINE */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                  Intelligence Engine
                </h2>
                <p className="text-xl text-blue-400 font-bold mb-8">
                  VANTIX AI turns data into intelligence and intelligence into decisions.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold uppercase mb-6 text-blue-300">What it tracks:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["Performance", "Leads", "Conversions", "Ads", "Content", "Audience", "Revenue", "Growth"].map((item, i) => (
                      <PremiumCard key={i} className="p-3 bg-blue-500/5 border-blue-500/20 text-center">
                        <p className="text-sm text-blue-300">{item}</p>
                      </PremiumCard>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold uppercase mb-6 text-purple-300">What it produces:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["Insights", "Reports", "Alerts", "Recommendations", "Predictions"].map((item, i) => (
                      <PremiumCard key={i} className="p-3 bg-purple-500/5 border-purple-500/20 text-center">
                        <p className="text-sm text-purple-300">{item}</p>
                      </PremiumCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 9. WHO IT'S FOR */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none shimmer-bg" />
            
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                  Who It's For
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { type: "Startups", use: "Growth systems" },
                  { type: "Universities", use: "Communication systems" },
                  { type: "Businesses", use: "Automation" },
                  { type: "E-commerce", use: "Marketing intelligence" },
                  { type: "Agencies", use: "Automation" },
                  { type: "Enterprises", use: "Full intelligence systems" }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.1} className="card-dramatic-hover bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                    <h3 className="text-xl font-black uppercase mb-2 text-blue-300">{item.type}</h3>
                    <p className="text-sm text-gray-400">{item.use}</p>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 10. CTA */}
        <Reveal>
          <section className="px-4 sm:px-6 py-24 sm:py-32">
            <div className="max-w-[1200px] mx-auto">
              <PremiumCard glow={true} hover={false} className="p-10 sm:p-16 lg:p-24 text-center card-dramatic bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight break-words">
                  <span className="text-white">Install </span>
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift">
                    Intelligence.
                  </span>
                  <br />
                  <span className="text-white">Automate Operations.</span>
                  <br />
                  <span className="text-white">Scale Systems.</span>
                </h2>
                
                <p className="text-xl text-blue-400 font-bold mb-12">
                  Powered by VANTIX AI.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  <GlowButton href="/contact" variant="primary" size="lg">
                    Request Demo
                  </GlowButton>
                  <GlowButton href="/contact" variant="secondary" size="lg">
                    Book Consultation
                  </GlowButton>
                </div>
              </PremiumCard>
            </div>
          </section>
        </Reveal>

        {/* Positioning Line */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none hidden lg:block">
          <div className="bg-blue-950/90 backdrop-blur-sm border border-blue-500/20 rounded-full px-6 py-2">
            <p className="text-xs text-blue-300 font-mono">
              VANTIX AI is your digital operations engine.
            </p>
          </div>
        </div>
      </main>

      {/* ANIMATIONS */}
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
