/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
      },
    },
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#FAF6EF",
          200: "#F3ECDC",
        },
        forest: {
          50: "#EEF4EF",
          100: "#D6E4DA",
          300: "#6B9979",
          500: "#2D5A3D",
          600: "#264B33",
          700: "#1F3C29",
        },
        mustard: {
          100: "#F4E6C4",
          300: "#DDB86A",
          500: "#C89B4A",
          600: "#A77F37",
          700: "#876426",
        },
        ink: {
          700: "#3D3A33",
          800: "#2B2924",
          900: "#1C1A17",
        },
      },
      fontFamily: {
        serif: [
          "Noto Serif SC",
          "Lora",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        display: [
          "Lora",
          "Noto Serif SC",
          "Georgia",
          "serif",
        ],
      },
      boxShadow: {
        card: "0 2px 12px rgba(45, 90, 61, 0.08), 0 1px 3px rgba(0,0,0,0.04)",
        cardHover: "0 10px 30px rgba(45, 90, 61, 0.14), 0 2px 8px rgba(0,0,0,0.06)",
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
