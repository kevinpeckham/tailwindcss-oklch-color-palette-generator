import type { Config } from "tailwindcss";

function buildFontSizePxClasses() {
  const obj: { [key: string]: string } = {};
  for (let i = 1; i < 51; i++) {
    const key = `${i}`;
    const value = `${i}px`;
    obj[key] = value;
  }
  return obj;
}
const fontSizePxClasses = buildFontSizePxClasses();

const config: Config = {
	content: ["./src/**/*.{html,pug,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				exampleBlue: {
					"50": "oklch(0.95 0.094 250.8 / <alpha-value>)",
					"100": "oklch(0.9 0.094 250.8 / <alpha-value>)",
					"200": "oklch(0.8 0.094 250.8 / <alpha-value>)",
					"300": "oklch(0.7 0.094 250.8 / <alpha-value>)",
					"400": "oklch(0.6 0.094 250.8 / <alpha-value>)",
					"500": "oklch(0.5 0.094 250.8 / <alpha-value>)",
					"600": "oklch(0.4 0.094 250.8 / <alpha-value>)",
					"700": "oklch(0.3 0.094 250.8 / <alpha-value>)",
					"800": "oklch(0.2 0.094 250.8 / <alpha-value>)",
					"900": "oklch(0.1 0.094 250.8 / <alpha-value>)",
					"950": "oklch(0.05 0.094 250.8 / <alpha-value>)",
					"DEFAULT": "oklch(0.33 0.094 250.8 / <alpha-value>)"
				},
				primary: "#142239",
				accent: "#ebf92f",
			},
			fontSize: {
				...fontSizePxClasses,
			},
		},
	},
};

export default config;