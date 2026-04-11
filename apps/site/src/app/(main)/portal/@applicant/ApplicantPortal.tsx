"use client";

import { redirect } from "next/navigation";
import Image from "next/image";

import useUserIdentity from "@/lib/utils/useUserIdentity";
import { Status } from "@/lib/userRecord";

import ConfirmAttendance from "./components/ConfirmAttendance";
import Message from "./components/Message";
// import SignWaiver from "./components/SignWaiver";
import ReturnHome from "./components/ReturnHome";
import VerticalTimeline from "./components/timeline/VerticalTimeline";
import FloatingBubble from "@/lib/components/forms/FloatingBubble";

import ApplicantPortalBackground from "@/lib/components/ApplicantPortalBackground/ApplicantPortalBackground";
import picnicSceneImg from "@/assets/images/portal-picnic-scene.png";

const rolesArray = ["Mentor", "Hacker", "Volunteer"];

function Portal() {
	const identity = useUserIdentity();

	if (!identity) {
		return <div className="font-display text-4xl mt-5">Loading...</div>;
	}

	const status = identity.status;

	if (status === null) {
		redirect("/choose-role");
	}

	const roleToDisplay = identity.roles.find((role) =>
		rolesArray.includes(role),
	);

	const submittedWaiver =
		status === Status.Signed ||
		status === Status.Confirmed ||
		status === Status.Attending;

	// const needsToSignWaiver = status === Status.Accepted;
	const rejected = status === Status.Rejected;

	const getStatusLabel = () => {
		switch (status) {
			case Status.Accepted:
				return "Accepted";
			case Status.Rejected:
				return "Rejected";
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
				return "bg-green-200 text-green-900";
			case Status.Rejected:
				return "bg-red-200 text-red-900";
			case Status.Signed:
			case Status.Confirmed:
			case Status.Attending:
				return "bg-blue-200 text-blue-900";
			default:
				return "bg-[#9EC7F5] text-neutral-900";
		}
	};

	const getSubmitDate = () => {
		if (!identity.submission_time) return null;
		return identity.submission_time;
	};

	const submissionDate = getSubmitDate();

	const statusColor = getStatusColor();

	return (
		<>
			<ApplicantPortalBackground />
			<div className="font-figtree mx-auto items-center w-full px-4 min-h-screen flex flex-col sm:px-6 md:px-8 pb-6">
				<FloatingBubble navText="Application" />

				<h1 className="font-sniglet text-center text-3xl leading-tight md:text-5xl mt-12 mb-8">
					Applicant Dashboard
				</h1>

				<div className="flex flex-1 flex-col items-center gap-4 min-h-0 md:mt-8 md:gap-6">
					<section className="relative z-10 max-w-sm p-8 bg-white shadow-2xl md:p-12 md:max-w-2xl rounded-3xl flex w-full items-center justify-between gap-4">
						<div>
							<p className="font-semibold md:text-lg mb-1">
								VenusHacks 2026 {roleToDisplay} Application
							</p>
							<p className="text-sm text-neutral-400">Submitted {submissionDate ? submissionDate: '-'}</p>
						</div>

						<span
							className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold md:px-5 ${statusColor}`}
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
						<div className="w-full flex justify-center mt-8">
							<Image src={picnicSceneImg} alt="Picnic scene" />
						</div>

						{submittedWaiver && <ConfirmAttendance status={status as Status} />}
						{rejected && <ReturnHome />}
					</section>
				</div>
			</div>
		</>
	);
}

export default Portal;
