import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				scroll: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-50%))" },
				},
			},
			animation: {
				scroll: "scroll var(--duration) linear infinite",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontFamily: {
				sniglet: ["Sniglet"],
				torus: ["Torus Pro"],
				figtree: ["Figtree", "sans-serif"],
			},
			fontSize: {
				"coming-soon": ["clamp(14px, 2.5vw, 28px)", { lineHeight: "100%", letterSpacing: "0.19em" }],
				"venushacks-title": ["clamp(36px, 7vw, 100px)", { lineHeight: "100%", letterSpacing: "0.19em" }],
			},
			colors: {
				white: "var(--color-white)",
				black: "var(--color-black)",
				linen: "var(--color-linen)",
				"pale-rose": "var(--color-pale-rose)",
				"indian-red": "var(--color-indian-red)",
				"ice-cold": "var(--color-ice-cold)",
				"dark-text": "#2F3248",
			},
		},
		screens: {
			xs: "350px",
			...defaultTheme.screens,
		},
	},
	plugins: [],
};
export default config;
