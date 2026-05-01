import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { VolunteerApplicationQuestion } from "@/lib/admin/useApplicant";
import VolunteerApplicationSection from "@/app/admin/applicants/volunteers/components/VolunteerApplicationSection";

import { VolunteerApplicationData } from "@/lib/admin/useApplicant";

interface VolunteerApplicationSections {
	[key: string]: VolunteerApplicationQuestion[];
}

const VOLUNTEER_APPLICATION_SECTIONS: VolunteerApplicationSections = {
	"Personal Information": ["is_18_older", "minimum_5_hours"],
	Education: ["prior_experience"],
	"Free Response Questions": [
		"frq_expect_to_gain",
		"frq_picnic",
		"frq_volunteer",
		"questions_comments_concerns",
	],
	Availability: ["saturday_availability", "sunday_availability"],
};

function VolunteerApplication({
	application_data,
}: {
	application_data: VolunteerApplicationData;
}) {
	return (
		<Container header={<Header variant="h2">Volunteer Application</Header>}>
			<SpaceBetween direction="vertical" size="m">
				{Object.entries(VOLUNTEER_APPLICATION_SECTIONS).map(
					([section, questions]) => (
						<VolunteerApplicationSection
							key={section}
							title={section}
							data={application_data}
							propsToShow={questions}
						/>
					),
				)}
			</SpaceBetween>
		</Container>
	);
}

export default VolunteerApplication;
