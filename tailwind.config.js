/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: "#f5f5f7",
          card: "#ffffff",
          text: "#1d1d1f",
          secondary: "#86868b",
          blue: "#0071e3",
          border: "#d2d2d7",
        }
      },
      borderRadius: {
        'apple': '12px',
      },
      boxShadow: {
        'apple': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
