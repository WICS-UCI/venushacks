import { Metadata } from "next";
import { redirect } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getSchedule } from "./components/getSchedule";

import Image from "next/image";

import ShiftingCountdown from "./components/ShiftingCountdown/ShiftingCountdown";
import SchedulePage from "./sections/SchedulePage";

export const revalidate = 60;

export const metadata: Metadata = {
	title: "Schedule | IrvineHacks 2025",
};

export default async function Schedule() {
	if (process.env.MAINTENANCE_MODE_SCHEDULE) {
		redirect("/");
	}

	const events = await getSchedule();

	const schedule = events.map((days) =>
		days.map(({ description, ...day }) => ({
			...day,
			description: <PortableText value={description} />,
		})),
	);

	return (
		<>
			<section className="h-full w-full mb-12 relative">
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1] min-w-[1000px]">
					<Image
						src={starry_bg}
						alt=""
						className="absolute top-0 left-0 w-full"
					/>
				</div>
				<div className="p-36 relative">
					<ShiftingCountdown />
				</div>
				<div className="flex justify-center">
					<SchedulePage schedule={schedule} />
				</div>
			</section>
			<div className="absolute bottom-0 left-0 w-full h-[100vh] overflow-hidden z-[-1] min-w-[1000px]">
				<Image
					src={clouds_bg}
					alt=""
					className="absolute translate-y-[40%] left-0 w-full bottom-0 opacity-75"
				/>
			</div>
		</>
	);
}
