import { Uid } from "@/lib/userRecord";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import StatusIndicator from "@cloudscape-design/components/status-indicator";

interface IndicatorContainerProps {
	reviewer: string;
}

const IndicatorContainer = ({
	reviewer,
}: IndicatorContainerProps) => {
	return (
		<>
			<Box variant="awsui-key-label">
				Reviewer: {reviewer}
			</Box>
			{reviewer ? (
				<StatusIndicator>Reviewed</StatusIndicator>
			) : (
				<StatusIndicator type="pending">Not Reviewed</StatusIndicator>
			)}
		</>
	);
};

interface ApplicantReviewerIndicatorProps {
	reviewers: ReadonlyArray<string>;
}

function ApplicantReviewerIndicator({
	reviewers,
}: ApplicantReviewerIndicatorProps) {
	const formatUid = (uid: string | undefined) => uid?.split(".").at(-1) ?? "";

	return (
		<SpaceBetween size="l">
			<IndicatorContainer
				reviewer={formatUid(reviewers.at(-1))}
			/>
		</SpaceBetween>
	);
}

export default ApplicantReviewerIndicator;
