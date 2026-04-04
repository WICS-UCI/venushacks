import { redirect } from "next/navigation";

import ApplicationFlow from "@/lib/components/forms/shared/ApplicationFlow";
import getUserIdentity from "@/lib/utils/getUserIdentity";

import BasicInformation from "./components/VolunteerBasicInformation";
import VolunteerFRQ from "./components/VolunteerFRQ";
import ApplicationLandingPane from "@/lib/components/forms/shared/ApplicationLandingPane";

export const revalidate = 60;

export default async function Volunteer() {
	const identity = await getUserIdentity();
	if (!identity || identity.uid === null) {
		redirect("/login");
	}
	if (identity.status !== null) {
		redirect("/portal");
	}

	return (
		<ApplicationFlow
			applicationType="Volunteer"
			applyPath="/api/user/volunteer"
			identity={identity}
		>
			<ApplicationLandingPane applicationType="Volunteer" />
			<BasicInformation />
			<VolunteerFRQ />
		</ApplicationFlow>
	);
}
