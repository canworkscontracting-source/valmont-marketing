"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function SystemsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-teal/30 bg-teal/5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.8)] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-teal">
                AUTOMATION · DATA · PERFORMANCE
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
              End-to-End
              <br />
              <span className="text-teal text-glow">Growth Systems</span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              AI-driven services designed to scale together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)]"
              >
                Get Started
              </Link>
              <Link
                href="#services"
                className="px-8 py-4 text-sm font-bold tracking-wide uppercase border border-teal/30 hover:border-teal/60 bg-teal/5 hover:bg-teal/10 rounded-full transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Systems Philosophy */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto glass rounded-3xl p-12">
            <p className="text-lg text-gray-300 leading-relaxed">
              We build systems, not tactics. Every service is engineered to integrate, automate, 
              and scale — measured by outcomes, not vanity metrics.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Service Pillars */}
      <section id="services" className="px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Creative & Brand */}
            <Reveal>
              <div className="glass rounded-3xl p-8">
                <h3 className="text-2xl font-black uppercase mb-4 text-teal">
                  Creative & Brand
                </h3>
                <p className="text-gray-400 mb-6">
                  Visual systems designed to establish authority and drive engagement.
                </p>
                <ul className="space-y-3">
                  {[
                    { title: "Design & Creative", desc: "Establish visual authority across every touchpoint." },
                    { title: "Social Creatives", desc: "Convert attention into measurable demand." },
                    { title: "Motion Graphics", desc: "Data-informed visuals that stop the scroll." },
                    { title: "Ad Banners", desc: "Performance-optimized creative assets." },
                  ].map((item) => (
                    <li key={item.title} className="border-l-2 border-teal/30 pl-4">
                      <div className="font-bold text-sm mb-1">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Digital Infrastructure */}
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl p-8">
                <h3 className="text-2xl font-black uppercase mb-4 text-teal">
                  Digital Infrastructure
                </h3>
                <p className="text-gray-400 mb-6">
                  Scalable technical foundations built for growth.
                </p>
                <ul className="space-y-3">
                  {[
                    { title: "Website Development", desc: "Conversion-focused digital engines." },
                    { title: "Ecommerce Builds", desc: "Revenue platforms designed to scale." },
                    { title: "Domains & Hosting", desc: "Secure, reliable digital presence." },
                  ].map((item) => (
                    <li key={item.title} className="border-l-2 border-teal/30 pl-4">
                      <div className="font-bold text-sm mb-1">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Growth & Acquisition */}
            <Reveal delay={0.2}>
              <div className="glass rounded-3xl p-8">
                <h3 className="text-2xl font-black uppercase mb-4 text-teal">
                  Growth & Acquisition
                </h3>
                <p className="text-gray-400 mb-6">
                  Data-driven systems that compound market reach.
                </p>
                <ul className="space-y-3">
                  {[
                    { title: "SEO", desc: "Long-term organic visibility." },
                    { title: "Meta & Google Ads", desc: "Precision targeting powered by data." },
                    { title: "Email Marketing", desc: "Predictable revenue through automation." },
                    { title: "AI Influencer Marketing", desc: "Scalable reach via virtual creators." },
                  ].map((item) => (
                    <li key={item.title} className="border-l-2 border-teal/30 pl-4">
                      <div className="font-bold text-sm mb-1">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Integration */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto glass rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-6">
              Built to Work as One System
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Each service is designed to work in concert with the others — creating compounding 
              returns instead of fragmented efforts.
            </p>
            <ul className="space-y-3">
              {[
                "Integrated growth architecture",
                "AI-driven optimization",
                "Measurable performance",
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

      {/* CTA */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto glass rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Let's define the right growth system for your business.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)]"
            >
              Partner with Valmont
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
