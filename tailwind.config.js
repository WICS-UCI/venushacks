import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily: {
        header: ["Comfortaa"],
        body: ["Varela Round"],
        sans: ["Varela Round"],
      }
    },
    screens: {
      ...defaultTheme.screens,
      xs: "350px",
    },
  },
  plugins: [],
};

export default config;
