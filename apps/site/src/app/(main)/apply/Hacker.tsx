import { redirect } from "next/navigation";

import ApplicationFlow from "@/lib/components/forms/shared/ApplicationFlow";
import getUserIdentity from "@/lib/utils/getUserIdentity";

import BasicInformation from "./Form/HackerBasicInformation";
import GeneralQuestions from "./Form/HackerGeneralQuestions";
import TechnicalQuestions from "./Form/HackerTechnicalQuestions";
import ClosingQuestions from "./Form/HackerClosingQuestions";
import ApplicationLandingPane from "@/lib/components/forms/shared/ApplicationLandingPane";

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
			<ApplicationLandingPane applicationType="Hacker" />
			<BasicInformation />
			<GeneralQuestions />
			<TechnicalQuestions />
			<ClosingQuestions />
		</ApplicationFlow>
	);
}
