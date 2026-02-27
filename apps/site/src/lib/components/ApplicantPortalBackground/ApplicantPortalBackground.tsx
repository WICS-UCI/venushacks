import Image from "next/image";

import ApplicantPortalGrass from "@/assets/applicant-portal/applicant-portal-grass.png";
import Cloud1 from "@/assets/applicant-portal/applicant-portal-cloud1.png";
import Cloud2 from "@/assets/applicant-portal/applicant-portal-cloud2.png";

import styles from "./ApplicantPortalBackground.module.css";

export default function ApplicantPortalBackground() {
	return (
		<div className="fixed inset-0 overflow-hidden bg-[#B2EEE7] -z-10">
			{/* Cloud 1 - Top layer */}
			<div className={`${styles.cloudTrack1} absolute top-[5%] md:top-[8%] left-[-100vw]`}>
				<Image
					src={Cloud1}
					alt="Cloud 1"
					className="w-[50vw] md:w-[30vw] h-auto flex-shrink-0 mr-[300vw] md:mr-[200vw] lg:mr-[350vw]"
					priority
				/>
				<Image
					src={Cloud1}
					alt="Cloud 1"
					className="w-[50vw] md:w-[30vw] h-auto flex-shrink-0"
					priority
				/>
			</div>

			{/* Cloud 2 - Bottom layer */}
			<div className={`${styles.cloudTrack2} absolute top-[30%] md:top-[25%] left-[-100vw]`}>
				<Image
					src={Cloud2}
					alt="Cloud 2"
					className="w-[75vw] md:w-[45vw] h-auto flex-shrink-0 mr-[300vw] md:mr-[200vw] lg:mr-[350vw]"
					priority
				/>
				<Image
					src={Cloud2}
					alt="Cloud 2"
					className="w-[75vw] md:w-[45vw] h-auto flex-shrink-0"
					priority
				/>
			</div>

			{/* Grass at the bottom */}
			<Image
				src={ApplicantPortalGrass}
				alt="Grass"
				className="absolute bottom-[-25%] sm:bottom-[-30%] md:bottom-[-45%] lg:bottom-[-55%] w-full scale-[1.2] left-1/2 -translate-x-1/2"
				quality={100}
				priority
			/>
		</div>
	);
}
