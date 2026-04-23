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
    },
  },
  plugins: [],
}
