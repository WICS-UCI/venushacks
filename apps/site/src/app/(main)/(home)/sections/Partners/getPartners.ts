import { z } from "zod";
import { cache } from "react";
import { client } from "@/lib/sanity/client";
import { SanityDocument, SanityImageReference } from "@/lib/sanity/types";

export const Partner = z.object({
	_type: z.literal("partner"),
	_key: z.string(),
	name: z.string(),
	description: z.string().optional(),
	url: z.string().url().optional(),
	logo: SanityImageReference,
});

export type PartnerItem = z.infer<typeof Partner>;

const Partners = SanityDocument.extend({
	partners: z.array(Partner),
});

export const getPartners = cache(async () => {
	const partners = Partners.parse(
		await client.fetch("*[_type == 'partners'][0]"),
	);
	return partners;
});
