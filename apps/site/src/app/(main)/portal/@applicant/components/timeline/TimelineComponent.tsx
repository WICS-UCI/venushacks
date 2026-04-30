import React from "react";
import { ExternalLink } from "lucide-react";

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
	href,
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
			{/* Left: label + link icon */}
			<div className="min-w-0 flex items-center gap-2">
				<span
					className={`truncate font-normal text-neutral-900 leading-none ${textSize}`}
				>
					{text}
				</span>
				{href ? (
					<a href={href} target="_blank" rel="noopener noreferrer" className="shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors flex items-center">
						<ExternalLink size={25} strokeWidth={1.75} />
					</a>
				) : (
					<span className="shrink-0 text-neutral-400 flex items-center">
						<ExternalLink size={25} strokeWidth={1.75} />
					</span>
				)}
			</div>

			{/* Right: status pill */}
			<div className="ml-4 flex items-center shrink-0">
				<span
					className={[
						"rounded-full px-6 py-3 text-sm font-bold",
						finished
							? "bg-green-400 text-neutral-900"
							: "bg-red-400 text-neutral-900",
					].join(" ")}
				>
					{finished ? "Complete" : "Incomplete"}
				</span>
			</div>
		</div>
	);
};
