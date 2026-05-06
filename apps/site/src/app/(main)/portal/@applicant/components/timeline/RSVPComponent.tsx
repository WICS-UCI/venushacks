"use client";

import { useState } from "react";
import { TimelineComponent } from "./TimelineComponent";
import { Status } from "@/lib/userRecord";
import { StatusImageProps } from "./StatusImage";
import RsvpModal from "../RsvpModal";

type Toast = { type: "success" | "error"; message: string };

export const RSVPComponent = ({ status }: { status: Status }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [toast, setToast] = useState<Toast | null>(null);

	function showToast(t: Toast) {
		setToast(t);
		setTimeout(() => setToast(null), 5000);
	}

	function handleSuccess() {
		setModalOpen(false);
		showToast({ type: "success", message: "RSVP submitted! See you at VenusHacks 2026." });
		setTimeout(() => window.location.reload(), 1500);
	}

	function handleClose() {
		setModalOpen(false);
	}

	let verdict: { text: string; finished: boolean; statusIcon: string } | null = null;

	if (status === Status.Accepted || status === Status.Signed) {
		verdict = { text: "Confirm Attendance", finished: false, statusIcon: "Pending" };
	} else if (status === Status.Confirmed || status === Status.Attending) {
		verdict = { text: "Attendance Confirmed", finished: true, statusIcon: "Accepted" };
	} else if (status === Status.Void) {
		verdict = { text: "No RSVP Indicated", finished: false, statusIcon: "Pending" };
	}

	if (!verdict) return null;

	const isUnrsvp = status === Status.Confirmed || status === Status.Attending;
	const isClickable = status === Status.Signed || isUnrsvp;

	return (
		<>
			{toast && (
				<div
					className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-full shadow-lg font-figtree text-[14px] font-semibold tracking-[0.03em] transition-all ${
						toast.type === "success"
							? "bg-[#95E396] text-black"
							: "bg-[#F68A8A] text-black"
					}`}
				>
					{toast.message}
				</div>
			)}

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
					onSuccess={handleSuccess}
				/>
			)}
		</>
	);
};
