/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Tambahkan ini
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    colors: {
      primary: "#1C0A00",
      secondary: "#CC9544",
      // Masalah lain adalah Anda mengganti warna default Tailwind
      // Tambahkan warna dasar yang hilang
      white: "#ffffff",
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
        950: "#020617"
      },
      blue: {
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb"
      }
    },
  },
  plugins: [],
};