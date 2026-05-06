"use client";

import { useState, useEffect } from "react";
import { TimelineComponent } from "./TimelineComponent";
import { Status } from "@/lib/userRecord";
import { StatusImageProps } from "./StatusImage";
import WaiverModal from "../WaiverModal";

export const WaiverComponent = ({ status }: { status: Status }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [waverSigned, setWaiverSigned] = useState(false);

	useEffect(() => {
		fetch("/api/waiver/status")
			.then((res) => res.json())
			.then((data) => setWaiverSigned(data.signed))
			.catch(() => setWaiverSigned(false));
	}, []);

	function handleClose() {
		setModalOpen(false);
	}

	let verdict: { text: string; finished: boolean; statusIcon: string } | null =
		null;

	if (status === Status.Waitlisted) {
		if (waverSigned) {
			verdict = { text: "Waiver Signed", finished: true, statusIcon: "Accepted" };
		} else {
			verdict = { text: "Sign Waiver", finished: false, statusIcon: "Pending" };
		}
	} else if (status === Status.Accepted) {
		verdict = { text: "Sign Waiver", finished: false, statusIcon: "Pending" };
	} else if (
		status === Status.Signed ||
		status === Status.Attending ||
		status === Status.Confirmed
	) {
		verdict = { text: "Waiver Signed", finished: true, statusIcon: "Accepted" };
	}

	if (!verdict) return null;

	const isClickable =
		status === Status.Accepted ||
		(status === Status.Waitlisted && !waverSigned);

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
