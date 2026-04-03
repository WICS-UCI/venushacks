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
		<section className="w-full flex items-center flex-col min-h-screen">
			<div className="mt-20 md:mt-36 md:mb-10">
				<h1 className="font-display font-bold text-lg sm:text-3xl md:text-5xl text-center">
					Portal
				</h1>
			</div>
			{content}
		</section>
	);
}

export default PortalLayout;
