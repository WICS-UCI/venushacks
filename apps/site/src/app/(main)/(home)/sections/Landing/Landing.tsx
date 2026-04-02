"use client";

import Image from "next/image";
import About from "./About/About";
import PicnicScene from "./PicnicScene";
import bg from "./assets/Hero-BG-Assets.svg";

const Landing = () => {
	return (
		<>
			<div className="scale-110 w-screen absolute -z-10 flex justify-center">
				<Image src={bg} alt="background" />
			</div>
			<section className="relative overflow-hidden max-w-screens mx-auto">
				<div className="relative w-full">
					<div className="relative z-10 flex flex-col items-center pt-12 mb-[-4rem]">
						<h2 className="font-sniglet text-center text-[#2d3150] text-[clamp(0.9rem,1.8vw,1.5rem)] tracking-wide mb-3 mt-[clamp(3rem,8vw,6rem)] px-4">
							UCI&apos;s Women-Centric Hackathon
						</h2>

						<h1 className="font-torus text-center text-[#2d3150] font-heading text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] px-4">
							VENUSHACKS
						</h1>
					</div>
					<div className="w-full relative top-10 lg:top-0">
						<PicnicScene />
					</div>
				</div>

				<About />
			</section>
		</>
	);
};

export default Landing;
