/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "system-ui"], 
        body: ["Inter", "system-ui"],
      },
      colors: {
        text: "hsl(var(--text)/ <alpha-value>)",
        background: "hsl(var(--background)/ <alpha-value>)",
        primary: "hsl(var(--primary)/ <alpha-value>)",
        neutral: "hsl(var(--neutral)/ <alpha-value>)",
        secondary: "hsl(var(--secondary)/ <alpha-value>)",
        accent: "hsl(var(--accent)/ <alpha-value>)",
      },
    },
  },
  plugins: [],
};
