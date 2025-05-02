import { defineType, defineField, defineArrayMember } from "sanity";
import { PersonStanding } from "lucide-react";

export default defineType({
  name: "partners",
  title: "Partners",
  type: "document",
  icon: PersonStanding,
  fields: [
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "partner",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "show",
              title: "Show",
              type: "text",
            }),
            defineField({
              name: "desc",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
