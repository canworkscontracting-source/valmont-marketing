"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import PremiumCard from "@/components/premium/PremiumCard";
import GradientText from "@/components/premium/GradientText";
import AnimatedMetric from "@/components/premium/AnimatedMetric";
import GlowButton from "@/components/premium/GlowButton";
import AnimatedDiagram from "@/components/premium/AnimatedDiagram";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="px-4 sm:px-6 pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-6 sm:mb-8">
                Valmont Marketing & Consultancy
              </p>
              
              <GradientText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 leading-tight">
                Growth Systems for Brands
                <br />
                That Want More Than Marketing
              </GradientText>
              
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
                We combine consulting, execution, and AI-powered intelligence to help brands acquire customers, 
                improve conversion, and scale with structure.
              </p>
              
              <p className="text-sm font-medium text-teal mb-8 sm:mb-10">
                Powered by VANTIX AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <GlowButton href="/contact" variant="primary" size="md">
                  Book Consultation
                </GlowButton>
                <GlowButton href="/systems" variant="secondary" size="md">
                  Explore Systems
                </GlowButton>
              </div>
            </motion.div>

            {/* Right: System Diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden lg:block"
            >
              <PremiumCard glow={true} hover={false}>
                <AnimatedDiagram
                  nodes={[
                    { label: "Strategy" },
                    { label: "Infrastructure" },
                    { label: "Execution" },
                    { label: "Data" },
                    { label: "VANTIX AI", highlight: true },
                    { label: "Growth", highlight: true }
                  ]}
                  direction="vertical"
                />
              </PremiumCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* POSITIONING STRIP */}
      <section className="py-6 border-y border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <p className="text-center text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gray-500">
            CONSULTING · AUTOMATION · ACQUISITION · PERFORMANCE · INTELLIGENCE
          </p>
        </div>
      </section>

      {/* METRICS SECTION */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                Built Through Systems, Not Guesswork
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6">
              <AnimatedMetric value={2.5} suffix="x" label="Average ROAS" delay={0} />
              <AnimatedMetric value={3} suffix="x" label="Revenue Growth" delay={0.1} />
              <AnimatedMetric value={92} suffix="%" label="Client Retention" delay={0.2} />
              <AnimatedMetric value={2.8} suffix="x" label="Average ROI" delay={0.3} />
            </div>

            <p className="text-center text-sm text-gray-400">
              Results achieved through structured systems and VANTIX AI intelligence.
            </p>
          </div>
        </section>
      </Reveal>

      {/* WHAT WE DO */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-4">
                We Design Growth Systems
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <PremiumCard glow hover delay={0}>
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold uppercase mb-3 text-teal">
                  Consulting
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Strategy, positioning, growth planning
                </p>
              </PremiumCard>

              <PremiumCard glow hover delay={0.1}>
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold uppercase mb-3 text-teal">
                  Systems
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Websites, funnels, automation, infrastructure
                </p>
              </PremiumCard>

              <PremiumCard glow hover delay={0.2} className="sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold uppercase mb-3 text-teal">
                  Intelligence
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Performance monitoring, optimization, decision support
                </p>
              </PremiumCard>
            </div>

            <p className="text-center text-base font-bold text-gray-200">
              Everything works as one system.
            </p>
          </div>
        </section>
      </Reveal>

      {/* FREE AUDIT */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <PremiumCard glow={true} hover={false} className="p-10 sm:p-16">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="text-center lg:text-left">
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
                      This is not a generic agency audit. It is a strategic review powered by VANTIX AI.
                    </p>
                  </div>
                  <div className="flex justify-center lg:justify-start">
                    <GlowButton href="/contact" variant="primary" size="md">
                      Get My Free Audit
                    </GlowButton>
                  </div>
                </div>

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
            </PremiumCard>
          </div>
        </section>
      </Reveal>

      {/* SYSTEMS OVERVIEW */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-4">
                Our Systems
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 sm:mb-12">
              <Link href="/systems" className="block group">
                <PremiumCard glow hover delay={0}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-teal">
                    Starter System
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">For early-stage businesses</p>
                  <div className="flex items-center gap-2 text-teal">
                    <span className="text-sm font-medium">Start at $499</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </PremiumCard>
              </Link>

              <Link href="/systems" className="block group">
                <PremiumCard glow hover delay={0.1}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-teal">
                    Growth System
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">For growing businesses</p>
                  <div className="flex items-center gap-2 text-teal">
                    <span className="text-sm font-medium">Start at $899</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </PremiumCard>
              </Link>

              <Link href="/systems" className="block group">
                <PremiumCard glow hover delay={0.2}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-teal">
                    Scale System
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">For scaling companies</p>
                  <div className="flex items-center gap-2 text-teal">
                    <span className="text-sm font-medium">Start at $1299</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </PremiumCard>
              </Link>

              <Link href="/contact" className="block group">
                <PremiumCard glow hover delay={0.3}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-teal">
                    Custom System
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">For full infrastructure</p>
                  <div className="flex items-center gap-2 text-teal">
                    <span className="text-sm font-medium">Custom Plan</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </PremiumCard>
              </Link>
            </div>

            <div className="text-center">
              <GlowButton href="/systems" variant="secondary" size="lg">
                View Systems & Pricing
              </GlowButton>
            </div>
          </div>
        </section>
      </Reveal>

      {/* VANTIX SECTION */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <PremiumCard glow={true} hover={false} className="p-10 sm:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-500 mb-6">
                    VANTIX AI
                  </p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-8 leading-tight">
                    The Intelligence Layer Behind Every Valmont System
                  </h2>
                  <div className="space-y-4 mb-8">
                    <p className="text-base text-gray-300 leading-relaxed">
                      VANTIX AI monitors performance, identifies inefficiencies, detects opportunities, 
                      and supports smarter growth decisions.
                    </p>
                    <p className="text-base text-gray-300 leading-relaxed">
                      Every Valmont engagement is strengthened by VANTIX AI-powered intelligence.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <GlowButton href="/assurance" variant="primary" size="md">
                      Discover VANTIX AI
                    </GlowButton>
                    <GlowButton href="/contact" variant="secondary" size="md">
                      Book Demo
                    </GlowButton>
                  </div>
                </div>

                <div>
                  <AnimatedDiagram
                    nodes={[
                      { label: "Traffic" },
                      { label: "Funnel" },
                      { label: "CRM" },
                      { label: "Data" },
                      { label: "VANTIX AI", highlight: true },
                      { label: "Optimization", highlight: true }
                    ]}
                    direction="vertical"
                  />
                </div>
              </div>
            </PremiumCard>
          </div>
        </section>
      </Reveal>

      {/* WHY VALMONT */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <PremiumCard glow={true} hover={false} className="p-10 sm:p-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-10 text-center lg:text-left">
                Built for Serious Growth
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                  <p className="text-base text-gray-300">Consultancy thinking, not just execution</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                  <p className="text-base text-gray-300">Systems instead of random marketing</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                  <p className="text-base text-gray-300">Long-term growth infrastructure</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                  <p className="text-base text-gray-300">VANTIX AI-powered intelligence</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mt-2 flex-shrink-0" />
                  <p className="text-base text-gray-300">Designed for controlled scale</p>
                </div>
              </div>
            </PremiumCard>
          </div>
        </section>
      </Reveal>

      {/* FINAL CTA */}
      <Reveal>
        <section className="px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <PremiumCard glow={true} hover={false} className="p-12 sm:p-20 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-12 leading-tight">
                Ready to Build a Real
                <br />
                <span className="text-teal">Growth System?</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                If you need strategy, execution, and intelligence working together, Valmont is built for that.
              </p>
              <div className="flex justify-center">
                <GlowButton href="/contact" variant="primary" size="lg">
                  Book Consultation
                </GlowButton>
              </div>
            </PremiumCard>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
