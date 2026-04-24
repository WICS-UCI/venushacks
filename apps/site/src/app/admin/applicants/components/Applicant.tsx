"use client";

import ContentLayout from "@cloudscape-design/components/content-layout";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Spinner from "@cloudscape-design/components/spinner";

import useApplicant, {
	HackerApplicationData,
	MentorApplicationData,
	VolunteerApplicationData,
} from "@/lib/admin/useApplicant";

import HackerApplication from "@/app/admin/applicants/hackers/components/HackerApplication";
import MentorApplication from "@/app/admin/applicants/mentors/components/MentorApplication";
import VolunteerApplication from "@/app/admin/applicants/volunteers/components/VolunteerApplication";

import ApplicantActions from "./ApplicantActions";
import ApplicantOverview from "./ApplicantOverview";
import HackerApplicantActions from "./HackerApplicantActions";
import { ParticipantRole } from "@/lib/userRecord";

interface ApplicantProps {
	uid: string;
	applicationType: "hacker" | "mentor" | "volunteer";
}

function Applicant({ uid, applicationType }: ApplicantProps) {
	const { applicant, loading, submitReview, } = useApplicant(
		uid,
		applicationType,
	);

	if (loading || !applicant) {
		return (
			<ContentLayout header={<Header />}>
				<Spinner variant="inverted" />
			</ContentLayout>
		);
	}

	const { first_name, last_name, application_data } = applicant;

	return (
		<ContentLayout
			header={
				<Header
					variant="h1"
					description="Applicant"
					actions={
						applicant.roles.includes(ParticipantRole.Hacker) ? (
							<HackerApplicantActions
								applicant={applicant._id}
								reviews={application_data.reviews}
								submitReview={submitReview}
							/>
						) : (
							<ApplicantActions
								applicant={applicant._id}
								submitReview={submitReview}
							/>
						)
					}
				>
					{first_name} {last_name}
				</Header>
			}
		>
			<SpaceBetween direction="vertical" size="l">
				<ApplicantOverview applicant={applicant} />
				{applicant.roles.includes(ParticipantRole.Hacker) ? (
					<HackerApplication
						application_data={application_data as HackerApplicationData}
						uid={uid}
					/>
				) : applicant.roles.includes(ParticipantRole.Mentor) ? (
					<MentorApplication
						application_data={application_data as MentorApplicationData}
					/>
				) : (
					<VolunteerApplication
						application_data={application_data as VolunteerApplicationData}
					/>
				)}
			</SpaceBetween>
		</ContentLayout>
	);
}

export default Applicant;
