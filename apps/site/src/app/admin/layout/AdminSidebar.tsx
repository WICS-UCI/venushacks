import { usePathname } from "next/navigation";

import { useContext } from "react";

import SideNavigation, {
	SideNavigationProps,
} from "@cloudscape-design/components/side-navigation";

import {
	isApplicationManager,
	isHackerReviewer,
	isMentorReviewer,
	isVolunteerReviewer,
	isDirector,
	isLead,
} from "@/lib/admin/authorization";

import UserContext from "@/lib/admin/UserContext";

import { BASE_PATH, useFollowWithNextLink } from "./common";

function AdminSidebar() {
	const pathname = usePathname();
	const followWithNextLink = useFollowWithNextLink();

	const { roles } = useContext(UserContext);

	const navigationItems: SideNavigationProps.Item[] = [
		{ type: "link", text: "Dashboard", href: "/admin/dashboard" },
		{ type: "link", text: "Participants", href: "/admin/participants" },
		{ type: "link", text: "Events", href: "/admin/events" },
		{ type: "divider" },
		{ type: "link", text: "Back to main site", href: "/" },
	];

	const applicationLinks: SideNavigationProps.Link[] = [];

	if (isHackerReviewer(roles)) {
		applicationLinks.push({
			type: "link",
			text: "Hacker Applications",
			href: "/admin/applicants/hackers",
		});
	}

	if (isMentorReviewer(roles)) {
		applicationLinks.push({
			type: "link",
			text: "Mentor Applications",
			href: "/admin/applicants/mentors",
		});
	}

	if (isVolunteerReviewer(roles)) {
		applicationLinks.push({
			type: "link",
			text: "Volunteer Applications",
			href: "/admin/applicants/volunteers",
		});
	}

	if (isLead(roles) || isDirector(roles)) {
		navigationItems.splice(1, 0, {
			type: "link",
			text: "Scores",
			href: "/admin/scores",
		});
	}

	if (isApplicationManager(roles)) {
		navigationItems.splice(1, 0, {
			type: "link-group",
			text: "Applicants",
			href: "/admin/applicants",
			items: applicationLinks,
		});
	}

	if (isDirector(roles)) {
		navigationItems.splice(4, 0, {
			type: "link-group",
			text: "Directors",
			href: "/admin/directors",
			items: [
				{
					type: "link",
					text: "Organizers",
					href: "/admin/directors/organizers",
				},
				{
					type: "link",
					text: "Email Sender",
					href: "/admin/directors/email-sender",
				},
			],
		});
	}

	return (
		<SideNavigation
			activeHref={pathname}
			header={{ href: BASE_PATH, text: "Admin Dashboard" }}
			onFollow={followWithNextLink}
			items={navigationItems}
		/>
	);
}

export default AdminSidebar;
