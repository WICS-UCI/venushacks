import { Dispatch, SetStateAction } from "react";

import ColumnLayout from "@cloudscape-design/components/column-layout";
import { IconProps } from "@cloudscape-design/components/icon";
import Multiselect, {
	MultiselectProps,
} from "@cloudscape-design/components/multiselect";

import {
	Decision,
	ReviewStatus,
	Status,
	PostAcceptedStatus,
} from "@/lib/userRecord";
import { ParticipantRole } from "@/lib/userRecord";

import { StatusLabels } from "./ApplicantStatus";

import useHackerApplicants from "@/lib/admin/useHackerApplicants";

export type Options = ReadonlyArray<MultiselectProps.Option>;

interface ApplicantFiltersProps {
	selectedStatuses: Options;
	setSelectedStatuses: Dispatch<SetStateAction<Options>>;
	selectedDecisions: Options;
	setSelectedDecisions: Dispatch<SetStateAction<Options>>;
	uciNetIDFilter?: Options;
	setUCINetIDFilter?: Dispatch<SetStateAction<Options>>;
	applicantType: ParticipantRole;
}

const StatusIcons: Record<Status, IconProps.Name> = {
	[ReviewStatus.Pending]: "status-pending",
	[ReviewStatus.Reviewed]: "status-in-progress",
	[Decision.Accepted]: "status-positive",
	[Decision.Rejected]: "status-pending",
	[Decision.Waitlisted]: "status-negative",
	[PostAcceptedStatus.Signed]: "status-in-progress",
	[PostAcceptedStatus.Confirmed]: "status-positive",
	[PostAcceptedStatus.Attending]: "status-positive",
	[PostAcceptedStatus.Void]: "status-negative",
};

const statusOption = (status: Status): MultiselectProps.Option => ({
	label: StatusLabels[status],
	value: status,
	iconName: StatusIcons[status],
});

const RESUME_REVIEW_OPTIONS: Options = [
	{
		label: "Resume Reviewed",
		value: "RESUME_REVIEWED",
		iconName: "status-positive",
	},
	{
		label: "Resume Not Reviewed",
		value: "RESUME_NOT_REVIEWED",
		iconName: "status-pending",
	},
];

const STATUS_OPTIONS = Object.values(ReviewStatus)
	.map(statusOption)
	// .concat(RESUME_REVIEW_OPTIONS);

const DECISION_OPTIONS = Object.values(Decision).map(statusOption);

function ApplicantFilters({
	selectedStatuses,
	setSelectedStatuses,
	selectedDecisions,
	setSelectedDecisions,
	uciNetIDFilter,
	setUCINetIDFilter,
	applicantType,
}: ApplicantFiltersProps) {
	const { applicantList, loading } = useHackerApplicants();

	let reviewerOptions: Options = [];
	if (!loading && applicantList.length > 0) {
		const reviewerIdsSet = new Set(
			applicantList.flatMap((applicant) => applicant.reviewers || []),
		);

		const reviewerIds = Array.from(reviewerIdsSet);

		reviewerOptions = reviewerIds.map((id) => ({
			label: id.split(".")[2],
			value: id,
		}));
	}

	return (
		<ColumnLayout columns={3}>
			<Multiselect
				selectedOptions={selectedStatuses}
				onChange={({ detail }) => setSelectedStatuses(detail.selectedOptions)}
				deselectAriaLabel={(e) => `Remove ${e.label}`}
				options={STATUS_OPTIONS}
				placeholder="Choose statuses"
				selectedAriaLabel="Selected"
			/>
			<Multiselect
				selectedOptions={selectedDecisions}
				onChange={({ detail }) => setSelectedDecisions(detail.selectedOptions)}
				deselectAriaLabel={(e) => `Remove ${e.label}`}
				options={DECISION_OPTIONS}
				placeholder="Choose reviews"
				selectedAriaLabel="Selected"
			/>
			{applicantType === ParticipantRole.Hacker && (
				<Multiselect
					selectedOptions={uciNetIDFilter ?? []}
					onChange={({ detail }) => setUCINetIDFilter?.(detail.selectedOptions)}
					deselectAriaLabel={(e) => `Remove ${e.label}`}
					options={reviewerOptions}
					placeholder="Search by Reviewer's UCINetID"
					selectedAriaLabel="Selected"
				/>
			)}
		</ColumnLayout>
	);
}

export default ApplicantFilters;
