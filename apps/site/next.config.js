// All server-side API requests are handled by lib/utils/api.ts
// but this rewrite still exists for locally testing native POST requests
const LOCAL_API_URL = "http://localhost:8000";

// When deployed on Vercel, this path acts like a rewrite in vercel.json
// Next.js would normally be unable to find the API endpoint
// but Vercel somehow steps in and makes the Serverless Function visible
const VERCEL_API_PATH = "/api/";

const DOCUSIGN_FORM_URL =
	"https://na3.docusign.net/Member/PowerFormSigning.aspx?" +
	"PowerFormId=155a2cee-437f-4aa4-bc58-bd1cb01cde20" +
	"&env=na3" +
	"&acct=e6262c0d-c7c1-444b-99b1-e5c6ceaa4b40" +
	"&v=2";

/** @type {import('next').NextConfig} */
const nextConfig = {
	rewrites: async () => {
		return [
			{
				source: "/api/:path*",
				destination:
					process.env.NODE_ENV === "development"
						? `${LOCAL_API_URL}/:path*`
						: VERCEL_API_PATH,
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/waiver",
				destination: DOCUSIGN_FORM_URL,
				permanent: true,
			},
			{
				source: "/incident",
				destination:
					"https://docs.google.com/forms/d/e/1FAIpQLSf-Frl5wHNoBMs9_pBlaUFyw525N5HqtJaDdmooEssUSREggQ/viewform?usp=sharing",
				permanent: true,
			},
			{
				source: "/devpost",
				destination: "https://irvinehacks-2025.devpost.com/",
				permanent: true,
			},
			{
				source: "/feedback",
				destination:
					"https://docs.google.com/forms/d/e/1FAIpQLSfFP7D0WMwUn0cSnNCU6W1OQtv6qa10SdjL2FkigZHkY92voQ/viewform",
				permanent: true,
			},
		];
	},
	images: {
		remotePatterns: [
		{
			protocol: "https",
			hostname: "cdn.sanity.io",
		},
		],
  	},
};

module.exports = nextConfig;
