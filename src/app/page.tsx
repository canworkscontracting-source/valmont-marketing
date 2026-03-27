"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    websiteOrSocial: "",
    goal: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "96aa0813-ac4d-42bc-ad13-55a78387b4ac",
          subject: "🎯 New AI Growth Audit Request",
          from_name: formData.businessName,
          business_name: formData.businessName,
          business_type: formData.businessType,
          website_or_social: formData.websiteOrSocial,
          goal: formData.goal,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Success! We'll send your strategic audit within 24 hours.");
        setFormData({
          businessName: "",
          businessType: "",
          websiteOrSocial: "",
          goal: ""
        });
      } else {
        alert("❌ Something went wrong. Please try again or email us directly.");
      }
    } catch (error) {
      alert("❌ Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Main Brand */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-gray-400 mb-6 sm:mb-8"
            >
              Valmont Marketing & Consultancy
            </motion.h1>

            {/* Big Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 sm:mb-8 leading-tight"
            >
              Growth Systems for Brands
              <br />
              <span className="text-teal">That Want More Than Marketing</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
            >
              We combine consulting, execution, and AI-powered intelligence to help brands acquire customers, 
              improve conversion, and scale with structure. Powered by VANTIX.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)] hover:scale-105"
              >
                Book a Consultation
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
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-4 sm:mb-6">
                Built Through Systems, Not Guesswork
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
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
                <div className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                  2.8x
                </div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Average ROI
                </div>
              </motion.div>
            </div>

            <p className="text-center text-sm text-gray-400 max-w-2xl mx-auto">
              Results achieved through structured growth systems and VANTIX-powered intelligence.
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 4: WHAT WE DO */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-8 sm:p-12 md:p-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6 sm:mb-8 leading-tight">
                We Are Not Just a Marketing Agency
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                Valmont operates as both a marketing agency and a consultancy. We help brands define strategy, 
                build infrastructure, launch acquisition systems, and scale using intelligence and automation.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-teal font-bold mb-8">
                We do not sell random services. We design growth systems.
              </p>
              <Link
                href="/systems"
                className="inline-block px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)]"
              >
                See Our Systems
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 5: FREE AUDIT FORM */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-6 sm:p-8 md:p-12">
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4 sm:mb-6 leading-tight">
                  Free AI Growth Audit
                </h2>
                <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                  We review your current marketing, positioning, and digital infrastructure and identify where 
                  your growth system is breaking or underperforming.
                </p>
                <p className="text-sm sm:text-base text-teal font-semibold mt-4">
                  This is a strategic audit powered by VANTIX intelligence.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full px-4 py-3 bg-black/40 border border-teal/20 rounded-lg focus:border-teal focus:outline-none text-white placeholder-gray-500"
                    placeholder="Your business name"
                  />
                </div>

                <div>
                  <label htmlFor="businessType" className="block text-sm font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Type of Business
                  </label>
                  <input
                    type="text"
                    id="businessType"
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    className="w-full px-4 py-3 bg-black/40 border border-teal/20 rounded-lg focus:border-teal focus:outline-none text-white placeholder-gray-500"
                    placeholder="E-commerce, SaaS, Services, etc."
                  />
                </div>

                <div>
                  <label htmlFor="websiteOrSocial" className="block text-sm font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Website or Social Handles
                  </label>
                  <input
                    type="text"
                    id="websiteOrSocial"
                    required
                    value={formData.websiteOrSocial}
                    onChange={(e) => setFormData({...formData, websiteOrSocial: e.target.value})}
                    className="w-full px-4 py-3 bg-black/40 border border-teal/20 rounded-lg focus:border-teal focus:outline-none text-white placeholder-gray-500"
                    placeholder="www.yoursite.com or @handle"
                  />
                </div>

                <div>
                  <label htmlFor="goal" className="block text-sm font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Your Growth Goal
                  </label>
                  <textarea
                    id="goal"
                    required
                    rows={4}
                    value={formData.goal}
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    className="w-full px-4 py-3 bg-black/40 border border-teal/20 rounded-lg focus:border-teal focus:outline-none text-white placeholder-gray-500 resize-none"
                    placeholder="What do you want to achieve?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Get My Free Audit"}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-6">
                Strategic audit delivered within 24 hours.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 6: VANTIX */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="glass rounded-3xl p-8 sm:p-12 md:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
                The Intelligence Layer Behind
                <br />
                <span className="text-teal">Every Valmont System</span>
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto">
                VANTIX monitors performance, identifies inefficiencies, detects opportunities, 
                and supports smarter growth decisions.
              </p>

              <p className="text-sm sm:text-base text-teal font-semibold mb-10 sm:mb-12">
                Every Valmont client benefits from VANTIX-powered intelligence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/assurance"
                  className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)] hover:scale-105"
                >
                  Discover VANTIX
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wide uppercase border border-teal/30 hover:border-teal/60 bg-teal/5 hover:bg-teal/10 rounded-full transition-all duration-300"
                >
                  Book Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 7: SERVICES OVERVIEW */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4">
                Strategy. Execution. Intelligence.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
              <div className="glass rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold uppercase mb-4 text-teal">
                  Consulting
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Growth strategy, positioning, system planning, scale advisory
                </p>
              </div>

              <div className="glass rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold uppercase mb-4 text-teal">
                  Implementation
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Websites, creatives, ads, automation, funnels
                </p>
              </div>

              <div className="glass rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold uppercase mb-4 text-teal">
                  Intelligence
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Performance monitoring, optimization signals, decision support
                </p>
              </div>
            </div>

            <p className="text-center text-base sm:text-lg font-bold text-gray-200">
              Everything works together as one system.{" "}
              <span className="text-teal">Powered by VANTIX.</span>
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 8: WHY VALMONT */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl p-8 sm:p-12 md:p-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-8 sm:mb-12 leading-tight">
                Why Brands Work With Valmont
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <p className="text-base sm:text-lg text-gray-300">
                    Consultancy thinking, not just execution
                  </p>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <p className="text-base sm:text-lg text-gray-300">
                    Systems instead of random marketing
                  </p>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <p className="text-base sm:text-lg text-gray-300">
                    Long-term growth infrastructure
                  </p>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <p className="text-base sm:text-lg text-gray-300">
                    AI-assisted intelligence via VANTIX
                  </p>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <p className="text-base sm:text-lg text-gray-300">
                    Built for scale
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 9: FINAL CTA */}
      <Reveal>
        <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 sm:mb-8 leading-tight">
              Ready to Build a Real
              <br />
              <span className="text-teal">Growth System?</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 sm:mb-12 max-w-2xl mx-auto">
              If you need strategy, execution, and intelligence working together, Valmont is built for that.
            </p>

            <Link
              href="/contact"
              className="inline-block px-10 py-5 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)] hover:scale-105"
            >
              Book a Consultation
            </Link>
          </div>
        </section>
      </Reveal>

      {/* FOOTER */}
      <footer className="border-t border-teal/10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
            Valmont Marketing & Consultancy
          </p>
          <p className="text-xs text-gray-600">
            Strategic Growth Infrastructure, Consulting, and Execution
          </p>
          <p className="text-xs text-teal mt-2">
            Powered by VANTIX
          </p>
        </div>
      </footer>
    </main>
  );
}
