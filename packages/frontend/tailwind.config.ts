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
        Primary: "#5A189A",
        Secondary: "#7B2CBF",
        Tertiary: "#9D4EDD",
        Background: "#10002B",
        Foreground: "#240046",
        Divider: "#3C096C",
        Text: "#C77DFF",
        SoftBackground: "#E0AAFF",

        // Green
        Success: "#10B981",      // Emerald 500
        SuccessLight: "#34D399", // Emerald 400
        SuccessDark: "#059669",  // Emerald 600
        SuccessGlow: "#10B98133", // Emerald 500 with 20% opacity// Red

        // Yellow/Gold - for history/archive items
        Archive: "#F59E0B",      // Amber 500
        ArchiveLight: "#FBBF24", // Amber 400
        ArchiveDark: "#D97706",  // Amber 600
        ArchiveGlow: "#F59E0B33", // Amber 500 with 20% opacity
        
        // Red
        Danger: "#EF4444",        // Red 500
        DangerLight: "#F87171",   // Red 400
        DangerDark: "#DC2626",    // Red 600
        DangerGlow: "#EF444433",  // Red 500 @ 20% opacity
      },
      
      boxShadow: {
        // Green glow for active selection
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.5)',
        'glow-green-strong': '0 0 30px rgba(16, 185, 129, 0.7)',
        'glow-green-inner': 'inset 0 0 20px rgba(16, 185, 129, 0.3)',
        
        // Yellow/gold glow for history items
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.5)',
        'glow-gold-strong': '0 0 30px rgba(245, 158, 11, 0.7)',
        'glow-gold-inner': 'inset 0 0 20px rgba(245, 158, 11, 0.3)',
        
        // Red glow for expired/danger
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.5)',
        'glow-red-strong': '0 0 30px rgba(239, 68, 68, 0.7)',
        'glow-red-inner': 'inset 0 0 20px rgba(239, 68, 68, 0.3)',
      },
      animation: {
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'pulse-red': 'pulse-red 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(16, 185, 129, 0.8)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(245, 158, 11, 0.8)' },
        },
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(239, 68, 68, 0.8)' },
        }
      },
      fontFamily: {
        spaceGrotesk: ['var(--font-space-grotesk)'],
        inter: ['var(--font-inter)'],
        oxanium: ['var(--font-oxanium)'],
      },
    },
  },
  plugins: [],
};
export default config;
