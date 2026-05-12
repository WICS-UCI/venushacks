"use client";

import { useState } from "react";
import { TimelineComponent } from "./TimelineComponent";
import { Status } from "@/lib/userRecord";
import { StatusImageProps } from "./StatusImage";
import RsvpModal from "../RsvpModal";

export const RSVPComponent = ({ status }: { status: Status }) => {
	const [modalOpen, setModalOpen] = useState(false);

	function handleClose() {
		setModalOpen(false);
	}

	let verdict: { text: string; finished: boolean; statusIcon: string } | null =
		null;

	if (status === Status.Accepted || status === Status.Signed) {
		verdict = {
			text: "Confirm Attendance",
			finished: false,
			statusIcon: "Pending",
		};
	} else if (status === Status.Confirmed || status === Status.Attending) {
		verdict = {
			text: "Attendance Confirmed",
			finished: true,
			statusIcon: "Accepted",
		};
	} else if (status === Status.Void) {
		verdict = {
			text: "No RSVP Indicated",
			finished: false,
			statusIcon: "Pending",
		};
	}

	if (!verdict) return null;

	const isUnrsvp = status === Status.Attending;
	const isClickable = status === Status.Signed || isUnrsvp;

	return (
		<>
			<button
				type="button"
				onClick={isClickable ? () => setModalOpen(true) : undefined}
				disabled={!isClickable}
				className="w-full text-left disabled:cursor-default"
				aria-label={isClickable ? "Open RSVP form" : undefined}
			>
				<TimelineComponent
					text={verdict.text}
					finished={verdict.finished}
					statusIcon={verdict.statusIcon as StatusImageProps["statusIcon"]}
				/>
			</button>

			{modalOpen && (
				<RsvpModal
					isUnrsvp={isUnrsvp}
					showWarning={status === Status.Attending}
					onClose={handleClose}
				/>
			)}
		</>
	);
};
