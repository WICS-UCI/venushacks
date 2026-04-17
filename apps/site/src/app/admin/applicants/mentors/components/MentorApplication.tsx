import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { MentorApplicationQuestion } from "@/lib/admin/useApplicant";
import MentorApplicationSection from "@/app/admin/applicants/mentors/components/MentorApplicationSection";

import { MentorApplicationData } from "@/lib/admin/useApplicant";

interface MentorApplicationSections {
	[key: string]: MentorApplicationQuestion[];
}

const MENTOR_APPLICATION_SECTIONS: MentorApplicationSections = {
	"Personal Information": ["is_18_older"],
	Education: ["affiliation", "year", "major"],
	Experience: [
		"resume_url",
		"linkedin",
		"github",
		"website",
		"areas_of_development",
		"additional_skills_technologies",
		"proficiency_c",
		"proficiency_cpp",
		"proficiency_django",
		"proficiency_expressjs",
		"proficiency_figma",
		"proficiency_firebase",
		"proficiency_flask",
		"proficiency_html_css",
		"proficiency_java",
		"proficiency_javascript",
		"proficiency_mongodb",
		"proficiency_nodejs",
		"proficiency_nosql",
		"proficiency_python",
		"proficiency_react",
		"proficiency_rest_apis",
		"proficiency_sass",
		"proficiency_sql"
	],
	"Free Response Questions": [
		"why_mentor_frq",
		"contribute_inclusive_frq",
		"questions_comments_concerns",
		"availability",
		"availability_specify"
	],
};

function MentorApplication({
	application_data,
}: {
	application_data: MentorApplicationData;
}) {
	return (
		<Container header={<Header variant="h2">Mentor Application</Header>}>
			<SpaceBetween direction="vertical" size="m">
				{Object.entries(MENTOR_APPLICATION_SECTIONS).map(
					([section, questions]) => (
						<MentorApplicationSection
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

export default MentorApplication;
