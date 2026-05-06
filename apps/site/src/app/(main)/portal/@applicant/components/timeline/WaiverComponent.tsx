"use client";

import { useState } from "react";
import { TimelineComponent } from "./TimelineComponent";
import { Status } from "@/lib/userRecord";
import { StatusImageProps } from "./StatusImage";
import WaiverModal from "../WaiverModal";

export const WaiverComponent = ({ status }: { status: Status }) => {
	const [modalOpen, setModalOpen] = useState(false);

	function handleClose() {
		setModalOpen(false);
	}

	let verdict: { text: string; finished: boolean; statusIcon: string } | null =
		null;

	if (status === Status.Accepted || status === Status.Waitlisted) {
		verdict = { text: "Sign Waiver", finished: false, statusIcon: "Pending" };
	} else if (
		status === Status.Signed ||
		status === Status.Attending ||
		status === Status.Confirmed
	) {
		verdict = { text: "Waiver Signed", finished: true, statusIcon: "Accepted" };
	}

	if (!verdict) return null;

	const isClickable = status === Status.Accepted || status === Status.Waitlisted;

	return (
		<>
			<button
				type="button"
				onClick={isClickable ? () => setModalOpen(true) : undefined}
				disabled={!isClickable}
				className="w-full text-left disabled:cursor-default"
				aria-label={isClickable ? "Open waiver signing form" : undefined}
			>
				<TimelineComponent
					text={verdict.text}
					finished={verdict.finished}
					statusIcon={verdict.statusIcon as StatusImageProps["statusIcon"]}
				/>
			</button>

			{modalOpen && <WaiverModal onClose={handleClose} />}
		</>
	);
};
