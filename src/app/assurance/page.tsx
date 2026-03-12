"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function AssurancePage() {
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
                SECURE · PRIVATE · CONFIDENTIAL
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
              Confidential
              <br />
              <span className="text-teal text-glow">Client Relationships</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We do not publicly disclose who we work with. Client identities, brand associations, 
              and engagement details remain confidential unless explicit written permission is granted.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "No name-dropping",
                "No logo walls",
                'No "used by" claims without consent',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-400">
              This is not a marketing choice. It is an operational standard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Protection Measures */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-12 text-center">
              How We Protect Client Data
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {[
              {
                icon: (<svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M12 15v2m-5-6V7a5 5 0 0110 0v4"/></svg>),
                title: "Client-Isolated Systems",
                description:
                  "Each client operates inside a sealed system environment. No shared prompts. No cross-client learning. No reuse of models, memory, or logic. Every system instance is isolated by design — not by policy.",
              },
              {
                icon: (<svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>),
                title: "Zero Data Resale",
                description:
                  "We do not sell, rent, share, or monetize client data — anonymized or otherwise. No data brokers. No third-party enrichment. No secondary usage. Our revenue comes from services, not information.",
              },
              {
                icon: (<svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2h-5z"/><circle cx="12" cy="8" r="2"/><path d="M12 14v4"/></svg>),
                title: "Human-Gated AI",
                description:
                  "AI systems support analysis, pattern recognition, and operational assistance. They do not act autonomously. All publishing requires human approval. All spending requires human authorization. All strategic decisions are human-validated. AI informs. Humans decide.",
              },
              {
                icon: (<svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>),
                title: "Defined Data Lifecycles",
                description:
                  "Client data is retained only as long as necessary to operate systems effectively. Active data is scoped to the engagement. Archived data is restricted and access-controlled. Data is deleted at project completion or upon request. No indefinite retention. No silent storage.",
              },
              {
                icon: (<svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/></svg>),
                title: "NDA-First Operations",
                description:
                  "Confidentiality is assumed by default, not negotiated after the fact. No screenshots. No demos. No case studies. No internal views shared. Nothing is shown, discussed, or referenced without prior approval.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="glass glass-hover rounded-2xl p-8 h-full">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-black uppercase mb-3 text-teal">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.25}>
              <div className="glass glass-hover rounded-2xl p-8 h-full">
                <h3 className="text-xl font-black uppercase mb-4 text-teal">
                  Operational Principles
                </h3>
                <ul className="space-y-3">
                  {[
                    "Confidentiality overrides promotion",
                    "Silence is a feature, not a limitation",
                    "Trust is enforced through structure, not promises",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.6)] mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final Statement */}
      <Reveal>
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-5xl mx-auto glass rounded-3xl p-12">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              This framework exists to protect clients who value discretion, control, and 
              operational security.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              We operate as a trusted system partner, not a public portfolio.
            </p>

            <div className="pt-8 border-t border-teal/20">
              <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
                Confidentiality is not optional.
              </h2>
              <p className="text-gray-400">
                It is built into how Valmont operates.
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
