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
          access_key: "8fecf807-deb1-411a-9b02-e9e1310a0cc6",
          subject: "📩 New Contact Form Submission",
          from_name: formData.name,
          email: formData.email,
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Thank you! We'll be in touch within one business day.");
        setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      } else {
        alert("❌ Something went wrong. Please try again or email us directly at Valmontmarketingagency@gmail.com");
      }
    } catch (error) {
      alert("❌ Something went wrong. Please try again or email us directly at Valmontmarketingagency@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 border border-teal/30 bg-teal/5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_10px_rgba(0,212,191,0.8)] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-teal">
                Contact Valmont
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 sm:mb-6 uppercase leading-tight">
              Contact
              <br />
              <span className="text-teal text-glow">Valmont</span>
            </h1>

            <p className="text-base sm:text-xl text-gray-300 leading-relaxed">
              For qualified inquiries related to growth systems, intelligence architecture, 
              and controlled execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Mobile: Stack vertically */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Form */}
            <Reveal>
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 order-2 md:order-1">
                <h2 className="text-xl sm:text-2xl font-black uppercase mb-3 sm:mb-4">
                  Initiate a Conversation
                </h2>
                <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
                  Share a brief overview of your project. If there's a fit, our team will 
                  respond within one business day.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-black/30 border border-teal/20 rounded-lg focus:border-teal/60 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-black/30 border border-teal/20 rounded-lg focus:border-teal/60 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">
                      Company / Organization <span className="text-gray-500">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-black/30 border border-teal/20 rounded-lg focus:border-teal/60 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-black/30 border border-teal/20 rounded-lg focus:border-teal/60 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 uppercase tracking-wide">
                      Project Overview
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-black/30 border border-teal/20 rounded-lg focus:border-teal/60 focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 text-sm font-bold tracking-wide uppercase bg-teal hover:bg-teal-600 text-black rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,191,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Direct Contact Info */}
            <Reveal delay={0.2}>
              <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-10 order-1 md:order-2">
                <h2 className="text-xl sm:text-2xl font-black uppercase mb-4 sm:mb-6">
                  Direct Contact
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-teal mb-2">
                      Email
                    </h3>
                    <a
                      href="mailto:Valmontmarketingagency@gmail.com"
                      className="text-base sm:text-lg font-semibold hover:text-teal transition-colors break-all"
                    >
                      Valmontmarketingagency@gmail.com
                    </a>
                  </div>

                  <div className="pt-4 sm:pt-6 border-t border-teal/20">
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      All inquiries are treated as confidential by default. We do not disclose 
                      client identities or engagement details without written permission.
                    </p>
                  </div>

                  <div className="pt-4 sm:pt-6 border-t border-teal/20">
                    <h3 className="text-sm font-bold mb-3 sm:mb-4 uppercase tracking-wide">
                      What Happens Next
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {[
                        "Review within 24 hours",
                        "Qualification call (if aligned)",
                        "System architecture proposal",
                        "Engagement terms & NDA",
                      ].map((item, i) => (
                        <li key={item} className="flex items-start gap-2 sm:gap-3">
                          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center text-xs font-bold text-teal">
                            {i + 1}
                          </div>
                          <span className="text-gray-300 text-xs sm:text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
