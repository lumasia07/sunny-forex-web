export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
        brand: ['Lexend', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
      },
    },
  },
};
