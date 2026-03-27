"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="px-4 sm:px-6 pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-8">
                Valmont Marketing & Consultancy
              </p>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                Growth Systems for Brands
                <br />
                That Want More Than Marketing
              </h1>
              
              <p className="text-lg text-gray-400 leading-relaxed mb-4 max-w-xl">
                We combine consulting, execution, and AI-powered intelligence to help businesses 
                acquire customers, improve conversion, and scale with structured systems.
              </p>
              
              <p className="text-sm font-medium text-teal mb-10">
                Powered by VANTIX.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-5 py-3.5 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300 text-center"
                >
                  Book Consultation
                </Link>
                <Link
                  href="/systems"
                  className="px-5 py-3.5 text-sm font-medium border border-teal/40 hover:border-teal text-teal rounded-lg transition-all duration-300 text-center"
                >
                  Explore Systems
                </Link>
              </div>
            </motion.div>

            {/* Right: System Diagram Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Glassmorphism Card */}
                <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                  <div className="space-y-6">
                    {/* System Flow Diagram */}
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.5)]" />
                      <span className="text-sm text-gray-400">Strategy</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-teal/50 to-transparent" />
                    </div>
                    <div className="flex items-center gap-3 pl-6">
                      <div className="w-2 h-2 rounded-full bg-teal/70" />
                      <span className="text-sm text-gray-400">Infrastructure</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-teal/40 to-transparent" />
                    </div>
                    <div className="flex items-center gap-3 pl-12">
                      <div className="w-2 h-2 rounded-full bg-teal/70" />
                      <span className="text-sm text-gray-400">Execution</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-teal/40 to-transparent" />
                    </div>
                    <div className="flex items-center gap-3 pl-6">
                      <div className="w-2 h-2 rounded-full bg-teal/70" />
                      <span className="text-sm text-gray-400">Data</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-teal/40 to-transparent" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-teal shadow-[0_0_15px_rgba(0,212,191,0.6)] animate-pulse" />
                      <span className="text-sm font-semibold text-teal">VANTIX Intelligence</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-teal/60 to-transparent" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.5)]" />
                      <span className="text-sm font-medium text-gray-300">Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-6">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-2 bg-gradient-to-br from-teal to-teal-600 bg-clip-text text-transparent">
                  2.5x
                </div>
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  ROAS
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-2 bg-gradient-to-br from-teal to-teal-600 bg-clip-text text-transparent">
                  3x
                </div>
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Revenue Growth
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-2 bg-gradient-to-br from-teal to-teal-600 bg-clip-text text-transparent">
                  92%
                </div>
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Retention
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold mb-2 bg-gradient-to-br from-teal to-teal-600 bg-clip-text text-transparent">
                  2.8x
                </div>
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  ROI
                </div>
              </div>
            </div>
            
            <p className="text-center text-sm text-gray-500">
              Results achieved through structured systems and VANTIX intelligence.
            </p>
          </div>
        </section>
      </Reveal>

      {/* WHAT WE DO - 3 CARDS WITH ICONS */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-3 gap-5">
              {/* Card 1: Consulting */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Consulting</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Growth strategy, positioning, system planning
                </p>
              </div>

              {/* Card 2: Systems */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Systems</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Websites, funnels, automation, infrastructure
                </p>
              </div>

              {/* Card 3: Intelligence */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Intelligence</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Performance monitoring, optimization, decision support
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FREE AUDIT SECTION */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl p-10 sm:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Free AI Growth Audit
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                We review your marketing, positioning, and digital infrastructure and identify 
                where your growth system is underperforming.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
              >
                Get Free Audit
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SYSTEMS OVERVIEW - 4 PRICING CARDS */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Starter System */}
              <Link href="/systems" className="block group">
                <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 h-full hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Starter System</h3>
                  <p className="text-sm text-gray-500 mb-4">For early-stage businesses</p>
                  <div className="flex items-center gap-2 text-teal group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Start at $499</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>

              {/* Growth System */}
              <Link href="/systems" className="block group">
                <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 h-full hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Growth System</h3>
                  <p className="text-sm text-gray-500 mb-4">For growing businesses</p>
                  <div className="flex items-center gap-2 text-teal group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Start at $899</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>

              {/* Scale System */}
              <Link href="/systems" className="block group">
                <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 h-full hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Scale System</h3>
                  <p className="text-sm text-gray-500 mb-4">For scaling companies</p>
                  <div className="flex items-center gap-2 text-teal group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Start at $1299</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>

              {/* Custom System */}
              <Link href="/contact" className="block group">
                <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 h-full hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Custom System</h3>
                  <p className="text-sm text-gray-500 mb-4">For full infrastructure</p>
                  <div className="flex items-center gap-2 text-teal group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Custom Plan</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* VANTIX SECTION */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Text */}
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  The Intelligence Layer
                  <br />
                  Behind Every System
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-10">
                  VANTIX monitors performance, detects inefficiencies, identifies opportunities, 
                  and supports smarter growth decisions.
                </p>
                <Link
                  href="/assurance"
                  className="inline-block px-8 py-4 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                >
                  Discover VANTIX
                </Link>
              </div>

              {/* Right: Diagram */}
              <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-10">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal/60" />
                    <span className="text-sm text-gray-400">Traffic Analysis</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-teal/30 to-transparent" />
                  </div>
                  <div className="flex items-center gap-3 pl-4">
                    <div className="w-2 h-2 rounded-full bg-teal/60" />
                    <span className="text-sm text-gray-400">Conversion Tracking</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-teal/30 to-transparent" />
                  </div>
                  <div className="flex items-center gap-3 pl-8">
                    <div className="w-2 h-2 rounded-full bg-teal/60" />
                    <span className="text-sm text-gray-400">Performance Data</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-teal/30 to-transparent" />
                  </div>
                  <div className="flex items-center gap-3 pl-4">
                    <div className="w-3 h-3 rounded-full bg-teal shadow-[0_0_15px_rgba(0,212,191,0.6)] animate-pulse" />
                    <span className="text-sm font-semibold text-teal">VANTIX Engine</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.5)]" />
                    <span className="text-sm font-medium text-gray-300">Optimization Signals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* WHY VALMONT */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-10 sm:p-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-10">
                Why Valmont
              </h2>
              <div className="space-y-6 max-w-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                  <p className="text-base text-gray-300">Consultancy + Execution</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                  <p className="text-base text-gray-300">Systems instead of random marketing</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                  <p className="text-base text-gray-300">Built for long-term scale</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                  <p className="text-base text-gray-300">AI-assisted intelligence</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                  <p className="text-base text-gray-300">Structured growth approach</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FINAL CTA */}
      <Reveal>
        <section className="px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-md bg-white/[0.02] border border-teal/20 rounded-2xl p-12 sm:p-20 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12">
                Ready to Build a Real Growth System?
              </h2>
              <Link
                href="/contact"
                className="inline-block px-10 py-5 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

    </main>
  );
}
