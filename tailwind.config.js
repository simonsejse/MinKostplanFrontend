module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      boxShadow: {
        form: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        instructionShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        light:
          'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        pink: 'rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px',
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
        card: 'rgb(31 41 55)',
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
