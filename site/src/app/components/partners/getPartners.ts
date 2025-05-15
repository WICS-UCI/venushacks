import groq from "groq";
import { z } from "zod";
import { client } from "../../../sanity/client";
import { SanityDocument, SanityImageReference } from "../../../sanity/types";

const Partners = SanityDocument.extend({
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
	return Partners.parse(await client.fetch(groq`*[_type == 'partners'][0]`));
};
