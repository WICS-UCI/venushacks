"use client";

import Image from "next/image";
import PicnicScene from "./PicnicScene";
import Hill from "./Hill";
import CloudGroup from "@/assets/backgrounds/coming-soon-clouds.svg";

const Landing = () => {
	return (
		<section className="relative mx-auto">
			<div className="absolute inset-0 -z-20">
				<div className="relative min-h-screen md:h-screen overflow-hidden bg-[#BEE7E1] flex justify-center">
					{/* Clouds */}
					<div
						className={`relative top-[5%] md:top-0 flex items-start justify-center w-[clamp(700px,90vw,1400px)]`}
					>
						<Image
							src={CloudGroup}
							alt="Clouds"
							className="relative h-auto flex-shrink-0 mt-32"
						/>
						<Image
							src={CloudGroup}
							alt="Clouds"
							className="relative mt-20 h-auto flex-shrink-0"
						/>
						<Image
							src={CloudGroup}
							alt="Clouds"
							className="relative mt-14 left-52 ml-64 scale-[120%] h-auto flex-shrink-0"
						/>
						<Image
							src={CloudGroup}
							alt="Clouds"
							className="relative mt-20 ml-96 top-10 left-11 h-auto flex-shrink-0"
						/>
						<Image
							src={CloudGroup}
							alt="Clouds"
							className="relative mt-32 top-40 h-auto flex-shrink-0"
						/>
					</div>
				</div>
			</div>
			<div className="absolute -z-10 top-1/2 translate-y-[10%]">
				<div className="scale-[120%]">
					<Hill />
				</div>
			</div>
			<div className="relative w-full">
				<div className="relative z-10 flex flex-col items-center pt-12 mb-[-4rem]">
					<h2 className="tracking-[19%] font-sniglet text-center text-[#2d3150] text-[clamp(0.9rem,1.8vw,1.5rem)] mb-3 mt-[clamp(3rem,8vw,6rem)] px-4">
						UCI&apos;s Women-Centric Hackathon
					</h2>

					<h1
						className="font-torus text-center text-[#2d3150] font-heading text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] px-4"
						style={{ letterSpacing: "0.2em" }}
					>
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
