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
import { Sniglet} from "next/font/google";

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

	/*
	const identity = {
		status: Status.Accepted,
		roles: ["Hacker"],
	};
	*/

	if (!identity) {
		return <div className="font-display text-4xl mt-5">Loading...</div>;
	}

	const status = identity.status;

	if (status === null) {
		redirect("/#apply");
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

	return (
  <div className={`${figtree.className} mx-auto w-full px-4 min-h-screen flex flex-col sm:px-6 md:px-8 pb-6`}>
		{/* Title */}
		<h1
			style={{ fontFamily: sniglet.style.fontFamily }}
			className="pt-5 text-center text-[var(--color-white)] text-3xl leading-tight md:pt-10 md:text-5xl"
			>
			Applicant Dashboard
			</h1>

		{/* Cards */}
		<div className="mt-4 flex flex-1 flex-col items-center gap-4 min-h-0
						md:mt-8 md:gap-6">
			{/* Card 1: small status card */}
			<section className="
					w-full max-w-xl
					rounded-2xl
					bg-white
					px-5 py-4
					shadow-[0_15px_40px_rgba(0,0,0,0.12)]
					md:max-w-2xl md:px-10 md:py-6
					md:shadow-[0_30px_70px_rgba(0,0,0,0.18)]
					">
			<div className="flex items-center justify-between gap-4">
				<div className="min-w-0">
				<p className="truncate font-semibold text-neutral-900">
					VenusHacks 2026 Hacker Application
				</p>
				<p className="text-sm text-neutral-400">Submitted mm/dd/yy</p>
				</div>

				<span className="shrink-0 rounded-full bg-[#9EC7F5] px-4 py-2 text-sm font-semibold text-neutral-900
								md:px-5">
				Submitted
				</span>
			</div>
			</section>

			{/* Card 2 */}
			<section className="w-full max-w-xl rounded-2xl bg-white shadow-[0_18px_45px_rgba(0,0,0,0.18)]
								flex flex-col
								md:max-w-2xl">
			<div className="p-2 flex-1 min-h-0 overflow-y-auto
							md:p-6">
				<div className="space-y-4 md:space-y-6">

				<VerticalTimeline status={status as Status} />
				<Message status={status as Status} />

				{needsToSignWaiver && <SignWaiver />}
				{submittedWaiver && <ConfirmAttendance status={status as Status} />}
				{rejected && <ReturnHome />}

				</div>
			</div>
			</section>
		</div>
		</div>
	);
}

export default Portal;