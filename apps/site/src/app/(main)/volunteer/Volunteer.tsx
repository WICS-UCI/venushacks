import { redirect } from "next/navigation";

import ApplicationFlow from "@/lib/components/forms/shared/ApplicationFlow";
import getUserIdentity from "@/lib/utils/getUserIdentity";

import BasicInformation from "./components/VolunteerBasicInformation";
import AgeInformation from "@/lib/components/forms/shared/AgeInformation";
import EssentialQuestions from "@/lib/components/forms/shared/SchoolInformation";
import ShiftAvailability from "./components/ShiftAvailability";
import VolunteerFRQ from "./components/VolunteerFRQ";
import ExtraQuestions from "./components/ExtraQuestions";


export const revalidate = 60;

export default async function Volunteer() {
	const identity = await getUserIdentity();

	if (identity.status !== null) {
		redirect("/portal");
	}

	return (
		<ApplicationFlow
			applicationType="Volunteer"
			applyPath="/api/user/volunteer"
			identity={identity}
		>
			<BasicInformation />
			<EssentialQuestions/>
			<VolunteerFRQ />
			<ExtraQuestions />
			<ShiftAvailability />
		</ApplicationFlow>
	);
}
