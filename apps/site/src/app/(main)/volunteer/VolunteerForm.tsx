import BasicInformation from "./components/VolunteerBasicInformation";
import AgeInformation from "@/lib/components/forms/shared/AgeInformation";
import SchoolInformation from "@/lib/components/forms/shared/SchoolInformation";
import BaseForm from "@/lib/components/forms/shared/BaseForm";

import ShiftAvailability from "./components/ShiftAvailability";
import VolunteerFRQ from "./components/VolunteerFRQ";
import ExtraQuestions from "./components/ExtraQuestions";

export default function VolunteerForm() {
	return (
		<BaseForm applicationType="Volunteer" applyPath="/api/user/volunteer">
			<BasicInformation />
			<SchoolInformation />
			<VolunteerFRQ />
			<ShiftAvailability />
			<ExtraQuestions />
			<AgeInformation />
		</BaseForm>
	);
}
