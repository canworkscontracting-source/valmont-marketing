"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import PremiumCard from "@/components/premium/PremiumCard";
import GradientText from "@/components/premium/GradientText";
import AnimatedMetric from "@/components/premium/AnimatedMetric";
import GlowButton from "@/components/premium/GlowButton";
import AnimatedDiagram from "@/components/premium/AnimatedDiagram";

export default function SystemsPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Abstract mesh gradient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-6 pt-32 pb-20 sm:pt-40 sm:pb-32">
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
                Valmont Systems
              </p>
              
              <GradientText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 leading-tight">
                Infrastructure Built
                <br />
                for Controlled Growth
              </GradientText>
              
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
                Strategic systems that combine consulting, automation, and execution. 
                Every system is powered by VANTIX AI intelligence.
              </p>
              
              <p className="text-sm font-medium text-teal mb-8 sm:mb-10">
                Choose the system that matches your growth stage.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <GlowButton href="/contact" variant="primary" size="md">
                  Book Consultation
                </GlowButton>
                <GlowButton href="#pricing" variant="secondary" size="md">
                  View Pricing
                </GlowButton>
              </div>
            </motion.div>

            {/* Right: System Flow Diagram */}
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
                    { label: "Systems" },
                    { label: "Automation" },
                    { label: "VANTIX AI", highlight: true },
                    { label: "Scale", highlight: true }
                  ]}
                  direction="vertical"
                />
              </PremiumCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <Reveal>
        <section className="relative px-4 sm:px-6 py-20 sm:py-32">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent pointer-events-none" />
          
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                System Performance
              </h2>
              <p className="text-gray-400 text-sm">
                Average results across all system tiers
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <AnimatedMetric value={89} suffix="%" label="Implementation Success" delay={0} />
              <AnimatedMetric value={4.2} suffix="x" label="Efficiency Improvement" delay={0.1} />
              <AnimatedMetric value={67} suffix="%" label="Cost Reduction" delay={0.2} />
              <AnimatedMetric value={30} suffix=" days" label="Avg. ROI Timeline" delay={0.3} />
            </div>
          </div>
        </section>
      </Reveal>

      {/* PRICING SECTION */}
      <Reveal>
        <section id="pricing" className="relative px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-4">
                Choose Your System
              </h2>
              <p className="text-gray-400 text-base max-w-2xl mx-auto">
                Each system includes strategy, execution, and VANTIX AI intelligence. 
                Scale up or down as your needs evolve.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* STARTER SYSTEM */}
              <PremiumCard glow hover delay={0}>
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal/20 to-teal/10 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-black uppercase mb-2 text-teal">
                    Starter System
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-6">
                    For early-stage businesses
                  </p>
                  
                  <div className="mb-8">
                    <div className="text-4xl font-black text-white mb-2">
                      $499
                      <span className="text-base font-normal text-gray-500">/month</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Landing page system</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Basic automation setup</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">VANTIX AI monitoring</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Monthly strategy call</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Email support</span>
                    </div>
                  </div>

                  <GlowButton href="/contact" variant="secondary" className="w-full">
                    Get Started
                  </GlowButton>
                </div>
              </PremiumCard>

              {/* GROWTH SYSTEM */}
              <PremiumCard glow hover delay={0.1}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal/30 to-teal/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-teal/10 text-teal rounded-full border border-teal/20">
                      Popular
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black uppercase mb-2 text-teal">
                    Growth System
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-6">
                    For growing businesses
                  </p>
                  
                  <div className="mb-8">
                    <div className="text-4xl font-black text-white mb-2">
                      $899
                      <span className="text-base font-normal text-gray-500">/month</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Full website + funnel system</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Advanced automation flows</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">VANTIX AI optimization</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Bi-weekly strategy calls</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Priority support</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">CRM integration</span>
                    </div>
                  </div>

                  <GlowButton href="/contact" variant="primary" className="w-full">
                    Get Started
                  </GlowButton>
                </div>
              </PremiumCard>

              {/* SCALE SYSTEM */}
              <PremiumCard glow hover delay={0.2}>
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal/40 to-teal/30 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-black uppercase mb-2 text-teal">
                    Scale System
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-6">
                    For scaling companies
                  </p>
                  
                  <div className="mb-8">
                    <div className="text-4xl font-black text-white mb-2">
                      $1,299
                      <span className="text-base font-normal text-gray-500">/month</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Enterprise infrastructure</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Multi-channel automation</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Full VANTIX AI suite</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Weekly strategy sessions</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Dedicated account manager</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">24/7 priority support</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Custom integrations</span>
                    </div>
                  </div>

                  <GlowButton href="/contact" variant="secondary" className="w-full">
                    Get Started
                  </GlowButton>
                </div>
              </PremiumCard>

              {/* CUSTOM SYSTEM */}
              <PremiumCard glow hover delay={0.3}>
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal/50 to-teal/40 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  
                  <h3 className="text-xl font-black uppercase mb-2 text-teal">
                    Custom System
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-6">
                    For unique requirements
                  </p>
                  
                  <div className="mb-8">
                    <div className="text-4xl font-black text-white mb-2">
                      Custom
                      <span className="text-base font-normal text-gray-500 block">Pricing</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Everything in Scale</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Fully customized architecture</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">White-label VANTIX AI</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">On-demand strategic consulting</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Unlimited integrations</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-300">Dedicated engineering team</span>
                    </div>
                  </div>

                  <GlowButton href="/contact" variant="secondary" className="w-full">
                    Contact Us
                  </GlowButton>
                </div>
              </PremiumCard>
            </div>

            <p className="text-center text-sm text-gray-400">
              All systems include VANTIX AI intelligence and can be customized to your specific needs.
            </p>
          </div>
        </section>
      </Reveal>

      {/* WHAT'S INCLUDED */}
      <Reveal>
        <section className="relative px-4 sm:px-6 py-20 sm:py-32">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal/5 via-transparent to-teal/5 pointer-events-none" />
          
          <div className="max-w-[1200px] mx-auto relative z-10">
            <PremiumCard glow={true} hover={false} className="p-10 sm:p-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-12 text-center">
                What Every System Includes
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-teal">Strategy First</h3>
                  <p className="text-sm text-gray-300">Every system begins with strategic planning, not just execution.</p>
                </div>

                <div>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-teal">Built Infrastructure</h3>
                  <p className="text-sm text-gray-300">Websites, funnels, automation — all built to work together.</p>
                </div>

                <div>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-teal">VANTIX AI Intelligence</h3>
                  <p className="text-sm text-gray-300">Performance monitoring and optimization powered by AI.</p>
                </div>

                <div>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-teal">Ongoing Optimization</h3>
                  <p className="text-sm text-gray-300">Continuous improvement based on data and performance.</p>
                </div>

                <div>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-teal">Expert Support</h3>
                  <p className="text-sm text-gray-300">Direct access to strategic advisors and technical support.</p>
                </div>

                <div>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase mb-2 text-teal">Built for Scale</h3>
                  <p className="text-sm text-gray-300">Infrastructure designed to grow with your business needs.</p>
                </div>
              </div>
            </PremiumCard>
          </div>
        </section>
      </Reveal>

      {/* CTA SECTION */}
      <Reveal>
        <section className="px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <PremiumCard glow={true} hover={false} className="p-12 sm:p-20 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-12 leading-tight">
                Ready to Build Your
                <br />
                <span className="text-teal">Growth System?</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Book a consultation to discuss which system fits your growth stage and strategic goals.
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
