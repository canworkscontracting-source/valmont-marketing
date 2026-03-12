"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-teal/30 bg-teal/5 rounded-full"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.8)] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-teal">
                Growth Systems
              </span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="block"
              >
                Growth
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="block text-teal text-glow"
              >
                Systems
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
            >
              Elite marketing solutions for brands that refuse to settle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-10"
            >
              {["AUTOMATION", "DATA", "PERFORMANCE"].map((pill, i) => (
                <span
                  key={pill}
                  className="px-4 py-1.5 text-xs font-bold tracking-widest border border-teal/20 bg-teal/5 rounded-full"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)] hover:scale-105"
              >
                Start Your Journey
              </Link>
              <Link
                href="/systems"
                className="px-8 py-4 text-sm font-bold tracking-wide uppercase border border-teal/30 hover:border-teal/60 bg-teal/5 hover:bg-teal/10 rounded-full transition-all duration-300"
              >
                View Our Approach
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-16 text-xs font-bold tracking-widest uppercase text-gray-500"
            >
              SCROLL
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <Reveal>
        <section className="px-6 lg:px-8 py-16 bg-gradient-to-b from-transparent to-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-black mb-2 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  2.5x
                </div>
                <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Average ROAS
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-black mb-2 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  3x
                </div>
                <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-400">
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
                <div className="text-4xl md:text-6xl font-black mb-2 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  92%
                </div>
                <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Client Retention
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-black mb-2 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  2.8x
                </div>
                <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Average ROI
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Statement Section */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto glass rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
              We Don&apos;t Run Campaigns.
              <br />
              <span className="text-teal">We Build Growth Systems.</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Valmont Marketing engineers AI-powered systems designed to acquire, convert, and scale.
            </p>
          </div>
        </section>
      </Reveal>

      {/* What We Build */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">
                What We Build
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            <Reveal delay={0}>
              <div className="glass glass-hover rounded-2xl p-8 h-full">
                <h3 className="text-xl font-bold uppercase mb-3 text-teal">
                  AI Strategy & Automation
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Intelligent systems that work 24/7
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass glass-hover rounded-2xl p-8 h-full">
                <h3 className="text-xl font-bold uppercase mb-3 text-teal">
                  Performance & Data Intelligence
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Real-time optimization and insights
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass glass-hover rounded-2xl p-8 h-full">
                <h3 className="text-xl font-bold uppercase mb-3 text-teal">
                  Creative Built to Convert
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Design engineered for results
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </section>

      {/* Marketing Engineered */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto glass rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-8">
              Marketing, Engineered.
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                <span className="text-gray-300">AI-driven decision making</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                <span className="text-gray-300">Automated growth workflows</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                <span className="text-gray-300">Data-backed optimization</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                <span className="text-gray-300">Systems that scale with revenue</span>
              </li>
            </ul>
          </div>
        </section>
      </Reveal>

      {/* Why Valmont */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="glass rounded-3xl p-12">
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-8">
                Why Valmont
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Built on AI, not manual labor</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Systems before tactics</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <span className="text-gray-300">Designed for long-term scale</span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass rounded-3xl p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-6">
                Ready to Build
                <br />
                <span className="text-teal">Smarter Growth?</span>
              </h2>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)] text-center"
              >
                Start Building
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
