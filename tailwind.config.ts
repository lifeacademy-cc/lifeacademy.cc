import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f2557',
          50:  '#eef2ff',
          100: '#dce6ff',
          200: '#c0cfff',
          300: '#92aaff',
          400: '#607bff',
          500: '#3d52ff',
          600: '#2230f5',
          700: '#1a1ee1',
          800: '#1820b5',
          900: '#0f2557',
          950: '#0a1740',
        },
        'life-blue': {
          DEFAULT: '#1a56db',
          light: '#3b82f6',
          dark: '#1340a0',
        },
        gold: {
          DEFAULT: '#f59e0b',
          light: '#fef3c7',
          dark: '#d97706',
        },
        'text-muted': '#64748b',
        border: '#e2e8f0',
        text: '#1e293b',
        bg: '#f0f4ff',
        bg2: '#ffffff',
      },
      fontFamily: {
        thai:    ['IBM Plex Sans Thai', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        ui:      ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 4px 24px rgba(15,37,87,0.08)',
        'card-hover': '0 12px 40px rgba(15,37,87,0.15)',
        glow:  '0 0 40px rgba(26,86,219,0.25)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'fade-in':   'fadeIn 0.5s ease forwards',
        'counter':   'counter 2s ease-out forwards',
        'pulse-slow':'pulse 3s ease-in-out infinite',
        'float':     'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
