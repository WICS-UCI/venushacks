import { createClient } from "@sanity/client";

const projectId = "5qebsusz";
const dataset = "production";
const apiVersion = "2023-12-13";

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
});
