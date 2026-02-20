"use client";

import { useRef } from "react";
import Image from "next/image";

import LandingBackground from "@/assets/backgrounds/landing-background.png";
import ApplicationsButtonImage from "@/assets/icons/application-warning.svg";

import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";
import haveApplicationsOpened from "@/lib/utils/haveApplicationsOpened";
import About from "./About/About";

import styles from "./Landing.module.css";

const Landing = () => {
	const deadlinePassed = hasDeadlinePassed();
	const applicationsOpened = haveApplicationsOpened();

	const scrollTo = useRef<null | HTMLDivElement>(null);

	const applyClick = () => {
		scrollTo.current?.scrollIntoView({ behavior: "smooth" });
	};

	let applyButtonText = "COMING SOON";
	if (deadlinePassed) {
		applyButtonText = "CLOSED";
	} else if (applicationsOpened) {
		applyButtonText = "OPEN";
	}

	return (
		<>
			<section className="bg-[#00001c]">
				<div
					className={`min-h-screen absolute overflow-hidden z-10 w-full flex flex-col items-center justify-center`}
				>
					<div className="text-center relative p-10 flex flex-col items-center justify-center">
						<h2 className="text-xl md:text-2xl mb-5 z-1">
							February 27th{" "}
							<span className="whitespace-nowrap">- March 1st, 2026</span>
						</h2>
						<h1
							className={`${styles.headingDropShadow} font-heading text-4xl md:text-7xl lg:text-5xl mb-12`}
						>
							VENUSHACKS
						</h1>

						<div
							className={`${!deadlinePassed &&
								applicationsOpened &&
								styles.applicationButton + " cursor-pointer"
								} relative flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-8 border-8 border-pink py-4 px-4`}
							onClick={() => {
								if (!deadlinePassed && applicationsOpened) applyClick();
							}}
						>
							<Image
								src={ApplicationsButtonImage}
								alt="applications button"
								className="relative z-10 w-20"
							/>
							<p className="text-pink font-display text-xl sm:text-3xl z-10 m-0">
								APPLICATIONS
								<br />
								{applyButtonText}
							</p>
							<div className="absolute bg-[#0040EE] opacity-50 w-full h-full" />
						</div>
					</div>
				</div>
				<div className="min-h-screen">
					<Image
						src={LandingBackground}
						alt="landing background"
						className="bg-[#00001c] w-screen"
					/>
				</div>

				<About />
			</section> */
			<div ref={scrollTo} />
		</>
	);
};

export default Landing;
