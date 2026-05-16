import React from "react";
import { Status } from "@/lib/userRecord";
import { WaiverComponent } from "./WaiverComponent";
// import { RSVPComponent } from "./RSVPComponent";

interface VerticalTimelineProps {
	status: Status;
}

function VerticalTimeline({ status }: VerticalTimelineProps) {
	return (
		<div className="space-y-3 md:space-y-4">
			<WaiverComponent status={status} />
			{/* <RSVPComponent status={status} /> */}
		</div>
	);
}

export default VerticalTimeline;
