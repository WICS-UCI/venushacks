import Image from "next/image";

import ApplicantPortalGrass from "@/assets/applicant-portal/applicant-portal-grass.png";
import CloudGroup from "@/assets/backgrounds/coming-soon-clouds.svg";

import styles from "./ApplicantPortalBackground.module.css";

export default function ApplicantPortalBackground() {
	return (
		<div className="fixed inset-0 -z-10 overflow-hidden bg-[#B2EEE7]">
			{/* Clouds */}
			<div className={`${styles.cloudTrack} absolute top-[5%] md:top-0 left-0`}>
				<Image
					src={CloudGroup}
					alt="Clouds"
					className="w-[180vw] md:w-screen h-auto flex-shrink-0"
				/>
				<Image
					src={CloudGroup}
					alt="Clouds"
					className="w-[180vw] md:w-screen h-auto flex-shrink-0"
				/>
			</div>

			{/* Grass at the bottom */}
			<Image
				src={ApplicantPortalGrass}
				alt="Background Grass"
				className="absolute bottom-[-25%] sm:bottom-[-30%] md:bottom-[-45%] lg:bottom-[-55%] w-full scale-[1.2] left-1/2 -translate-x-1/2"
			/>
		</div>
	);
}