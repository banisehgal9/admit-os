/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: { bg: "#0B0B0B", fg: "#FFFFFF", muted: "#F5F5F5", line: "#EAEAEA", accent: "#111111" },
      },
      fontFamily: { sans: ["Inter", "sans-serif"] },
      boxShadow: { soft: "0 6px 24px rgba(0,0,0,0.06)" },
      borderRadius: { xl2: "1rem" },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
