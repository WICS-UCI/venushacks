"use client";

import { useState, useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import Image from "next/image";

import useUserIdentity from "@/lib/utils/useUserIdentity";
import { Status } from "@/lib/userRecord";

import Message from "./components/Message";
// import SignWaiver from "./components/SignWaiver";
import VerticalTimeline from "./components/timeline/VerticalTimeline";
import FloatingBubble from "@/lib/components/forms/FloatingBubble";

import ApplicantPortalBackground from "@/lib/components/ApplicantPortalBackground/ApplicantPortalBackground";
import picnicSceneImg from "@/assets/images/portal-picnic-scene.png";

const rolesArray = ["Mentor", "Hacker", "Volunteer"];

function Portal() {
	const identity = useUserIdentity();
	const searchParams = useSearchParams();

	const [toast, setToast] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	useEffect(() => {
		const status = searchParams.get("status");
		const message = searchParams.get("message");
		if ((status === "success" || status === "error") && message) {
			setToast({ type: status, message });
			window.history.replaceState(null, "", "/portal");
			const timer = setTimeout(() => setToast(null), 5000);
			return () => clearTimeout(timer);
		}
	}, [searchParams]);

	if (!identity) {
		return <div className="mt-5 text-4xl font-display">Loading...</div>;
	}

	const status = identity.status;

	if (status === null) {
		redirect("/choose-role");
	}

	const roleToDisplay = identity.roles.find((role) =>
		rolesArray.includes(role),
	);

	const getStatusLabel = () => {
		switch (status) {
			case Status.Accepted:
				return "Accepted";
			case Status.Rejected:
				return "Rejected";
			case Status.Waitlisted:
				return "Waitlisted";
			case Status.Signed:
				return "Waiver Signed";
			case Status.Confirmed:
				return "Confirmed";
			case Status.Attending:
				return "Attending";
			default:
				return "Submitted";
		}
	};

	const statusLabel = getStatusLabel();

	const getStatusColor = () => {
		switch (status) {
			case Status.Accepted:
				return "bg-[#95E396] text-black";
			case Status.Rejected:
				return "bg-[#F68A8A] text-black";
			case Status.Waitlisted:
				return "bg-[#FFF6A2] text-black";
			case Status.Signed:
			case Status.Confirmed:
			case Status.Attending:
				return "bg-blue-200 text-black";
			default:
				return "bg-[#9EC7F5] text-black";
		}
	};

	const getSubmitDate = () => {
		if (!identity.submission_time) return null;
		const date = new Date(identity.submission_time);

		return date.toLocaleDateString("en-US", {
			month: "2-digit",
			day: "2-digit",
			year: "numeric",
		});
	};

	const submissionDate = getSubmitDate();

	const statusColor = getStatusColor();

	return (
		<>
			{toast && (
				<div
					className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-full shadow-lg font-figtree text-[14px] font-semibold tracking-[0.03em] ${
						toast.type === "success"
							? "bg-[#95E396] text-black"
							: "bg-[#F68A8A] text-black"
					}`}
				>
					{toast.message}
				</div>
			)}
			<ApplicantPortalBackground />
			<div className="flex flex-col items-center w-full min-h-screen px-4 pb-6 mx-auto font-figtree sm:px-6 md:px-8">
				<FloatingBubble navText="Application" />

				<h1 className="mt-12 mb-8 text-3xl leading-tight text-center font-sniglet md:text-5xl">
					Applicant Dashboard
				</h1>

				<div className="flex flex-col items-center flex-1 min-h-0 gap-4 md:mt-8 md:gap-6">
					<section className="relative z-10 flex items-center justify-between w-full max-w-sm gap-4 p-8 bg-white shadow-2xl md:p-12 md:max-w-2xl rounded-3xl">
						<div>
							<p className="mb-1 font-medium md:text-lg">
								VenusHacks 2026 {roleToDisplay} Application
							</p>
							<p className="mb-0 italic text-md text-neutral-400">
								Submitted {submissionDate ? submissionDate : "-"}
							</p>
						</div>

						<span
							className={`shrink-0 rounded-full px-6 py-3 text-md font-semibold ${statusColor}`}
						>
							{statusLabel}
						</span>
					</section>

					<section className="relative z-10 max-w-sm p-8 bg-white shadow-2xl md:p-12 md:max-w-2xl rounded-3xl">
						<Message
							status={status as Status}
							role={roleToDisplay as "Hacker" | "Mentor" | "Volunteer"}
						/>
						<VerticalTimeline status={status as Status} />
						<div className="flex justify-center w-full mt-8">
							<Image src={picnicSceneImg} alt="Picnic scene" />
						</div>
					</section>
				</div>
			</div>
		</>
	);
}

export default Portal;
