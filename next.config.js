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
			source: "/mentor",
			destination: "https://x03p1nm9c8s.typeform.com/to/tbReYJHH",
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
