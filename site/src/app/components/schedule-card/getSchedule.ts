import { formatInTimeZone } from "date-fns-tz";
import groq from "groq";
import { z } from "zod";
import { client } from "../../../sanity/client";
import { SanityDocument } from "../../../sanity/types";

const Events = z.array(
	SanityDocument.extend({
		_type: z.literal("event"),
		name: z.string(),
		description: z.string().optional(),
		startTime: z
			.string()
			.datetime()
			.transform((time) => new Date(time)),
		endTime: z
			.string()
			.datetime()
			.transform((time) => new Date(time)),
	})
);

export const getSchedule = async () => {
	const events = Events.parse(
		await client.fetch(
			groq`*[_type == 'event'] | order(startTime asc, endTime asc)`
		)
	);

	const eventsByDay = {
		friday: [],
		saturday: [],
		sunday: [],
	};

	events.forEach((event) => {
		const dateKey = formatInTimeZone(
			new Date(event.startTime),
			"America/Los_Angeles",
			"MM/dd/yyyy"
		);

		// Match against specific known day strings
		if (dateKey === "05/23/2025") {
			eventsByDay.friday.push(event);
		} else if (dateKey === "05/24/2025") {
			eventsByDay.saturday.push(event);
		} else if (dateKey === "05/25/2025") {
			eventsByDay.sunday.push(event);
		}
	});

	return eventsByDay;
};
