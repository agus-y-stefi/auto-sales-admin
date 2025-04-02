/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Esto asegura que Tailwind procese todos los archivos en tu carpeta src
  ],
  theme: {
    extend: {}, // Puedes agregar aquí tus personalizaciones si es necesario
  },
  plugins: [], // Si usas plugins adicionales, los puedes agregar aquí
}
