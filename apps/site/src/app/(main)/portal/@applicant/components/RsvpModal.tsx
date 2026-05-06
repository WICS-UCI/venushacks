"use client";

import { useEffect } from "react";

interface RsvpModalProps {
	isUnrsvp: boolean;
	showWarning: boolean;
	onClose: () => void;
}

export default function RsvpModal({
	isUnrsvp,
	showWarning,
	onClose,
}: RsvpModalProps) {
	function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
		if (e.target === e.currentTarget) onClose();
	}

	useEffect(() => {
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [onClose]);

	async function handleSubmit() {
		try {
			const res = await fetch("/api/user/rsvp", { method: "POST" });
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data?.detail ?? "Submission failed. Please try again.");
			}
			const message = isUnrsvp
				? "Your RSVP has been cancelled."
				: "RSVP confirmed! See you at VenusHacks 2026.";
			window.location.href = `/portal?status=success&message=${encodeURIComponent(message)}`;
		} catch (err) {
			const message = err instanceof Error ? err.message : "An unexpected error occurred.";
			window.location.href = `/portal?status=error&message=${encodeURIComponent(message)}`;
		}
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/40 backdrop-blur-sm"
			onClick={handleBackdropClick}
		>
			<div className="w-full max-w-[659px] bg-white rounded-[30px] shadow-xl p-6 md:p-[40px] flex flex-col gap-6 font-figtree">

				{/* Header */}
				<div className="flex items-start justify-between">
					<h2 className="font-sniglet text-[26px] leading-[100%] tracking-[0.05em] font-normal text-black">
						{isUnrsvp ? "Cancel Attendance" : "Confirm Attendance"}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none mt-1"
						aria-label="Close"
					>
						✕
					</button>
				</div>

				{/* Body */}
				<div className="leading-[160%] tracking-[0.03em] text-gray-700">
					{isUnrsvp ? (
						<p>
							Are you sure you want to cancel your attendance at VenusHacks
							2026? You will no longer be counted as attending.
						</p>
					) : (
						<p>
							By confirming, you are letting us know you plan to attend
							VenusHacks 2026. Please only confirm if you intend to be present.
						</p>
					)}
				</div>

				{/* Irreversibility warning */}
				{showWarning && (
					<p
						className="text-[13px] text-center font-semibold tracking-[0.03em]"
						style={{ color: "var(--color-indian-red)" }}
					>
						WARNING: After confirming, you will{" "}
						<span className="underline">NOT</span> be able to RSVP again.
					</p>
				)}

				{/* Action buttons */}
				<div className="flex flex-col md:flex-row gap-4 w-full">
					<button
						type="button"
						onClick={onClose}
						className="w-full md:flex-1 px-8 py-3 text-[16px] font-bold border rounded-full transition-opacity"
						style={{
							background: "var(--color-linen)",
							color: "var(--color-indian-red)",
							borderColor: "var(--color-indian-red)",
						}}
					>
						← Cancel
					</button>
					<button
						type="button"
						onClick={handleSubmit}
						className="w-full md:flex-1 px-8 py-3 text-[16px] font-bold border rounded-full transition-opacity"
						style={{
							background: "var(--color-pale-rose)",
							color: "var(--color-indian-red)",
							borderColor: "var(--color-indian-red)",
						}}
					>
						{isUnrsvp ? "Confirm Cancellation →" : "Confirm Attendance →"}
					</button>
				</div>
			</div>
		</div>
	);
}
