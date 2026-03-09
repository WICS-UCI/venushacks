import { redirect } from "next/navigation";

import ApplicationFlow from "@/lib/components/forms/shared/ApplicationFlow";
import getUserIdentity from "@/lib/utils/getUserIdentity";

import BasicInformation from "./Form/HackerBasicInformation";
// import SchoolInformation from "@/lib/components/forms/shared/SchoolInformation";
import ProfileInformation from "./Form/ProfileInformation";
import TechnicalQuestions from "./Form/HackerTechnicalQuestions";
import ClosingQuestions from "./Form/HackerClosingQuestions";
import ResumeInformation from "@/lib/components/forms/shared/ResumeInformation";
import AgeInformation from "@/lib/components/forms/shared/AgeInformation";
import ApplicationLandingPane from "@/lib/components/forms/shared/ApplicationLandingPane";
import ApplicationGeneralQuestions from "@/lib/components/forms/shared/ApplicationGeneralQuestions";

export const revalidate = 60;

export default async function Hacker() {
	const identity = await getUserIdentity();

	if (identity.status !== null) {
		redirect("/portal");
	}

	return (
		<ApplicationFlow
			applicationType="Hacker"
			applyPath="/api/user/apply"
			identity={identity}
		>
			<BasicInformation />
      <ApplicationGeneralQuestions />
			<SchoolInformation />
			<ProfileInformation />
			<TechnicalQuestions />
			<ClosingQuestions />
			<ResumeInformation />
			<AgeInformation />
		</ApplicationFlow>
	);
}
