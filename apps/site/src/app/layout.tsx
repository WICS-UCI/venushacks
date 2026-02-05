import { PropsWithChildren } from "react";

// This line will prevent statically generating the admin pages upon deploying.
export const dynamic = "force-dynamic";


export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
