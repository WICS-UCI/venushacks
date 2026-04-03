import { ReactNode } from "react";

import { hasAdminRole } from "@/lib/admin/authorization";
import getUserIdentity from "@/lib/utils/getUserIdentity";

// TODO: include separate portals for Mentors and Volunteers
interface PortalLayoutProps {
	admin: ReactNode;
	applicant: ReactNode;
}

async function PortalLayout({ admin, applicant }: PortalLayoutProps) {
	const { roles } = await getUserIdentity();
	const content = hasAdminRole(roles) ? admin : applicant;

	return (
		<section className="w-full flex items-center flex-col mt-16 min-h-screen">
			{content}
		</section>
	);
}

export default PortalLayout;
