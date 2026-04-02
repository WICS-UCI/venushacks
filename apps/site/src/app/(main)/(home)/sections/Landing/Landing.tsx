"use client";

import Image from "next/image";
import PicnicScene from "./PicnicScene";
import bg from "./assets/Hero-BG-Assets.svg";
import Hill from "./Hill"

const Landing = () => {
	return (
		<section className="relative mx-auto">
			<div className="absolute inset-0 -z-20">
				<Image src={bg} alt="background" fill className="object-contain object-top"/>
			</div>
			<div className="absolute scale-[120%] -z-10 top-1/2">
				<Hill />
			</div>
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
		</section>
	);
};

export default Landing;
