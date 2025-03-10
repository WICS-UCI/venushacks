import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "resourceCategoryOrder",
  title: "Resource Categories Order",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: { type: "resourceCategory" },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
