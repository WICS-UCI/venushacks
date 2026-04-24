import { defineType, defineField } from "sanity";
import { Newspaper } from "lucide-react";

export default defineType({
	name: "vhHackerScoringGuidelines",
	title: "VenusHacks 2026 Hacker Scoring Guidelines",
	icon: Newspaper,
	type: "document",
	fields: [
		defineField({
			name: "frq_guideline",
			title: "FRQ Guideline",
			type: "array" as const,
			of: [{ type: "block" as const }],
		}),
		defineField({
			name: "prev_experience",
			title: "Previous Experience",
			type: "array" as const,
			of: [{ type: "block" as const }],
		}),
		defineField({
			name: "frq_diversity",
			title: "FRQ Diversity",
			type: "array" as const,
			of: [{ type: "block" as const }],
		}),
		defineField({
			name: "frq_picnic",
			title: "FRQ Picnic",
			type: "array" as const,
			of: [{ type: "block" as const }],
		}),
		defineField({
			name: "frq_project",
			title: "FRQ Project",
			type: "array" as const,
			of: [{ type: "block" as const }],
		}),
	],
});