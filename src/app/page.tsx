"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Kicker */}
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

            {/* Main Headline */}
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

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              Elite marketing solutions for brands that refuse to settle.
            </motion.p>

            {/* CTA Button - FIXED TO GO TO CONTACT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link
                href="/contact"
                className="inline-block px-12 py-5 text-base font-bold tracking-wide uppercase bg-white hover:bg-gray-100 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105"
              >
                Start Your Journey
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - UPDATED WITH REALISTIC MULTIPLIERS */}
      <section className="px-6 lg:px-8 py-16 border-t border-teal/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { value: "3x", label: "AVG. ROAS" },
              { value: "$8M+", label: "AD SPEND MANAGED" },
              { value: "90%", label: "CLIENT RETENTION" },
              { value: "4.7/5", label: "CLIENT RATING" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 bg-gradient-to-r from-purple-400 via-teal to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-bold tracking-widest text-gray-400 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statement Section */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto glass rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
              We Don't Run Campaigns.
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
            {[
              {
                title: "AI Strategy & Automation",
                description: "Intelligent systems that work 24/7",
              },
              {
                title: "Performance & Data Intelligence",
                description: "Real-time optimization and insights",
              },
              {
                title: "Creative Built to Convert",
                description: "Design engineered for results",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="glass glass-hover rounded-2xl p-8 h-full">
                  <h3 className="text-xl font-bold uppercase mb-3 text-teal">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
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
              {[
                "AI-driven decision making",
                "Automated growth workflows",
                "Data-backed optimization",
                "Systems that scale with revenue",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
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
                {[
                  "Built on AI, not manual labor",
                  "Systems before tactics",
                  "Designed for long-term scale",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
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
