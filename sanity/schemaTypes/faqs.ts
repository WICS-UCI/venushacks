import { defineType, defineField, defineArrayMember } from "sanity";
import { toPlainText } from "@portabletext/react";
import { FileQuestion } from "lucide-react";

export default defineType({
	name: "faqs",
	title: "FAQs",
	type: "document",
	icon: FileQuestion,
	fields: [
		defineField({
			name: "faqs",
			title: "FAQs",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					name: "faq",
					fields: [
						defineField({
							name: "question",
							title: "Question",
							type: "text",
						}),
						defineField({
							name: "answer",
							title: "Answer",
							type: "array",
							of: [
								defineArrayMember({
									type: "block",
									styles: [
										{ title: "Normal", value: "normal" },
									],
									lists: [],
								}),
							],
						}),
					],

					preview: {
						select: {
							title: "question",
							subtitle: "answer",
						},
						prepare({ title, subtitle }) {
							return {
								title,
								subtitle: subtitle
									? toPlainText(subtitle)
									: undefined,
								media: FileQuestion,
							};
						},
					},
				}),
			],
		}),
	],
});