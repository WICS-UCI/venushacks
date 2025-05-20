import groq from "groq";
import { z } from "zod";
import { client } from "../../../sanity/client";
import { SanityImageReference } from "../../../sanity/types";

const Sponsors = z.object({
	sponsors: z.array(
		z.object({
			icon: SanityImageReference,
			url: z.string(),
			_key: z.string(),
			_type: z.literal("sponsor"),
		})
	),
});

export const getSponsors = async () => {
	const parsed = Sponsors.parse(
		await client.fetch(groq`*[_type == 'sponsors'][0]{sponsors}`)
	);

	return parsed.sponsors;
};
