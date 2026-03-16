"use client";

import Image from "next/image";

import brown_bear from "@/assets/images/brown_bear.svg";

export default function ApplicationLandingPane({
	applicationType,
}: {
	applicationType: "Hacker" | "Mentor" | "Volunteer";
}) {
	return (
		<div className="w-full font-figtree">
			<div className="flex flex-col items-center">
				{/* Grey circle avatar placeholder */}
				<Image src={brown_bear} alt="Brown bear" className="w-24 h-24 md:h-32 md:w-32" />

				<h1 className="font-sniglet text-3xl md:text-4xl font-extrabold tracking-tight my-4 md:my-8">
					{applicationType} Application
				</h1>

				<p className="text-left text-slate-700 leading-relaxed">
					Hello! Thank you for your interest in becoming a{" "}
					{applicationType.toLowerCase()} at VenusHacks 2026. Planned in
					collaboration with WICS and Hack at UCI, VenusHacks is UCI’s largest
					women-centric hackathon that includes networking, fun activities,
					educational workshops, and lots of coding! Our mission is to empower
					underrepresented groups by providing an inclusive community to foster
					growth and creativity in computing.
				</p>
			</div>

			<hr className="my-4 md:my-6 border-black-200" />

			{/* WHO/WHAT/WHEN/WHERE block */}
			<div className="grid gap-2 md:gap-4 text-slate-800 grid-cols-[80px_1fr] md:grid-cols-[120px_1fr]">
				<div className="font-extrabold">WHO</div>
				<div>
					You! A high school (18+) student, undergraduate, or graduate student
					of any experience level!
				</div>

				<div className="font-extrabold">WHAT</div>
				<div>VenusHacks 2026</div>

				<div className="font-extrabold">WHEN</div>
				<div>May 15, 2026 - May 17, 2026</div>

				<div className="font-extrabold">WHERE</div>
				<div>UC Irvine (Donald Bren Hall)</div>
			</div>
		</div>
	);
}
