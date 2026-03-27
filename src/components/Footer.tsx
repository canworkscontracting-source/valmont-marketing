import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-[1200px] mx-auto">
        {/* 3 Column Layout - Desktop */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-base font-bold mb-4">
              Valmont Marketing & Consultancy
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              We design systems, automation, and intelligence infrastructure 
              for modern organizations.
            </p>
            <p className="text-sm font-medium text-teal">
              Powered by VANTIX.
            </p>
          </div>

          {/* Column 2: Pages */}
          <div>
            <div className="space-y-3">
              <Link 
                href="/systems" 
                className="block text-sm text-gray-400 hover:text-teal transition-colors"
              >
                Systems
              </Link>
              <Link 
                href="/intelligence" 
                className="block text-sm text-gray-400 hover:text-teal transition-colors"
              >
                Consulting
              </Link>
              <Link 
                href="/intelligence" 
                className="block text-sm text-gray-400 hover:text-teal transition-colors"
              >
                Intelligence
              </Link>
              <Link 
                href="/assurance" 
                className="block text-sm text-gray-400 hover:text-teal transition-colors"
              >
                VANTIX
              </Link>
            </div>
          </div>

          {/* Column 3: Actions */}
          <div>
            <div className="space-y-3">
              <Link 
                href="/contact" 
                className="block text-sm text-gray-400 hover:text-teal transition-colors"
              >
                Book Consultation
              </Link>
              <Link 
                href="/contact" 
                className="block text-sm text-gray-400 hover:text-teal transition-colors"
              >
                Start System
              </Link>
              <Link 
                href="/contact" 
                className="block text-sm text-gray-400 hover:text-teal transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-500">
                © Valmont Marketing
              </p>
              <p className="text-xs text-gray-600 mt-1">
                AI Infrastructure & Intelligence Systems
              </p>
            </div>
            <p className="text-xs text-gray-600">
              Systems. Automation. Intelligence.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
