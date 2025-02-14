import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(194, 90.7%, 17.9%)",
        input: "hsl(194, 90.7%, 17.9%)",
        ring: "hsl(82, 88.9%, 72.1%)",
        background: "hsl(194, 56.8%, 2.9%)",
        foreground: "hsl(74, 63.3%, 92.7%)",
        primary: {
          DEFAULT: "hsl(81, 72.7%, 37%)",
          foreground: "hsl(205, 33.2%, 2.3%)",
        },
        secondary: {
          DEFAULT: "hsl(194, 90.7%, 17.9%)",
          foreground: "hsl(74, 63.3%, 92.7%)",
        },
        destructive: {
          DEFAULT: "hsl(199, 91%, 25.7%)",
          foreground: "hsl(74, 63.3%, 92.7%)",
        },
        muted: {
          DEFAULT: "hsl(194, 90.7%, 17.9%)",
          foreground: "hsl(193, 82.5%, 88.2%)",
        },
        accent: {
          DEFAULT: "hsl(194, 90.7%, 17.9%)",
          foreground: "hsl(74, 63.3%, 92.7%)",
        },
        popover: {
          DEFAULT: "hsl(194, 56.8%, 2.9%)",
          foreground: "hsl(74, 63.3%, 92.7%)",
        },
        card: {
          DEFAULT: "hsl(194, 56.8%, 2.9%)",
          foreground: "hsl(74, 63.3%, 92.7%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
