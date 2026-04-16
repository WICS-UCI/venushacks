"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@cloudscape-design/components/box";
import Cards from "@cloudscape-design/components/cards";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";
import Checkbox from "@cloudscape-design/components/checkbox";

import { useFollowWithNextLink } from "@/app/admin/layout/common";
import ApplicantFilters, {
	Options,
} from "@/app/admin/applicants/components/ApplicantFilters";
import ApplicantStatus from "@/app/admin/applicants/components/ApplicantStatus";

import UserContext from "@/lib/admin/UserContext";
import { isDirector, isHackerReviewer } from "@/lib/admin/authorization";
import ApplicantReviewerIndicator from "../components/ApplicantReviewerIndicator";
import HackerThresholdInputs from "../components/HackerThresholdInputs";

import useHackerThresholds from "@/lib/admin/useHackerThresholds";
import useHackerApplicants, {
	HackerApplicantSummary,
} from "@/lib/admin/useHackerApplicants";
import { ParticipantRole, Status } from "@/lib/userRecord";
import { OVERQUALIFIED_SCORE } from "@/lib/decisionScores";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Badge from "@cloudscape-design/components/badge";

function HackerApplicantsList() {
	const router = useRouter();
	const { roles } = useContext(UserContext);

	if (!isHackerReviewer(roles)) {
		router.push("/admin/dashboard");
	}

	const isUserDirector = isDirector(roles);

	const [selectedStatuses, setSelectedStatuses] = useState<Options>([]);
	const [selectedDecisions, setSelectedDecisions] = useState<Options>([]);
	const [uciNetIDFilter, setUCINetIDFilter] = useState<Options>([]);

	const { applicantList, loading } = useHackerApplicants();

	const selectedStatusValues = selectedStatuses.map(({ value }) => value);
	const selectedDecisionValues = selectedDecisions.map(({ value }) => value);
	const uciNetIDFilterValues = uciNetIDFilter.map(({ value }) => value);

	const [acceptedCount, setAcceptedCount] = useState(0);
	const [waitlistedCount, setWaitlistedCount] = useState(0);
	const [rejectedCount, setRejectCount] = useState(0);

	const { thresholds } = useHackerThresholds();
	const acceptThreshold = thresholds?.accept;
	const waitlistThreshold = thresholds?.waitlist;

	const [top400, setTop400] = useState(false);

	useEffect(() => {
		if (top400) {
			setSelectedStatuses([]);
			setSelectedDecisions([]);
		}
	}, [top400]);

	const filteredApplicants = applicantList.filter((applicant) => {
		if (
			selectedStatusValues.includes(Status.Pending) &&
			applicant.avg_score === OVERQUALIFIED_SCORE
		)
			return false;

		if (
			selectedStatusValues.length !== 0 &&
			((selectedStatusValues.includes("RESUME_REVIEWED") &&
				applicant.resume_reviewed) ||
				(selectedStatusValues.includes("RESUME_NOT_REVIEWED") &&
					!applicant.resume_reviewed))
		) {
			return true;
		}

		return (
			(selectedStatuses.length === 0 ||
				selectedStatusValues.includes(applicant.status)) &&
			(selectedDecisions.length === 0 ||
				selectedDecisionValues.includes(applicant.decision || "-")) &&
			(uciNetIDFilter.length === 0 ||
				applicant.reviewers.some((reviewer) =>
					uciNetIDFilterValues.includes(reviewer),
				))
		);
	});

	const filteredApplicants400 = [...applicantList]
		.filter((applicant) => applicant.avg_score !== -1)
		.sort((a, b) => b.avg_score - a.avg_score)
		.slice(0, 400);

	useEffect(() => {
		const accepted = acceptThreshold ? acceptThreshold : 0;
		const waitlisted = waitlistThreshold ? waitlistThreshold : 0;

		const acceptedCount = applicantList.filter(
			(applicant) => applicant.avg_score >= accepted,
		).length;
		setAcceptedCount(acceptedCount);

		const waitlistedCount = applicantList.filter(
			(applicant) =>
				applicant.avg_score >= waitlisted && applicant.avg_score < accepted,
		).length;
		setWaitlistedCount(waitlistedCount);

		const rejectedCount = applicantList.filter(
			(applicant) => applicant.avg_score < waitlisted,
		).length;
		setRejectCount(rejectedCount);
	}, [applicantList, acceptThreshold, waitlistThreshold]);

	const items = top400 ? filteredApplicants400 : filteredApplicants;

	const counter =
		selectedStatuses.length > 0 ||
		selectedDecisions.length > 0 ||
		uciNetIDFilter.length > 0
			? `(${items.length}/${applicantList.length})`
			: `(${applicantList.length})`;

	const emptyContent = (
		<Box textAlign="center" color="inherit">
			No applicants
		</Box>
	);

	const header = ({ _id, first_name, last_name, avg_score }: HackerApplicantSummary) => (
		<CardHeader
			_id={_id}
			first_name={first_name}
			last_name={last_name}
			avg_score={avg_score}
		/>
	)

	const avgScore = ({ avg_score }: { avg_score: number }) => {
		if (avg_score === -1) return "-";
		if (avg_score === OVERQUALIFIED_SCORE)
			return <Box color="text-status-error">OVERQUALIFIED</Box>;
		return avg_score;
	};

	return (
		<Cards
			cardDefinition={{
				header: header,
				sections: [
					{
						id: "uid",
						header: "UID",
						content: ({ _id }) => _id,
					},
					{
						id: "school",
						header: "School",
						content: ({ application_data }) => application_data.school,
					},
					{
						id: "status",
						header: "Status",
						content: ApplicantStatus,
					},
					{
						id: "resume_reviewed",
						header: "Resume Reviewed Status",
						content: ResumeReviewedStatus,
					},
					{
						id: "reviewers",
						header: "",
						content: ApplicantReviewerIndicator,
					},
					{
						id: "submission_time",
						header: "Applied",
						content: ({ application_data }) =>
							new Date(application_data.submission_time).toLocaleDateString(),
					},
					{
						id: "avg_score",
						header: "Averaged Score",
						content: avgScore,
					},
					{
						id: "decision",
						header: "Decision",
						content: DecisionStatus,
					},
				],
			}}
			loading={loading}
			loadingText="Loading applicants"
			items={items}
			trackBy="_id"
			variant="full-page"
			filter={
				<ApplicantFilters
					selectedStatuses={selectedStatuses}
					setSelectedStatuses={setSelectedStatuses}
					selectedDecisions={selectedDecisions}
					setSelectedDecisions={setSelectedDecisions}
					uciNetIDFilter={uciNetIDFilter}
					setUCINetIDFilter={setUCINetIDFilter}
					applicantType={ParticipantRole.Hacker}
				/>
			}
			empty={emptyContent}
			header={
				<div>
					<Header actions={isUserDirector && <HackerThresholdInputs />}>
						Hacker Applicants {counter}
						<div
							style={{
								fontSize: "0.875rem",
								color: "#5f6b7a",
								marginTop: "4px",
							}}
						>
							{acceptedCount} applicants with &quot;accepted&quot; status
						</div>
						<div
							style={{
								fontSize: "0.875rem",
								color: "#5f6b7a",
								marginTop: "4px",
							}}
						>
							{waitlistedCount} applicants with &quot;waitlisted&quot; status
						</div>
						<div
							style={{
								fontSize: "0.875rem",
								color: "#5f6b7a",
								marginTop: "4px",
							}}
						>
							{rejectedCount} applicants with &quot;rejected&quot; status
						</div>
					</Header>
					<Checkbox
						checked={top400}
						onChange={({ detail }) => setTop400(detail.checked)}
					>
						Show Top 400 Scores
					</Checkbox>
					<span>
						{top400 && "Highest score: " + filteredApplicants400[0]?.avg_score}
						<br />
						{top400 &&
							"Lowest score: " +
								filteredApplicants400[filteredApplicants400.length - 1]
									?.avg_score}
					</span>
				</div>
			}
		/>
	);
}

const CardHeader = ({
	_id,
	first_name,
	last_name,
	avg_score,
}: Pick<
	HackerApplicantSummary,
	"_id" | "first_name" | "last_name" | "avg_score"
>) => {
	const followWithNextLink = useFollowWithNextLink();
	const href = `/admin/applicants/hackers/${_id}`;
	return (
		<SpaceBetween direction="horizontal" size="s">
			<Link href={href} fontSize="inherit" onFollow={followWithNextLink}>
				{first_name} {last_name}
			</Link>
			{avg_score === OVERQUALIFIED_SCORE && (
				<Badge color="red">OVERQUALIFIED</Badge>
			)}
		</SpaceBetween>
	);
};

const DecisionStatus = ({ decision }: HackerApplicantSummary) =>
	decision ? <ApplicantStatus status={decision} /> : "-";

const ResumeReviewedStatus = ({ resume_reviewed }: HackerApplicantSummary) => (
	<ApplicantStatus
		status={resume_reviewed ? Status.Reviewed : Status.Pending}
	/>
);

export default HackerApplicantsList;
