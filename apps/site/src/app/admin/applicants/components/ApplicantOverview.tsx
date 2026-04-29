import Box from "@cloudscape-design/components/box";
import ColumnLayout from "@cloudscape-design/components/column-layout";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";

import ApplicantStatus from "@/app/admin/applicants/components/ApplicantStatus";
import { Applicant } from "@/lib/admin/useApplicant";

interface ApplicantOverviewProps {
	applicant: Applicant;
}

function ApplicantOverview({ applicant }: ApplicantOverviewProps) {
	const { application_data, status } = applicant;
	const { submission_time } = application_data;

	const submittedDate = new Date(submission_time).toDateString();

	return (
		<Container header={<Header variant="h2">Overview</Header>}>
			<ColumnLayout columns={2} variant="text-grid">
				<div>
					<Box variant="awsui-key-label">Submitted</Box>
					{submittedDate}
				</div>
				<div>
					<Box variant="awsui-key-label">Status</Box>
					<ApplicantStatus status={status} />
				</div>
			</ColumnLayout>
		</Container>
	);
}

export default ApplicantOverview;
