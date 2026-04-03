"use client";

import { redirect } from "next/navigation";

import useUserIdentity from "@/lib/utils/useUserIdentity";
import { Status } from "@/lib/userRecord";

import ConfirmAttendance from "./components/ConfirmAttendance";
import Message from "./components/Message";
import SignWaiver from "./components/SignWaiver";
import ReturnHome from "./components/ReturnHome";
import VerticalTimeline from "./components/timeline/VerticalTimeline";
import BackgroundStars from "./components/BackgroundStars";
import { Figtree } from "next/font/google";
import { Sniglet } from "next/font/google";

const rolesArray = ["Mentor", "Hacker", "Volunteer"];
const figtree = Figtree({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
});

const sniglet = Sniglet({
	subsets: ["latin"],
	weight: ["400", "800"],
});

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

	const needsToSignWaiver = status === Status.Accepted;
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

	const statusColor = getStatusColor();

	return (
		<div
			className={`${figtree.className} mx-auto w-full px-4 min-h-screen flex flex-col sm:px-6 md:px-8 pb-6`}
		>
			{/* Title */}
			<h1
				style={{ fontFamily: sniglet.style.fontFamily }}
				className="pt-5 text-center text-[var(--color-white)] text-3xl leading-tight md:pt-10 md:text-5xl"
			>
				Applicant Dashboard
			</h1>

			{/* Cards */}
			<div
				className="mt-4 flex flex-1 flex-col items-center gap-4 min-h-0
						md:mt-8 md:gap-6"
			>
				{/* Card 1: small status card */}
				<section
					className="
					w-full max-w-xl
					rounded-3xl
					bg-white
					px-5 py-4
					shadow-[0_25px_60px_rgba(0,0,0,0.12)]
					md:max-w-2xl md:px-10 md:py-6
					shadow-[0_25px_60px_rgba(0,0,0,0.12)]
					"
				>
					<div className="flex items-center justify-between gap-4">
						<div className="min-w-0">
							<p className="truncate font-semibold text-neutral-900">
								VenusHacks 2026 {roleToDisplay} Application
							</p>
							<p className="text-sm text-neutral-400">Submitted mm/dd/yy</p>
						</div>

						<span
							className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold md:px-5 ${statusColor}`}
						>
							{statusLabel}
						</span>
					</div>
				</section>

				{/* Card 2 */}
				<section
					className="w-full max-w-xl rounded-3xl bg-white shadow-[0_25px_60px_rgba(0,0,0,0.12)]
								flex flex-col
								md:max-w-2xl"
				>
					<div
						className="p-2 flex-1 min-h-0 overflow-y-auto
							md:p-6"
					>
						<div className="space-y-4 md:space-y-6">
							<Message
								status={status as Status}
								role={roleToDisplay as "Hacker" | "Mentor" | "Volunteer"}
							/>
							<VerticalTimeline status={status as Status} />

							{submittedWaiver && (
								<ConfirmAttendance status={status as Status} />
							)}
							{rejected && <ReturnHome />}
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

export default Portal;
