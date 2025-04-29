import groq from "groq";
import { z } from "zod";
import { client } from "../../../sanity/client";
import { SanityDocument } from "../../../sanity/types";

const Workshops = z.array(
	SanityDocument.extend({
		_id: z.string(),
		_createdAt: z.string(),
		_updatedAt: z.string(),
		_rev: z.string(),
		workshops: z.array(
			z.object({
				_key: z.string(),
				title: z.string(),
				host: z.string(),
				description: z.string().nullable().optional(),
			})
		),
	})
);

export const getWorkshops = async () => {
	return Workshops.parse(
		await client.fetch(groq`*[_type == 'workshops']{
        _id,
        _createdAt,
        _updatedAt,
        _rev,
        workshops[]{
          _key,
          title,
          host,
          description
        }
      }`)
	);
};
