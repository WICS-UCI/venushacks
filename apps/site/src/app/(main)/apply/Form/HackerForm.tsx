import AgeInformation from "@/lib/components/forms/shared/AgeInformation";
import BaseForm from "@/lib/components/forms/shared/BaseForm";
import SchoolInformation from "@/lib/components/forms/shared/SchoolInformation";
import ResumeInformation from "@/lib/components/forms/shared/ResumeInformation";

import BasicInformation from "./HackerBasicInformation";
import ProfileInformation from "./ProfileInformation";

export default function HackerForm() {
	return (
		<BaseForm applicationType="Hacker" applyPath="/api/user/apply">
			<BasicInformation />
			<SchoolInformation />
			<ProfileInformation />
			<ResumeInformation />
			<AgeInformation />
		</BaseForm>
	);
}
