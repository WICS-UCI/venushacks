import { defineType, defineField, defineArrayMember } from "sanity";
import { BadgeDollarSign } from "lucide-react";

export default defineType({
  name: "sponsors",
  title: "Sponsors",
  type: "document",
  icon: BadgeDollarSign,
  fields: [
    defineField({
      name: "sponsors",
      title: "Sponsors",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "sponsor",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
            }),
			defineField({
				name: "url",
				title: "URL",
				type: "text",
			  }),
          ],
        }),
      ],
    }),
  ],
});
