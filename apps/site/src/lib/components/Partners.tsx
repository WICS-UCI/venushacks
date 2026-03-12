"use client";

import { useState, useRef, TouchEvent } from "react";
import Image from "next/image";
import BlockChain from "@/assets/partner-icons/BlockChain.png";
import CTC from "@/assets/partner-icons/CTC.png";
import Design from "@/assets/partner-icons/Design.png";
import ArrowButton from "@/assets/partner-icons/ArrowButton.png";

const partners = [
	{ src: CTC, alt: "CTC" },
	{ src: BlockChain, alt: "BlockChain" },
	{ src: Design, alt: "Design" },
];

export default function Partners() {
	const [activeIndex, setActiveIndex] = useState(0);
	const touchStartX = useRef<number>(0);
	const touchEndX = useRef<number>(0);

	const handlePrev = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const handleNext = () => {
		if (activeIndex < partners.length - 1) {
			setActiveIndex(activeIndex + 1);
		}
	};

	const handleTouchStart = (e: TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchMove = (e: TouchEvent) => {
		touchEndX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		if (touchStartX.current - touchEndX.current > 50) {
			// Swiped left
			handleNext();
		}

		if (touchStartX.current - touchEndX.current < -50) {
			// Swiped right
			handlePrev();
		}
	};

	return (
		<div className="w-full flex justify-center items-center p-4 md:p-8 gap-0 md:gap-1">
			{/* Left Arrow - Hidden on mobile */}
			<button
				onClick={handlePrev}
				disabled={activeIndex === 0}
				className="hidden md:block hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
			>
				<Image
					src={ArrowButton}
					alt="Previous"
					className="w-8 h-8 md:w-12 md:h-12 rotate-180"
				/>
			</button>

			{/* Partners Display */}
			<div
				className="relative flex items-center justify-center w-full md:w-[800px] h-[300px] md:h-[450px] overflow-hidden"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{/* Mobile view - Single centered partner */}
				<div className="md:hidden">
					<Image
						src={partners[activeIndex].src}
						alt={partners[activeIndex].alt}
						className="w-[280px] h-[280px] object-contain"
					/>
				</div>

				{/* Desktop view - Three partners with overlay */}
				<div className="hidden md:flex relative items-center justify-center w-full h-full">
					{/* Left Partner (1/3 covered) */}
					{activeIndex > 0 && (
						<div
							className="absolute transition-all duration-300 ease-in-out"
							style={{
								left: '30px',
								zIndex: 10,
							}}
						>
							<div className="relative w-[320px] h-[320px]">
								<Image
									src={partners[activeIndex - 1].src}
									alt={partners[activeIndex - 1].alt}
									className="w-full h-full object-contain"
								/>
								<div className="absolute inset-[60px] pointer-events-none" style={{ backgroundColor: '#88888863' }}></div>
							</div>
						</div>
					)}

					{/* Center Partner (front, enlarged) */}
					<div
						className="absolute transition-all duration-300 ease-in-out"
						style={{
							left: '50%',
							transform: 'translateX(-50%)',
							zIndex: 30,
						}}
					>
						<Image
							src={partners[activeIndex].src}
							alt={partners[activeIndex].alt}
							className="w-[420px] h-[420px] object-contain"
						/>
					</div>

					{/* Right Partner (1/3 covered) */}
					{activeIndex < partners.length - 1 && (
						<div
							className="absolute transition-all duration-300 ease-in-out"
							style={{
								right: '30px',
								zIndex: 10,
							}}
						>
							<div className="relative w-[320px] h-[320px]">
								<Image
									src={partners[activeIndex + 1].src}
									alt={partners[activeIndex + 1].alt}
									className="w-full h-full object-contain"
								/>
								<div className="absolute inset-[60px] pointer-events-none" style={{ backgroundColor: '#88888863' }}></div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Right Arrow - Hidden on mobile */}
			<button
				onClick={handleNext}
				disabled={activeIndex === partners.length - 1}
				className="hidden md:block hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
			>
				<Image src={ArrowButton} alt="Next" className="w-8 h-8 md:w-12 md:h-12" />
			</button>
		</div>
	);
}
