import Image from "next/image";

import CloudGroup from "@/assets/backgrounds/coming-soon-clouds.svg";
import styles from "@/lib/components/ApplicantPortalBackground/ApplicantPortalBackground.module.css";

export default function CountdownBackground() {
	return (
		<div className="fixed inset-0 -z-10 bg-[#B2EEE7]">
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
		</div>
	);
}
