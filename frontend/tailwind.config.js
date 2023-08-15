/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'saira-condensed': ['Saira Condensed', 'sans'],
      },
      fontFamily: {
        'saira-condensed': ['Saira Condensed', 'sans-serif'],
      },
      colors: {
        'box-fill':'rgba(14, 18, 17, 0.7)',
        'main-text':'#9e9fa4',
        'main-yellow':'rgba(213, 242, 35, 0.8)',
        'nav-stroke':'#D1AA43',
        'authGrad-s':'rgba(55, 80, 92, 0.1)',
        'authGrad-e':'rgba(61, 179, 162, 0.1)',
        'hover-authGrad-s':'rgba(55, 80, 92, 0.3)',
        'hover-authGrad-e':'rgba(61, 179, 162, 0.3)',
        'hover-login-nav-text':'#7A8D00',
        'aside-fill': '#0E1211',
        'aside-border': '#696D7D',
        'custom-fill': 'rgba(158, 159, 164, 0.70)',
        'strokeWidth': '0.2px',
        'custom-stroke': 'rgba(0, 0, 0, 0.50)',
        'heading-fill': 'rgba(34, 39, 46, 0.8)',
        'heading-stroke':'rgba(105, 109, 125, 1)',
        'heading-stroke-30':'rgba(105, 109, 125, 0.3)',
        'start-game':'rgba(213, 242, 35, 0.5)',
        'game-status-bg': 'rgba(54, 55, 62, 0.4)',
      }
    },
  },
  plugins: [require("daisyui")],
}

