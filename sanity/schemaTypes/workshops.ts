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
          ],
          preview: {
            select: {
              title: "title",
              description: "description",
              host: "host",
            },
            prepare({ title, description, host }) {
              return {
                title,
                subtitle: host,
                description: description
                  ? description.length > 100
                    ? `${description.slice(0, 100)}...`
                    : description
                  : "",
              };
            },
          },
        }),
      ],
    }),
  ],
});
