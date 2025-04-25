import { formatInTimeZone } from "date-fns-tz";
import { z } from "zod";
import { client } from "../../../sanity/client";
import { SanityDocument } from "../../../sanity/types";

const Events = z.array(
	SanityDocument.extend({
		_type: z.literal("event"),
		name: z.string(),
		startTime: z
			.string()
			.datetime()
			.transform((time) => new Date(time)),
		endTime: z
			.string()
			.datetime()
			.transform((time) => new Date(time)),
		description: z.string(),
	})
);

export const getSchedule = async () => {
	const events = Events.parse(
		await client.fetch(
			"*[_type == 'event'] | order(startTime asc, endTime asc)"
		)
	);
	const eventsByDay = new Map<string, z.infer<typeof Events>>();

	events.forEach((event) => {
		const key = formatInTimeZone(
			new Date(event.startTime),
			"America/Los_Angeles",
			"MM/dd/yyyy"
		);
		eventsByDay.set(key, [...(eventsByDay.get(key) ?? []), event]);
	});

	return Array.from(eventsByDay.values());
};
