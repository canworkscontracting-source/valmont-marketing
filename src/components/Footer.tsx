import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-teal/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-teal shadow-[0_0_20px_rgba(0,212,191,0.6)]" />
              <span className="text-xl font-bold tracking-tight font-mono uppercase">
                VALMONT MARKETING
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Strategic digital infrastructure for brands that demand precision and scale.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-teal">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-gray-400 hover:text-teal-300 transition-colors cursor-pointer">
                Design & Creative
              </li>
              <li className="text-gray-400 hover:text-teal-300 transition-colors cursor-pointer">
                Performance Marketing
              </li>
              <li className="text-gray-400 hover:text-teal-300 transition-colors cursor-pointer">
                Development
              </li>
              <li className="text-gray-400 hover:text-teal-300 transition-colors cursor-pointer">
                Content Production
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase mb-4 text-teal">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/intelligence" className="text-gray-400 hover:text-teal-300 transition-colors">
                  Intelligence
                </Link>
              </li>
              <li>
                <Link href="/assurance" className="text-gray-400 hover:text-teal-300 transition-colors">
                  Assurance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-teal-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-teal/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold mb-2">Get Started</h4>
              <p className="text-gray-400 text-sm">
                Ready to build something exceptional?
              </p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-3 text-sm font-bold tracking-wide uppercase bg-teal/10 hover:bg-teal/20 border border-teal/30 hover:border-teal/60 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,191,0.3)]"
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-teal/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 VALMONT MARKETING. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
