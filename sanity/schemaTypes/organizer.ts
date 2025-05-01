import { defineType, defineField, defineArrayMember } from "sanity";
import { Users } from "lucide-react";

export default defineType({
  name: "organizers",
  title: "Organizers",
  icon: Users,
  type: "document",
  fields: [
    defineField({
      name: "organizers",
      title: "Organizers",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "organizer",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "department",
              title: "Department",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: "Board", value: "Board" },
                  { title: "Corporate", value: "Corporate" },
                  { title: "Logistics", value: "Logistics" },
                  { title: "Marketing", value: "Marketing" },
                ],
              },
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: "Chair", value: "Chair" },
                  { title: "Committee Lead", value: "Committee Lead" },
                  { title: "Organizer", value: "Organizer" },
                  { title: "Advisor", value: "Advisor" },
                ],
              },
            }),
            defineField({
              name: "image",
              title: "Profile Image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "link",
              title: "Social Link",
              type: "url",
              description: "LinkedIn or other social media profile link",
            }),
          ],
        }),
      ],
    }),
  ],
});
