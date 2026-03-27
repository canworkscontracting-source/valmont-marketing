"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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
          ...formData,
          subject: `New Inquiry from ${formData.name} - ${formData.company}`,
        }),
      });

      if (response.ok) {
        setSubmitMessage("Thank you! We'll be in touch soon.");
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          service: "",
          message: "",
          budget: "",
        });
      } else {
        setSubmitMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              CONTACT
            </p>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              Let's Build
              <br />
              <span className="text-teal">Your System</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We build systems for organizations that want to operate with structure, 
              automation, and intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: CONTACT FORM */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[800px] mx-auto">
            <div className="backdrop-blur-sm bg-white/[0.02] border border-white/10 rounded-2xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
                GET IN TOUCH
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-teal focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-teal focus:outline-none transition-colors"
                    placeholder="Company name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-teal focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-teal focus:outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    What do you need help with? *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-teal focus:outline-none transition-colors"
                  >
                    <option value="" className="bg-gray-900">Select a service</option>
                    <option value="Systems" className="bg-gray-900">Systems</option>
                    <option value="Automation" className="bg-gray-900">Automation</option>
                    <option value="AI Chatbot" className="bg-gray-900">AI Chatbot</option>
                    <option value="Marketing" className="bg-gray-900">Marketing</option>
                    <option value="Consulting" className="bg-gray-900">Consulting</option>
                    <option value="VANTIX" className="bg-gray-900">VANTIX</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-teal focus:outline-none transition-colors"
                  >
                    <option value="" className="bg-gray-900">Select budget range</option>
                    <option value="$500–$1,000" className="bg-gray-900">$500–$1,000</option>
                    <option value="$1,000–$3,000" className="bg-gray-900">$1,000–$3,000</option>
                    <option value="$3,000–$10,000" className="bg-gray-900">$3,000–$10,000</option>
                    <option value="$10,000+" className="bg-gray-900">$10,000+</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-teal focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>

                {/* Submit Message */}
                {submitMessage && (
                  <p className={`text-center text-sm ${submitMessage.includes("Thank") ? "text-teal" : "text-red-400"}`}>
                    {submitMessage}
                  </p>
                )}

                {/* Footer Text */}
                <p className="text-center text-sm text-gray-500">
                  Our team reviews every inquiry before scheduling consultations.
                </p>
              </form>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SECTION 3: WHAT HAPPENS NEXT */}
      <Reveal>
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                WHAT HAPPENS NEXT
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              {/* Step 1: Review */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-teal mb-2">1. Review</div>
                <p className="text-sm text-gray-400">
                  We review your inquiry and requirements
                </p>
              </div>

              {/* Step 2: Consultation */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-teal mb-2">2. Consultation</div>
                <p className="text-sm text-gray-400">
                  We schedule a consultation call
                </p>
              </div>

              {/* Step 3: Plan */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-teal mb-2">3. Plan</div>
                <p className="text-sm text-gray-400">
                  We create a systems and strategy plan
                </p>
              </div>

              {/* Step 4: Build */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-teal mb-2">4. Build</div>
                <p className="text-sm text-gray-400">
                  We begin building your systems
                </p>
              </div>
            </div>

            <p className="text-center text-gray-400">
              Our work is structured, strategic, and system-focused.
            </p>
          </div>
        </section>
      </Reveal>

      {/* SECTION 4: FINAL CTA */}
      <Reveal>
        <section className="px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="backdrop-blur-md bg-white/[0.02] border border-teal/20 rounded-2xl p-12 sm:p-20 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Build Systems.
                <br />
                Implement Intelligence.
                <br />
                <span className="text-teal">Scale Operations.</span>
              </h2>
              
              <p className="text-lg text-gray-400 mb-12">
                Powered by VANTIX.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#form"
                  className="px-10 py-5 text-sm font-medium bg-teal hover:bg-teal-600 text-black rounded-lg transition-all duration-300"
                >
                  Book Consultation
                </Link>
                <Link
                  href="/intelligence"
                  className="px-10 py-5 text-sm font-medium border border-teal/40 hover:border-teal text-teal rounded-lg transition-all duration-300"
                >
                  View Intelligence
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
