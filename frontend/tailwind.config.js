/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'box-fill':'rgba(14, 18, 17, 0.7)',
        'main-text':'#9e9fa4',
        'nav-stroke':'#D1AA43',
        'aside-fill': '#0E1211',
        'aside-border': '#696D7D',
        'custom-fill': 'rgba(158, 159, 164, 0.70)',
        'strokeWidth': '0.2px',
        'custom-stroke': 'rgba(0, 0, 0, 0.50)',
      }
    },
  },
  plugins: [require("daisyui")],
}
