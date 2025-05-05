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
				startTime: z.string(),
				endTime: z.string(),
				location: z.string(),
			})
		),
	})
);

export const getWorkshops = async () => {
	const workshops = Workshops.parse(
		await client.fetch(groq`*[_type == 'workshops']{
        _id,
        _createdAt,
        _updatedAt,
        _rev,
        workshops[]{
          _key,
          title,
          host,
          description,
		  startTime,
		  endTime,
		  location
        }
      }`)
	);

	const workshopsByDay = {
		friday: [],
		saturday: [],
		sunday: [],
	};

	workshops.forEach((workshop) => {
		workshop.workshops.forEach((event) => {
			const dateKey = new Date(event.startTime).toLocaleDateString("en-US", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			});

			if (dateKey === "05/23/2025") {
				workshopsByDay.friday.push(event);
			} else if (dateKey === "05/24/2025") {
				workshopsByDay.saturday.push(event);
			} else if (dateKey === "05/25/2025") {
				workshopsByDay.sunday.push(event);
			}
		});
	});

	console.log("workshopsByDay", workshopsByDay);
	return workshopsByDay;
};
