/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/contexts/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        "night-indigo": "#0F1B3D",
        "ticket-amber": "#F2A93B",
        "route-teal": "#1F7A6C",
        "paper-cream": "#FBF7EE",
        "coral-alert": "#E2562E",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        ticketbari: {
          primary: "#F2A93B",
          "primary-content": "#0F1B3D",
          secondary: "#1F7A6C",
          "secondary-content": "#FBF7EE",
          accent: "#E2562E",
          neutral: "#0F1B3D",
          "base-100": "#FBF7EE",
          "base-200": "#F1ECE0",
          "base-300": "#E5DDCB",
          "base-content": "#191A2E",
          info: "#3A86C2",
          success: "#1F7A6C",
          warning: "#F2A93B",
          error: "#E2562E",
        },
      },
      {
        ticketbariDark: {
          primary: "#F2A93B",
          "primary-content": "#0F1B3D",
          secondary: "#3FB6A1",
          "secondary-content": "#0F1B3D",
          accent: "#FF7A50",
          neutral: "#FBF7EE",
          "base-100": "#0F1B3D",
          "base-200": "#152752",
          "base-300": "#1C3265",
          "base-content": "#F1ECE0",
          info: "#5FA8E0",
          success: "#3FB6A1",
          warning: "#F2A93B",
          error: "#FF7A50",
        },
      },
    ],
  },
};
