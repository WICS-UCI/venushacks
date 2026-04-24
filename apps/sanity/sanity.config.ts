import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { schemaTypes } from "./schemas";
import { ListOrdered, Folders, Globe, Newspaper } from "lucide-react";

export default defineConfig({
	name: "default",
	title: "venushacks-site-2026",

	projectId: "u067uoln",
	dataset: "production",

	plugins: [
		deskTool({
			structure: (S) =>
				S.list()
					.title("Content")
					.items([
						...S.documentTypeListItems().filter(
							(listItem) =>
								![
									"resourceCategoryOrder",
									"resourceCategory",
									"resource",
									"vhHackerScoringGuidelines",
								].includes(listItem.getId()!),
						),
						S.divider(),
						S.listItem()
							.title("Resource Categories Order")
							.icon(ListOrdered)
							.child(
								S.document()
									.schemaType("resourceCategoryOrder")
									.documentId("resourceCategoryOrder")
									.title("Resource Categories Order"),
							),
						S.listItem()
							.title("Resource Categories")
							.icon(Folders)
							.child(
								S.documentTypeList("resourceCategory").title(
									"Resource Categories",
								),
							),
						S.listItem()
							.title("Resources")
							.icon(Globe)
							.child(S.documentTypeList("resource").title("Resources")),
						S.divider(),
						S.listItem()
							.title("VenusHacks 2026 Scoring Guidelines")
							.icon(Newspaper)
							.child(
								S.documentTypeList("vhHackerScoringGuidelines").title(
									"VenusHacks 2026 Scoring Guidelines",
								),
							),
					]),
		}),
		visionTool(),
		colorInput(),
	],

	schema: {
		types: schemaTypes,
	},
});
