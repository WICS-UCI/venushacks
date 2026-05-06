"use client";

import { useState } from "react";
import { TimelineComponent } from "./TimelineComponent";
import { Status } from "@/lib/userRecord";
import { StatusImageProps } from "./StatusImage";
import WaiverModal from "../WaiverModal";

type Toast = { type: "success" | "error"; message: string };

export const WaiverComponent = ({ status }: { status: Status }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [toast, setToast] = useState<Toast | null>(null);

	function showToast(t: Toast) {
		setToast(t);
		setTimeout(() => setToast(null), 5000);
	}

	function handleSuccess() {
		setModalOpen(false);
		showToast({ type: "success", message: "Waiver signed! Check your inbox for a confirmation email." });
	}

	function handleClose() {
		setModalOpen(false);
	}

	let verdict: { text: string; finished: boolean; statusIcon: string } | null = null;

	if (status === Status.Accepted) {
		verdict = { text: "Sign Waiver", finished: false, statusIcon: "Pending" };
	} else if (
		status === Status.Signed ||
		status === Status.Attending ||
		status === Status.Confirmed
	) {
		verdict = { text: "Waiver Signed", finished: true, statusIcon: "Accepted" };
	}

	if (!verdict) return null;

	const isClickable = status === Status.Accepted;

	return (
		<>
			{/* Toast */}
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

			{/* Timeline item — clickable only when pending */}
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

			{/* Modal */}
			{modalOpen && (
				<WaiverModal onClose={handleClose} onSuccess={handleSuccess} />
			)}
		</>
	);
};