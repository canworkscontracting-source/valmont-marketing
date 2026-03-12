'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Reveal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [email, setEmail] = useState('');

  const services = [
    {
      title: 'Performance Marketing',
      desc: 'Data-driven campaigns that deliver measurable ROI across all digital channels.',
      icon: (<svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>)
    },
    {
      title: 'Brand Strategy',
      desc: 'Build a premium brand identity that resonates with your target audience.',
      icon: (<svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>)
    },
    {
      title: 'Creative Production',
      desc: 'High-impact creative that cuts through the noise and drives action.',
      icon: (<svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)
    }
  ];

  const stats = [
    { value: '250%', label: 'Avg. ROAS' },
    { value: '$50M+', label: 'Ad Spend Managed' },
    { value: '95%', label: 'Client Retention' },
    { value: '4.8/5', label: 'Client Rating' }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <Reveal>
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              Growth Systems
            </motion.h1>
          </Reveal>
          
          <Reveal>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Elite marketing solutions for brands that refuse to settle.
            </p>
          </Reveal>

          <Reveal>
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all transform hover:scale-105">
              Start Your Journey
            </button>
          </Reveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 lg:px-8 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-16 text-center">
              Our Services
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Reveal key={i}>
                <div className="glass rounded-2xl p-8 hover:scale-105 transition-transform h-full">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Engineered Section */}
      <section className="px-6 lg:px-8 py-20">
        <Reveal>
          <div className="max-w-5xl mx-auto glass rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-8">
              Marketing, Engineered.
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 text-xl">✓</span>
                <span className="text-gray-300">Data-driven strategies backed by real-time analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 text-xl">✓</span>
                <span className="text-gray-300">Creative excellence that converts</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 text-xl">✓</span>
                <span className="text-gray-300">Transparent reporting with full accountability</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 text-xl">✓</span>
                <span className="text-gray-300">Dedicated team of experts at your disposal</span>
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-8 py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">
              Ready to Dominate?
            </h2>
          </Reveal>
          
          <Reveal>
            <p className="text-xl text-gray-300 mb-12">
              Join the elite brands working with Growth Systems.
            </p>
          </Reveal>

          <Reveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none text-white placeholder-gray-400"
              />
              <button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                Get Started
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-8 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            © 2026 Growth Systems. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
