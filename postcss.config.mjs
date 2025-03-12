const config = {
  plugins: ['@tailwindcss/postcss'],
  tailwindcss: {
    theme: {
      extend: {
        fontFamily: {
          poppins: ['var(--font-poppins)'],
        },
      },
    },
  },
  autoprefixer: {},
};

export default config;
