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
				heading: ["Ethnocentric"],
				display: ["NicoMoji"],
				sans: ["Lexend Giga"],
				sniglet: ["Sniglet"],
				torus: ["Torus Pro"],
				figtree: ["Figtree"],
			},
			fontSize: {
				"coming-soon": ["clamp(14px, 2.5vw, 28px)", { lineHeight: "100%", letterSpacing: "0.19em" }],
				"venushacks-title": ["clamp(36px, 7vw, 100px)", { lineHeight: "100%", letterSpacing: "0.19em" }],
			},
			colors: {
				white: "var(--color-white)",
				offwhite: "var(--color-offwhite)",
				black: "var(--color-black)",
				brown: "var(--color-brown)",
				"light-blue": "var(--color-light-blue)",
				midnight: "var(--color-midnight)",

				yellow: "var(--color-yellow)",
				pink: "var(--color-pink)",
				"dark-blue": "var(--color-dark-blue)",
				blue: "var(--color-blue)",
				turquoise: "var(--color-turquoise)",
				"dark-text": "#2F3248",
				"button-bg": "#F8C4C4",
				"button-text": "#CF6868",
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
