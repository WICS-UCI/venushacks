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
		<section className="w-full py-10 mx-auto">
			<div className="mx-auto w-full max-w-screen-2xl px-0">
				<div className={"relative left-[20%] top-24 md:top-40 lg:top-60 -z-10 w-[clamp(10px,5%,60px)]"}>
					<Image src={flower} alt="flower" />
				</div>
				<div className={"scale-125 -z-10 flex justify-center"}>
					<Image src={flyLine} alt="fly line" />
				</div>
				<div className="relative items-center">
					<div className="absolute z-10 left-1/2 -translate-x-1/2">
						<h2
							className={`font-torus font-display font-bold sm:text-[3rem] text-[#2F3248] text-3xl text-center`}
						>
							Sponsors
						</h2>
					</div>
					<div className="flex justify-center relative w-full z-0 scale-125">
						<div
							className="relative w-full overflow-x-hidden overflow-y-visible py-4"
							style={{
								WebkitMaskImage:
									"linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
								maskImage:
									"linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
							}}
						>
							<InfiniteMovingAnts
								items={items}
								direction="left"
								speed="normal"
								pauseOnHover={true}
								className=""
							/>
						</div>
					</div>
				</div>
				<div className="relative left-[80%] top-28 w-[5%] h-auto">
					<Image src={flower} alt="Flower decoration" />
				</div>
				<div className={"relative left-[20%] w-[5%] h-auto"}>
					<Image src={grass} alt="grass" />
				</div>
			</div>
		</section>
	);
};

export default Sponsors;
