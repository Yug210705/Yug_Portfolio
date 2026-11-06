/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vt: ['"VT323"', "Courier New", "monospace"],
        pixel: ['"Silkscreen"', '"VT323"', "monospace"],
        sans: ['"Plus Jakarta Sans"', "-apple-system", "sans-serif"],
        anton: ['"Anton"', "Impact", "sans-serif"],
        caveat: ['"Caveat"', "cursive"],
        manrope: ['"Manrope"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
}
