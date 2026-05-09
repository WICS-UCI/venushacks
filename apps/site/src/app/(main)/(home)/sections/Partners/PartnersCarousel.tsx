"use client";

/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRef, useState, type TouchEvent } from "react";
import ArrowButton from "@/assets/partner-icons/ArrowButton.svg";
import PartnersBackground from "@/assets/partner-icons/PartnersBackground.svg";
import { urlFor } from "@/lib/sanity/image";
import type { PartnerItem } from "./getPartners";
import next from "next";

type PartnersCarouselProps = {
	partners: PartnerItem[];
};

export default function PartnersCarousel({ partners }: PartnersCarouselProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const touchStartX = useRef(0);
	const touchEndX = useRef(0);

	const handlePrev = () => {
		setActiveIndex((prevIndex) => (prevIndex - 1 + partners.length) % partners.length);
	};

	const handleNext = () => {
		setActiveIndex((prevIndex) => (prevIndex + 1) % partners.length);

	};

	const handleTouchStart = (event: TouchEvent) => {
		touchStartX.current = event.touches[0].clientX;
		touchEndX.current = event.touches[0].clientX;
	};

	const handleTouchMove = (event: TouchEvent) => {
		touchEndX.current = event.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		const swipeDistance = touchStartX.current - touchEndX.current;

		if (swipeDistance > 50) {
			handleNext();
		} else if (swipeDistance < -50) {
			handlePrev();
		}

		touchStartX.current = 0;
		touchEndX.current = 0;
	};

	const activePartner = partners[activeIndex];
	const prevIndex = (activeIndex - 1 + partners.length) % partners.length;
	const nextIndex = (activeIndex + 1) % partners.length;

	const renderPartnerCard = (
		partner: PartnerItem,
		{
			compact = false,
			faded = false,
		}: { compact?: boolean; faded?: boolean } = {},
	) => {
		const cardSize = compact ? "w-[320px] h-[320px]" : "w-[420px] h-[420px]";
		const logoSize = compact ? "w-[72px] h-[72px]" : "w-[120px] h-[120px]";
		const contentOffsetClass = compact ? "translate-y-1" : "translate-y-1";
		const nameStyle = compact
			? {
					fontSize: "30px",
					lineHeight: "30px",
				}
			: {
					fontSize: "40px",
					lineHeight: "40px",
				};
		const descriptionStyle = compact
			? {
					width: "220px",
					height: "66px",
					fontSize: "11px",
					lineHeight: "17px",
				}
			: {
					width: "355.96px",
					height: "100px",
					fontSize: "14.17px",
					lineHeight: "24.79px",
				};
		return (
			<div className={`relative ${cardSize}`}>
				<Image
					src={PartnersBackground}
					alt=""
					className="w-full h-full object-contain"
				/>
				<div
					className={`absolute inset-0 flex flex-col items-center justify-center px-8 ${contentOffsetClass}`}
				>
					<img
						src={urlFor(partner.logo).format("webp").url()}
						alt={`${partner.name} logo`}
						className={`${logoSize} object-contain`}
					/>
					<p
						className="mt-1 text-center"
						style={{
							fontFamily: "Sniglet",
							fontWeight: 400,
							fontStyle: "normal",
							letterSpacing: "0.02em",
							textAlign: "center",
							color: "#2F3248",
							...nameStyle,
						}}
					>
						{partner.name}
					</p>
					{partner.description && (
						<p
							className="mt-0 text-center"
							style={{
								fontFamily: "Sniglet",
								fontWeight: 400,
								fontStyle: "normal",
								letterSpacing: "0.05em",
								textAlign: "center",
								color: "#2F3248",
								...descriptionStyle,
							}}
						>
							{partner.description}
						</p>
					)}
				</div>
				{faded && (
					<div
						className="absolute inset-0 pointer-events-none"
						style={{ backgroundColor: "#88888863" }}
					/>
				)}
			</div>
		);
	};

	return (
		<div className="w-full flex justify-center items-center p-4 md:p-8 gap-0 md:gap-1">
			<button
				type="button"
				onClick={handlePrev}
				aria-label="Previous partner"
				className="hidden md:block hover:opacity-70 transition-opacity"
			>
				<Image
					src={ArrowButton}
					alt=""
					className="w-8 md:w-[80%] rotate-180"
				/>
			</button>

			<div
				className="relative flex items-center justify-center w-full md:w-[800px] h-[300px] md:h-[450px] overflow-hidden"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<div className="md:hidden flex flex-col items-center gap-3">
					{activePartner.url ? (
						<a
							href={activePartner.url}
							target="_blank"
							rel="noopener noreferrer"
							className="block"
						>
							{renderPartnerCard(activePartner, { compact: true })}
						</a>
					) : (
						renderPartnerCard(activePartner, { compact: true })
					)}
				</div>

				<div className="hidden md:flex relative items-center justify-center w-full h-full">
					<div
						className="absolute transition-all duration-300 ease-in-out"
						style={{
							left: "30px",
							zIndex: 10,
						}}
					>
						{renderPartnerCard(partners[prevIndex], { compact: true, faded: true })}
					</div>

					<div
						className="absolute transition-all duration-300 ease-in-out"
						style={{
							left: "50%",
							transform: "translateX(-50%)",
							zIndex: 30,
						}}
					>
						{activePartner.url ? (
							<a
								href={activePartner.url}
								target="_blank"
								rel="noopener noreferrer"
								className="block"
							>
								{renderPartnerCard(activePartner)}
							</a>
						) : (
							renderPartnerCard(activePartner)
						)}
					</div>

					<div
						className="absolute transition-all duration-300 ease-in-out"
						style={{
							right: "30px",
							zIndex: 10,
						}}
					>
						{renderPartnerCard(partners[nextIndex], { compact: true, faded: true })}
					</div>
				</div>
			</div>

			<button
				type="button"
				onClick={handleNext}
				aria-label="Next partner"
				className="hidden md:block hover:opacity-70 transition-opacity"
			>
				<Image src={ArrowButton} alt="" className="w-8 md:w-[80%]" />
			</button>
		</div>
	);
}
