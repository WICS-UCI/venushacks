import { z } from "zod";

export const SanityDocument = z.object({
	_id: z.string(),
	_createdAt: z.string().datetime(),
	_updatedAt: z.string().datetime(),
	_rev: z.string(),
});

export const SanityReference = z.object({
	_type: z.literal("reference"),
	_ref: z.string(),
});
export const SanityImageCrop = z.object({
	_type: z.literal("sanity.imageCrop"),
	top: z.number(),
	bottom: z.number(),
	left: z.number(),
	right: z.number(),
});
export const SanityImageHotspot = z.object({
	_type: z.literal("sanity.imageHotspot"),
	x: z.number(),
	y: z.number(),
	height: z.number(),
	width: z.number(),
});
export const SanityImageReference = z.object({
	_type: z.literal("image"),
	asset: SanityReference,
	crop: SanityImageCrop.optional(),
	hotspot: SanityImageHotspot.optional(),
});
