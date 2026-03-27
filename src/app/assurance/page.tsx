"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function VantixPage() {
  return (
    <main className="min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="px-4 sm:px-6 pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-8">
                VANTIX
              </p>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Autonomous
                <br />
                <span className="text-teal">Intelligence Engine</span>
              </h1>
              
              <div className="space-y-4 text-lg text-gray-400 mb-4">
                <p>
                  VANTIX monitors, analyzes, and improves your systems automatically 
                  using data, automation, and machine intelligence.
                </p>
                <p className="font-semibold text-gray-300">
                  VANTIX is the intelligence layer behind every Valmont system.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link
                  href="#modules"
                  className="px-8 py-4 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                >
                  View Modules
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 text-sm font-medium border border-teal/40 hover:border-teal text-teal rounded-lg transition-all duration-300"
                >
                  Book Demo
                </Link>
              </div>
            </motion.div>

            {/* Right: Dashboard Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                {/* Mini Dashboard Visualization */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                      <span className="text-xs font-medium text-teal">LIVE MONITORING</span>
                    </div>
                    <div className="text-xs text-gray-500">Real-time</div>
                  </div>

                  {/* Data Nodes */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="backdrop-blur-sm bg-teal/5 border border-teal/20 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Performance</div>
                      <div className="text-lg font-bold text-teal">98.2%</div>
                    </div>
                    <div className="backdrop-blur-sm bg-teal/5 border border-teal/20 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Conversions</div>
                      <div className="text-lg font-bold text-teal">+24%</div>
                    </div>
                    <div className="backdrop-blur-sm bg-teal/5 border border-teal/20 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Efficiency</div>
                      <div className="text-lg font-bold text-teal">2.8x</div>
                    </div>
                  </div>

                  {/* System Flow */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal/60" />
                      <div className="flex-1 h-px bg-gradient-to-r from-teal/40 to-transparent" />
                      <span className="text-xs text-gray-500">Data Collection</span>
                    </div>
                    <div className="flex items-center gap-3 pl-4">
                      <div className="w-2 h-2 rounded-full bg-teal/60" />
                      <div className="flex-1 h-px bg-gradient-to-r from-teal/40 to-transparent" />
                      <span className="text-xs text-gray-500">Analysis</span>
                    </div>
                    <div className="flex items-center gap-3 pl-8">
                      <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)]" />
                      <div className="flex-1 h-px bg-gradient-to-r from-teal/60 to-transparent" />
                      <span className="text-xs text-teal font-medium">Optimization</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* POSITIONING LINES */}
      <Reveal>
        <section className="px-4 sm:px-6 py-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-2 border-teal pl-6">
                <p className="text-xl sm:text-2xl font-bold text-gray-200">
                  VANTIX is not a tool.
                  <br />
                  It is an intelligence layer.
                </p>
              </div>
              <div className="border-l-2 border-teal pl-6">
                <p className="text-xl sm:text-2xl font-bold text-gray-200">
                  VANTIX connects data, decisions, and automation into one system.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 2: WHAT VANTIX DOES */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                WHAT VANTIX DOES
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {/* Monitors */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Monitors</h3>
                <p className="text-sm text-gray-400">Tracks performance and systems</p>
              </div>

              {/* Analyzes */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Analyzes</h3>
                <p className="text-sm text-gray-400">Analyzes data and behavior</p>
              </div>

              {/* Automates */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Automates</h3>
                <p className="text-sm text-gray-400">Automates workflows</p>
              </div>

              {/* Alerts */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Alerts</h3>
                <p className="text-sm text-gray-400">Detects problems and risks</p>
              </div>

              {/* Optimizes */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Optimizes</h3>
                <p className="text-sm text-gray-400">Improves performance</p>
              </div>

              {/* Reports */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Reports</h3>
                <p className="text-sm text-gray-400">Generates reports and insights</p>
              </div>
            </div>

            <p className="text-center text-gray-400">
              VANTIX turns data into decisions and automation into growth.
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 3: HOW VANTIX WORKS */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-10 sm:p-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
                HOW VANTIX WORKS
              </h2>

              {/* Flow Diagram */}
              <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
                <span className="px-5 py-3 bg-white/5 border border-white/10 rounded-lg font-medium">Data</span>
                <span className="text-teal text-xl">→</span>
                <span className="px-5 py-3 bg-white/5 border border-white/10 rounded-lg font-medium">Analysis</span>
                <span className="text-teal text-xl">→</span>
                <span className="px-5 py-3 bg-white/5 border border-white/10 rounded-lg font-medium">Decision</span>
                <span className="text-teal text-xl">→</span>
                <span className="px-5 py-3 bg-white/5 border border-white/10 rounded-lg font-medium">Automation</span>
                <span className="text-teal text-xl">→</span>
                <span className="px-5 py-3 bg-white/5 border border-white/10 rounded-lg font-medium">Optimization</span>
                <span className="text-teal text-xl">→</span>
                <span className="px-5 py-3 bg-teal/10 border border-teal/30 rounded-lg font-medium text-teal">Growth</span>
              </div>

              <p className="text-center text-gray-400 max-w-3xl mx-auto">
                VANTIX continuously collects data, analyzes performance, recommends decisions, 
                and improves systems automatically.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 4: MODULES */}
      <Reveal>
        <section id="modules" className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                VANTIX MODULES
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Performance Monitoring */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Performance Monitoring</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Tracks campaigns, systems, and user activity across all platforms in one dashboard.
                </p>
              </div>

              {/* Decision Support */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Decision Support</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Provides recommendations based on performance, data trends, and system behavior.
                </p>
              </div>

              {/* Risk Detection */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Risk Detection</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Detects performance drops, system issues, and operational risks early.
                </p>
              </div>

              {/* Creative Intelligence */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Creative Intelligence</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Analyzes which creatives, ads, and content perform best and why.
                </p>
              </div>

              {/* Automation Support */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Automation Support</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Controls and improves automated workflows, follow-ups, and communication systems.
                </p>
              </div>

              {/* Growth Intelligence */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Growth Intelligence</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Identifies growth opportunities, scaling points, and expansion strategies.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 5: WHY IT MATTERS */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-sm bg-white/[0.02] border border-teal/20 rounded-2xl p-10 sm:p-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
                WHY INTELLIGENCE MATTERS
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-400 leading-relaxed text-center">
                <p>Most businesses operate on activity.</p>
                <p>Few operate on intelligence.</p>
                <p className="pt-4 border-t border-white/10">Activity creates noise.</p>
                <p className="font-semibold text-teal">Intelligence creates direction.</p>
                <p className="pt-4 border-t border-white/10">
                  VANTIX allows organizations to see clearly, act faster, and improve continuously.
                </p>
                <p className="pt-6 text-xl font-bold text-gray-200">
                  Without intelligence, systems cannot improve.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 6: FINAL CTA */}
      <Reveal>
        <section className="px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-md bg-white/[0.02] border border-teal/20 rounded-2xl p-12 sm:p-20 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Turn Data Into Decisions.
                <br />
                Turn Systems Into Intelligence.
                <br />
                <span className="text-teal">Turn Operations Into Growth.</span>
              </h2>
              
              <p className="text-lg text-gray-400 mb-12">
                Powered by VANTIX.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-10 py-5 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                >
                  Book Demo
                </Link>
                <Link
                  href="/systems"
                  className="px-10 py-5 text-sm font-medium border border-teal/40 hover:border-teal text-teal rounded-lg transition-all duration-300"
                >
                  View Systems
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
