import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      "md-desk": {
        'min': "768px",
      },
      "md-mobol": {
        "max": "768px"
      }

    },
    backgroundImage: {
      'heroImage': "linear-gradient(194deg, rgba(20,21,24,1) 0%, rgba(20,21,24,0.1) 100%), url('https://s3-alpha-sig.figma.com/img/09d6/cb28/95fbf0a84e0effba3cc15693d02a71a7?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B56apB1rP~u8W~VwAR7KoIfjnWPO8Rp~pI-~eGdloB5PP1CNVYZIupXLlFVSU6GZ3clksTgI9HkORRBV8-BNXTwM7~pAlweQrxkrEdMNq1CZdaAb4nk3NqbNHzScqpVbeG7RKXT760Whpv-Q4In298gmSqhdZc6CXrByabKCJcZrGigf3xaBioLK2JruEEkVIbxGIFH~qJ-QpXEI78eTXXuC52oqaTZ6aM88Z~~mg93OHM4JWCP6fX~32Oiz59FQYKej0rOscCIyKTlZrHGB9NLuKw66B~U-AEbZJwC5GuCtcOH3z3~4hjKnqXPX8o19akOydTTarpbAaBf98ksYNQ__')",
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
