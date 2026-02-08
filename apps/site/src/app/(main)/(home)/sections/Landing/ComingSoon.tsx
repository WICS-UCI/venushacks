"use client";

import { useRef } from "react";
import Image from "next/image";

import LandingBackground from "@/assets/backgrounds/landing-background.png";
import ApplicationsButtonImage from "@/assets/icons/application-warning.svg";

import hasDeadlinePassed from "@/lib/utils/hasDeadlinePassed";

import styles from "./Landing.module.css";

const ComingSoon = () => {
	return (
		<>
			{/* Fixed social links */}
			<div className="fixed top-4 right-4 z-10">
				<ul className="flex items-center gap-2">
					<li>
						<a
							href="https://www.tiktok.com/@venushacksuci"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="VenusHacks on Tiktok"
							className="flex h-11 w-11 items-center justify-center"
						>
							{/* TIKTOK SVG */}
						</a>
					</li>
					<li>
						<a
							href="https://www.instagram.com/venushacksuci/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="VenusHacks on Instagram"
							className="flex h-11 w-11 items-center justify-center"
						>
							{/* INSTAGRAM SVG */}
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/company/venushacks/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="VenusHacks on LinkedIn"
							className="flex h-11 w-11 items-center justify-center"
						>
							{/* LinkedIn SVG */}
						</a>
					</li>
					<li>
						<a
							href="mailto:venushacks.uci@gmail.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Email VenusHacks"
							className="flex h-11 w-11 items-center justify-center"
						>
							{/* MAIL SVG */}
						</a>
					</li>
				</ul>
			</div>
			<div className="min-h-screen flex items-center justify-center">
				<h1
					className={`${styles.headingDropShadow} font-heading text-4xl md:text-7xl lg:text-5xl mb-12 text-center`}
				>
					COMING SOON
				</h1>
			</div>
		</>
	);
};

export default ComingSoon;
