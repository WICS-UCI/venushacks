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

type OrganizerType = z.infer<typeof Organizer>;

type ReducedOrganizers = {
	[department: string]: OrganizerType[];
};

export const getOrganizers = async (): Promise<ReducedOrganizers | []> => {
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
		const parsed = Organizers.parse(result);
		const reduced: ReducedOrganizers = parsed.reduce((acc, curr) => {
			const { department, organizers } = curr;
			if (!acc[department]) {
				acc[department] = [];
			}
			acc[department].push(...organizers);
			return acc;
		}, {} as ReducedOrganizers);
		return reduced;
	} catch (error) {
		console.error("Error parsing organizers:", error);
		return [];
	}
};
