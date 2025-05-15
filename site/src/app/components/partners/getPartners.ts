import groq from "groq";
import { z } from "zod";
import { client } from "../../../sanity/client";
import { SanityImageReference } from "../../../sanity/types";

const Partners = z.object({
	partners: z.array(
		z.object({
			desc: z.string(),
			icon: SanityImageReference,
			_key: z.string(),
			_type: z.literal("partner"),
		})
	),
});

export const getPartners = async () => {
	const parsed = Partners.parse(
		await client.fetch(groq`*[_type == 'partners'][0]{partners}`)
	);
	return parsed.partners;
};
