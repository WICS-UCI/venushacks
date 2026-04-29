import {
	Box,
	Button,
	ColumnLayout,
	Container,
	SpaceBetween,
	ButtonProps,
	Header,
} from "@cloudscape-design/components";

interface CriterionScore {
	label: string;
	score: number;
	maxPoints: number;
}

interface SectionScore {
	label: string;
	score: number;
	maxPoints: number;
	breakdown?: CriterionScore[];
}

interface ScoreSummaryProps {
	sections: SectionScore[];
	onSubmit: ButtonProps["onClick"];
	disabled?: boolean;
	loading?: boolean;
}

const HR = () => (
	<hr
		style={{
			border: "none",
			borderTop: "1px solid var(--color-border-divider-default)",
			margin: 0,
		}}
	/>
);

const BoldHR = () => (
	<hr
		style={{
			border: "none",
			borderTop: "2px solid var(--color-border-divider-default)",
			margin: 0,
		}}
	/>
);

export default function ScoreSummary({
	sections,
	onSubmit,
	disabled,
	loading,
}: ScoreSummaryProps) {
	const total = sections.reduce((sum, s) => sum + s.score, 0);
	const totalMax = sections.reduce((sum, s) => sum + s.maxPoints, 0);

	return (
		<Container header={<Header variant="h2">Score Summary</Header>}>
			<SpaceBetween direction="vertical" size="xs">
				<ColumnLayout columns={2} variant="text-grid">
					<Box fontWeight="bold" color="text-body-secondary" fontSize="body-s">
						Section
					</Box>
					<Box fontWeight="bold" color="text-body-secondary" fontSize="body-s">
						Score
					</Box>
				</ColumnLayout>

				<HR />

				{sections.map((s, i) => (
					<SpaceBetween key={s.label} direction="vertical" size="xs">
						<ColumnLayout columns={2} variant="text-grid">
							<Box fontWeight="bold">{s.label}</Box>
							<Box fontWeight="bold">
								{s.score} / {s.maxPoints}
							</Box>
						</ColumnLayout>

						{s.breakdown?.map((c) => (
							<ColumnLayout key={c.label} columns={2} variant="text-grid">
								<Box
									color="text-body-secondary"
									fontSize="body-s"
									padding={{ left: "l" }}
								>
									{c.label}
								</Box>
								<Box color="text-body-secondary" fontSize="body-s">
									{c.score} / {c.maxPoints}
								</Box>
							</ColumnLayout>
						))}

						{i < sections.length - 1 && <HR />}
					</SpaceBetween>
				))}

				<BoldHR />

				<ColumnLayout columns={2} variant="text-grid">
					<Box fontWeight="bold" fontSize="heading-s">
						Total
					</Box>
					<Box fontWeight="bold" fontSize="heading-s">
						{total} / {totalMax}
					</Box>
				</ColumnLayout>

				<SpaceBetween direction="horizontal" size="xs" alignItems="center">
					<Button
						variant="primary"
						onClick={onSubmit}
						disabled={disabled}
						loading={loading}
					>
						Submit
					</Button>
					{disabled && (
						<Box fontSize="body-s">Fill out all fields before submitting.</Box>
					)}
				</SpaceBetween>
			</SpaceBetween>
		</Container>
	);
}
