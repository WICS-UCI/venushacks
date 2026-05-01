import { usePathname } from "next/navigation";

import BreadcrumbGroup, {
	BreadcrumbGroupProps,
} from "@cloudscape-design/components/breadcrumb-group";

import { BASE_PATH, useFollowWithNextLink } from "./common";

interface PathTitles {
	[key: string]: string;
}

const pathTitles: PathTitles = {
	applicants: "Applicants",
	hackers: "Hacker Applications",
	mentors: "Mentor Applications",
	volunteers: "Volunteer Applications",
	participants: "Participants",
	events: "Events",
	directors: "Directors",
	organizers: "Organizers",
	"email-sender": "Email Sender",
	scores: "Scores",
};

const DEFAULT_ITEMS = [{ text: "Admin Dashboard", href: BASE_PATH }];

function Breadcrumbs() {
	const pathname = usePathname();
	const followWithNextLink = useFollowWithNextLink();

	const breadcrumbItems = getBreadcrumbItems(pathname);

	return (
		<BreadcrumbGroup
			items={breadcrumbItems}
			ariaLabel="Breadcrumbs"
			onFollow={followWithNextLink}
		/>
	);
}

function getBreadcrumbItems(pathname: string): BreadcrumbGroupProps.Item[] {
	const items = [...DEFAULT_ITEMS];

	if (pathname !== BASE_PATH) {
		pathname
			.slice("/admin/".length)
			.split("/")
			.reduce((partial, path) => {
				partial += `${path}/`;
				items.push({
					text: pathTitles[path] || path,
					href: partial,
				});
				return partial;
			}, "/admin/");
	}

	return items;
}

export default Breadcrumbs;
