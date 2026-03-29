import { getSponsors } from "./getSponsors";
import SponsorTier from "./components/SponsorTier/SponsorTier";
import styles from "./Sponsors.module.scss";
import { motion } from "framer-motion";	
import blueberry from "./assets/blueberry_ant.svg";

// no sponsors under bronze for IH 2025
const TIERS = [
	"platinum",
	"gold",
	"silver",
	// "bronze",
	// "sponsored-prize",
	// "in-kind",
];

const Sponsors = async () => {
	const sponsors = await getSponsors();

	return (
		<section className="container py-24 md:my-16 relative items-center flex flex-col md:p-8 w-4/5 mx-auto text-center">
			<h2
				className={`font-torus my-12 font-display font-bold sm:text-[3rem] text-[#2F3248] text-3xl text-center`}
			>
				Sponsors
			</h2>
			<motion.div
				className="flex w-max"
				animate={{ x: ["0%", "-50%"] }}
				transition={{
				repeat: Infinity,
				duration: 5,
				ease: "linear",
				}}
			>
				<img src={blueberry} className="w-[300px] shrink-0" />
			</motion.div>

		</section>
	);
};

export default Sponsors;
