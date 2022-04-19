module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        title: 'Fantasy',
        subtitle: 'Cursive',
        text: 'Monospace', // eller Monospace
      },
      colors: {
        primary: '#1E212B',
        secondary: '#454ADE',
        accent: '#B14AED',
        gray: {
          400: '#969798',
          500: '#666666',
          700: '#353535',
          800: '#262626',
          900: '#171818',
        },
        'instruction-items-color': 'rgba(0, 0, 0, 0.24)',
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
};
