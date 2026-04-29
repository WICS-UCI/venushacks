import {
	Container,
	Header,
	ColumnLayout,
	Box,
	SpaceBetween,
} from "@cloudscape-design/components";

import { HackerReviewBreakdown } from "@/lib/admin/useApplicant";

interface ReviewBreakdownPanelProps {
	review_breakdown: Record<string, HackerReviewBreakdown>;
	notes?: string | null;
}

const SECTION_LABELS: Record<string, string> = {
	frq_project: "Written Response 1",
	frq_diversity: "Written Response 2",
	frq_picnic: "Written Response 3",
};

const CRITERION_LABELS: Record<string, string> = {
	content_relevance: "Content Relevance",
	experience: "Experience",
	effort: "Effort",
	diversity_inclusion: "Diversity & Inclusion",
	picnic_must_haves: "Picnic Must-Haves",
};

const MAX_POINTS: Record<string, Record<string, number>> = {
	frq_project: { content_relevance: 3, experience: 3, effort: 4 },
	frq_diversity: { diversity_inclusion: 8, experience: 3, effort: 4 },
	frq_picnic: { picnic_must_haves: 3 },
};

const HR = () => (
	<hr
		style={{
			border: "none",
			borderTop: "1px solid var(--color-border-divider-default)",
			margin: 0,
		}}
	/>
);

function ScoreRow({
	label,
	score,
	maxPoints,
	indent = false,
}: {
	label: string;
	score: number;
	maxPoints: number;
	indent?: boolean;
}) {
	return (
		<ColumnLayout columns={2} variant="text-grid">
			<Box
				color={indent ? "text-body-secondary" : undefined}
				fontSize={indent ? "body-s" : undefined}
				fontWeight={indent ? undefined : "bold"}
				padding={indent ? { left: "l" } : undefined}
			>
				{label}
			</Box>
			<Box
				color={indent ? "text-body-secondary" : undefined}
				fontSize={indent ? "body-s" : undefined}
				fontWeight={indent ? undefined : "bold"}
			>
				{score} / {maxPoints}
			</Box>
		</ColumnLayout>
	);
}

export default function ReviewBreakdownPanel({
	review_breakdown,
	notes,
}: ReviewBreakdownPanelProps) {
	const entries = Object.entries(review_breakdown);

	if (entries.length === 0) {
		return null;
	}

	const [reviewer, breakdown] = entries[0];
	const frqSections = ["frq_project", "frq_diversity", "frq_picnic"] as const;

	return (
		<Container header={<Header variant="h2">Review Breakdown</Header>}>
			<SpaceBetween direction="vertical" size="xs">
				<ColumnLayout columns={2} variant="text-grid">
					<Box fontWeight="bold" color="text-body-secondary" fontSize="body-s">
						Section / Criterion
					</Box>
					<Box fontWeight="bold" color="text-body-secondary" fontSize="body-s">
						Score — reviewed by {reviewer}
					</Box>
				</ColumnLayout>

				<HR />

				<ScoreRow label="Resume" score={breakdown.experience} maxPoints={2} />

				{frqSections.map((section) => {
					const sectionScores = breakdown[section] as unknown as Record<
						string,
						number
					>;
					const sectionMax = MAX_POINTS[section];
					const sectionTotal = Object.values(sectionScores).reduce(
						(sum, v) => sum + v,
						0,
					);
					const sectionMaxTotal = Object.values(sectionMax).reduce(
						(sum, v) => sum + v,
						0,
					);

					return (
						<SpaceBetween key={section} direction="vertical" size="xs">
							<HR />
							<ScoreRow
								label={SECTION_LABELS[section]}
								score={sectionTotal}
								maxPoints={sectionMaxTotal}
							/>
							{Object.entries(sectionScores).map(([criterion, score]) => (
								<ScoreRow
									key={criterion}
									label={CRITERION_LABELS[criterion] ?? criterion}
									score={score}
									maxPoints={sectionMax[criterion]}
									indent
								/>
							))}
						</SpaceBetween>
					);
				})}
				{notes && (
					<>
						<HR />
						<SpaceBetween direction="vertical" size="xxs">
							<Box fontWeight="bold">Reviewer Notes</Box>
							<Box color="text-body-secondary">{notes}</Box>
						</SpaceBetween>
						<HR />
					</>
				)}
			</SpaceBetween>
		</Container>
	);
}
