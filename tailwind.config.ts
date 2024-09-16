import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
   theme: {
    extend: {
      fontFamily: {
         karla: ['Karla', 'sans-serif'],
        'sf-pro': ['SF Pro Display', 'sans-serif'],
         'neue-haas': ['"Neue Haas Grotesk Display Pro"', 'sans-serif'],
           inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'thumbnail': "url('./public/images/videoplayer-thumbnail.png')",
      }
    },
  },
  plugins: [],
};
export default config;
