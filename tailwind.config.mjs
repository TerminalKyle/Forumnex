/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        // Removed previous deep/purple shadows as they don't fit the new light theme
        // You can add new subtle shadows here if needed, matching the new design's lift
      },
      colors: {
        'primary-accent': '#4299e1', // Blue 500, matches globals.css
        'secondary-accent': '#63b3ed', // Blue 400, matches globals.css
        'card-background': '#ffffff', // White for cards, matches globals.css
        'border-color': '#e2e8f0', // Light border color, matches globals.css
      }
    },
  },
  plugins: [],
}; 