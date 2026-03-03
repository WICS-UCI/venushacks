import Image from "next/image";

import LandingBackgroundGrass from "@/assets/backgrounds/coming-soon-background-grass.svg";
import CloudGroup from "@/assets/backgrounds/coming-soon-clouds.svg";

import styles from "./Landing.module.css";

export default function ComingSoonBackground() {
	return (
		<div className="fixed relative min-h-screen md:h-screen overflow-hidden bg-[#B2EEE7]">
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
				src={LandingBackgroundGrass}
				alt="Landing Background Grass"
				className="absolute bottom-8 md:bottom-[-5%] w-full scale-150 md:scale-100 left-1/2 -translate-x-1/2"
			/>
		</div>
	);
}
