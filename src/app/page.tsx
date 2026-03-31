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
        {/* Optimized particle backgrounds - REDUCED FOR PERFORMANCE */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal/15 rounded-full blur-[100px] animate-pulse-slow" style={{ willChange: 'opacity' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s', willChange: 'opacity' }} />
          
          {/* Reduced particles from 20 to 8 for performance */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="floating-particle absolute w-1 h-1 bg-teal/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${20 + Math.random() * 10}s`,
                  willChange: 'transform, opacity'
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
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent pointer-events-none" />
            
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
            <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6 break-words">
                  What We Do
                </h2>
                <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto break-words">
                  Full-stack marketing and intelligence systems
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "VANTIX AI Intelligence",
                    desc: "Real-time performance monitoring and optimization"
                  },
                  {
                    title: "Marketing Strategy",
                    desc: "Data-driven growth strategies"
                  },
                  {
                    title: "Automation Systems",
                    desc: "End-to-end workflow automation"
                  },
                  {
                    title: "Web Infrastructure",
                    desc: "High-performance websites and funnels"
                  },
                  {
                    title: "Growth Consulting",
                    desc: "Scale strategy and execution"
                  },
                  {
                    title: "Analytics & Reporting",
                    desc: "Custom dashboards and intelligence"
                  }
                ].map((service, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.05} className="card-dramatic-hover h-full">
                    <h3 className="text-lg sm:text-xl font-bold uppercase mb-3 text-teal break-words">{service.title}</h3>
                    <p className="text-sm sm:text-base text-gray-400 break-words">{service.desc}</p>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 4. FREE AUDIT CTA */}
        <Reveal>
          <section id="audit" className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="max-w-[1200px] mx-auto">
              <PremiumCard glow={true} hover={false} className="p-8 sm:p-12 lg:p-16 card-dramatic">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 break-words">
                    Free Marketing Audit
                  </h2>
                  
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 break-words">
                    Get a comprehensive analysis of your current marketing systems, automation, and growth opportunities.
                  </p>

                  <div className="space-y-3 mb-10 text-left max-w-xl mx-auto">
                    {[
                      "Performance analysis",
                      "Automation opportunities",
                      "Growth recommendations",
                      "Tech stack review"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm sm:text-base text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="inline-block">
                    <GlowButton href="/contact" variant="primary" size="lg" className="cta-button-pulse">
                      Request Free Audit
                    </GlowButton>
                  </div>
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
                  Marketing Systems
                </h2>
                <p className="text-gray-400 text-base sm:text-lg break-words">
                  Choose the system that fits your growth stage
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Starter",
                    price: "$499",
                    period: "/month",
                    features: ["Core automation", "Basic analytics", "Email support"],
                    popular: false
                  },
                  {
                    name: "Growth",
                    price: "$899",
                    period: "/month",
                    features: ["Full automation", "Advanced analytics", "Priority support", "VANTIX AI access"],
                    popular: true
                  },
                  {
                    name: "Scale",
                    price: "$1,299",
                    period: "/month",
                    features: ["Enterprise automation", "Custom intelligence", "Dedicated support", "Full VANTIX AI suite"],
                    popular: false
                  },
                  {
                    name: "Custom",
                    price: "Custom",
                    period: "pricing",
                    features: ["White-label VANTIX AI", "Custom infrastructure", "24/7 support", "Unlimited scale"],
                    popular: false
                  }
                ].map((tier, i) => (
                  <PremiumCard 
                    key={i} 
                    glow={tier.popular} 
                    hover 
                    delay={i * 0.05} 
                    className={`card-dramatic-hover h-full ${tier.popular ? 'pricing-card-popular card-highlight-pulse' : ''}`}
                  >
                    {tier.popular && (
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide bg-teal/20 text-teal border border-teal/30 rounded-full animate-badge-pulse">
                          Popular
                        </span>
                      </div>
                    )}
                    
                    <h3 className="text-xl sm:text-2xl font-black uppercase mb-2 break-words">{tier.name}</h3>
                    <div className="mb-6">
                      <span className="text-3xl sm:text-4xl font-black text-teal">{tier.price}</span>
                      <span className="text-sm text-gray-500">{tier.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className="block w-full px-6 py-3 text-center text-sm font-bold uppercase border border-teal/30 hover:border-teal/60 hover:bg-teal/10 rounded-lg transition-all"
                    >
                      Get Started
                    </Link>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 6. VANTIX AI SECTION */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-transparent pointer-events-none" />
            
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6 break-words">
                  VANTIX AI Intelligence
                </h2>
                <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto break-words">
                  The intelligence layer behind every system
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Real-Time Monitoring",
                    desc: "24/7 system and campaign tracking"
                  },
                  {
                    title: "Predictive Analytics",
                    desc: "AI-powered performance forecasting"
                  },
                  {
                    title: "Automated Optimization",
                    desc: "Continuous improvement without manual work"
                  },
                  {
                    title: "Custom Intelligence",
                    desc: "Tailored insights for your business"
                  }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.05} className="card-dramatic-hover h-full">
                    <h3 className="text-base sm:text-lg font-bold uppercase mb-3 text-teal break-words">{item.title}</h3>
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed break-words">{item.desc}</p>
                  </PremiumCard>
                ))}
              </div>

              <div className="text-center mt-12">
                <div className="inline-block">
                  <GlowButton href="/assurance" variant="primary" size="lg" className="cta-button-pulse">
                    See VANTIX AI in Action
                  </GlowButton>
                </div>
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
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "AI-First",
                    desc: "Built on VANTIX AI intelligence from day one"
                  },
                  {
                    title: "Systems Over Services",
                    desc: "We build infrastructure, not campaigns"
                  },
                  {
                    title: "Strategy + Execution",
                    desc: "We don't just plan, we execute"
                  },
                  {
                    title: "Built for Scale",
                    desc: "Systems designed to grow with you"
                  }
                ].map((item, i) => (
                  <PremiumCard key={i} glow hover delay={i * 0.05} className="card-dramatic-hover h-full">
                    <h3 className="text-lg sm:text-xl font-bold uppercase mb-3 text-teal break-words">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-400 break-words">{item.desc}</p>
                  </PremiumCard>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 8. FINAL CTA */}
        <Reveal>
          <section className="px-4 sm:px-6 py-24 sm:py-32">
            <div className="max-w-[1200px] mx-auto">
              <PremiumCard glow={true} hover={false} className="p-10 sm:p-16 lg:p-24 text-center card-dramatic">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight break-words">
                  <span className="text-white">Ready to Build </span>
                  <GradientText className="animate-gradient-shift">Intelligence?</GradientText>
                </h2>
                
                <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto break-words">
                  Let's discuss your growth systems and intelligence infrastructure.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  <GlowButton href="/contact" variant="primary" size="lg">
                    Book Consultation
                  </GlowButton>
                  <GlowButton href="/systems" variant="secondary" size="lg">
                    View All Systems
                  </GlowButton>
                </div>
              </PremiumCard>
            </div>
          </section>
        </Reveal>
      </main>

      {/* OPTIMIZED ANIMATIONS - REDUCED FOR PERFORMANCE */}
      <style jsx global>{`
        /* Floating particles - OPTIMIZED */}
        @keyframes float {
          0%, 100% { 
            transform: translate3d(0, 0, 0);
            opacity: 0.3;
          }
          50% { 
            transform: translate3d(50px, -100px, 0);
            opacity: 0.6;
          }
        }
        .floating-particle {
          animation: float linear infinite;
        }

        /* Card highlight pulse */
        @keyframes card-highlight {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(20, 184, 166, 0.2);
          }
          50% { 
            box-shadow: 0 0 40px rgba(20, 184, 166, 0.4);
          }
        }
        .card-highlight-pulse {
          animation: card-highlight 2s ease-in-out infinite;
        }

        /* Badge pulse */
        @keyframes badge-pulse {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(20, 184, 166, 0.3);
          }
          50% { 
            box-shadow: 0 0 20px rgba(20, 184, 166, 0.6);
          }
        }
        .animate-badge-pulse {
          animation: badge-pulse 2s ease-in-out infinite;
        }

        /* CTA Button pulse - NEW */
        @keyframes cta-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(20, 184, 166, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(20, 184, 166, 0.6);
          }
        }
        .cta-button-pulse {
          animation: cta-glow 2s ease-in-out infinite;
        }

        /* Dramatic card hover */
        .card-dramatic-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
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

        /* Pulse subtle */
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }

        /* Pulse slow - OPTIMIZED */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        /* Fade in */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
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
