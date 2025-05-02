import { z } from "zod";
import { client } from "../../../sanity/client";
import { SanityImageReference } from "../../../sanity/types";

export const Organizer = z.object({
	_type: z.literal("organizer"),
	_key: z.string(),
	name: z.string(),
	role: z.string(),
	image: SanityImageReference.optional(),
	link: z.string().url().optional(),
});

const Organizers = z.array(
	z.object({
		department: z.string(),
		organizers: z.array(Organizer),
	})
);

export const getOrganizers = async () => {
	const result = await client.fetch(
		"*[_type == 'organizers']{department, organizers}"
	);

	if (!result) {
		console.error(
			"No organizers document found. Please create one in Sanity Studio."
		);
		return [];
	}

	try {
		const res = Organizers.parse(result);
		console.log(res);
		return res;
	} catch (error) {
		console.error("Error parsing organizers:", error);
		return [];
	}
};
