/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Habilitar modo oscuro usando la clase "dark"
  theme: {
    extend: {
      colors: {
        // Variantes Light
        'red-200': '#ffe5e5',
        'light-blue': '#e5f0ff',
        'light-green': '#e5ffec',
        'light-violet': '#f3e5ff',
        // Variantes Dark
        'dark-red': '#4d0000',
        'dark-blue': '#00134d',
        'dark-green': '#003d26',
        'dark-violet': '#2e003d',
      },
    },
  },
  plugins: [],
};
