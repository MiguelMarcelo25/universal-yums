/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef1fb',
          100: '#d6defa',
          200: '#aab8f1',
          300: '#7e92e8',
          400: '#526cdf',
          500: '#2946c8',
          600: '#1f3a9e',
          700: '#182e7e',
          800: '#112258',
          900: '#0a1639',
        },
        sunny: {
          50: '#fffbea',
          100: '#fff4c2',
          200: '#ffe77a',
          300: '#ffd93f',
          400: '#f5c518',
          500: '#e4b000',
        },
        ketchup: {
          400: '#ef4b44',
          500: '#e4322b',
          600: '#c21f18',
        },
        cream: '#fff9ec',
      },
      fontFamily: {
        display: ['"Fredoka"', 'ui-rounded', 'system-ui', 'sans-serif'],
        sans: ['"Nunito"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        pop: '0 12px 30px -12px rgba(31, 58, 158, 0.45)',
        ketchup: '0 10px 24px -10px rgba(228, 50, 43, 0.55)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 10px 24px -10px rgba(228, 50, 43, 0.55)' },
          '50%': { boxShadow: '0 14px 36px -8px rgba(228, 50, 43, 0.85)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 18s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2.5s ease-in-out infinite',
        sparkle: 'sparkle 1.4s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
    },
  },
  plugins: [],
}
