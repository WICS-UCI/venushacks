import groq from "groq";
import { z } from "zod";
import { client } from "../../../sanity/client";
import { SanityDocument } from "../../../sanity/types";

// Define the structure for each FAQ item
const FAQSchema = z.object({
	_key: z.string().optional(),
	question: z.string(),
	_type: z.literal("faq"),
	answer: z.array(
		z.object({
			_key: z.string(),
			_type: z.literal("block"),
			style: z.literal("normal"),
			markDefs: z.array(
				z.object({
					_type: z.string(),
					href: z.optional(z.string()),
					_key: z.string(),
				})
			),
			children: z.array(
				z.object({
					_key: z.string(),
					_type: z.literal("span"),
					text: z.string(),
					marks: z.array(z.string()),
				})
			),
		})
	),
});

// Define the overall schema for the FAQs document
const FAQsSchema = SanityDocument.extend({
	faqs: z.array(FAQSchema),
});

// Fetch function using GROQ query
export const getQuestions = async () => {
	return FAQsSchema.parse(
		await client.fetch(groq`
      *[_type == "faqs"][0] {
        _id,
        _type,
        faqs[] {
          _key,
          question,
          _type,
          answer[] {
            _key,
            _type,
            style,
            markDefs,
            children[] {
              _key,
              _type,
              text,
              marks
            }
          }
        }
      }
    `)
	);
};
