import { z } from "zod";
import { client } from "../../../sanity/client";
import { SanityDocument, SanityImageReference } from "../../../sanity/types";

export const Organizer = z.object({
	_type: z.literal("organizer"),
	_key: z.string(),
	name: z.string(),
	department: z.string(),
	role: z.string(),
	image: SanityImageReference.optional(),
	link: z.string().url().optional(),
});

const Organizers = SanityDocument.extend({
	organizers: z.array(Organizer),
});

export const getOrganizers = async () => {
	const result = await client.fetch("*[_type == 'organizers'][0]");

	if (!result) {
		console.error(
			"No organizers document found. Please create one in Sanity Studio."
		);
		return [];
	}

	try {
		const organizers = Organizers.parse(result);
		return organizers.organizers;
	} catch (error) {
		console.error("Error parsing organizers:", error);
		return [];
	}
};
