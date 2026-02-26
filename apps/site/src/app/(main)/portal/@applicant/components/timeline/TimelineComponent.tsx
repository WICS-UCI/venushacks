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
  size = "default",
  className = "",
}) => {
  const padding = size === "compact" ? "px-4 py-3" : "px-5 py-4 sm:px-6";
  const textSize = size === "compact" ? "text-sm sm:text-base" : "text-base sm:text-lg";

  return (
    <div
      className={[
        "flex items-center justify-between",
        "rounded-2xl border border-neutral-200 bg-neutral-50",
        padding,
        className,
      ].join(" ")}
    >
      {/* Left: label */}
      <div className="min-w-0">
        <p className={`truncate font-semibold text-neutral-900 leading-tight ${textSize}`}>
          {text}
        </p>
      </div>

      {/* Right: status icon + pill */}
      <div className="ml-4 flex items-center gap-3 shrink-0">
        <span
          className={[
            "rounded-full px-4 py-2 text-sm font-semibold",
            finished ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900",
          ].join(" ")}
        >
          {finished ? "Complete" : "Incomplete"}
        </span>
      </div>
    </div>
  );
};