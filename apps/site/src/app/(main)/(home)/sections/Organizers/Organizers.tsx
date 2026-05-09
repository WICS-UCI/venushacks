"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { getOrganizers } from "./getOrganizers";
import OrganizerCard from "./OrganizerCard";
import { type OrganizerData, DUMMY_ORGANIZERS } from "./OrganizerData";
import { resolveHeadshotUrl } from "./resolveHeadshot";
import flower from "./assets/flower.svg";
import grass from "./assets/grass.svg";

const builder = imageUrlBuilder(client);

const DEPARTMENTS = [
	"Board",
	"Corporate",
	"Design",
	"Logistics",
	"Marketing",
	"Tech",
] as const;
type Department = (typeof DEPARTMENTS)[number];

export default function Organizers() {
	const [organizers, setOrganizers] =
		useState<OrganizerData[]>(DUMMY_ORGANIZERS);
	const [activeTab, setActiveTab] = useState<Department>("Board");
	const [isLoading, setIsLoading] = useState(true);

	const filter1 = (o: OrganizerData) =>
		o.role === "Co-President" || o.role === "Co-Chair";
	const filter2 = (o: OrganizerData) =>
		o.department === activeTab && o.role === "Organizer";

	useEffect(() => {
		const loadOrganizers = async () => {
			try {
				setIsLoading(true);
				const data = await getOrganizers();
				if (Array.isArray(data) && data.length > 0) {
					setOrganizers(
						data.map((organizer) => ({
							name: organizer.name,
							department: organizer.department,
							role: organizer.role,
							image: organizer.image
								? builder.image(organizer.image).format("webp").url()
								: undefined,
							link: organizer.link,
						})),
					);
				}
				// if data is empty, DUMMY_ORGANIZERS remains as the default state
			} catch (error) {
				console.error("Error loading organizers:", error);
			} finally {
				setIsLoading(false);
			}
		};
		loadOrganizers();
	}, []);

	const filtered =
		activeTab === "Board"
			? organizers.filter(filter1)
			: organizers.filter(filter2);

	if (isLoading) {
		return null;
	}

	return (
		<section className="w-full flex justify-center px-6 py-12 mb-10">
			<div className="w-full max-w-screen-2xl mx-auto">
				<div
					className="mx-auto w-full max-w-[1286px] flex flex-col items-center gap-6 sm:gap-8 px-4 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10"
					style={{
						backgroundColor: "#F4EC9C",
						border: "5px solid #D77676",
						borderRadius: "30px",
					}}
				>
					{/* Title */}
					<h2 className="font-torus text-[#2f3152] text-5xl md:text-6xl text-center mb-10 tracking-[20%] font-bold">
						Meet the team
					</h2>

					{/* Filter tabs — equal width, centered, consistent sizing */}
					<div className="grid grid-cols-3 sm:grid-cols-6 gap-3 w-full place-items-center">
						{DEPARTMENTS.map((dept) => (
							<button
								key={dept}
								type="button"
								onClick={() => setActiveTab(dept)}
								className="rounded-full transition-colors w-full max-w-[160px] text-[13px] sm:text-[16px] lg:text-[20px] py-1.5 sm:py-2 lg:h-[61px]"
								style={{
									fontFamily: "'Torus Pro', sans-serif",
									fontWeight: 700,
									lineHeight: 1.15,
									letterSpacing: "0.05em",
									color: "#2F3248",
									border: "1.91px solid #CF6868",
									backgroundColor: activeTab === dept ? "#FFFFFF" : "#F9C4C4",
								}}
							>
								{dept}
							</button>
						))}
					</div>

					{/* Organizer grid */}
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10 w-full">
						{filtered.map((organizer) => (
							<OrganizerCard
								key={`${organizer.name}-${organizer.department}`}
								name={organizer.name}
								role={organizer.role}
								department={organizer.department}
								displayDepartment={organizer.displayDepartment}
								image={
									resolveHeadshotUrl(organizer.name) ?? organizer.image
								}
								link={organizer.link}
							/>
						))}
					</div>
				</div>
				<div className="relative -z-10 top-8 left-[70%] w-[clamp(10px,5%,60px)]">
					<Image src={flower} alt="flower" />
				</div>
				<div className="relative -z-10 left-[20%] w-[clamp(10px,3%,60px)]">
					<Image src={grass} alt="grass" />
				</div>
			</div>
		</section>
	);
}
