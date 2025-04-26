import groq from "groq";
import { z } from "zod";
import { client } from "../../../sanity/client";
import { SanityDocument, SanityImageReference } from "../../../sanity/types";

const Sponsors = SanityDocument.extend({
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
    let a = await client.fetch(groq`*[_type == 'sponsors'][0]`);
    console.log(a);
	return Sponsors.parse(a);
};
