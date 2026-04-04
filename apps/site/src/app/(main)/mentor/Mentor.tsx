import { redirect } from "next/navigation";

import ApplicationFlow from "@/lib/components/forms/shared/ApplicationFlow";
import getUserIdentity from "@/lib/utils/getUserIdentity";
import ApplicationLandingPane from "@/lib/components/forms/shared/ApplicationLandingPane";

import PersonalInformation from "./Form/MentorPersonalInformation";
import ShortAnswers from "./Form/MentorShortAnswers";

export const revalidate = 60;

export default async function Mentor() {
	const identity = await getUserIdentity();

	if (identity.status !== null) {
		redirect("/portal");
	}

	return (
		<ApplicationFlow
			applicationType="Mentor"
			applyPath="/api/user/mentor"
			identity={identity}
		>
			<ApplicationLandingPane applicationType="Mentor" />
			<PersonalInformation />
			<ShortAnswers />
		</ApplicationFlow>
	);
}
