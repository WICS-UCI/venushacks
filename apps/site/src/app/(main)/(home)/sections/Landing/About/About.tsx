import Image from "next/image";
import basketGraphic from "@/assets/images/picnic_basket.png"; // replace with your asset

const About = () => {
	return (
		<section className="w-full bg-[#bcc06f] px-6 py-16 md:px-10 lg:px-16">
			<div className="mx-auto flex items-center justify-between gap-10">
				{/* Text Card */}
				<div className="w-full max-w-[642px] max-h-[453px] rounded-[32px] border-[4px] border-[#de8c8c] bg-[#e8dfa0] px-8 py-8 md:px-10 md:py-10">
					<h2 className="mb-6 font-display text-4xl text-[#2f3152] md:text-5xl lg:text-6xl">
						About Us
					</h2>

					<p className="text-base leading-8 text-[#2f3152] md:text-lg">
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

				<div className="hidden md:flex absolute right-0 flex-1 justify-end">
					<div className="relative w-full max-w-[595.5px] aspect-[595.5/366.97]">
						<Image
							src={basketGraphic}
							alt="Picnic basket illustration"
							fill
							className="object-contain"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
