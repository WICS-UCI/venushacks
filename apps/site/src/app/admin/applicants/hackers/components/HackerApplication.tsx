import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { HackerApplicationQuestion } from "@/lib/admin/useApplicant";
import HackerApplicationSection from "@/app/admin/applicants/hackers/components/HackerApplicationSection";

import { HackerApplicationData } from "@/lib/admin/useApplicant";

interface HackerApplicationSections {
	[key: string]: HackerApplicationQuestion[];
}

const HACKER_APPLICATION_SECTIONS: HackerApplicationSections = {
	"Personal Information": ["is_18_older", "how_did_you_hear_about_us"],
	Education: ["school", "year", "majors_and_minors"],
	Experience: ["resume_url", "share_resume_with_sponsors", "previous_hackathons", "previous_vh"],
	"Free Response Questions": ["frq_diversity", "frq_picnic", "frq_project", "questions_comments_concerns"],
};

function HackerApplication({
	application_data,
}: {
	application_data: HackerApplicationData;
}) {
	return (
		<Container header={<Header variant="h2">Hacker Application</Header>}>
			<SpaceBetween direction="vertical" size="m">
				{Object.entries(HACKER_APPLICATION_SECTIONS).map(
					([section, questions]) => (
						<HackerApplicationSection
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

export default HackerApplication;
