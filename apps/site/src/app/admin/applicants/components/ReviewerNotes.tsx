"use client";

import {
	Container,
	Header,
	Textarea,
	SpaceBetween,
} from "@cloudscape-design/components";
import { Review } from "@/lib/admin/useApplicant";

interface ReviewerNotesProps {
	notes: string;
	onNotesChange: (notes: string) => void;
	reviews?: Review[];
}

export default function ReviewerNotes({
	notes,
	onNotesChange,
}: ReviewerNotesProps) {
	return (
		<Container header={<Header variant="h2">Reviewer Notes</Header>}>
			<SpaceBetween direction="vertical" size="s">
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
