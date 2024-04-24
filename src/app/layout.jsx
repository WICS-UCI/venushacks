import { varela } from "./fonts";
import "@/app/lib/styles/bootstrap.scss";

export const metadata = {
	title: {
		default: "VenusHacks",
		template: "%s | VenusHacks",
	},
	description: "UC Irvine's women-centric hackathon",
	openGraph: {
		title: "VenusHacks",
		description: "UC Irvine's women-centric hackathon",
		url: "https://venushacks.com",
		siteName: "VenusHacks",
		locale: "en_US",
		type: "website",
	},
};

export const viewport = {
	themeColor: "#000000",
	width: "device-width",
	initialScale: 1,
};

const RootLayout = ({ children }) => (
	<html lang="en">
		<body className={varela.className}>{children}</body>
	</html>
);

export default RootLayout;
