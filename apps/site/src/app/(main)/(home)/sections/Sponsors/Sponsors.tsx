import { getSponsors } from "./getSponsors";
// import SponsorTier from "./components/SponsorTier/SponsorTier";
import styles from "./Sponsors.module.scss";
import { InfiniteMovingAnts } from "./InfiniteMovingAnts";

// no sponsors under bronze for IH 2025
// const TIERS = [
// 	"platinum",
// 	"gold",
// 	"silver",
// 	// "bronze",
// 	// "sponsored-prize",
// 	// "in-kind",
// ];

const Sponsors = async () => {
	const sponsors = await getSponsors();
	const items = Array.from(sponsors.values()).flat().map(sponsor => ({
		name: sponsor.name,
		logo: sponsor.logo.asset._ref,
		url: sponsor.url
	}));

	return (
		<section className="container md:my-16 relative items-center flex flex-col md:p-8 w-4/5 mx-auto text-center  lg:scale-90">
			<h2 className={`font-torus my-12 font-display font-bold sm:text-[3rem] text-[#2F3248] text-3xl text-center`}>
				Sponsors
			</h2>
			<InfiniteMovingAnts
				items={items}
				direction="left"
				speed="slow"
				pauseOnHover={true}
				className={`${styles.carousel}`}
			/>
		</section>
	);
};

export default Sponsors;
