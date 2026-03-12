"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function IntelligencePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-teal/30 bg-teal/5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.8)] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-teal">
                AI · ANALYTICS · AUTOMATION
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
              Autonomous
              <br />
              <span className="text-teal text-glow">Intelligence Layer</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              A governing system that evaluates, prioritizes, and directs growth decisions in real time.
            </p>

            <ul className="space-y-3">
              {[
                "Operates above execution",
                "Constrains risk before scale",
                "Preserves human control",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* How It Operates */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-12 text-center">
              How the Intelligence Layer Operates
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal/0 via-teal/40 to-teal/0" />

            {/* Inputs */}
            <Reveal>
              <div className="glass rounded-3xl p-8 relative">
                <h3 className="text-xl font-black uppercase mb-6 text-teal">INPUTS</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  {[
                    "Campaign performance signals",
                    "Market response patterns",
                    "Spend velocity",
                    "Creative decay indicators",
                    "Channel saturation data",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Processing */}
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl p-8 relative">
                <h3 className="text-xl font-black uppercase mb-6 text-teal">PROCESSING</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  {[
                    "Signal weighting",
                    "Pattern correlation",
                    "Confidence scoring",
                    "Conflict resolution",
                    "Priority calculation",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Outputs */}
            <Reveal delay={0.2}>
              <div className="glass rounded-3xl p-8 relative">
                <h3 className="text-xl font-black uppercase mb-6 text-teal">OUTPUTS</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  {[
                    "Scale / pause directives",
                    "Risk alerts",
                    "Opportunity flags",
                    "Budget pressure signals",
                    "Human review requests",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Decision Framework */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="glass rounded-3xl p-12">
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-8">
                Decision Framework
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-teal/20 rounded-2xl p-6 bg-teal/5">
                  <h3 className="font-bold uppercase text-sm mb-4 text-teal">
                    What the System Evaluates
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {[
                      "Momentum vs volatility",
                      "Short-term lift vs long-term decay",
                      "Spend efficiency vs saturation risk",
                      "Signal confidence vs noise",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-teal/20 rounded-2xl p-6 bg-teal/5">
                  <h3 className="font-bold uppercase text-sm mb-4 text-teal">
                    How Decisions Are Formed
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {[
                      "Multi-signal agreement required",
                      "No single-metric dominance",
                      "Confidence thresholds before action",
                      "Conservative bias under uncertainty",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Control Architecture */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto glass rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-8">
              Control Architecture
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "Execution Gates",
                  items: ["Human approval before major shifts", "Manual override at all times"],
                },
                {
                  title: "Spending Constraints",
                  items: ["Budget ceilings", "Velocity limits", "Auto-freeze on anomaly"],
                },
                {
                  title: "Publishing Controls",
                  items: ["Rate limits", "Channel-specific permissions"],
                },
                {
                  title: "Fail-Safe States",
                  items: ["Degradation detection", "Rollback logic", "System-wide pause triggers"],
                },
              ].map((section, i) => (
                <div key={section.title} className="border border-teal/20 rounded-2xl p-6 bg-teal/5">
                  <h3 className="font-bold uppercase text-xs mb-4 text-teal tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Memory Model */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto glass rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-8">
              Intelligence Memory Model
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "What is Stored",
                  items: [
                    "Brand behavior history",
                    "Decision outcomes",
                    "Market reaction patterns",
                    "Past constraint triggers",
                  ],
                },
                {
                  title: "What is Explicitly Prevented",
                  items: [
                    "Cross-client learning",
                    "Shared optimization models",
                    "External data leakage",
                  ],
                },
                {
                  title: "Learning Behavior",
                  items: [
                    "Adjusts confidence weighting over time",
                    "Preserves context across campaigns",
                    "Never forgets prior failures",
                  ],
                },
              ].map((section) => (
                <div key={section.title} className="border border-teal/20 rounded-2xl p-6 bg-teal/5">
                  <h3 className="font-bold uppercase text-xs mb-4 text-teal tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Transparency */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto glass rounded-3xl p-12">
            <h2 className="text-2xl font-black uppercase mb-6">Transparency Layer</h2>
            <ul className="space-y-3">
              {[
                "Every recommendation includes reasoning",
                "Confidence level attached to decisions",
                "Weekly system change logs",
                "Clear distinction between signal vs inference",
                "No opaque automation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 pt-8 border-t border-teal/20">
              <div className="space-y-4 font-mono text-sm text-gray-400">
                <p>Execution is replaceable</p>
                <p>Intelligence is not</p>
                <p className="mt-6">Tools change<br />Logic remains</p>
                <p className="mt-6 text-teal">
                  We don't run marketing.<br />
                  We operate the system that governs it.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
