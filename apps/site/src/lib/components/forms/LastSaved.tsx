"use client";

interface LastSavedProps {
	lastSaved: Date | null;
}

// Track saved time with useState in a parent Component. 
export default function LastSaved({ lastSaved }: LastSavedProps) {
	const formatted = lastSaved
		? lastSaved.toLocaleDateString("en-US", {
			month: "2-digit",
			day: "2-digit",
			year: "numeric",
		}) +
		" at " +
		lastSaved.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		})
		: "mm/dd/yyyy at 00:00:00";

	return (
		<div className="mt-8 flex items-center justify-between">
			<span className="w-full font-figtree appearance-none text-[#8E8E8E] text-lg italic">
				Last saved {formatted}.
			</span>
		</div>
	);
}