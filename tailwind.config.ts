import typography from "@tailwindcss/typography";
import { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

const config: Config = {
  content: {
    files: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
    ],
    extract,
  },
  darkMode: ["selector", '[data-theme="dark"]'],
  plugins: [
    animate,
    typography,
    fluid,
    ({ addComponents, theme }) => {
      addComponents({
        ".clip-slant": {
          clipPath: theme("clipPath.slant"),
        },
      });
    },
  ],
  prefix: "",
  safelist: [
    "lg:col-span-4",
    "lg:col-span-6",
    "lg:col-span-8",
    "lg:col-span-12",
    "border-border",
    "bg-card",
    "border-error",
    "bg-error/30",
    "border-success",
    "bg-success/30",
    "border-warning",
    "bg-warning/30",
  ],
  theme: {
    screens, // Tailwind's default screens, in `rem`
    fontSize, // Tailwind's default font sizes, in `rem` (including line heights)
    container: {
      center: true,
      padding: {
        "2xl": "2rem",
        DEFAULT: "1rem",
        lg: "2rem",
        md: "2rem",
        sm: "1rem",
        xl: "2rem",
      },
      screens: {
        "2xl": "86rem",
        lg: "64rem",
        md: "48rem",
        sm: "40rem",
        xl: "80rem",
      },
    },
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      clipPath: {
        slant: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
      },
      colors: {
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        background: "hsl(var(--background))",
        border: "hsla(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        foreground: "hsl(var(--foreground))",
        input: "hsl(var(--input))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        ring: "hsl(var(--ring))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: "hsl(var(--success))",
        error: "hsl(var(--error))",
        warning: "hsl(var(--warning))",
        "blaze-orange": {
          50: "#fff7ed",
          100: "#ffecd4",
          200: "#ffd5a8",
          300: "#ffb670",
          400: "#ff8c37",
          500: "#ff6e14",
          600: "#f05006",
          700: "#c73a07",
          800: "#9e2e0e",
          900: "#7f290f",
          950: "#451105",
        },
        lima: {
          50: "#f9ffe5",
          100: "#f0ffc7",
          200: "#e1ff95",
          300: "#cafe58",
          400: "#b2f526",
          500: "#92dc06",
          600: "#73b400",
          700: "#558506",
          800: "#45690b",
          900: "#3a580f",
          950: "#1d3201",
        },
        "blue-chill": {
          50: "#eafffc",
          100: "#cafff8",
          200: "#9cfff5",
          300: "#57fff0",
          400: "#0cfff6",
          500: "#00eaea",
          600: "#00bac4",
          700: "#0096a0",
          800: "#0b757f",
          900: "#0e606b",
          950: "#02414a",
        },
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)"],
        sans: ["var(--font-untitled-sans)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--text)",
            "--tw-prose-headings": "var(--text)",
            h1: {
              fontSize: "3.5rem",
              fontWeight: "normal",
              marginBottom: "0.25em",
            },
          },
        },
      }),
    },
  },
};

export default config;
