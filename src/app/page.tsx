"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,212,191,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,191,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 sm:mb-8 leading-tight"
            >
              Growth Systems for Brands
              <br />
              <span className="text-teal">That Want More Than Marketing</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-10 sm:mb-12 leading-relaxed px-4"
            >
              Valmont is a marketing agency and consultancy that builds structured growth systems 
              powered by intelligence, automation, and performance strategy.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)] hover:scale-105"
              >
                Book Consultation
              </Link>
              <Link
                href="/systems"
                className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wide uppercase border border-teal/30 hover:border-teal/60 bg-teal/5 hover:bg-teal/10 rounded-full transition-all duration-300"
              >
                Explore Systems
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: POSITIONING STRIP */}
      <section className="py-6 sm:py-8 border-y border-teal/10 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap"
        >
          <span className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-gray-500">
            CONSULTING · SYSTEMS · AUTOMATION · PERFORMANCE · INTELLIGENCE · CONSULTING · SYSTEMS · AUTOMATION · PERFORMANCE · INTELLIGENCE
          </span>
        </motion.div>
      </section>

      {/* SECTION 3: METRICS */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4">
                Built Through Systems
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  2.5x
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400">
                  ROAS
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  3x
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Revenue Growth
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  92%
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Retention
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  2.8x
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400">
                  ROI
                </div>
              </motion.div>
            </div>

            <p className="text-center text-sm text-teal font-semibold">
              Powered by VANTIX
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 4: WHAT WE DO */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4">
                We Design Growth Systems
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-8">
              <div className="glass rounded-2xl p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-bold uppercase mb-4 text-teal">
                  Consulting
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Strategy, positioning, growth planning
                </p>
              </div>

              <div className="glass rounded-2xl p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-bold uppercase mb-4 text-teal">
                  Execution
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Web, ads, creatives, funnels
                </p>
              </div>

              <div className="glass rounded-2xl p-6 sm:p-8 text-center">
                <h3 className="text-xl sm:text-2xl font-bold uppercase mb-4 text-teal">
                  Intelligence
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  VANTIX monitoring, optimization, decision support
                </p>
              </div>
            </div>

            <p className="text-center text-base sm:text-lg font-bold text-gray-200">
              Everything works as one system.
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 5: SYSTEMS OVERVIEW */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4">
                Our Systems
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 sm:mb-12">
              <div className="glass rounded-2xl p-6 sm:p-8 hover:border-teal/40 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold uppercase mb-2 text-teal">
                  Creative & Brand Systems
                </h3>
                <p className="text-sm text-gray-400">
                  Visual identity, messaging, content production
                </p>
              </div>

              <div className="glass rounded-2xl p-6 sm:p-8 hover:border-teal/40 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold uppercase mb-2 text-teal">
                  Digital Infrastructure Systems
                </h3>
                <p className="text-sm text-gray-400">
                  Websites, landing pages, sales funnels
                </p>
              </div>

              <div className="glass rounded-2xl p-6 sm:p-8 hover:border-teal/40 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold uppercase mb-2 text-teal">
                  Growth & Acquisition Systems
                </h3>
                <p className="text-sm text-gray-400">
                  Ads, SEO, outbound, partnerships
                </p>
              </div>

              <div className="glass rounded-2xl p-6 sm:p-8 hover:border-teal/40 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold uppercase mb-2 text-teal">
                  Automation Systems
                </h3>
                <p className="text-sm text-gray-400">
                  Email, CRM, workflows, integrations
                </p>
              </div>

              <div className="glass rounded-2xl p-6 sm:p-8 hover:border-teal/40 transition-all duration-300">
                <h3 className="text-lg sm:text-xl font-bold uppercase mb-2 text-teal">
                  Intelligence Systems
                </h3>
                <p className="text-sm text-gray-400">
                  Analytics, reporting, optimization via VANTIX
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/systems"
                className="inline-block px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)]"
              >
                View Systems & Pricing
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 6: VANTIX */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="glass rounded-3xl p-8 sm:p-12 md:p-16">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
                  Powered by <span className="text-teal">VANTIX</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  VANTIX is the intelligence engine behind Valmont. It monitors performance, 
                  detects inefficiencies, and supports smarter growth decisions.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase text-teal">
                    Monitor
                  </h3>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase text-teal">
                    Analyze
                  </h3>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase text-teal">
                    Optimize
                  </h3>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase text-teal">
                    Scale
                  </h3>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/assurance"
                  className="inline-block px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)]"
                >
                  Discover VANTIX
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 7: CONSULTING */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-8 sm:p-12 md:p-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
                Consulting & Advisory
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-300 mb-8">
                We help businesses decide:
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <p className="text-base sm:text-lg text-gray-300">
                    what to build
                  </p>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <p className="text-base sm:text-lg text-gray-300">
                    what to fix
                  </p>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <p className="text-base sm:text-lg text-gray-300">
                    where to spend
                  </p>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <p className="text-base sm:text-lg text-gray-300">
                    how to scale
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-block px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)]"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 8: INDUSTRIES */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4">
                Who We Work With
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="glass rounded-xl p-4 sm:p-6 text-center hover:border-teal/40 transition-all duration-300">
                <p className="text-sm sm:text-base font-semibold text-gray-300">Real Estate</p>
              </div>

              <div className="glass rounded-xl p-4 sm:p-6 text-center hover:border-teal/40 transition-all duration-300">
                <p className="text-sm sm:text-base font-semibold text-gray-300">Clinics</p>
              </div>

              <div className="glass rounded-xl p-4 sm:p-6 text-center hover:border-teal/40 transition-all duration-300">
                <p className="text-sm sm:text-base font-semibold text-gray-300">Restaurants</p>
              </div>

              <div className="glass rounded-xl p-4 sm:p-6 text-center hover:border-teal/40 transition-all duration-300">
                <p className="text-sm sm:text-base font-semibold text-gray-300">Political Campaigns</p>
              </div>

              <div className="glass rounded-xl p-4 sm:p-6 text-center hover:border-teal/40 transition-all duration-300">
                <p className="text-sm sm:text-base font-semibold text-gray-300">E-commerce</p>
              </div>

              <div className="glass rounded-xl p-4 sm:p-6 text-center hover:border-teal/40 transition-all duration-300">
                <p className="text-sm sm:text-base font-semibold text-gray-300">Local Businesses</p>
              </div>

              <div className="glass rounded-xl p-4 sm:p-6 text-center hover:border-teal/40 transition-all duration-300">
                <p className="text-sm sm:text-base font-semibold text-gray-300">Personal Brands</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 9: FREE AUDIT */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-8 sm:p-12 md:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
                Free AI Growth Audit
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                We analyze your current marketing, positioning, and systems—and show you 
                exactly where your growth is breaking.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)] hover:scale-105"
              >
                Get Free Audit
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 10: FINAL CTA */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-10 sm:mb-12 leading-tight">
              Build a Real
              <br />
              <span className="text-teal">Growth System</span>
            </h2>

            <Link
              href="/contact"
              className="inline-block px-10 py-5 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)] hover:scale-105"
            >
              Book Consultation
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
