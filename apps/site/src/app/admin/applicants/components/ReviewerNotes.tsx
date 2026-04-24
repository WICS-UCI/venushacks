"use client";

import {
	Container,
	Header,
	Textarea,
	SpaceBetween,
	TextContent,
	Box,
} from "@cloudscape-design/components";
import { Review } from "@/lib/admin/useApplicant";

interface ReviewerNotesProps {
	notes: string;
	onNotesChange: (notes: string) => void;
	reviews?: Review[];
}

interface ReviewWithOriginalIdx {
	review: Review;
	originalIdx: number;
}

export default function ReviewerNotes({
	notes,
	onNotesChange,
	reviews,
}: ReviewerNotesProps) {
	const reviewsWithNotes: ReviewWithOriginalIdx[] = (reviews ?? [])
		.map((review, originalIdx) => ({ review, originalIdx }))
		.filter(({ review }) => review[3] !== null);

	return (
		<Container header={<Header variant="h2">Reviewer Notes</Header>}>
			<SpaceBetween direction="vertical" size="s">
				{reviewsWithNotes.map(({ review, originalIdx }) => {
					const reviewer = review[1];
					const note = review[3];
					return (
						<li
							key={originalIdx}
							style={{ marginBottom: "0.5rem" }}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<Box fontWeight="bold">{reviewer}</Box>
							</div>
							<Box>
								{note?.split("\n").map((line, i, arr) => (
									<span key={i}>
										{line}
										{i !== arr.length - 1 && <br />}
									</span>
								))}
							</Box>
						</li>
					);
				})}
				<Textarea
					placeholder="Leave any comments for other leads to read in case there's anything of note!"
					value={notes}
					onChange={({ detail }) => {
						if (detail.value.length < 2048) onNotesChange(detail.value);
					}}
					rows={5}
				/>
			</SpaceBetween>
		</Container>
	);
}