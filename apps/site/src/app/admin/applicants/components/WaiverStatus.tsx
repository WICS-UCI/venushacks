import StatusIndicator from "@cloudscape-design/components/status-indicator";
import { Participant } from "@/lib/admin/useParticipants";

function WaiverStatus({ waiver_signed }: Participant) {
	return (
		<span
			style={{
				display: "inline-flex",
				overflow: "visible",
				padding: "4px",
			}}
		>
			<StatusIndicator type={waiver_signed ? "success" : "error"}>
				{waiver_signed ? "Signed" : "Not signed"}
			</StatusIndicator>
		</span>
	);
}

export default WaiverStatus;
