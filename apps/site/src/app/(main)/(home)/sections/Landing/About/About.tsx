import Image from "next/image";
import basketGraphic from "./assets/picnic_basket.svg";
import grass from "./assets/grass.svg";
import flower from "./assets/flower.svg";

const About = () => {
	return (
		<section className="relative w-full px-6 pt-16 pb-48 md:px-10 lg:px-16">
			<div className="mx-auto flex items-center justify-between gap-10">
				{/* Text Card */}
				<div className="w-full max-w-[700px] lg:ml-20 rounded-[34px] border-[5px] border-[#d77676] bg-[#e8dfa0] px-10 py-10 md:px-12 md:py-12 lg:px-14 lg:py-12">
					<h2 className="font-torus mb-6 font-display text-4xl text-[#2f3152] md:text-5xl">
						About Us
					</h2>

					<p className="font-sniglet max-w-[520px] text-base leading-8 text-[#2f3152] md:text-[1.15rem]">
						VenusHacks is UCI&apos;s largest women-centric hackathon, an annual
						event empowering women, gender minorities, and other
						underrepresented groups in tech. Hosted by{" "}
						<a
							href="https://wics.ics.uci.edu/"
							target="_blank"
							rel="noreferrer"
							className="underline"
						>
							WICS
						</a>{" "}
						and{" "}
						<a
							href="https://hack.ics.uci.edu/"
							target="_blank"
							rel="noreferrer"
							className="underline"
						>
							Hack at UCI
						</a>
						, the hackathon is open to participants of all experience levels
						with a mission to increase diversity in the tech industry by
						providing an inclusive community where students can receive the
						support to grow and express their creativity in computing.
					</p>
				</div>
				<div className="hidden lg:flex flex-1 justify-end">
					<div className="relative w-full max-w-[750px] aspect-[510/366.97] ml-auto -mr-14">
						<Image
							src={basketGraphic}
							alt="Picnic basket illustration"
							fill
							className="object-contain"
						/>
					</div>
				</div>
				<Image
					src={flower}
					alt="Flower decoration"
					className="absolute bottom-[8vh] right-[13vw] w-[5vw] h-auto"
				/>

				<Image
					src={grass}
					alt="Grass decoration"
					className="absolute bottom-[2vh] left-[10vw] w-[3vw] h-auto"
				/>
			</div>
		</section>
	);
};

export default About;
