import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      fontWeight: {
        'light': '200',
        'normal': '400',
        'bold': '700',
      },
      height: {
        body: "calc(100vh - 75px)",
      },
      minHeight: {
        6: "1.5rem",
        7: "1.7rem",
        8: "2rem",
      },
      backgroundImage: {
        brush: "url('/assets/brush/pepper.png')",
      },
      scale: {
        flip: "-1",
      },
      colors: {
        proteins: "#aacfbe",
        carbs: "#dea88c",
        fat: "#e3da9f",
        main: {
          100: "#fff2e7",
          300: "#fff0d3",
        },
        primary: {
          // 100: "#FFFBF7",
          100: "#FFF8F2",
          200: "rgba(255,246,238,1)",
          300: "#fff0df",
        },
        secondary: {
          100: "#ffd5d8",
          200: "#ffaab1",
          300: "#973439",
          400: "#602125",
        },
        text: {
          light: "#00000096",
          100: "#fffefc",
          200: "rgb(160, 86, 86)",
          300: "rgb(74, 64, 64)",
          accent: "#243143f3",
          accent_soft: "#6783a999",
        },
        white: {
          100: "#FFFFFF",
          300: "rgba(196, 196, 196, 0.91)",
          200: "rgba(255, 253, 253, 0.977)",
          light: "rgba(255, 255, 255, 1)",
        },
        black: {
          light: "#272727d9",
        },
        red: "#e32727",
      },
      maxHeight: {
        header: "27vh",
      },
      maxWidth: {
        xxs: "225px",
      },
      aspectRatio: {
        "2/1": "2/1",
        "3/2": "3/2",
        "2/3": "2/3",
      },
      borderRadius: {
        custom: "0% 100% 75% 25% / 100% 100% 0% 0% ",
        50: "5em",
      },
      backdropGrayscale: {
        50: ".9",
      },
      fontSize: {
        5: "0.5em",
        6: "0.625em",
        7: "0.75em",
        8: "0.875em",
        10: "1em",
        11: "1.25em",
        15: "1.5em",
        20: "2em",
        25: "2.5em",
        "4w": "clamp(0.5rem, 3vw, 1rem)",
      },
      boxShadow: {
        morph: "inset -6px -6px 8px #ece8e1,inset 6px 6px 8px #fffcf3;",
        sober: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
        facebook:
          "rgba(0, 0, 0, 0.2) 0px 8px 24px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
      },
      flex: {
        10: "1 1 10%",
        80: "1 2 80%",
      },
      gridTemplateColumns: {
        app: "minmax(75px, 95px) minmax(200px, 250px) 1fr",
        card: "repeat(auto-fit, minmax(145px , 3fr))",
        main: "300px 1fr",
        input: "1fr 4fr",
        250: "repeat(auto-fit, minmax(280px , 1fr))",
      },
      gridTemplateRows: {
        main: "75px 1fr 3fr",
        app: "75px 1fr",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
