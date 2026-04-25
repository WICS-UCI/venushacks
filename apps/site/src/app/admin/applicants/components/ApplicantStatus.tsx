import StatusIndicator, {
	StatusIndicatorProps,
} from "@cloudscape-design/components/status-indicator";

import { Status } from "@/lib/userRecord";

export const StatusLabels = {
	[Status.Accepted]: "Accepted",
	[Status.Rejected]: "Rejected",
	[Status.Waitlisted]: "Waitlisted",
	[Status.Pending]: "Needs review",
	[Status.Reviewed]: "Reviewed",
	[Status.Signed]: "Waiver signed",
	[Status.Confirmed]: "Confirmed",
	[Status.Attending]: "Attending",
	[Status.Void]: "Void",
};

const StatusTypes: Record<Status, StatusIndicatorProps.Type> = {
	[Status.Accepted]: "success",
	[Status.Rejected]: "error",
	[Status.Waitlisted]: "pending",
	[Status.Pending]: "pending",
	[Status.Reviewed]: "in-progress",
	[Status.Signed]: "in-progress",
	[Status.Confirmed]: "info",
	[Status.Attending]: "success",
	[Status.Void]: "stopped",
};

interface ApplicantStatusProps {
	status: Status;
}

function ApplicantStatus({ status }: ApplicantStatusProps) {
	return (
		<span
			style={{
				display: "inline-flex",
				overflow: "visible",
				padding: "4px",
			}}
		>
			<StatusIndicator
				type={StatusTypes[status]}
				colorOverride={status === Status.Signed ? "blue" : undefined}
			>
				{StatusLabels[status]}
			</StatusIndicator>
		</span>
	);
}
export default ApplicantStatus;
