import { redirect } from "next/navigation";

import ApplicationFlow from "@/lib/components/forms/shared/ApplicationFlow";
import getUserIdentity from "@/lib/utils/getUserIdentity";

import Textfield from "@/lib/components/forms/Textfield";

import AgeInformation from "@/lib/components/forms/shared/AgeInformation";
import SchoolInformation from "@/lib/components/forms/shared/SchoolInformation";
import ResumeInformation from "@/lib/components/forms/shared/ResumeInformation";
import BasicInformation from "./Form/MentorBasicInformation";
import ProfileInformation from "./Form/MentorProfileInformation";
import ShortAnswers from "./Form/MentorShortAnswers";
import ExperienceInformation from "./Form/MentorExperienceInformation";
import MultipleSelect from "@/lib/components/forms/MultipleSelect";

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
			<BasicInformation />
			<SchoolInformation />
			<ShortAnswers />
			<ExperienceInformation />
			<ResumeInformation isRequired />
			<MultipleSelect
				name="resume_share_to_sponsors"
				containerClass="w-11/12"
				labelText="Would you like us to share your resume with our sponsors?"
				values={[
					{ value: "yes", text: "Yes" },
					{ value: "no", text: "No" },
				]}
				inputType="radio"
			/>
			<ProfileInformation />
			<Textfield
				name="other_questions"
				labelText="Questions/comments/concerns?"
				containerClass="flex flex-col w-11/12"
				isRequired={false}
			/>
			<AgeInformation />
		</ApplicationFlow>
	);
}
