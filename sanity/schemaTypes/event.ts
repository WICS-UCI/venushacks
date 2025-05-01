import { CalendarClock } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarClock,
  fields: [
    defineField({
      name: "name",
      title: "Event Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "startTime",
      title: "Start Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endTime",
      title: "End Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
