import { toZonedTime } from "date-fns-tz";

export default function convertToPST(date: Date) {
	return toZonedTime(date, "America/Los_Angeles");
}
