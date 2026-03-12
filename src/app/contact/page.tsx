"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here (Vercel Forms, API route, etc.)
    console.log("Form submitted:", formData);
    alert("Thank you! We'll be in touch soon.");
    setFormData({ name: "", email: "", company: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
                LET'S TALK GROWTH
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
              Contact
              <br />
              <span className="text-teal text-glow">Valmont</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              For qualified inquiries related to growth systems, intelligence architecture, 
              and controlled execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Form */}
          <Reveal>
            <div className="glass rounded-3xl p-10">
              <h2 className="text-2xl font-black uppercase mb-4">
                Initiate a Conversation
              </h2>
              <p className="text-gray-400 mb-8">
                Share a brief overview of your project. If there's a fit, our team will 
                respond within one business day.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-teal/20 rounded-lg focus:border-teal/60 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-teal/20 rounded-lg focus:border-teal/60 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                    Company / Organization (optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/30 border border-teal/20 rounded-lg focus:border-teal/60 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/30 border border-teal/20 rounded-lg focus:border-teal/60 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">
                    Project Overview
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-black/30 border border-teal/20 rounded-lg focus:border-teal/60 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)]"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </Reveal>

          {/* Direct Contact Info */}
          <Reveal delay={0.2}>
            <div className="glass rounded-3xl p-10">
              <h2 className="text-2xl font-black uppercase mb-6">
                Direct Contact
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-teal mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:Valmontmarketingagency@gmail.com"
                    className="text-lg font-semibold hover:text-teal transition-colors"
                  >
                    Valmontmarketingagency@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase text-teal mb-2">
                    WhatsApp
                  </h3>
                  <a
                    href="https://wa.me/918146961488"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold hover:text-teal transition-colors"
                  >
                    +91-8146961488
                  </a>
                </div>

                <div className="pt-6 border-t border-teal/20">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    All inquiries are treated as confidential by default. We do not disclose 
                    client identities or engagement details without written permission.
                  </p>
                </div>

                <div className="pt-6 border-t border-teal/20">
                  <h3 className="text-sm font-bold mb-4 uppercase tracking-wide">
                    What Happens Next
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Review within 24 hours",
                      "Qualification call (if aligned)",
                      "System architecture proposal",
                      "Engagement terms & NDA",
                    ].map((item, i) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center text-xs font-bold text-teal">
                          {i + 1}
                        </div>
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
