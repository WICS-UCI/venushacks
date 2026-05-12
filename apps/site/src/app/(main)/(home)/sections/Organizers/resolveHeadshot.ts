/**
 * Local photos: `public/headshots/{firstname}-{lastname}.jpg` (lowercase, hyphen).
 * Uses first + last word of the roster name (middle names/initials are skipped).
 */
const SLUG_ALIASES: Record<string, string> = {
	"aariel-abancia": "aariel-abaincia",
};

export function resolveHeadshotUrl(personName: string): string | undefined {
	const parts = personName
		.trim()
		.toLowerCase()
		.split(/\s+/)
		.map((w) => w.replace(/[^a-z]/g, ""))
		.filter(Boolean);
	if (parts.length < 2) return undefined;

	const slug = `${parts[0]}-${parts[parts.length - 1]}`;
	const resolved = SLUG_ALIASES[slug] ?? slug;
	return `/headshots/${resolved}.jpg`;
}
