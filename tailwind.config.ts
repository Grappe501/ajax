import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "display-sm": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display": ["2.75rem", { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-lg": ["3.25rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" }],
      },
      boxShadow: {
        ajax: "0 4px 24px -4px rgba(0, 45, 98, 0.14), 0 0 0 1px rgba(0, 45, 98, 0.05)",
        "ajax-lg": "0 12px 40px -8px rgba(0, 45, 98, 0.18), 0 0 0 1px rgba(0, 45, 98, 0.06)",
        "ajax-gold": "0 4px 20px -2px rgba(253, 185, 19, 0.35)",
      },
      keyframes: {
        "ajax-shimmer": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        "ajax-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "ajax-shimmer": "ajax-shimmer 8s ease-in-out infinite",
        "ajax-float": "ajax-float 7s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["var(--font-sans-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans-body)", "system-ui", "sans-serif"],
        /** Optional — set on marketing layout for a more contemporary public hero */
        publicDisplay: [
          "var(--font-public)",
          "var(--font-display)",
          "var(--font-sans-body)",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        ajax: {
          navy: "var(--ajax-navy)",
          "navy-deep": "var(--ajax-navy-deep)",
          gold: "var(--ajax-gold)",
          "gold-soft": "var(--ajax-gold-soft)",
          cream: "var(--ajax-cream)",
          charcoal: "var(--ajax-charcoal)",
          mist: "var(--ajax-mist)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
