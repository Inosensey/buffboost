import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      phone: '280px',
      mdphone: '420px',
      tablet: '576px',
      mdtablet: '676px',
      laptop: '992px',
      desktop: '1280px',
      larger: '1920px'
    },
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        // primary: '#121212',
        // lightPrimary: '#2C3A37',
        // secondary: '#4B6F64',
        // lightSecondary: '#A8C8C0',
        // textGray: '#e0e1dd'

        Primary: "#5A189A",
        Secondary: "#7B2CBF",
        Tertiary: "#9D4EDD",
        Background: "#10002B",
        Foreground: "#240046",
        Divider: "#3C096C",
        Text: "#C77DFF",
        SoftBackground: "#E0AAFF",
      },
      fontFamily: {
        dmSans: ['var(--font-dm-sans)'],
        quickSand: ['var(--font-quicksand)'],
      },
    },
  },
  plugins: [],
};
export default config;
