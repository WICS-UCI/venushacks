import {
	Box,
	Button,
	ColumnLayout,
	Container,
	SpaceBetween,
	ButtonProps,
} from "@cloudscape-design/components";

interface SectionScore {
	label: string;
	score: number;
	maxPoints: number;
}

interface ScoreSummaryProps {
	sections: SectionScore[];
	onSubmit: ButtonProps['onClick'];
	disabled?: boolean;
}

const HR = () => (
	<hr style={{
		border: "none",
		borderTop: "1px solid var(--color-border-divider-default)",
		margin: 0,
	}} />
);

const BoldHR = () => (
	<hr style={{
		border: "none",
		borderTop: "2px solid var(--color-border-divider-default)",
		margin: 0,
	}} />
);

export default function ScoreSummary({ sections, onSubmit, disabled }: ScoreSummaryProps) {
	const total = sections.reduce((sum, s) => sum + s.score, 0);
	const totalMax = sections.reduce((sum, s) => sum + s.maxPoints, 0);

	return (
		<Container>
			<SpaceBetween direction="vertical" size="xs">

				{/* Header */}
				<ColumnLayout columns={2} variant="text-grid">
					<Box fontWeight="bold" color="text-body-secondary" fontSize="body-s">Section</Box>
					<Box fontWeight="bold" color="text-body-secondary" fontSize="body-s">Score</Box>
				</ColumnLayout>

				<HR />

				{/* Section rows */}
				{sections.map((s, i) => (
					<SpaceBetween key={s.label} direction="vertical" size="xs">
						<ColumnLayout columns={2} variant="text-grid">
							<Box>{s.label}</Box>
							<Box color="text-body-secondary">{s.score} / {s.maxPoints}</Box>
						</ColumnLayout>
						{i < sections.length - 1 && <HR />}
					</SpaceBetween>
				))}

				<BoldHR />

				{/* Total + Submit */}
				<ColumnLayout columns={2} variant="text-grid">
					<SpaceBetween direction="horizontal" size="xxl" alignItems="center">
						<Box fontWeight="bold" fontSize="heading-s">Total</Box>
					</SpaceBetween>
					<Box fontWeight="bold" fontSize="heading-s">{total} / {totalMax}</Box>
				</ColumnLayout>

				<SpaceBetween direction="horizontal" size="xs" alignItems="center">
					<Button variant="primary" onClick={onSubmit} disabled={disabled}>Submit</Button>
					{disabled && (
						<Box fontSize="body-s">
							Fill out all fields before submitting.
						</Box>
					)}
				</SpaceBetween>
			</SpaceBetween>
		</Container>
	);
}