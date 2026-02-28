"use client";

import Textfield from "@/lib/components/forms/Textfield";

import BaseForm from "@/lib/components/forms/shared/BaseForm";
import AgeInformation from "@/lib/components/forms/shared/AgeInformation";
import SchoolInformation from "@/lib/components/forms/shared/SchoolInformation";
import ResumeInformation from "@/lib/components/forms/shared/ResumeInformation";
import BasicInformation from "./MentorBasicInformation";
import ProfileInformation from "./MentorProfileInformation";
import ShortAnswers from "./MentorShortAnswers";
import ExperienceInformation from "./MentorExperienceInformation";
import MultipleSelect from "@/lib/components/forms/MultipleSelect";

export default function MentorForm() {
	return (
		<BaseForm applicationType="Mentor" applyPath="/api/user/mentor">
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
		</BaseForm>
	);
}
