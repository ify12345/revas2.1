/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
     primary: '#050505',
     primaryLight: '#8F8F8F',
     stroke:'#E2E8F0',
     success:'#4DB675',
     gray:'#64748B',
     danger: '#C00F0C',
     violet: '#7255BD'
    },
  },
  plugins: [],
}

