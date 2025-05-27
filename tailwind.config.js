/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      colors: {
        primary: '#050505',
        primaryLight: '#8F8F8F',
        stroke: '#E2E8F0',
        success: '#4DB675',
        gray: '#64748B',
        danger: '#C00F0C',
        violet: '#7255BD',
        gray_light: '#98A2B3',
        white: '#fff',
        purple: '#513C86',
        foundation: '#f1f1f1',
        foundationBlack: '#b3b3b3',
        blackLight: '#5C5C5C',
        stroke: '#E7e7e7',
      },
    },
  },
  plugins: [],
}
