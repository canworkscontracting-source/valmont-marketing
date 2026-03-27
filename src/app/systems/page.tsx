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
    <>
      <main className="min-h-screen relative overflow-hidden">
        {/* Abstract mesh gradient background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        {/* 1. HERO */}
        <section className="relative px-4 sm:px-6 pt-32 pb-20 sm:pt-40 sm:pb-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
                  Infrastructure Built for Controlled Growth
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

        {/* 2. WORKFLOW DIAGRAM (7-STEP) */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent pointer-events-none" />
            
            <div className="max-w-[1200px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                  How Systems Work
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                  Every system follows a proven workflow from strategy to execution
                </p>
              </div>

              {/* Desktop: Horizontal diagram */}
              <div className="hidden lg:block mb-12">
                <AnimatedDiagram
                  title="VALMONT SYSTEM WORKFLOW"
                  nodes={[
                    { label: "Discovery" },
                    { label: "Strategy" },
                    { label: "Design" },
                    { label: "Build" },
                    { label: "Launch" },
                    { label: "VANTIX AI", highlight: true },
                    { label: "Optimize", highlight: true }
                  ]}
                  direction="horizontal"
                />
              </div>

              {/* Mobile: Vertical timeline with glass cards */}
              <div className="lg:hidden space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 }}
                  className="relative"
                >
                  <PremiumCard glow hover={false} delay={0}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold uppercase mb-2 text-teal">Discovery</h3>
                        <p className="text-sm text-gray-300">We analyze your business, market, and current infrastructure.</p>
                      </div>
                    </div>
                  </PremiumCard>
                  <div className="absolute left-10 top-full w-0.5 h-6 bg-gradient-to-b from-teal/50 to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <PremiumCard glow hover={false} delay={0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold uppercase mb-2 text-teal">Strategy</h3>
                        <p className="text-sm text-gray-300">Strategic planning for positioning, messaging, and funnel architecture.</p>
                      </div>
                    </div>
                  </PremiumCard>
                  <div className="absolute left-10 top-full w-0.5 h-6 bg-gradient-to-b from-teal/50 to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <PremiumCard glow hover={false} delay={0.2}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold uppercase mb-2 text-teal">Design</h3>
                        <p className="text-sm text-gray-300">We design your infrastructure, user experience, and visual identity.</p>
                      </div>
                    </div>
                  </PremiumCard>
                  <div className="absolute left-10 top-full w-0.5 h-6 bg-gradient-to-b from-teal/50 to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <PremiumCard glow hover={false} delay={0.3}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold uppercase mb-2 text-teal">Build</h3>
                        <p className="text-sm text-gray-300">We build your infrastructure — websites, funnels, CRM, and automation.</p>
                      </div>
                    </div>
                  </PremiumCard>
                  <div className="absolute left-10 top-full w-0.5 h-6 bg-gradient-to-b from-teal/50 to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <PremiumCard glow hover={false} delay={0.4}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold uppercase mb-2 text-teal">Launch</h3>
                        <p className="text-sm text-gray-300">Systems go live with monitoring, testing, and validation.</p>
                      </div>
                    </div>
                  </PremiumCard>
                  <div className="absolute left-10 top-full w-0.5 h-6 bg-gradient-to-b from-teal/50 to-teal" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <PremiumCard glow hover={false} delay={0.5} className="border-teal/40">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal/30 to-teal/20 flex items-center justify-center flex-shrink-0 shadow-glow">
                        <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold uppercase mb-2 text-teal">VANTIX AI</h3>
                        <p className="text-sm text-gray-300">Continuous intelligence monitoring identifies opportunities and inefficiencies.</p>
                      </div>
                    </div>
                  </PremiumCard>
                  <div className="absolute left-10 top-full w-0.5 h-6 bg-gradient-to-b from-teal to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <PremiumCard glow hover={false} delay={0.6} className="border-teal/40">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal/30 to-teal/20 flex items-center justify-center flex-shrink-0 shadow-glow">
                        <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold uppercase mb-2 text-teal">Optimize</h3>
                        <p className="text-sm text-gray-300">Ongoing refinement based on data, performance, and evolving business needs.</p>
                      </div>
                    </div>
                  </PremiumCard>
                </motion.div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 3. AUTOMATION FLOWS (6-STEP + CARDS) */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                  Built-In Automation
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                  Intelligent automation powered by VANTIX AI
                </p>
              </div>

              {/* Desktop: Horizontal diagram */}
              <div className="hidden lg:block mb-12">
                <PremiumCard glow={true} hover={false} className="p-10">
                  <AnimatedDiagram
                    title="AUTOMATION FLOW"
                    nodes={[
                      { label: "Lead" },
                      { label: "Website" },
                      { label: "CRM" },
                      { label: "Automation" },
                      { label: "Email/SMS" },
                      { label: "VANTIX AI", highlight: true },
                      { label: "Conversion", highlight: true }
                    ]}
                    direction="horizontal"
                  />
                </PremiumCard>
              </div>

              {/* Mobile: Vertical flow */}
              <div className="lg:hidden mb-12 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <PremiumCard glow hover={false}>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold uppercase text-teal">Lead</h3>
                    </div>
                  </PremiumCard>
                  <div className="absolute left-1/2 top-full w-0.5 h-4 bg-gradient-to-b from-teal/50 to-transparent -translate-x-1/2" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <PremiumCard glow hover={false}>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold uppercase text-teal">Website</h3>
                    </div>
                  </PremiumCard>
                  <div className="absolute left-1/2 top-full w-0.5 h-4 bg-gradient-to-b from-teal/50 to-transparent -translate-x-1/2" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <PremiumCard glow hover={false}>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold uppercase text-teal">CRM</h3>
                    </div>
                  </PremiumCard>
                  <div className="absolute left-1/2 top-full w-0.5 h-4 bg-gradient-to-b from-teal/50 to-transparent -translate-x-1/2" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <PremiumCard glow hover={false}>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold uppercase text-teal">Automation</h3>
                    </div>
                  </PremiumCard>
                  <div className="absolute left-1/2 top-full w-0.5 h-4 bg-gradient-to-b from-teal/50 to-transparent -translate-x-1/2" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <PremiumCard glow hover={false}>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold uppercase text-teal">Email/SMS</h3>
                    </div>
                  </PremiumCard>
                  <div className="absolute left-1/2 top-full w-0.5 h-4 bg-gradient-to-b from-teal/50 to-teal -translate-x-1/2" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <PremiumCard glow hover={false} className="border-teal/40">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal/30 to-teal/20 flex items-center justify-center mx-auto mb-3 shadow-glow">
                        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold uppercase text-teal">VANTIX AI</h3>
                    </div>
                  </PremiumCard>
                  <div className="absolute left-1/2 top-full w-0.5 h-4 bg-gradient-to-b from-teal to-transparent -translate-x-1/2" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <PremiumCard glow hover={false} className="border-teal/40">
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal/30 to-teal/20 flex items-center justify-center mx-auto mb-3 shadow-glow">
                        <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold uppercase text-teal">Conversion</h3>
                    </div>
                  </PremiumCard>
                </motion.div>
              </div>

              {/* Automation Cards (4 cards) */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <PremiumCard glow hover delay={0}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase mb-2 text-teal">Lead Capture</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Automatically capture and store leads from all sources.</p>
                </PremiumCard>

                <PremiumCard glow hover delay={0.1}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase mb-2 text-teal">Follow-up Automation</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Automated email and SMS sequences based on behavior.</p>
                </PremiumCard>

                <PremiumCard glow hover delay={0.2}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase mb-2 text-teal">CRM Automation</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Pipeline management and lead tracking synced across systems.</p>
                </PremiumCard>

                <PremiumCard glow hover delay={0.3}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase mb-2 text-teal">Performance Reporting</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Real-time performance tracking and optimization insights.</p>
                </PremiumCard>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 4. SYSTEM PERFORMANCE METRICS */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 system-performance-section">
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

              <div className="performance-metrics-grid grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <AnimatedMetric value={89} suffix="%" label="System Efficiency" delay={0} />
                <AnimatedMetric value={4.2} suffix="x" label="Average ROI" delay={0.1} />
                <AnimatedMetric value={67} suffix="%" label="Conversion Improvement" delay={0.2} />
                <AnimatedMetric value={30} suffix=" Days" label="Average Setup Time" delay={0.3} />
              </div>
            </div>
          </section>
        </Reveal>

        {/* 5. PRICING CARDS */}
        <Reveal>
          <section id="pricing" className="relative px-4 sm:px-6 py-20 sm:py-32">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-4">
                  Choose Your System
                </h2>
                <p className="text-gray-400 text-base max-w-2xl mx-auto">
                  Each system includes strategy, execution, and VANTIX AI intelligence.
                </p>
              </div>

              <div className="pricing-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* STARTER */}
                <PremiumCard glow hover delay={0}>
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal/20 to-teal/10 flex items-center justify-center mb-6 flex-shrink-0">
                      <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black uppercase mb-2 text-teal">Starter</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-6">For early-stage businesses</p>
                    <div className="mb-6 sm:mb-8">
                      <div className="text-3xl sm:text-4xl font-black text-white mb-2">
                        $499<span className="text-sm sm:text-base font-normal text-gray-500">/mo</span>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6 sm:mb-8 flex-grow">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Landing page system</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Basic automation</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">VANTIX AI monitoring</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Monthly strategy call</span>
                      </div>
                    </div>
                    <GlowButton href="/contact" variant="secondary" className="w-full">Get Started</GlowButton>
                  </div>
                </PremiumCard>

                {/* GROWTH - HIGHLIGHTED */}
                <PremiumCard glow hover delay={0.1} className="border-teal/60 lg:scale-105 lg:-mt-4 lg:mb-4">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6 flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal/40 to-teal/30 flex items-center justify-center shadow-glow">
                        <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-3 py-1 bg-teal text-black rounded-full">Popular</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black uppercase mb-2 text-teal">Growth</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-6">For growing businesses</p>
                    <div className="mb-6 sm:mb-8">
                      <div className="text-3xl sm:text-4xl font-black text-white mb-2">
                        $899<span className="text-sm sm:text-base font-normal text-gray-500">/mo</span>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6 sm:mb-8 flex-grow">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Full website + funnel</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Advanced automation</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">VANTIX AI optimization</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Bi-weekly strategy calls</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Priority support</span>
                      </div>
                    </div>
                    <GlowButton href="/contact" variant="primary" className="w-full">Get Started</GlowButton>
                  </div>
                </PremiumCard>

                {/* SCALE */}
                <PremiumCard glow hover delay={0.2}>
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal/30 to-teal/20 flex items-center justify-center mb-6 flex-shrink-0">
                      <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black uppercase mb-2 text-teal">Scale</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-6">For scaling companies</p>
                    <div className="mb-6 sm:mb-8">
                      <div className="text-3xl sm:text-4xl font-black text-white mb-2">
                        $1,299<span className="text-sm sm:text-base font-normal text-gray-500">/mo</span>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6 sm:mb-8 flex-grow">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Enterprise infrastructure</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Multi-channel automation</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Full VANTIX AI suite</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Weekly strategy sessions</span>
                      </div>
                    </div>
                    <GlowButton href="/contact" variant="secondary" className="w-full">Get Started</GlowButton>
                  </div>
                </PremiumCard>

                {/* CUSTOM */}
                <PremiumCard glow hover delay={0.3}>
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal/40 to-teal/30 flex items-center justify-center mb-6 flex-shrink-0">
                      <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black uppercase mb-2 text-teal">Custom</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-6">For unique requirements</p>
                    <div className="mb-6 sm:mb-8">
                      <div className="text-3xl sm:text-4xl font-black text-white mb-2">
                        Custom<span className="text-sm sm:text-base font-normal text-gray-500 block">Pricing</span>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6 sm:mb-8 flex-grow">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Everything in Scale</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Custom architecture</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">White-label VANTIX AI</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-300">Dedicated engineering team</span>
                      </div>
                    </div>
                    <GlowButton href="/contact" variant="secondary" className="w-full">Contact Us</GlowButton>
                  </div>
                </PremiumCard>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 6. SERVICES GRID */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent pointer-events-none" />
            
            <div className="max-w-[1200px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                  What Every System Includes
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                  Strategic planning, execution, and VANTIX AI intelligence
                </p>
              </div>

              <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <PremiumCard glow hover delay={0}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase mb-2 text-teal">Consulting</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Strategic planning and growth consulting.</p>
                </PremiumCard>

                <PremiumCard glow hover delay={0.1}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase mb-2 text-teal">Web Infrastructure</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Websites, funnels, and landing pages.</p>
                </PremiumCard>

                <PremiumCard glow hover delay={0.2}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase mb-2 text-teal">Acquisition</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Customer acquisition and performance marketing.</p>
                </PremiumCard>

                <PremiumCard glow hover delay={0.3}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase mb-2 text-teal">Automation</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Marketing and sales automation.</p>
                </PremiumCard>

                <PremiumCard glow hover delay={0.4}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase mb-2 text-teal">Intelligence</h3>
                  <p className="text-xs sm:text-sm text-gray-300">VANTIX AI performance monitoring.</p>
                </PremiumCard>

                <PremiumCard glow hover delay={0.5}>
                  <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold uppercase mb-2 text-teal">Infrastructure</h3>
                  <p className="text-xs sm:text-sm text-gray-300">Scalable system architecture.</p>
                </PremiumCard>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 7. PROCESS DIAGRAM (6-STEP) */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                  Engagement Process
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                  From discovery to optimization
                </p>
              </div>

              {/* Desktop: Horizontal */}
              <div className="hidden lg:block">
                <PremiumCard glow={true} hover={false} className="p-10">
                  <AnimatedDiagram
                    title="IMPLEMENTATION PROCESS"
                    nodes={[
                      { label: "Discover" },
                      { label: "Strategize" },
                      { label: "Build" },
                      { label: "Launch" },
                      { label: "VANTIX AI", highlight: true },
                      { label: "Optimize", highlight: true }
                    ]}
                    direction="horizontal"
                  />
                </PremiumCard>
              </div>

              {/* Mobile: Vertical steps */}
              <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Discover", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
                  { label: "Strategize", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
                  { label: "Build", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
                  { label: "Launch", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                  { label: "VANTIX AI", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", highlight: true },
                  { label: "Optimize", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", highlight: true }
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <PremiumCard glow hover={false} className={step.highlight ? "border-teal/40" : ""}>
                      <div className="text-center">
                        <div className={`w-10 h-10 rounded-lg ${step.highlight ? 'bg-gradient-to-br from-teal/30 to-teal/20 shadow-glow' : 'bg-teal/10'} flex items-center justify-center mx-auto mb-3`}>
                          <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
                          </svg>
                        </div>
                        <h3 className="text-sm font-bold uppercase text-teal">{step.label}</h3>
                      </div>
                    </PremiumCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 8. CTA */}
        <Reveal>
          <section className="px-4 sm:px-6 py-24 sm:py-32">
            <div className="max-w-[1200px] mx-auto">
              <PremiumCard glow={true} hover={false} className="p-10 sm:p-16 lg:p-20 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-8 sm:mb-12 leading-tight">
                  Ready to Build Your
                  <br />
                  <span className="text-teal">Growth System?</span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
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

      {/* DESKTOP FIXES - 1024px+ ONLY */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          /* Performance metrics - full width */
          .system-performance-section {
            padding-bottom: 5rem;
          }
          
          .performance-metrics-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            margin-bottom: 0;
          }
          
          /* Pricing cards - evenly distributed */
          .pricing-cards-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
          }
          
          /* Services grid - 3 columns */
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }
      `}</style>
    </>
  );
}
