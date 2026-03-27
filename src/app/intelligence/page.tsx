"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function IntelligencePage() {
  return (
    <main className="min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="px-4 sm:px-6 pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-8">
              INTELLIGENCE
            </p>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Decisions Should Be Based on Data,
              <br />
              <span className="text-teal">Not Guesswork.</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-4 leading-relaxed">
              VANTIX monitors performance, analyzes behavior, detects risks, and provides 
              intelligence that helps organizations make better decisions.
            </p>
            
            <p className="text-sm font-medium text-teal mb-12">
              Powered by VANTIX.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#analysis"
                className="px-8 py-4 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
              >
                View Intelligence
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 text-sm font-medium border border-teal/40 hover:border-teal text-teal rounded-lg transition-all duration-300"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* POSITIONING LINES */}
      <Reveal>
        <section className="px-4 sm:px-6 py-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-2 border-teal pl-6">
                <p className="text-xl sm:text-2xl font-bold text-gray-200">
                  Marketing shows activity.
                  <br />
                  Intelligence shows what works.
                </p>
              </div>
              <div className="border-l-2 border-teal pl-6">
                <p className="text-xl sm:text-2xl font-bold text-gray-200">
                  Without intelligence, systems cannot improve.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 2: WHY INTELLIGENCE */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-10 sm:p-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
                WHY INTELLIGENCE MATTERS
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-400 leading-relaxed">
                <p className="font-semibold text-gray-300">
                  Most organizations operate without clear visibility.
                </p>
                
                <div className="space-y-3 pl-6 border-l border-white/10">
                  <p>They run ads but do not understand performance.</p>
                  <p>They generate leads but do not understand behavior.</p>
                  <p>They publish content but do not understand conversion.</p>
                </div>
                
                <p className="font-semibold text-teal pt-4">
                  Intelligence changes this.
                </p>
                
                <p>
                  VANTIX collects, analyzes, and translates data into clear operational 
                  insights and decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 3: WHAT VANTIX ANALYZES - ICONS GRID */}
      <Reveal>
        <section id="analysis" className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                WHAT VANTIX ANALYZES
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {/* Performance */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Performance</h3>
                <p className="text-sm text-gray-400">Campaign and system performance</p>
              </div>

              {/* Audience Behavior */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Audience Behavior</h3>
                <p className="text-sm text-gray-400">User behavior and interaction</p>
              </div>

              {/* Conversion */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Conversion</h3>
                <p className="text-sm text-gray-400">Funnel and conversion tracking</p>
              </div>

              {/* Spend Efficiency */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Spend Efficiency</h3>
                <p className="text-sm text-gray-400">Budget and ROI tracking</p>
              </div>

              {/* Creative Performance */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Creative Performance</h3>
                <p className="text-sm text-gray-400">Content and ad performance</p>
              </div>

              {/* Risk Detection */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Risk Detection</h3>
                <p className="text-sm text-gray-400">Problems and system alerts</p>
              </div>
            </div>

            <p className="text-center text-gray-400">
              VANTIX turns raw data into operational intelligence.
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 4: CONSULTING SERVICES */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                CONSULTING & INTELLIGENCE SERVICES
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Growth Strategy Consulting */}
              <Link href="/contact" className="block group">
                <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 h-full hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Growth Strategy Consulting</h3>
                  <p className="text-sm text-gray-400 mb-3">Planning growth using data and intelligence</p>
                  <div className="flex items-center gap-2 text-teal group-hover:gap-3 transition-all">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </Link>

              {/* Marketing Audit */}
              <Link href="/contact" className="block group">
                <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 h-full hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Marketing Audit</h3>
                  <p className="text-sm text-gray-400 mb-3">Full analysis of marketing and performance</p>
                  <div className="flex items-center gap-2 text-teal group-hover:gap-3 transition-all">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </Link>

              {/* Funnel Strategy */}
              <Link href="/contact" className="block group">
                <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 h-full hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Funnel Strategy</h3>
                  <p className="text-sm text-gray-400 mb-3">Conversion and funnel optimization planning</p>
                  <div className="flex items-center gap-2 text-teal group-hover:gap-3 transition-all">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </Link>

              {/* Offer Positioning */}
              <Link href="/contact" className="block group">
                <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 h-full hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Offer Positioning</h3>
                  <p className="text-sm text-gray-400 mb-3">Improving positioning and messaging</p>
                  <div className="flex items-center gap-2 text-teal group-hover:gap-3 transition-all">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </Link>

              {/* Automation Consulting */}
              <Link href="/contact" className="block group">
                <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 h-full hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Automation Consulting</h3>
                  <p className="text-sm text-gray-400 mb-3">Planning automation and workflows</p>
                  <div className="flex items-center gap-2 text-teal group-hover:gap-3 transition-all">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </Link>

              {/* Scale Strategy */}
              <Link href="/contact" className="block group">
                <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 h-full hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Scale Strategy</h3>
                  <p className="text-sm text-gray-400 mb-3">Scaling operations and acquisition</p>
                  <div className="flex items-center gap-2 text-teal group-hover:gap-3 transition-all">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </Link>

              {/* AI Integration */}
              <Link href="/contact" className="block group">
                <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 h-full hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">AI Integration</h3>
                  <p className="text-sm text-gray-400 mb-3">Implementing AI into operations</p>
                  <div className="flex items-center gap-2 text-teal group-hover:gap-3 transition-all">
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 5: CONTROL & SAFETY */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-sm bg-white/[0.02] border border-teal/20 rounded-2xl p-10 sm:p-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
                CONTROL & SAFETY
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-400 leading-relaxed mb-12">
                <p className="font-semibold text-gray-300">
                  Intelligence requires control and security.
                </p>
                
                <p>
                  VANTIX is built with controlled access, secure data handling, and monitored 
                  automation systems.
                </p>
                
                <p>
                  Organizations maintain full visibility and full control over their systems and data.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                  <span className="text-sm font-medium">Controlled Automation</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                  <span className="text-sm font-medium">Secure Data Handling</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                  <span className="text-sm font-medium">Human Oversight</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                  <span className="text-sm font-medium">System Monitoring</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                  <span className="text-sm font-medium">Risk Alerts</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                  <span className="text-sm font-medium">Access Control</span>
                </div>
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
                See Clearly.
                <br />
                Decide Smarter.
                <br />
                <span className="text-teal">Operate With Intelligence.</span>
              </h2>
              
              <p className="text-lg text-gray-400 mb-12">
                Powered by VANTIX.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-10 py-5 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                >
                  Book Consultation
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
