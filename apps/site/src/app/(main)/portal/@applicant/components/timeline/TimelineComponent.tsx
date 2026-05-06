import React from "react";

interface TimelineComponentProps {
	text: string;
	finished: boolean;
	statusIcon: "Accepted" | "Rejected" | "Pending";
	href?: string;
	size?: "compact" | "default";
	className?: string;
}

export const TimelineComponent: React.FC<TimelineComponentProps> = ({
	text,
	finished,
	size = "default",
	className = "",
}) => {
	const padding = size === "compact" ? "px-4 py-3" : "px-5 py-5 sm:px-7";
	const textSize =
		size === "compact" ? "text-sm sm:text-base" : "text-base sm:text-lg";

	return (
		<div
			className={[
				"flex items-center justify-between",
				"rounded-[20px] border-[3px] border-[#EFEFEF] bg-white",
				padding,
				className,
			].join(" ")}
		>
			<div className="min-w-0 flex items-center gap-2">
				<span
					className={`truncate font-normal text-neutral-900 leading-none ${textSize}`}
				>
					{text}
				</span>
			</div>

			<div className="ml-4 flex items-center shrink-0">
				<span
					className={[
						"shrink-0 rounded-full px-6 py-3 text-md font-semibold",
						finished
							? "bg-green-400 text-neutral-900"
							: "bg-red-300 text-neutral-900",
					].join(" ")}
				>
					{finished ? "Complete" : "Incomplete"}
				</span>
			</div>
		</div>
	);
};
