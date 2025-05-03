import { School } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "workshops",
  title: "Workshops",
  type: "document",
  icon: School,
  fields: [
    defineField({
      name: "workshops",
      title: "Workshops",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "workshop",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "host",
              title: "Host",
              type: "string",
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
            defineField({
              name: "location",
              title: "Location",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
              host: "host",
              startTime: "startTime",
              endTime: "endTime",
              location: "location",
            },
            prepare({ title, description, host, startTime, endTime, location }) {
              return {
                title,
                subtitle: host,
                description: description
                  ? description.length > 100
                    ? `${description.slice(0, 100)}...`
                    : description
                  : "",
                startTime,
                endTime,
                location
              };
            },
          },
        }),
      ],
    }),
  ],
});
