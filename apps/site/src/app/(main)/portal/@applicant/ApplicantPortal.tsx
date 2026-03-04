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

const rolesArray = ["Mentor", "Hacker", "Volunteer"];

function Portal() {
	const identity = useUserIdentity();

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
		<div className="relative">
			<BackgroundStars className="left-[-15%] top-[21%]" />
			<div className="bg-transparent text-black max-w-6xl rounded-2xl p-6 flex flex-col mb-24 w-full">
				<h2 className="font-bold font-display text-[var(--color-white)] mb-4 md:mb-[42px] text-[15px] sm:text-2xl md:text-[40px] md:leading-10">
					{roleToDisplay} Application Status
				</h2>
				<VerticalTimeline status={status as Status} />
				<Message status={status as Status} />
				{needsToSignWaiver && <SignWaiver />}
				{submittedWaiver && <ConfirmAttendance status={status as Status} />}
				{rejected && <ReturnHome />}
			</div>
			<BackgroundStars className="right-[-15%] bottom-[21%]" />
		</div>
	);
}

export default Portal;
