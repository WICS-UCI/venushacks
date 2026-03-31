import { getSponsors } from "./getSponsors";
import SponsorTier from "./components/SponsorTier/SponsorTier";
import styles from "./Sponsors.module.scss";
import { motion } from "framer-motion";	
import { InfiniteMovingAnts } from "./InfiniteMovingAnts";


// no sponsors under bronze for IH 2025
const TIERS = [
	"platinum",
	"gold",
	"silver",
	// "bronze",
	// "sponsored-prize",
	// "in-kind",
];

// const tempSponsors = ["sponsor1", "sponsor2", "sponsor3", "sponsor4", "sponsor5", "sponsor6"];

const Sponsors = async () => {
	const sponsors = await getSponsors();
	const names = Array.from(sponsors.values()).flat().map(sponsor => sponsor.name);

	return (
		<section className="container py-24 md:my-16 relative items-center flex flex-col md:p-8 w-4/5 mx-auto text-center">
			<h2 className={`font-torus my-12 font-display font-bold sm:text-[3rem] text-[#2F3248] text-3xl text-center`}>
				Sponsors
			</h2>
			<InfiniteMovingAnts
				items={names}
				direction="left"
				speed="slow"
				pauseOnHover={true}
				className={styles.carousel}
			/>
		</section>
	);
};

export default Sponsors;
