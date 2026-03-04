import { redirect } from "next/navigation";

import ApplicationFlow from "@/lib/components/forms/shared/ApplicationFlow";
import getUserIdentity from "@/lib/utils/getUserIdentity";

import MentorHomepage from "./Form/MentorHomepage";
import PersonalInformation from "./Form/MentorPersonalInformation";


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
			<MentorHomepage />
			<PersonalInformation />
		</ApplicationFlow>
	);
}
