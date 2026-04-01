import { getSponsors } from "./getSponsors";
// import SponsorTier from "./components/SponsorTier/SponsorTier";
import Image from "next/image";
import { InfiniteMovingAnts } from "./InfiniteMovingAnts";
import flyLine from "./assets/fly-line.svg";
import flower from "./assets/flower.svg";
import grass from "./assets/grass.svg";

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
	const items = Array.from(sponsors.values())
		.flat()
		.map((sponsor) => ({
			name: sponsor.name,
			logo: sponsor.logo.asset._ref,
			url: sponsor.url,
		}));

	return (
		<section className="w-full bg-[#C5C771] py-10">
			<div className={"w-[115%]"}>
				<Image
					src={flyLine}
					alt="fly line"
					className={"w-full"}
				/>
			</div>
			<Image
				src={flower}
				alt="flower"
				className={"absolute w-[4%] left-[20%]"}
			/>
			<div className="container relative items-center text-center lg:scale-90">
				<div className="absolute z-10 left-[50%] top-[10%]">
					<h2
						className={`font-torus font-display font-bold sm:text-[3rem] text-[#2F3248] text-3xl text-center`}
					>
						Sponsors
					</h2>
				</div>
				<div className="flex justify-center relative w-full z-0">
					<InfiniteMovingAnts
						items={items}
						direction="left"
						speed="slow"
						pauseOnHover={true}
						className={""}
					/>
				</div>
			</div>
			<Image
				src={flower}
				alt="flower"
				className={"absolute left-[80%]"}
			/>
			<Image
				src={flower}
				alt="flower"
				className={"absolute left-[80%]"}
			/>
			<Image
				src={grass}
				alt="grass"
				className={"absolute left-[20%]"}
			/>
		</section>
	);
};

export default Sponsors;
