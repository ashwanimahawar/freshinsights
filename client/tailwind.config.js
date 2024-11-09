/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "secondary-background": "var(--secondary-background)",
        "primary-text": "var(--primary-text)",
        "secondary-text": "var(--secondary-text)",
        "opposite-text": "var(--opposite-text)",
        background: "var(--background)",
        border: "var(--border)",
        "nav-bg": "var(--nav-bg)",
        overlay: "var(--overlay)",
      },
      backgroundImage: {
        "bg-image": "var(--bg-image)",
      },
      screens: {
        msm: "400px",
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",

        "2.5xl" : "1650px",

        // => @media (min-width: 1536px) { ... }
        "3xl": "1936px",
      },
    },
  },
  plugins: [],
};
