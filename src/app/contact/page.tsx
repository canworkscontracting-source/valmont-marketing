"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import PremiumCard from "@/components/premium/PremiumCard";
import GradientText from "@/components/premium/GradientText";
import GlowButton from "@/components/premium/GlowButton";

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen relative overflow-hidden bg-[#070c10]">
        {/* Enhanced particle backgrounds - TEAL */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="floating-particle absolute w-1 h-1 bg-teal-400/30 rounded-full"
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

        {/* HERO SECTION */}
        <section className="hero-section relative px-4 sm:px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <p className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-teal-400/70 mb-8 animate-fade-in">
                  CONTACT
                </p>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase mb-8 leading-[1.1] break-words">
                  <span className="text-white">Let's Build </span>
                  <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 bg-clip-text text-transparent animate-gradient-shift">
                    Intelligence
                  </span>
                  <br />
                  <span className="text-white">Together.</span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto break-words">
                  Ready to transform your business with AI-driven marketing systems and intelligence?
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CONTACT OPTIONS */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent pointer-events-none shimmer-bg" />
            
            <div className="max-w-[1400px] mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left: Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                      Get In Touch
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                      Book a consultation to discuss your marketing systems, automation needs, or VANTIX AI implementation.
                    </p>
                  </div>

                  {/* Contact Methods */}
                  <div className="space-y-6">
                    <PremiumCard glow hover className="card-dramatic-hover bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border-teal-500/20">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0 border border-teal-500/20 icon-float">
                          <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold uppercase mb-2 text-teal-300">Email</h3>
                          <p className="text-gray-400 text-sm mb-2">Get a response within 24 hours</p>
                          <a href="mailto:hello@valmontmarketing.com" className="text-teal-400 hover:text-teal-300 transition-colors font-medium">
                            hello@valmontmarketing.com
                          </a>
                        </div>
                      </div>
                    </PremiumCard>

                    <PremiumCard glow hover className="card-dramatic-hover bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border-teal-500/20">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0 border border-teal-500/20 icon-float">
                          <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold uppercase mb-2 text-teal-300">Book Consultation</h3>
                          <p className="text-gray-400 text-sm mb-2">Schedule a 30-minute strategy call</p>
                          <a href="https://calendly.com/valmontmarketing" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors font-medium">
                            Book Now →
                          </a>
                        </div>
                      </div>
                    </PremiumCard>

                    <PremiumCard glow hover className="card-dramatic-hover bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border-teal-500/20">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0 border border-teal-500/20 icon-float">
                          <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold uppercase mb-2 text-teal-300">Location</h3>
                          <p className="text-gray-400 text-sm">Serving clients globally</p>
                        </div>
                      </div>
                    </PremiumCard>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-8">
                    <PremiumCard className="bg-teal-500/5 border-teal-500/20 text-center">
                      <p className="text-3xl font-black text-teal-400 mb-2">24h</p>
                      <p className="text-xs text-gray-400 uppercase">Response Time</p>
                    </PremiumCard>
                    <PremiumCard className="bg-teal-500/5 border-teal-500/20 text-center">
                      <p className="text-3xl font-black text-teal-400 mb-2">30min</p>
                      <p className="text-xs text-gray-400 uppercase">Free Consultation</p>
                    </PremiumCard>
                  </div>
                </div>

                {/* Right: What We Offer */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase mb-8 break-words text-white">
                    What We Offer
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Marketing Systems",
                        desc: "Complete marketing automation and systems"
                      },
                      {
                        title: "VANTIX AI Implementation",
                        desc: "AI-powered intelligence layer for your business"
                      },
                      {
                        title: "Growth Strategy",
                        desc: "Data-driven growth consulting"
                      },
                      {
                        title: "Automation Consulting",
                        desc: "Workflow automation and optimization"
                      },
                      {
                        title: "Performance Audits",
                        desc: "Comprehensive marketing and systems audit"
                      },
                      {
                        title: "Custom Solutions",
                        desc: "Tailored intelligence systems for enterprises"
                      }
                    ].map((service, i) => (
                      <PremiumCard key={i} glow hover delay={i * 0.05} className="card-dramatic-hover bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border-teal-500/20">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-teal-400 mt-2 flex-shrink-0"></div>
                          <div>
                            <h3 className="text-base font-bold uppercase mb-1 text-teal-300">{service.title}</h3>
                            <p className="text-sm text-gray-400">{service.desc}</p>
                          </div>
                        </div>
                      </PremiumCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* POWERED BY VANTIX AI */}
        <Reveal>
          <section className="relative px-4 sm:px-6 py-20 sm:py-32 section-spacing">
            <div className="max-w-[1200px] mx-auto">
              <PremiumCard glow={true} hover={false} className="p-10 sm:p-16 lg:p-20 text-center card-dramatic bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border-teal-500/20">
                <div className="max-w-3xl mx-auto">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-8 node-glow-pulse border-2 border-teal-400/50">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 break-words text-white">
                    Powered by VANTIX AI
                  </h2>
                  
                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    Our systems are powered by VANTIX AI — an intelligence layer that monitors, analyzes, and optimizes your marketing operations continuously.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <GlowButton href="/assurance" variant="secondary" size="lg">
                      Learn About VANTIX AI
                    </GlowButton>
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
              <PremiumCard glow={true} hover={false} className="p-10 sm:p-16 lg:p-24 text-center card-dramatic bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border-teal-500/20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight break-words">
                  <span className="text-white">Ready to </span>
                  <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 bg-clip-text text-transparent animate-gradient-shift">
                    Transform
                  </span>
                  <br />
                  <span className="text-white">Your Business?</span>
                </h2>
                
                <p className="text-xl text-teal-400 font-bold mb-12">
                  Let's discuss your growth strategy.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                  <GlowButton href="mailto:hello@valmontmarketing.com" variant="primary" size="lg">
                    Send Email
                  </GlowButton>
                  <GlowButton href="https://calendly.com/valmontmarketing" variant="secondary" size="lg">
                    Book Consultation
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

        /* Node glow pulse */
        @keyframes node-glow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(20, 184, 166, 0.5),
                        0 0 60px rgba(6, 182, 212, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(20, 184, 166, 0.7),
                        0 0 80px rgba(6, 182, 212, 0.5),
                        inset 0 0 30px rgba(20, 184, 166, 0.3);
          }
        }
        .node-glow-pulse {
          animation: node-glow 2s ease-in-out infinite;
        }

        /* Card dramatic hover */
        .card-dramatic-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-dramatic-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            0 20px 60px -15px rgba(20, 184, 166, 0.4),
            0 0 40px rgba(6, 182, 212, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        /* Card dramatic */
        .card-dramatic {
          box-shadow: 
            0 10px 40px -10px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(20, 184, 166, 0.15),
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
          50% { filter: hue-rotate(15deg); }
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
            rgba(20, 184, 166, 0.05),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        /* Pulse slow */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
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
        }
      `}</style>
    </>
  );
}
