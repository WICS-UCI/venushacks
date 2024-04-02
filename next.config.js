/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: "export",
	reactStrictMode: true,
	// rewrites: async () => ([]),
	redirects: async () => [
		{
			source: "/apply",
			destination: "https://tally.so/r/wvyaW0",
			permanent: true,
		},
		{
			source: "/volunteer",
			destination: "https://tally.so/r/w48aRA",
			permanent: true,
		},
	],
};

module.exports = nextConfig;
