"use client";

import { useState } from "react";
import Image from "next/image";

import hackerSprite from "@/assets/images/hacker_sprite.png";
import mentorSprite from "@/assets/images/mentor_sprite.png";
import volunteerSprite from "@/assets/images/volunteer_sprite.png";

const roles = [
	{
		key: "hacker",
		title: "Hacker",
		description:
			"A high school (18+) student, undergraduate, or graduate student of any experience level",
		image: hackerSprite,
		route: "/apply",
	},
	{
		key: "mentor",
		title: "Mentor",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
		image: mentorSprite,
		route: "/mentor",
	},
	{
		key: "volunteer",
		title: "Volunteer",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
		image: volunteerSprite,
		route: "/volunteer",
	},
];

export default function ChooseRoleModal() {
	const [selected, setSelected] = useState<string | null>(null);

	const getSelectedRoute = () => {
		if (!selected) return "";
		return roles.filter((e) => e.key === selected)[0].route;
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="relative z-10 max-w-sm p-8 bg-white shadow-2xl md:p-12 md:max-w-lg rounded-3xl">
				<h2 className="mb-2 text-2xl text-center text-black">
					I&apos;m applying to be a...
				</h2>
				<p className="mb-5 text-sm italic text-center text-gray-500">
					Note: You may only choose one.
				</p>

				<div className="flex flex-col gap-6">
					{roles.map((role) => (
						<button
							key={role.key}
							className={`flex items-center w-full gap-4 p-4 text-left transition-colors border-[3px] rounded-2xl ${
								selected === role.key
									? "bg-gray-100"
									: "border-gray-100 hover:bg-gray-100"
							}`}
							type="button"
							onClick={() => setSelected(role.key)}
						>
							<div className="px-2">
								<div className="relative flex-shrink-0 w-24 h-24">
									<Image
										src={role.image}
										alt={role.title}
										fill
										className="object-contain"
									/>
								</div>
							</div>
							<div className="flex flex-col gap-1">
								<p
									className="mb-0 text-lg font-semibold"
									style={{ color: "#1a1a2e" }}
								>
									{role.title}
								</p>
								<p className="mb-0 text-xs leading-snug text-gray-500">
									{role.description}
								</p>
							</div>
						</button>
					))}
				</div>

				<form action={getSelectedRoute()} className="flex justify-center mt-5">
					<button
						className={`px-8 py-3 text-base font-semibold border-[1px] rounded-full transition-opacity ${
							selected
								? "hover:opacity-90 cursor-pointer"
								: "opacity-40 cursor-not-allowed"
						}`}
						type="submit"
						disabled={!selected}
						style={{
							background: "#F8C4C4",
							color: "#CF6868",
							borderColor: "#CF6868",
						}}
					>
						Continue to Application →
					</button>
				</form>
			</div>
		</div>
	);
}
