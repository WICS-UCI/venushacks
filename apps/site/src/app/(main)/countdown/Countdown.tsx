"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import CountdownBackground from "./CountdownBackground";
import logo from "./assets/vh-logo.png";
import LandingBackgroundGrass from "@/assets/backgrounds/coming-soon-background-grass.svg";

function countdown(deadline: Date) {
	const deadlineTime = deadline.getTime();
	const now = new Date().getTime();
	const difference = Math.max(0, deadlineTime - now);

	const hours = Math.floor(difference / (1000 * 60 * 60));
	const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((difference % (1000 * 60)) / 1000);

	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
		2,
		"0",
	)}:${String(seconds).padStart(2, "0")}`;
}

export default function Countdown() {
	const DEADLINE = new Date("May 16, 2026 11:00:00");
	const [time, setTime] = useState<string | null>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(countdown(DEADLINE));
		}, 1000);

		return () => clearInterval(interval); // cleanup on unmount
	});

	return (
		<div className="relative w-screen h-screen overflow-hidden">
			<div className="absolute z-10 right-5 top-5">
				<Image
					src={logo}
					className="w-14 md:w-24"
					alt="logo"
					width="100"
					height="100"
				/>
			</div>
			<div
				className="absolute z-10 left-[50%] top-[30%] lg:top-[15%] -translate-x-1/2 -translate-y-1/2 
                        bg-[#D77676] py-2 px-13 rounded-full border-[#B25B5B] border-4 
                        w-[80vw] lg:w-[40%] landscape:max-md:w-[60vw] "
			>
				<h2 className="font-torus text-[20px] md:text-[40px] text-white text-center tracking-[10%]">
					Hacking ends in...
				</h2>
			</div>
			<div className="absolute z-10 left-[50%] top-[50%] lg:top-[37%] -translate-x-1/2 -translate-y-1/2">
				<h2 className="font-sniglet font-bold text-[90px] md:text-[200px] text-[#2F3248]">
					{time}
				</h2>
			</div>
			<Image
				src={LandingBackgroundGrass}
				alt="Landing Background Grass"
				className="absolute z-10 bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 w-full 
                        scale-150 md:scale-100 landscape:max-md:scale-100 landscape:max-md:-bottom-10"
			/>
			<div className="absolute -z-10">
				<CountdownBackground />
			</div>
		</div>
	);
}
