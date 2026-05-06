"use client";

import { useEffect, useState } from "react";

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
	const [pronouns, setPronouns] = useState("");
	const [pronounsOther, setPronounsOther] = useState("");
	const [ethnicity, setEthnicity] = useState("");
	const [race, setRace] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);

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
		if (!isUnrsvp) {
			if (!pronouns) {
				setError("Please select your pronouns.");
				return;
			}
			if (pronouns === "other" && !pronounsOther.trim()) {
				setError("Please specify your pronouns.");
				return;
			}
			if (!ethnicity) {
				setError("Please select your ethnicity.");
				return;
			}
			if (race.length === 0) {
				setError("Please select at least one race.");
				return;
			}
		}

		setError(null);

		try {
			const body = isUnrsvp
				? {}
				: {
					demographic_info: {
						pronouns: pronouns === "other" ? pronounsOther.trim() : pronouns,
						ethnicity,
						race,
					},
				};

			const res = await fetch("/api/user/rsvp", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data?.detail ?? "Submission failed. Please try again.");
			}

			const message = isUnrsvp
				? "Your RSVP has been cancelled."
				: "RSVP confirmed! See you at VenusHacks 2026.";
			window.location.href = `/portal?status=success&message=${encodeURIComponent(message)}`;
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "An unexpected error occurred.";
			window.location.href = `/portal?status=error&message=${encodeURIComponent(message)}`;
		}
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/40 backdrop-blur-sm"
			onClick={handleBackdropClick}
		>
			<div className="w-full max-w-[659px] bg-white rounded-[30px] shadow-xl p-6 md:p-[40px] flex flex-col gap-6 font-figtree overflow-y-auto max-h-[90vh]">
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

				<div className="leading-[160%] tracking-[0.03em] text-gray-700">
					{isUnrsvp ? (
						<div className="flex flex-col gap-3 text-gray-700 leading-[160%] tracking-[0.03em]">
							<p>
								Are you sure you want to cancel your attendance at VenusHacks 2026?
							</p>
							<ul className="list-disc list-inside text-sm space-y-1">
								<li>You will be permanently removed from the attendee list.</li>
								<li>Your spot will be forfeited and cannot be reclaimed.</li>
								<li>This action <span className="font-semibold underline">cannot be undone</span>.</li>
							</ul>
						</div>
					) : (
						<p>
							By confirming, you are letting us know you plan to attend
							VenusHacks 2026. Please only confirm if you intend to be present.
						</p>
					)}
				</div>

				{!isUnrsvp && (
					<div className="flex flex-col gap-5 overflow-y-auto max-h-[40vh] pr-2">
						<p className="text-sm text-gray-500 italic">
							We collect the following demographic information to better understand and support our community. All fields are required, but you may select &quot;Prefer not to say&quot; for any question.
						</p>

						{/* Pronouns */}
						<div className="flex flex-col gap-1">
							<label className="font-semibold text-sm text-slate-800">
								Pronouns <span className="text-red-500">*</span>
							</label>
							<div className="flex flex-col gap-2">
								{[
									{ value: "she/her", label: "she/her" },
									{ value: "they/them", label: "they/them" },
									{ value: "he/him", label: "he/him" },
									{ value: "other", label: "Other:" },
									{ value: "prefer_not_to_say", label: "Prefer not to say" },
								].map(({ value, label }) => (
									<label key={value} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
										<input
											type="radio"
											name="pronouns"
											value={value}
											checked={pronouns === value}
											onChange={() => setPronouns(value)}
											className="accent-pink-400"
										/>
										{label}
										{value === "other" && pronouns === "other" && (
											<input
												type="text"
												value={pronounsOther}
												onChange={(e) => setPronounsOther(e.target.value)}
												placeholder="please specify"
												className="ml-1 border-b border-gray-400 focus:outline-none text-sm px-1"
											/>
										)}
									</label>
								))}
							</div>
						</div>

						{/* Race */}
						<div className="flex flex-col gap-1">
							<label className="font-semibold text-sm text-slate-800">
								Race (select all that apply) <span className="text-red-500">*</span>
							</label>
							<div className="flex flex-col gap-2">
								{[
									"American Indian or Alaska Native",
									"Asian",
									"Black or African American",
									"Native Hawaiian or Other Pacific Islander",
									"White",
									"Prefer not to say",
								].map((option) => (
									<label key={option} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
										<input
											type="checkbox"
											value={option}
											checked={race.includes(option)}
											onChange={(e) => {
												if (e.target.checked) {
													setRace((prev) => [...prev, option]);
												} else {
													setRace((prev) => prev.filter((r) => r !== option));
												}
											}}
											className="accent-pink-400"
										/>
										{option}
									</label>
								))}
							</div>
						</div>

						{/* Ethnicity */}
						<div className="flex flex-col gap-1">
							<label className="font-semibold text-sm text-slate-800">
								Ethnicity <span className="text-red-500">*</span>
							</label>
							<div className="flex flex-col gap-2">
								{[
									"Hispanic or Latino",
									"Not Hispanic or Latino",
									"Prefer not to say",
								].map((option) => (
									<label key={option} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
										<input
											type="radio"
											name="ethnicity"
											value={option}
											checked={ethnicity === option}
											onChange={() => setEthnicity(option)}
											className="accent-pink-400"
										/>
										{option}
									</label>
								))}
							</div>
						</div>
					</div>
				)}

				{showWarning && (
					<p
						className="text-[13px] text-center font-semibold tracking-[0.03em]"
						style={{ color: "var(--color-indian-red)" }}
					>
						WARNING: After confirming, you will{" "}
						<span className="underline">NOT</span> be able to RSVP again.
					</p>
				)}

				{error && (
					<p className="text-[13px] text-center font-semibold text-red-500">
						{error}
					</p>
				)}

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
