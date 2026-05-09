/**
 * Headshots live in `public/headshots/` as lowercase slugs:
 *   `{firstname}-{lastname}.jpg`
 * Uses the **first and last** word of the display name so middle initials/names
 *
 * For typos vs filenames, see SLUG_ALIASES.
 */

/** CMS / roster spelling mistakes → slug that matches the file on disk */
const SLUG_ALIASES: Record<string, string> = {
	"aariel-abancia": "aariel-abaincia",
};

function normalizeWhitespace(name: string): string {
	return name
		.normalize("NFD")
		.replace(/\p{M}/gu, "")
		.replace(/[^\S ]+/g, " ")
		.trim()
		.replace(/\s+/g, " ");
}

/** Build slug from display name (matches renamed files). */
export function headshotSlugFromPersonName(personName: string): string {
	const parts = normalizeWhitespace(personName)
		.toLowerCase()
		.split(" ")
		.map((part) => part.replace(/[^a-z]/g, ""))
		.filter((part) => part.length > 0);
	if (parts.length < 2) return "";
	const first = parts[0];
	const last = parts[parts.length - 1];
	return `${first}-${last}`;
}

/** Public URL under `/headshots/`, or undefined if we can't derive a slug (e.g. one word only). */
export function resolveHeadshotUrl(personName: string): string | undefined {
	const trimmed = normalizeWhitespace(personName);
	const words = trimmed.split(" ").filter(Boolean);
	if (words.length < 2) return undefined;

	let slug = headshotSlugFromPersonName(trimmed);
	if (!slug) return undefined;

	slug = SLUG_ALIASES[slug] ?? slug;

	return `/headshots/${slug}.jpg`;
}
