import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* 3 Column Layout */}
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
              Powered by VANTIX AI.
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
                VANTIX AI
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
                href="/systems" 
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

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-500">
                © Valmont Marketing & Consultancy
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Systems. Automation. Intelligence.
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-xs text-gray-600">
                AI Infrastructure & Intelligence Systems
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
