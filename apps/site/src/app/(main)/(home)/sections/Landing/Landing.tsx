"use client";

import About from "./About/About";
import PicnicScene from "./PicnicScene/PicnicScene";

const Landing = () => {
	return (
		<>
			<section className="relative overflow-hidden bg-[#cfe8e4]">
				<div className="relative min-h-screen w-full">
					<div className="absolute inset-0 z-10 flex flex-col items-center pt-10 md:pt-12 pointer-events-none">
						<h2 className="text-center text-[#2d3150] text-lg md:text-2xl tracking-wide mb-3 px-4">
							UCI&apos;s Women-Centric Hackathon
						</h2>
						<h1 className="text-center text-[#2d3150] font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none px-4">
							VENUSHACKS
						</h1>
					</div>

					<PicnicScene />
				</div>

				<About />
			</section>
		</>
	);
};

export default Landing;
