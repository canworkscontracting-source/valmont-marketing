/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#00D4BF',
          50: '#E6FFFC',
          100: '#B3FFF5',
          200: '#80FFEE',
          300: '#4DFFE7',
          400: '#1AFFE0',
          500: '#00D4BF',
          600: '#00A192',
          700: '#007D6E',
          800: '#005A4A',
          900: '#003626',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 212, 191, 0.3)',
        'glow': '0 0 20px rgba(0, 212, 191, 0.4)',
        'glow-md': '0 0 30px rgba(0, 212, 191, 0.5)',
        'glow-lg': '0 0 40px rgba(0, 212, 191, 0.6)',
        'glow-xl': '0 0 60px rgba(0, 212, 191, 0.7)',
        'premium': '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 212, 191, 0.2)',
        'premium-lg': '0 12px 48px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 212, 191, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(0, 212, 191, 0.1)',
        '3d': '0 10px 30px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 212, 191, 0.15)',
        '3d-hover': '0 20px 50px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 212, 191, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-teal': 'linear-gradient(135deg, #00D4BF 0%, #00A192 100%)',
        'gradient-premium': 'linear-gradient(135deg, #00D4BF 0%, #1AFFE0 50%, #00A192 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(0, 212, 191, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0, 212, 191, 0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(0, 212, 191, 0.2) 0px, transparent 50%)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'data-flow': 'data-flow 2s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 212, 191, 0.4)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 212, 191, 0.8)',
            transform: 'scale(1.05)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'data-flow': {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '50%': { 
            opacity: '1',
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: '0',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
