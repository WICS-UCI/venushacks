import { z } from "zod";
import groq from "groq";
import { client } from "../../../sanity/client";
import { SanityDocument, SanityReference } from "../../../sanity/types";

const Resources = z.object({
    order: z.array(
        z.object({
            _id: z.string(),
            iconUrl: z.string(),
            title: z.string(),
            description: z.string(),
            resources: z.array(
                SanityDocument.extend({
                    _type: z.literal("resource"),
                    _id: z.string(),
                    _createdAt: z.string().datetime(),
                    _updatedAt: z.string().datetime(),
                    _rev: z.string(),
                    link: z.string(),
                    title: z.string(),
                    description: z.string(),
                    resourceIconUrl: z.string(),
                    resourceType: SanityReference,
                }).passthrough()
            ),
        })
    ),
});

export const getResources = async () => {
    return Resources.parse(
        await client.fetch(groq`
        *[_type == 'resourceCategoryOrder'][0] {
            order[]->{
                _id,
                'iconUrl': icon.asset->url,
                title,
                description,
                'resources': *[_type == 'resource' && resourceType._ref == ^._id] | order(title asc) {
                    _id,
                    _createdAt,
                    _updatedAt,
                    _rev,
                    '_type': _type,
                    link,
                    title,
                    'description': description[0]['children'][0]['text'],
                    'resourceIconUrl': coalesce(icon.asset->url, ""),
                    resourceType,
                }
            }
        }
    `)
    );
};
