module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      boxShadow: {
        form: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        instructionShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        light:
          'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
      },
      height: {
        90: '90%',
      },
      width: {
        90: '90%',
      },
      fontFamily: {
        title: 'Roboto',
        text: 'Open Sans',
        text2: 'Times New Roman',
      },
      colors: {
        primary: '#eeeeee', //#F7F7F9
        secondary: '#ffffff',
        accent: '#ff3f48',
        button: '#444444',
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
