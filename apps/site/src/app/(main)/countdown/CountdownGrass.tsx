import Image from "next/image";

import LandingBackgroundGrass from "@/assets/backgrounds/coming-soon-background-grass.svg";
import CloudGroup from "@/assets/backgrounds/coming-soon-clouds.svg";

import styles from "../(home)/sections/Landing/Landing.module.css";

export default function CountdownGrass() {
	return (
		<div className="fixed relative min-h-screen md:h-screen overflow-hidden ">
			{/* Grass at the bottom */}
			<Image
				src={LandingBackgroundGrass}
				alt="Landing Background Grass"
				className="absolute bottom-8 md:bottom-[-5%] w-full scale-150 md:scale-100 left-1/2 -translate-x-1/2"
			/>
		</div>
	);
}
