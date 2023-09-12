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
        'box-fill': 'rgba(14, 18, 17, 0.7)',
        'main-text': '#9e9fa4',
        'main-yellow': 'rgba(213, 242, 35, 0.8)',
        'nav-stroke': '#D1AA43',
        'authGrad-s': 'rgba(55, 80, 92, 0.1)',
        'authGrad-e': 'rgba(61, 179, 162, 0.1)',
        'hover-authGrad-s': 'rgba(55, 80, 92, 0.3)',
        'hover-authGrad-e': 'rgba(61, 179, 162, 0.3)',
        'hover-login-nav-text': '#7A8D00',
        'aside-fill': '#0E1211',
        'aside-fill-70': 'rgba(14, 18, 17, 0.7)',
        'aside-fill-90': 'rgba(14, 18, 17, 0.9)',
        'aside-border': '#696D7D',
        'custom-fill': 'rgba(158, 159, 164, 0.70)',
        strokeWidth: '0.2px',
        'custom-stroke': 'rgba(0, 0, 0, 0.50)',
        'heading-fill': 'rgba(34, 39, 46, 0.8)',
        'heading-stroke': 'rgba(105, 109, 125, 1)',
        'heading-stroke-30': 'rgba(105, 109, 125, 0.3)',
        'start-game': 'rgba(213, 242, 35, 0.5)',
        'subheading-one': '#D0F223',
        'subheading-two': '#7E8937',
        'grid-border': '#7E8937',
        'grid-bg': '#22272E',
        'game-status-bg': 'rgba(54, 55, 62, 0.4)',
        'Customize-game-bg': ' rgba(21, 21, 21, 0.5)',
        'placeholder-text': 'rgba(106, 106, 106, 0.5)',
        'table-header-bg': 'rgba(26, 26, 26, 0.69)',
        'table-header-text-color': '#6B6B6B',
        'table-row-text-color': '#8D98A7',
        'chat-btn-click': '#232A30',
        'search-box-fill': '#151717',
        'search-box-text': '#6B6B6B',
        'chat-search-stroke': '#696D7D',
        'latest-msg-s': 'rgba(34, 39, 46, 0.5)',
        'latest-msg-e': 'rgba(54, 55, 62, 0.5)',
        'dimmed-text': '#6B6B6B',
        'line-break': 'rgba(105, 109, 125, 0.3)',
        'notification-bg': 'rgba(14, 20, 18, 0.7)',
        'notification-stroke': 'rgba(108, 120, 36, 0.8)',
        'button-background': 'rgba(100, 110, 120, 0.3)',
        /*--------------------  [Chatbox]  ----------------------*/
        'sender-chatbox-bg': 'rgba(49, 75, 73, 0.50)', // Gabdoush
        'receiver-chatbox-bg': 'rgba(77, 94, 137, 0.5)', // Gabdoush
        'sender-chatbox-bg': 'rgba(52, 52, 52, 0.3)', // Gabdoush
      },
      backgroundImage: {
        'table-row-bg':
          'linear-gradient(180deg, rgba(34, 39, 46, 0.50) 0%, rgba(54, 55, 62, 0.22) 100%)',
        'notification-row-bg':
          'linear-gradient(180deg, rgba(20, 23, 28, 0.50) 0%, rgba(54, 55, 62, 0.22) 100%)',
        'notification-img-bg':
          'linear-gradient(180deg, rgba(16, 18, 20, 0.50) 0%, rgba(54, 55, 62, 0.22) 100%)',
      },
    },
  },
  plugins: [require('daisyui')],
};
