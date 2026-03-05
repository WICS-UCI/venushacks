import { PropsWithChildren } from "react";
import { Sniglet, Figtree } from "next/font/google";

const sniglet = Sniglet({
	subsets: ["latin"],
	weight: ["400", "800"],
	variable: "--font-sniglet",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
});

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body className={`${figtree.variable} ${sniglet.variable} font-sans`}>
				{children}{" "}
			</body>
		</html>
	);
}
