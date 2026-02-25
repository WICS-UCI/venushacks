import React from "react";
import { StatusImage } from "./StatusImage";

interface TimelineComponentProps {
	text: string;
	finished: boolean;
	statusIcon: "Accepted" | "Rejected" | "Pending";
	size?: "compact" | "default";
    className?: string;
}

export const TimelineComponent: React.FC<TimelineComponentProps> = ({
	text,
	finished,
	statusIcon,
}) => {
	const baseStyles =
		"flex items-center justify-between mb-4 md:mb-8 border-[2px] md:border-[5px] border-[var(--color-white)]";
	const colorStyles = finished
		? "text-[var(--color-white)] bg-[var(--color-black)]"
		: "text-[var(--color-black)] bg-[var(--color-white)]";

	return (
		<div className={`${baseStyles} ${colorStyles}`}>
			<h2 className="text-xs sm:text-base md:text-4xl mx-4 sm:mx-8 md:mx-16 my-5 md:my-[70px]">
				{text}
			</h2>
			<StatusImage statusIcon={statusIcon} finished={finished} />
		</div>
	);
};
