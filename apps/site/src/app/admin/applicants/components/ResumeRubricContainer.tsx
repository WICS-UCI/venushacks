import React, { useState, useEffect, useMemo } from "react";
import {
	SpaceBetween,
	Container,
	Header,
	Grid,
	Box,
	Checkbox,
} from "@cloudscape-design/components";

import { RubricRow } from "./WRRubricContainer";

export interface ResumeRubricContainerProps {
	title: string;
	inexperiencedRubric: RubricRow[];
	experiencedRubric: RubricRow[];
	namePrefix: string;
	resumeUrl: string;
	isExperienced: boolean;
	onScoreChange: (score: number) => void;
	onFilledChange?: (filled: boolean) => void;
	onIsExperiencedChange?: (isExperienced: boolean) => void;
}

export default function ResumeRubricContainer({
	title,
	inexperiencedRubric = [],
	experiencedRubric = [],
	namePrefix,
	resumeUrl,
	isExperienced,
	onScoreChange,
	onFilledChange,
	onIsExperiencedChange,
}: ResumeRubricContainerProps) {
	const activeRubric = useMemo(
		() => (isExperienced ? experiencedRubric : inexperiencedRubric),
		[isExperienced, experiencedRubric, inexperiencedRubric],
	);

	const [criterionScores, setCriterionScores] = useState<
		Record<string, number>
	>(Object.fromEntries(activeRubric.map((r) => [r.criterion, 0])));

	const [filledCriteria, setFilledCriteria] = useState<Record<string, boolean>>(
		Object.fromEntries(activeRubric.map((r) => [r.criterion, false])),
	);

	useEffect(() => {
		setCriterionScores(
			Object.fromEntries(activeRubric.map((r) => [r.criterion, 0])),
		);
		setFilledCriteria(
			Object.fromEntries(activeRubric.map((r) => [r.criterion, false])),
		);
	}, [activeRubric]);

	const handleValueChange = (
		criterion: string,
		value: number,
		filled: boolean,
	) => {
		setCriterionScores((prev) => ({ ...prev, [criterion]: value }));
		setFilledCriteria((prev) => ({ ...prev, [criterion]: filled }));
	};

	useEffect(() => {
		onScoreChange(
			Object.values(criterionScores).reduce((sum, v) => sum + v, 0),
		);
	}, [criterionScores, onScoreChange]);

	useEffect(() => {
		onFilledChange?.(Object.values(filledCriteria).every(Boolean));
	}, [filledCriteria, onFilledChange]);

	return (
		<Container header={<Header variant="h2">{title}</Header>}>
			<SpaceBetween direction="vertical" size="m">
				<Box>
					<iframe
						src={`${resumeUrl}/preview`}
						title="Resume"
						style={{ width: "100%", height: "80vh", border: 0 }}
					/>
				</Box>

				<Checkbox
					checked={isExperienced}
					onChange={({ detail }) => onIsExperiencedChange?.(detail.checked)}
				>
					Check this box if the applicant is experienced.
				</Checkbox>

				<SpaceBetween direction="vertical" size="s">
					<Grid
						gridDefinition={[{ colspan: 3 }, { colspan: 7 }, { colspan: 2 }]}
					>
						<Box fontWeight="bold" color="text-body-secondary">
							Criterion
						</Box>
						<Box fontWeight="bold" color="text-body-secondary">
							Descriptors
						</Box>
						<Box fontWeight="bold" color="text-body-secondary">
							Score
						</Box>
					</Grid>

					<hr
						style={{
							border: "none",
							borderTop: "1px solid var(--color-border-divider-default)",
							margin: 0,
						}}
					/>

					{activeRubric.map((row, i) => (
						<React.Fragment key={row.criterion}>
							<RubricRow
								row={row}
								namePrefix={namePrefix}
								onValueChange={handleValueChange}
							/>
							{i < activeRubric.length - 1 && (
								<hr
									style={{
										border: "none",
										borderTop: "1px solid var(--color-border-divider-default)",
										margin: 0,
									}}
								/>
							)}
						</React.Fragment>
					))}
				</SpaceBetween>
			</SpaceBetween>
		</Container>
	);
}
