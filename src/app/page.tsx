"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative pt-24 sm:pt-32 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Block */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Section Label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-6"
              >
                Valmont Marketing & Consultancy
              </motion.p>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6"
              >
                Growth Systems for Brands
                <br />
                That Want More Than Marketing
              </motion.h1>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 max-w-xl"
              >
                We combine consulting, execution, and AI-powered intelligence to help brands acquire customers, 
                improve conversion, and scale with structure.
              </motion.p>

              {/* Mini Line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8 pb-6 border-b border-teal/10"
              >
                <p className="text-xs font-semibold tracking-wider text-gray-400 mb-1">
                  Consulting · Systems · Execution · Intelligence
                </p>
                <p className="text-xs font-semibold tracking-wider text-teal">
                  Powered by VANTIX
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                >
                  Book a Consultation
                </Link>
                <Link
                  href="/systems"
                  className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wide uppercase border border-teal/30 hover:border-teal text-teal rounded-lg transition-all duration-300"
                >
                  Explore Systems
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Subtle Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="relative aspect-square">
                {/* Abstract system graphic */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(0,212,191,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,191,0.15) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST / POSITIONING STRIP */}
      <section className="py-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gray-500">
            CONSULTING · AUTOMATION · ACQUISITION · PERFORMANCE · INTELLIGENCE
          </p>
        </div>
      </section>

      {/* SECTION 3: METRICS */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-6xl mx-auto">
            {/* Section Heading */}
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight">
                Built Through Systems, Not Guesswork
              </h2>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 text-teal">
                  2.5x
                </div>
                <div className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-400">
                  Average ROAS
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 text-teal">
                  3x
                </div>
                <div className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-400">
                  Revenue Growth
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 text-teal">
                  92%
                </div>
                <div className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-400">
                  Client Retention
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 text-teal">
                  2.8x
                </div>
                <div className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-400">
                  Average ROI
                </div>
              </div>
            </div>

            {/* Supporting Line */}
            <p className="text-center text-sm text-gray-400">
              Results achieved through structured growth systems and VANTIX-powered intelligence.
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 4: WHO WE ARE */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Text */}
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-6">
                  WHO WE ARE
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-8 leading-tight">
                  We Are Not Just a Marketing Agency
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="text-base text-gray-300 leading-relaxed">
                    Valmont operates as both a marketing agency and a consultancy.
                  </p>
                  <p className="text-base text-gray-300 leading-relaxed">
                    We help brands define strategy, build infrastructure, launch acquisition systems, 
                    and scale using intelligence and automation.
                  </p>
                  <p className="text-base text-gray-300 leading-relaxed font-semibold">
                    We do not sell disconnected services. We design growth systems.
                  </p>
                </div>
                <Link
                  href="/systems"
                  className="inline-block px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                >
                  See Our Systems
                </Link>
              </div>

              {/* Right: Simple Visual */}
              <div className="hidden lg:block">
                <div className="border border-white/5 rounded-lg p-8 bg-white/[0.02]">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-teal" />
                      <span>Strategy & Positioning</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-teal" />
                      <span>System Architecture</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-teal" />
                      <span>Execution & Deployment</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-teal" />
                      <span>Intelligence & Optimization</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 5: FREE AUDIT */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-5xl mx-auto">
            <div className="border border-teal/10 bg-white/[0.01] rounded-lg p-8 sm:p-12">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Left: Text */}
                <div>
                  <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-6">
                    STRATEGIC ENTRY POINT
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 leading-tight">
                    Free AI Growth Audit
                  </h2>
                  <div className="space-y-4 mb-8">
                    <p className="text-base text-gray-300 leading-relaxed">
                      We review your current marketing, positioning, and digital infrastructure to identify 
                      where your growth system is underperforming.
                    </p>
                    <p className="text-base text-gray-300 leading-relaxed">
                      This is not a generic agency audit. It is a strategic review powered by VANTIX.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-block w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                  >
                    Get My Free Audit
                  </Link>
                </div>

                {/* Right: Audit Card Visual */}
                <div className="hidden lg:block">
                  <div className="border border-teal/20 rounded-lg p-6 bg-teal/[0.02]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-teal mb-4">
                      Strategic Audit Includes
                    </p>
                    <div className="space-y-3">
                      <div className="text-sm text-gray-300">→ Current system analysis</div>
                      <div className="text-sm text-gray-300">→ Performance gaps</div>
                      <div className="text-sm text-gray-300">→ Growth opportunities</div>
                      <div className="text-sm text-gray-300">→ Infrastructure recommendations</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 6: SERVICES OVERVIEW */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-6xl mx-auto">
            {/* Section Label & Heading */}
            <div className="text-center mb-16">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-6">
                HOW VALMONT WORKS
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight">
                Strategy. Execution. Intelligence.
              </h2>
            </div>

            {/* 3 Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {/* Card 1: Consulting */}
              <div className="border border-white/5 rounded-lg p-6 sm:p-8 bg-white/[0.01] hover:border-teal/20 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold uppercase mb-3 tracking-wide">
                  Consulting
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Growth strategy, positioning, system planning, and scale advisory.
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-teal">→</span>
                </div>
              </div>

              {/* Card 2: Implementation */}
              <div className="border border-white/5 rounded-lg p-6 sm:p-8 bg-white/[0.01] hover:border-teal/20 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold uppercase mb-3 tracking-wide">
                  Implementation
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Websites, creatives, acquisition systems, automations, and funnels.
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-teal">→</span>
                </div>
              </div>

              {/* Card 3: Intelligence */}
              <div className="border border-white/5 rounded-lg p-6 sm:p-8 bg-white/[0.01] hover:border-teal/20 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold uppercase mb-3 tracking-wide">
                  Intelligence
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Performance monitoring, optimization signals, and decision support through VANTIX.
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-teal">→</span>
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <p className="text-center text-sm text-gray-300">
              Everything works together as one system.{" "}
              <span className="font-semibold text-teal">Powered by VANTIX.</span>
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 7: VANTIX BLOCK */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-6">
                  VANTIX
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-8 leading-tight">
                  The Intelligence Layer Behind Every Valmont System
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="text-base text-gray-300 leading-relaxed">
                    VANTIX monitors performance, identifies inefficiencies, detects opportunities, 
                    and supports smarter growth decisions.
                  </p>
                  <p className="text-base text-gray-300 leading-relaxed">
                    Every Valmont engagement is strengthened by VANTIX-powered intelligence.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/assurance"
                    className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                  >
                    Discover VANTIX
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wide uppercase border border-teal/30 hover:border-teal text-teal rounded-lg transition-all duration-300"
                  >
                    Book Demo
                  </Link>
                </div>
              </div>

              {/* Right: System Diagram */}
              <div className="border border-teal/20 rounded-lg p-8 bg-black/20">
                <div className="space-y-4 text-sm text-gray-400">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal" />
                    <span>Traffic</span>
                    <span className="text-teal">→</span>
                  </div>
                  <div className="flex items-center gap-3 pl-6">
                    <div className="w-2 h-2 rounded-full bg-teal/60" />
                    <span>Funnel</span>
                    <span className="text-teal">→</span>
                  </div>
                  <div className="flex items-center gap-3 pl-12">
                    <div className="w-2 h-2 rounded-full bg-teal/60" />
                    <span>CRM</span>
                    <span className="text-teal">→</span>
                  </div>
                  <div className="flex items-center gap-3 pl-6">
                    <div className="w-2 h-2 rounded-full bg-teal/60" />
                    <span>Data</span>
                    <span className="text-teal">→</span>
                  </div>
                  <div className="flex items-center gap-3 pl-3">
                    <div className="w-3 h-3 rounded-full bg-teal animate-pulse" />
                    <span className="font-semibold text-teal">VANTIX</span>
                    <span className="text-teal">→</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal" />
                    <span className="font-semibold">Optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 8: WHY VALMONT */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Content */}
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-6">
                  WHY VALMONT
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-10 leading-tight">
                  Built for Serious Growth
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-1 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <p className="text-base text-gray-300">Consultancy thinking, not just execution</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-1 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <p className="text-base text-gray-300">Systems instead of random marketing</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-1 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <p className="text-base text-gray-300">Long-term growth infrastructure</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-1 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <p className="text-base text-gray-300">VANTIX-powered intelligence</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-1 h-1 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <p className="text-base text-gray-300">Designed for controlled scale</p>
                  </div>
                </div>
              </div>

              {/* Right: Visual Element */}
              <div className="hidden lg:block">
                <div className="border border-white/5 rounded-lg p-8 bg-white/[0.01]">
                  <p className="text-sm text-gray-400 leading-relaxed italic">
                    "Valmont doesn't run campaigns. They architect growth systems that scale predictably."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 9: FINAL CTA */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl mx-auto">
            <div className="border border-teal/20 rounded-lg p-10 sm:p-16 bg-white/[0.01] text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 leading-tight">
                Ready to Build a Real Growth System?
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                If you need strategy, execution, and intelligence working together, Valmont is built for that.
              </p>
              <Link
                href="/contact"
                className="inline-block w-full sm:w-auto px-10 py-5 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-2">
              Valmont Marketing & Consultancy
            </p>
            <p className="text-xs text-gray-500 mb-1">
              Strategic Growth Infrastructure, Consulting, and Execution
            </p>
            <p className="text-xs text-teal font-semibold">
              Powered by VANTIX
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-wider">
            <Link href="/" className="text-gray-500 hover:text-teal transition-colors">Home</Link>
            <Link href="/systems" className="text-gray-500 hover:text-teal transition-colors">Systems</Link>
            <Link href="/intelligence" className="text-gray-500 hover:text-teal transition-colors">Intelligence</Link>
            <Link href="/assurance" className="text-gray-500 hover:text-teal transition-colors">VANTIX</Link>
            <Link href="/contact" className="text-gray-500 hover:text-teal transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
