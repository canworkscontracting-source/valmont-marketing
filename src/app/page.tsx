"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import PremiumCard from "@/components/premium/PremiumCard";
import GradientText from "@/components/premium/GradientText";
import AnimatedMetric from "@/components/premium/AnimatedMetric";
import GlowButton from "@/components/premium/GlowButton";
import AnimatedDiagram from "@/components/premium/AnimatedDiagram";

export default function HomePage() {
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

        {/* 1. HERO - BIG TEXT */}
        <section className="hero-section relative px-4 sm:px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-gray-500 mb-8 sm:mb-10 animate-fade-in">
                AI-Driven Marketing Systems
              </p>
              
              <GradientText className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-8 sm:mb-12 leading-[1.1] break-words animate-gradient-shift px-4">
                Valmont Marketing
                <br />
                and Consultancy
              </GradientText>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-6 sm:mb-8 max-w-4xl mx-auto break-words px-4">
                Strategic systems powered by VANTIX AI intelligence.
                <br className="hidden sm:block" />
                We build infrastructure for controlled growth.
              </p>
              
              <p className="text-base sm:text-lg font-medium text-teal mb-10 sm:mb-12 animate-pulse-subtle">
                Consulting. Automation. Execution.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <GlowButton href="/systems" variant="primary" size="lg">
                  View Systems
                </GlowButton>
                <GlowButton href="#audit" variant="secondary" size="lg">
                  Get Free Audit
                </GlowButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. METRICS */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent pointer-events-none shimmer-bg" />
            
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6 break-words">
                  Average Results
                </h2>
                <p className="text-gray-400 text-base sm:text-lg break-words">
                  Performance across all client engagements
                </p>
              </div>

              <div className="performance-metrics-grid grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                <AnimatedMetric value={89} suffix="%" label="System Efficiency" delay={0} />
                <AnimatedMetric value={4.2} suffix="x" label="Average ROI" delay={0.1} />
                <AnimatedMetric value={67} suffix="%" label="Conversion Lift" delay={0.2} />
                <AnimatedMetric value={30} suffix=" Days" label="Time to ROI" delay={0.3} />
              </div>
            </div>
          </section>
        </Reveal>

        {/* 3. WHAT WE DO */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="content-container max-w-[1400px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6 break-words">
                  What We Do
                </h2>
                <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto break-words">
                  We build strategic marketing systems powered by VANTIX AI
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
                    title: "VANTIX AI Intelligence",
                    desc: "Our proprietary AI platform monitors and optimizes every aspect of your marketing infrastructure in real-time."
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
                    title: "Strategic Planning",
                    desc: "Data-driven strategy and execution roadmaps designed to achieve measurable business outcomes."
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
                    title: "Marketing Automation",
                    desc: "Intelligent workflows that capture, nurture, and convert leads across all channels automatically."
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
                    title: "Web Infrastructure",
                    desc: "High-performance websites and funnels built to convert visitors into customers at scale."
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
                    title: "Growth Systems",
                    desc: "Integrated acquisition and retention systems designed to compound growth over time."
                  },
                  {
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
                    title: "Performance Analytics",
                    desc: "Real-time dashboards and reporting powered by VANTIX AI to track what matters most."
                  }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.1} className="card-dramatic-hover h-full">
                    <div className="flex flex-col h-full">
                      <div className="w-14 h-14 rounded-lg bg-teal/10 flex items-center justify-center mb-5 flex-shrink-0 icon-float">
                        <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold uppercase mb-3 text-teal break-words">{item.title}</h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed break-words">{item.desc}</p>
                    </div>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 4. FREE AUDIT */}
        <Reveal>
          <section id="audit" className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent pointer-events-none shimmer-bg" />
            
            <div className="max-w-[1200px] mx-auto relative z-10">
              <PremiumCard glow={true} hover={false} className="p-10 sm:p-16 lg:p-20 card-dramatic">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-teal/20 flex items-center justify-center mx-auto mb-6 node-glow-pulse">
                    <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-6 break-words">
                    Free Marketing
                    <br />
                    <span className="text-teal animate-glow-text">Systems Audit</span>
                  </h2>
                  
                  <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed break-words">
                    Get a comprehensive analysis of your current marketing infrastructure. 
                    We'll identify gaps, inefficiencies, and opportunities powered by VANTIX AI.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
                    {[
                      "Complete system analysis",
                      "VANTIX AI scoring",
                      "Implementation roadmap"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm sm:text-base text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>

                  <GlowButton href="/contact" variant="primary" size="lg">
                    Request Free Audit
                  </GlowButton>
                </div>
              </PremiumCard>
            </div>
          </section>
        </Reveal>

        {/* 5. SYSTEMS CARDS */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6 break-words">
                  Choose Your System
                </h2>
                <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto break-words">
                  Each system includes strategy, execution, and VANTIX AI intelligence
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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

        {/* 6. VANTIX AI SECTION */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent pointer-events-none shimmer-bg" />
            
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <div className="w-16 h-16 rounded-lg bg-teal/20 flex items-center justify-center mx-auto mb-6 node-glow-pulse">
                  <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6 break-words">
                  <span className="text-teal animate-glow-text">VANTIX AI</span>
                  <br />
                  Intelligence Layer
                </h2>
                <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto break-words">
                  Our proprietary AI platform that powers every system we build
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
                {[
                  {
                    title: "Real-Time Monitoring",
                    desc: "VANTIX AI continuously monitors every touchpoint in your marketing infrastructure, tracking performance metrics, user behavior, and conversion patterns 24/7."
                  },
                  {
                    title: "Predictive Analytics",
                    desc: "Advanced machine learning models predict campaign performance, identify opportunities, and recommend optimizations before human analysts would spot them."
                  },
                  {
                    title: "Automated Optimization",
                    desc: "VANTIX AI automatically adjusts campaigns, reallocates budgets, and optimizes workflows based on real-time performance data and predictive models."
                  },
                  {
                    title: "Custom Intelligence",
                    desc: "The AI learns your business patterns, audience behaviors, and market dynamics to provide increasingly accurate recommendations over time."
                  }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.1} className="card-dramatic-hover">
                    <h3 className="text-xl sm:text-2xl font-black uppercase mb-4 text-teal break-words">{item.title}</h3>
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed break-words">{item.desc}</p>
                  </PremiumCard>
                ))}
              </div>

              <div className="text-center">
                <GlowButton href="/systems" variant="primary" size="lg">
                  See VANTIX AI in Action
                </GlowButton>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 7. WHY VALMONT */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="content-container max-w-[1400px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6 break-words">
                  Why Valmont
                </h2>
                <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto break-words">
                  AI-driven marketing systems that scale
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    title: "AI-First Approach",
                    desc: "VANTIX AI is our proprietary intelligence platform that monitors, analyzes, and optimizes every campaign in real-time. What takes agencies weeks takes us hours."
                  },
                  {
                    title: "Systems Over Services",
                    desc: "We don't sell projects. We build infrastructure. Every system we deliver is designed to run, scale, and compound results without constant human intervention."
                  },
                  {
                    title: "Strategy + Execution",
                    desc: "Most agencies either strategize or execute. We do both. Our consultants build the roadmap, our engineers build the systems, and VANTIX AI keeps everything optimized."
                  },
                  {
                    title: "Built for Scale",
                    desc: "Our systems are designed from day one to handle growth. Whether you're early-stage or enterprise, the infrastructure scales with you."
                  }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.1} className="card-dramatic-hover">
                    <h3 className="text-xl sm:text-2xl font-black uppercase mb-4 text-teal break-words">{item.title}</h3>
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed break-words">{item.desc}</p>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 8. CTA */}
        <Reveal>
          <section className="px-4 sm:px-6 py-24 sm:py-32">
            <div className="max-w-[1400px] mx-auto">
              <PremiumCard glow={true} hover={false} className="p-10 sm:p-16 lg:p-24 text-center card-dramatic">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 sm:mb-12 leading-tight break-words">
                  Ready to Build Your
                  <br />
                  <span className="text-teal animate-glow-text">Growth System?</span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed break-words">
                  Book a consultation to discuss your business goals and explore which system is right for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  <GlowButton href="/contact" variant="primary" size="lg">
                    Book Consultation
                  </GlowButton>
                  <GlowButton href="/systems" variant="secondary" size="lg">
                    View Systems & Pricing
                  </GlowButton>
                </div>
              </PremiumCard>
            </div>
          </section>
        </Reveal>
      </main>

      {/* PALANTIR-LEVEL ANIMATIONS */}
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

        /* DESKTOP LAYOUT */
        @media (min-width: 1024px) {
          .hero-section {
            padding-top: 12rem;
            padding-bottom: 10rem;
          }
          
          .section-spacing {
            padding-top: 5rem;
            padding-bottom: 5rem;
          }
          
          .content-container {
            max-width: 1400px;
          }
          
          .performance-metrics-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
        }
      `}</style>
    </>
  );
}
