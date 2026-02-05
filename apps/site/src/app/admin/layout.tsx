import { Metadata } from "next/types";

import "@cloudscape-design/global-styles/index.css";

export const metadata: Metadata = {
	title: "Admin | IrvineHacks 2025",
};

// This line will prevent statically generating the admin pages upon deploying.
export const dynamic = "force-dynamic";

export { default as default } from "./layout/AdminLayout";
