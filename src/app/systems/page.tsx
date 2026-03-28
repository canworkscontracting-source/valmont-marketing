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
        {/* Enhanced particle backgrounds */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal/20 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal/15 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="floating-particle absolute w-1 h-1 bg-teal/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* 1. HERO */}
        <section className="relative px-4 sm:px-6 pt-32 pb-20 sm:pt-40 sm:pb-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center lg:text-left"
              >
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-6 sm:mb-8 animate-fade-in">
                  Valmont Systems
                </p>
                
                <GradientText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 leading-tight break-words animate-gradient-shift">
                  Infrastructure Built for Controlled Growth
                </GradientText>
                
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0 break-words">
                  Strategic systems that combine consulting, automation, and execution. 
                  Every system is powered by VANTIX AI intelligence.
                </p>
                
                <p className="text-sm font-medium text-teal mb-8 sm:mb-10 animate-pulse-subtle">
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
                transition={{ delay: 0.3, duration: 0.8 }}
                className="hidden lg:block"
              >
                <PremiumCard glow={true} hover={false} className="card-dramatic">
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
          <section className="workflow-section relative px-4 sm:px-6 py-20 sm:py-32">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent pointer-events-none" />
            
            <div className="workflow-container max-w-[1200px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 break-words">
                  How We Work With Clients
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto break-words">
                  Our proven 7-step workflow from discovery to optimization
                </p>
              </div>

              {/* Desktop: Horizontal diagram */}
              <div className="hidden lg:block">
                <AnimatedDiagram
                  title="WORKFLOW"
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

              {/* Mobile: Vertical glass cards with SVG ICONS */}
              <div className="lg:hidden space-y-0">
                {[
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
                    title: "Discovery", 
                    desc: "We analyze your business, market, and current infrastructure." 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
                    title: "Strategy", 
                    desc: "Build strategic roadmap aligned with your goals." 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />,
                    title: "Design", 
                    desc: "Create user-centric designs and system architecture." 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
                    title: "Build", 
                    desc: "Develop and integrate all system components." 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                    title: "Launch", 
                    desc: "Deploy systems with full testing and monitoring." 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
                    title: "VANTIX AI", 
                    desc: "Activate AI-powered intelligence layer.", 
                    highlight: true 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
                    title: "Optimize", 
                    desc: "Continuous improvement based on data insights.", 
                    highlight: true 
                  }
                ].map((step, i) => (
                  <div key={i}>
                    <PremiumCard glow hover delay={i * 0.05} className={step.highlight ? 'card-highlight-pulse' : ''}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg ${step.highlight ? 'bg-teal/30 node-glow-pulse' : 'bg-teal/10'} flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
                          <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {step.icon}
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-base font-bold uppercase mb-2 break-words ${step.highlight ? 'text-teal animate-glow-text' : 'text-white'}`}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-300 break-words">{step.desc}</p>
                        </div>
                      </div>
                    </PremiumCard>
                    {i < 6 && (
                      <div className="flex justify-center py-3 relative">
                        <div className="connection-line w-0.5 h-8 bg-gradient-to-b from-teal/50 via-teal/30 to-teal/50 relative overflow-hidden">
                          <div className="flow-dot absolute w-2 h-2 bg-teal rounded-full -left-[3px]"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 3. AUTOMATION FLOWS */}
        <Reveal>
          <section className="automation-section relative px-4 sm:px-6 py-20 sm:py-32">
            <div className="automation-container max-w-[1200px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 break-words">
                  How The System Works
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto break-words">
                  Intelligent automation powered by VANTIX AI
                </p>
              </div>

              {/* Desktop: Horizontal diagram */}
              <div className="hidden lg:block mb-12">
                <PremiumCard glow={true} hover={false} className="p-10 card-dramatic">
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

              {/* Mobile: Vertical glass cards with SVG ICONS */}
              <div className="lg:hidden space-y-0 mb-12">
                {[
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
                    title: "Lead", 
                    desc: "Visitor lands on your website" 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
                    title: "Website", 
                    desc: "Intelligent capture forms" 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />,
                    title: "CRM", 
                    desc: "Automatic lead entry" 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                    title: "Automation", 
                    desc: "Triggered workflows" 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                    title: "Email/SMS", 
                    desc: "Personalized sequences" 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
                    title: "VANTIX AI", 
                    desc: "AI optimization layer", 
                    highlight: true 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
                    title: "Conversion", 
                    desc: "Qualified customers", 
                    highlight: true 
                  }
                ].map((step, i) => (
                  <div key={i}>
                    <PremiumCard glow hover delay={i * 0.05} className={step.highlight ? 'card-highlight-pulse' : ''}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg ${step.highlight ? 'bg-teal/30 node-glow-pulse' : 'bg-teal/10'} flex items-center justify-center flex-shrink-0`}>
                          <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {step.icon}
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-base font-bold uppercase mb-1 break-words ${step.highlight ? 'text-teal animate-glow-text' : 'text-white'}`}>
                            {step.title}
                          </h3>
                          <p className="text-xs text-gray-400 break-words">{step.desc}</p>
                        </div>
                      </div>
                    </PremiumCard>
                    {i < 6 && (
                      <div className="flex justify-center py-3 relative">
                        <div className="connection-line w-0.5 h-8 bg-gradient-to-b from-teal/50 via-teal/30 to-teal/50 relative overflow-hidden">
                          <div className="flow-dot absolute w-2 h-2 bg-teal rounded-full -left-[3px]"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 4 Automation Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />,
                    title: "Lead Capture Automation",
                    desc: "Automatically capture and store leads from all sources into your CRM."
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                    title: "Follow-up Automation",
                    desc: "Automated email and SMS sequences triggered by user behavior."
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
                    title: "CRM Automation",
                    desc: "Pipeline updates, lead scoring, and deal tracking synced in real-time."
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
                    title: "Performance Reporting",
                    desc: "Automated tracking and optimization recommendations from VANTIX AI."
                  }
                ].map((card, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.1} className="card-dramatic-hover h-full">
                    <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 flex-shrink-0 icon-float">
                      <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {card.icon}
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold uppercase mb-3 text-teal break-words">{card.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed break-words">{card.desc}</p>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 4. SYSTEM PERFORMANCE METRICS */}
        <Reveal>
          <section className="performance-section relative px-4 sm:px-6 py-20 sm:py-32 system-performance-section">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent pointer-events-none shimmer-bg" />
            
            <div className="max-w-[1200px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 break-words">
                  System Performance
                </h2>
                <p className="text-gray-400 text-sm break-words">
                  Average results across all system tiers
                </p>
              </div>

              <div className="performance-metrics-grid grid grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatedMetric value={89} suffix="%" label="System Efficiency" delay={0} />
                <AnimatedMetric value={4.2} suffix="x" label="Average ROI" delay={0.1} />
                <AnimatedMetric value={67} suffix="%" label="Conversion Rate" delay={0.2} />
                <AnimatedMetric value={30} suffix=" Days" label="Average Setup" delay={0.3} />
              </div>
            </div>
          </section>
        </Reveal>

        {/* 5. PRICING CARDS */}
        <Reveal>
          <section id="pricing" className="relative px-4 sm:px-6 py-20 sm:py-32">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-4 break-words">
                  Choose Your System
                </h2>
                <p className="text-gray-400 text-base max-w-2xl mx-auto break-words">
                  Each system includes strategy, execution, and VANTIX AI intelligence.
                </p>
              </div>

              <div className="pricing-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                    name: "Starter System",
                    desc: "For early-stage businesses",
                    price: "$499",
                    features: ["Landing page system", "Basic automation", "VANTIX AI monitoring"],
                    popular: false
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
                    name: "Growth System",
                    desc: "For growing businesses",
                    price: "$899",
                    features: ["Full website + funnel", "Advanced automation", "VANTIX AI optimization"],
                    popular: true
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
                    name: "Scale System",
                    desc: "For scaling companies",
                    price: "$1,299",
                    features: ["Enterprise infrastructure", "Multi-channel automation", "Full VANTIX AI suite"],
                    popular: false
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />,
                    name: "Custom System",
                    desc: "For unique requirements",
                    price: "Custom",
                    features: ["Everything in Scale", "Custom architecture", "White-label VANTIX AI"],
                    popular: false
                  }
                ].map((plan, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.1} className={`card-dramatic-hover ${plan.popular ? 'pricing-card-popular' : ''}`}>
                    <div className="flex flex-col h-full">
                      {plan.popular ? (
                        <div className="flex items-center justify-between mb-6 flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal/30 to-teal/20 flex items-center justify-center icon-float">
                            <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {plan.icon}
                            </svg>
                          </div>
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-3 py-1 bg-teal/10 text-teal rounded-full border border-teal/20 whitespace-nowrap pulse-badge">Popular</span>
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal/20 to-teal/10 flex items-center justify-center mb-6 flex-shrink-0 icon-float">
                          <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {plan.icon}
                          </svg>
                        </div>
                      )}
                      <h3 className="text-lg sm:text-xl font-black uppercase mb-2 text-teal break-words">{plan.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-400 mb-6 break-words">{plan.desc}</p>
                      <div className="mb-6 sm:mb-8">
                        <div className="text-3xl sm:text-4xl font-black text-white mb-2">
                          {plan.price}{plan.price !== "Custom" && <span className="text-sm sm:text-base font-normal text-gray-500">/month</span>}
                        </div>
                      </div>
                      <div className="space-y-3 mb-6 sm:mb-8 flex-grow">
                        {plan.features.map((feature, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs sm:text-sm text-gray-300 break-words">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <GlowButton href="/contact" variant={plan.popular ? "primary" : "secondary"} className="w-full">
                        {plan.price === "Custom" ? "Contact Us" : "Get Started"}
                      </GlowButton>
                    </div>
                  </PremiumCard>
                ))}
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 break-words">
                  What Every System Includes
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto break-words">
                  Strategic planning, execution, and VANTIX AI intelligence
                </p>
              </div>

              <div className="services-grid grid grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />, title: "Consulting", desc: "Strategic guidance and planning" },
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />, title: "Web Systems", desc: "Built to convert and scale" },
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />, title: "Acquisition", desc: "Traffic and lead generation" },
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />, title: "Automation", desc: "Intelligent workflows" },
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />, title: "Intelligence", desc: "VANTIX AI monitoring" },
                  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />, title: "Infrastructure", desc: "Built for scale" }
                ].map((service, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.1} className="card-dramatic-hover h-full">
                    <div className="flex flex-col h-full">
                      <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 flex-shrink-0 icon-float">
                        <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {service.icon}
                        </svg>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold uppercase mb-2 text-teal break-words">{service.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-300 break-words">{service.desc}</p>
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 7. PROCESS DIAGRAM */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-4 break-words">
                  Engagement Process
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto break-words">
                  From discovery to continuous optimization
                </p>
              </div>

              {/* Desktop: Horizontal */}
              <div className="hidden lg:block">
                <PremiumCard glow={true} hover={false} className="p-10 lg:p-16 card-dramatic">
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

              {/* Mobile: 2x3 grid with SVG ICONS */}
              <div className="lg:hidden grid grid-cols-2 gap-4">
                {[
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
                    title: "Discover" 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
                    title: "Strategize" 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
                    title: "Build" 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                    title: "Launch" 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
                    title: "VANTIX AI", 
                    highlight: true 
                  },
                  { 
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
                    title: "Optimize", 
                    highlight: true 
                  }
                ].map((step, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.05} className={`card-dramatic-hover h-full ${step.highlight ? 'card-highlight-pulse' : ''}`}>
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-lg ${step.highlight ? 'bg-teal/30 node-glow-pulse' : 'bg-teal/10'} flex items-center justify-center mx-auto mb-3`}>
                        <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {step.icon}
                        </svg>
                      </div>
                      <h3 className={`text-sm font-bold uppercase break-words ${step.highlight ? 'text-teal animate-glow-text' : 'text-white'}`}>
                        {step.title}
                      </h3>
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 8. CTA */}
        <Reveal>
          <section className="px-4 sm:px-6 py-24 sm:py-32">
            <div className="max-w-[1200px] mx-auto">
              <PremiumCard glow={true} hover={false} className="p-10 sm:p-16 lg:p-20 text-center card-dramatic">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-8 sm:mb-12 leading-tight break-words">
                  Ready to Build Your
                  <br />
                  <span className="text-teal animate-glow-text">Growth System?</span>
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed break-words">
                  Book a consultation to discuss which system fits your growth stage.
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

      {/* PALANTIR-LEVEL ANIMATIONS + DESKTOP LAYOUT FIXES */}
      <style jsx global>{`
        /* Floating particles */
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-100px) translateX(50px); opacity: 0.8; }
        }
        .floating-particle {
          animation: float linear infinite;
        }

        /* Flowing dots */
        @keyframes flow {
          0% { top: -10px; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .flow-dot {
          animation: flow 2s ease-in-out infinite;
        }

        /* Node glow pulse */
        @keyframes node-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(20, 184, 166, 0.4),
                        0 0 40px rgba(20, 184, 166, 0.2);
          }
          50% { 
            box-shadow: 0 0 30px rgba(20, 184, 166, 0.6),
                        0 0 60px rgba(20, 184, 166, 0.3),
                        inset 0 0 20px rgba(20, 184, 166, 0.2);
          }
        }
        .node-glow-pulse {
          animation: node-glow 2s ease-in-out infinite;
        }

        /* Text glow */
        @keyframes glow-text {
          0%, 100% { text-shadow: 0 0 10px rgba(20, 184, 166, 0.5); }
          50% { text-shadow: 0 0 20px rgba(20, 184, 166, 0.8), 0 0 30px rgba(20, 184, 166, 0.4); }
        }
        .animate-glow-text {
          animation: glow-text 2s ease-in-out infinite;
        }

        /* Card highlight pulse */
        @keyframes card-pulse {
          0%, 100% { border-color: rgba(20, 184, 166, 0.3); }
          50% { border-color: rgba(20, 184, 166, 0.6); }
        }
        .card-highlight-pulse {
          border: 1px solid rgba(20, 184, 166, 0.3);
          animation: card-pulse 2s ease-in-out infinite;
        }

        /* Badge pulse */
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(20, 184, 166, 0.3); }
          50% { box-shadow: 0 0 20px rgba(20, 184, 166, 0.6); }
        }
        .pulse-badge {
          animation: badge-pulse 2s ease-in-out infinite;
        }

        /* Dramatic card hover */
        .card-dramatic-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-dramatic-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            0 20px 60px -15px rgba(20, 184, 166, 0.3),
            0 0 40px rgba(20, 184, 166, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        /* Card dramatic */
        .card-dramatic {
          box-shadow: 
            0 10px 40px -10px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(20, 184, 166, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        /* Icon float */
        @keyframes icon-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .icon-float:hover {
          animation: icon-float 1s ease-in-out infinite;
        }

        /* Gradient shift */
        @keyframes gradient-shift {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(10deg); }
        }
        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        /* Shimmer bg */
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .shimmer-bg::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(20, 184, 166, 0.03),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        /* Pulse subtle */
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }

        /* Popular pricing card glow */
        .pricing-card-popular {
          position: relative;
        }
        .pricing-card-popular::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, transparent, rgba(20, 184, 166, 0.3), transparent);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .pricing-card-popular:hover::before {
          opacity: 1;
        }

        /* DESKTOP LAYOUT FIXES - 1024px+ ONLY */
        @media (min-width: 1024px) {
          /* Reduce vertical spacing on sections */
          .workflow-section {
            padding-top: 5rem;
            padding-bottom: 5rem;
          }
          
          .automation-section {
            padding-top: 5rem;
            padding-bottom: 5rem;
          }
          
          .performance-section {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
          
          /* Make workflow container wider */
          .workflow-container {
            max-width: 1400px;
          }
          
          /* Make automation container wider */
          .automation-container {
            max-width: 1400px;
          }
          
          /* Performance metrics grid */
          .performance-metrics-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
          
          /* Pricing cards */
          .pricing-cards-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
          }
          
          /* Services grid */
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }
      `}</style>
    </>
  );
}
