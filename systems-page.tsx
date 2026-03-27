"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function SystemsPage() {
  return (
    <main className="min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="px-4 sm:px-6 pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-gray-500 mb-8">
              SYSTEMS
            </p>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Infrastructure for Growth.
              <br />
              <span className="text-teal">Powered by Intelligence.</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-4 leading-relaxed">
              We design, build, and deploy AI-powered systems that automate operations, 
              communication, marketing, and decision-making.
            </p>
            
            <p className="text-sm font-medium text-teal mb-12">
              Powered by VANTIX.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#pricing"
                className="px-8 py-4 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
              >
                View Systems
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 text-sm font-medium border border-teal/40 hover:border-teal text-teal rounded-lg transition-all duration-300"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: PRICING CARDS */}
      <Reveal>
        <section id="pricing" className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                SYSTEMS & INFRASTRUCTURE
              </h2>
              <p className="text-base text-gray-400 max-w-2xl mx-auto">
                Choose the system that fits your stage.
                <br />
                All systems include VANTIX intelligence layer.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* STARTER SYSTEM - $499 */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Starter System</h3>
                  <div className="text-3xl font-bold text-teal">$499</div>
                </div>
                <ul className="space-y-3 text-sm text-gray-400 mb-8">
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>Landing Page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>Lead Capture System</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>Basic Automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>Mobile Optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>VANTIX Audit</span>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="block w-full px-5 py-3 text-sm font-medium text-center border border-teal/40 hover:border-teal text-teal rounded-lg transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>

              {/* GROWTH SYSTEM - $899 */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-teal/30 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/50 transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 text-xs font-bold bg-teal text-black rounded-full">
                    POPULAR
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Growth System</h3>
                  <div className="text-3xl font-bold text-teal">$899</div>
                </div>
                <ul className="space-y-3 text-sm text-gray-400 mb-8">
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>Website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>CRM System</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>Email Automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>Lead Generation System</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>Analytics Dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>VANTIX Integration</span>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="block w-full px-5 py-3 text-sm font-medium text-center bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>

              {/* PRO SYSTEM - $1299 */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Pro System</h3>
                  <div className="text-3xl font-bold text-teal">$1,299</div>
                </div>
                <ul className="space-y-3 text-sm text-gray-400 mb-8">
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>AI Chatbot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>Ads System</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>Funnel System</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>Automation Workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>Content System</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal mt-1">→</span>
                    <span>VANTIX Optimization Engine</span>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="block w-full px-5 py-3 text-sm font-medium text-center border border-teal/40 hover:border-teal text-teal rounded-lg transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>

              {/* ENTERPRISE / CUSTOM */}
              <div className="backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl p-8 hover:bg-white/[0.05] hover:border-teal/30 transition-all duration-300">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <div className="text-lg font-medium text-gray-400">Custom System</div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-8">
                  For organizations that require full automation, AI agents, data systems, 
                  and custom infrastructure.
                  <br /><br />
                  Custom architecture. Custom automation. Custom AI systems.
                </p>
                <Link
                  href="/contact"
                  className="block w-full px-5 py-3 text-sm font-medium text-center bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                >
                  Book Consultation
                </Link>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500">
              All systems include VANTIX integration and ongoing system intelligence.
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 3: SYSTEMS INFRASTRUCTURE OVERVIEW */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-10 sm:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                SYSTEMS INFRASTRUCTURE
              </h2>
              <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-400 leading-relaxed">
                <p className="font-semibold text-gray-300">
                  We do not provide isolated services.
                  <br />
                  We build connected systems.
                </p>
                <p>
                  Each system includes infrastructure, automation, data tracking, 
                  communication tools, and intelligence layers that work together 
                  as one operational environment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* POSITIONING LINE */}
      <Reveal>
        <section className="px-4 sm:px-6 py-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="border-l-2 border-teal pl-6">
              <p className="text-xl sm:text-2xl font-bold text-gray-200">
                We do not sell marketing services.
                <br />
                We build operational systems powered by intelligence.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 4: AI AGENTS & BOTS */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                AI AGENTS & AUTOMATION BOTS
              </h2>
            </div>

            <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
                {/* Column 1 */}
                <div className="divide-y divide-white/5">
                  <div className="p-6">
                    <h3 className="font-bold mb-2 text-teal">Lead Response Agent</h3>
                    <p className="text-sm text-gray-400">Responds to leads instantly</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2 text-teal">Email Agent</h3>
                    <p className="text-sm text-gray-400">Sends follow-ups and sequences</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2 text-teal">WhatsApp Agent</h3>
                    <p className="text-sm text-gray-400">Handles inquiries</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2 text-teal">Content Agent</h3>
                    <p className="text-sm text-gray-400">Generates content</p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="divide-y divide-white/5">
                  <div className="p-6">
                    <h3 className="font-bold mb-2 text-teal">Ads Agent</h3>
                    <p className="text-sm text-gray-400">Monitors and optimizes ads</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2 text-teal">Analytics Agent</h3>
                    <p className="text-sm text-gray-400">Tracks performance</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2 text-teal">CRM Agent</h3>
                    <p className="text-sm text-gray-400">Updates and organizes leads</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2 text-teal">Research Agent</h3>
                    <p className="text-sm text-gray-400">Market & competitor research</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 mt-8 max-w-3xl mx-auto">
              These agents operate 24/7, handling communication, follow-ups, data tracking, 
              and optimization automatically.
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 5: AUTOMATION & WORKFLOWS */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                AUTOMATION & WORKFLOWS
              </h2>
            </div>

            <div className="space-y-8">
              {/* Workflow 1 */}
              <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm justify-center">
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Lead</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">CRM</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Email</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Follow-up</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Meeting</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Proposal</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Close</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-teal/10 border border-teal/30 rounded text-teal font-medium">Onboarding</span>
                </div>
              </div>

              {/* Workflow 2 */}
              <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm justify-center">
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Content</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Post</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Ads</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Leads</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">CRM</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Retargeting</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-teal/10 border border-teal/30 rounded text-teal font-medium">Conversion</span>
                </div>
              </div>

              {/* Workflow 3 */}
              <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm justify-center">
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Inquiry</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">AI Response</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Information</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Reminder</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded">Application</span>
                  <span className="text-teal">→</span>
                  <span className="px-3 py-1.5 bg-teal/10 border border-teal/30 rounded text-teal font-medium">Enrollment</span>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 mt-10 max-w-3xl mx-auto">
              Workflows remove manual work and ensure that every lead, customer, and inquiry 
              is handled properly.
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 6: VANTIX INTELLIGENCE */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-sm bg-white/[0.02] border border-teal/20 rounded-2xl p-10 sm:p-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  INTELLIGENCE LAYER — <span className="text-teal">VANTIX</span>
                </h2>
                <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-400">
                  <p>
                    VANTIX is the intelligence layer behind every system.
                  </p>
                  <p>
                    It monitors performance, tracks data, analyzes behavior, and continuously 
                    improves system performance.
                  </p>
                  <p className="font-semibold text-gray-300">
                    VANTIX turns systems into self-improving environments.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <div className="text-center p-4">
                  <div className="text-sm font-medium text-teal mb-1">Performance Monitoring</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm font-medium text-teal mb-1">Lead Behavior Tracking</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm font-medium text-teal mb-1">Ad Performance Optimization</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm font-medium text-teal mb-1">Automation Improvement</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm font-medium text-teal mb-1">Content Optimization</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm font-medium text-teal mb-1">Predictive Insights</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm font-medium text-teal mb-1">Reporting & Analytics</div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/assurance"
                  className="inline-block px-8 py-4 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                >
                  Learn More About VANTIX
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 7: SYSTEM ARCHITECTURE DIAGRAM */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-10 sm:p-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">
                SYSTEM ARCHITECTURE
              </h2>

              {/* Architecture Diagram */}
              <div className="space-y-8">
                {/* VANTIX at top */}
                <div className="text-center">
                  <div className="inline-block px-6 py-3 bg-teal/10 border border-teal/40 rounded-lg">
                    <span className="font-bold text-teal">VANTIX (Intelligence Layer)</span>
                  </div>
                  <div className="flex justify-center mt-4">
                    <div className="w-px h-12 bg-gradient-to-b from-teal/60 to-transparent" />
                  </div>
                </div>

                {/* System Components */}
                <div className="flex flex-wrap justify-center items-center gap-3">
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded text-sm">Website</span>
                  <span className="text-teal">→</span>
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded text-sm">CRM</span>
                  <span className="text-teal">→</span>
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded text-sm">Automation</span>
                  <span className="text-teal">→</span>
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded text-sm">Ads</span>
                  <span className="text-teal">→</span>
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded text-sm">Content</span>
                  <span className="text-teal">→</span>
                  <span className="px-4 py-2 bg-white/5 border border-white/10 rounded text-sm">Analytics</span>
                </div>

                {/* Arrow down to Customers */}
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-px h-12 bg-gradient-to-b from-teal/40 to-transparent" />
                  </div>
                  <div className="inline-block px-6 py-3 bg-teal/5 border border-teal/20 rounded-lg">
                    <span className="font-bold text-gray-300">Customers</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-gray-400 mt-10">
                VANTIX connects and optimizes every part of the system.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 8: SYSTEM PROCESS */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-10 sm:p-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center">
                SYSTEM PROCESS
              </h2>

              <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
                <span className="px-5 py-2.5 bg-white/5 border border-white/10 rounded font-medium">Consulting</span>
                <span className="text-teal text-xl">→</span>
                <span className="px-5 py-2.5 bg-white/5 border border-white/10 rounded font-medium">Build</span>
                <span className="text-teal text-xl">→</span>
                <span className="px-5 py-2.5 bg-white/5 border border-white/10 rounded font-medium">Launch</span>
                <span className="text-teal text-xl">→</span>
                <span className="px-5 py-2.5 bg-white/5 border border-white/10 rounded font-medium">Optimize</span>
                <span className="text-teal text-xl">→</span>
                <span className="px-5 py-2.5 bg-white/5 border border-white/10 rounded font-medium">Scale</span>
              </div>

              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 bg-teal/10 border border-teal/30 rounded text-sm font-medium text-teal">
                  ↑ Powered by VANTIX
                </div>
              </div>

              <p className="text-center text-gray-400 max-w-2xl mx-auto">
                Our work does not end at launch. Systems are continuously improved and scaled.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 9: FINAL CTA */}
      <Reveal>
        <section className="px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-md bg-white/[0.02] border border-teal/20 rounded-2xl p-12 sm:p-20 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Build Infrastructure.
                <br />
                Deploy Intelligence.
                <br />
                <span className="text-teal">Scale Operations.</span>
              </h2>
              
              <p className="text-lg text-gray-400 mb-12">
                Powered by VANTIX.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-10 py-5 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                >
                  Start a System
                </Link>
                <Link
                  href="/contact"
                  className="px-10 py-5 text-sm font-medium border border-teal/40 hover:border-teal text-teal rounded-lg transition-all duration-300"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
