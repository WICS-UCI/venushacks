import { z } from "zod";
import { cache } from "react";
import { client } from "@/lib/sanity/client";
import { SanityDocument, SanityReference } from "@/lib/sanity/types";
import { groq } from "next-sanity";

const Resources = z
	.object({
		order: z
			.array(
				z.object({
					_id: z.string(),
					iconUrl: z.string().nullable(),
					title: z.string(),
					description: z.string().nullable(),
					resources: z.array(
						SanityDocument.extend({
							_type: z.literal("resource"),
							_id: z.string(),
							_createdAt: z.string().datetime(),
							_updatedAt: z.string().datetime(),
							_rev: z.string(),
							link: z.string(),
							title: z.string(),
							resourceIconUrl: z.string(),
							resourceType: SanityReference.nullable(),
						}).passthrough(),
					),
				}),
			)
			.default([]),
	})
	.nullable();

export const getResources = cache(async () => {
	const data = await client.fetch(groq`
		*[_type == 'resourceCategoryOrder' && _id == "resourceCategoryOrder"][0] {
			order[]->{
				_id,
				'iconUrl': icon.asset->url,
				title,
				description,
				'resources': coalesce(*[_type == 'resource' && resourceType._ref == ^._id] | order(title asc) {
					_id,
					_createdAt,
					_updatedAt,
					_rev,
					'_type': _type,
					link,
					title,
					'resourceIconUrl': coalesce(icon.asset->url, ""),
					resourceType
				}, [])
			}
		}
	`);

	if (!data) {
		return { order: [] };
	}

	return Resources.parse(data) ?? { order: [] };
});
