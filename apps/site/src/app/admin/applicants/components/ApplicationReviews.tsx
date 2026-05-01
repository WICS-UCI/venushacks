import { useContext } from "react";
import Box from "@cloudscape-design/components/box";
import { SpaceBetween } from "@cloudscape-design/components";

import ApplicantStatus from "@/app/admin/applicants/components/ApplicantStatus";
import { Review } from "@/lib/admin/useApplicant";
import UserContext from "@/lib/admin/UserContext";
import { Status, Uid } from "@/lib/userRecord";
import { OVERQUALIFIED_SCORE, scoresToDecisions } from "@/lib/decisionScores";

interface ApplicationReviewsProps {
	reviews: Review[];
	isHacker: boolean;
}

function ApplicationReviews({ reviews, isHacker }: ApplicationReviewsProps) {
	const { uid } = useContext(UserContext);

	if (reviews.length === 0) {
		return <p>-</p>;
	}

	const formatUid = (uid: Uid) => uid.split(".").at(-1);
	const formatDate = (timestamp: string) =>
		new Date(timestamp).toLocaleDateString();

	return (
		<ul>
			{reviews.map(([date, reviewer, score], index) =>
				reviewer === uid ? (
					<li key={`${date}-${index}`}>
						{isHacker ? (
							<>
								You scored this applicant a{" "}
								{score === OVERQUALIFIED_SCORE
									? "OVERQUALIFIED"
									: Math.round(score * 100) / 100}{" "}
								on {formatDate(date)}
							</>
						) : (
							<>
								You reviewed as{" "}
								<ApplicantStatus status={scoresToDecisions[score] as Status} />{" "}
								on {formatDate(date)}
							</>
						)}
					</li>
				) : (
					<li key={`${date}-${index}`}>
						<SpaceBetween direction="horizontal" size="xxxs">
							<span>{formatUid(reviewer)}</span>
							{isHacker && score === OVERQUALIFIED_SCORE ? (
								<span>
									{" "}
									marked this applicant{" "}
									<Box color="text-status-error">OVERQUALIFIED</Box>
								</span>
							) : (
								<span> reviewed this application </span>
							)}
							<span>on {formatDate(date)}</span>
						</SpaceBetween>
					</li>
				),
			)}
		</ul>
	);
}

export default ApplicationReviews;
