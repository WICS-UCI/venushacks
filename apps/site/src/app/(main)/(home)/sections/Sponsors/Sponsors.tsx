import { getSponsors } from "./getSponsors";
import SponsorTier from "./components/SponsorTier/SponsorTier";
import styles from "./Sponsors.module.scss";

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

		</section>
	);
};

export default Sponsors;
