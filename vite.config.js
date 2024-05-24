import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			src: "/src",
		},
	},
	base: "/",
	build: {
		rollupOptions: {
			input: ["index.html", "404.html"],
		},
	},
});
