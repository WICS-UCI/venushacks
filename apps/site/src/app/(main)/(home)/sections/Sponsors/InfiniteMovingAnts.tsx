"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import blueberry from "./assets/blueberry_ant.svg";
import apple from "./assets/apple_ant.svg";
import melon from "./assets/melon_ant.svg";
import orange from "./assets/orange_ant.svg";
import pineapple from "./assets/pineapple_ant.svg";
import { urlFor } from "@/lib/sanity/image";

const sponsorGraphics = [apple, blueberry, melon, orange, pineapple];

export const InfiniteMovingAnts = ({
	items,
	direction = "left",
	speed = "fast",
	pauseOnHover = true,
}: {
	items: {
		name: string;
		logo: string;
		url: string | undefined;
	}[];
	direction?: "left" | "right";
	speed?: "fast" | "normal" | "slow";
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLUListElement>(null);
	const [start, setStart] = useState(true);
	const hasClonedRef = React.useRef(false);

	useEffect(() => {
		if (!containerRef.current || !scrollerRef.current) return;

		// Clone items multiple times to ensure smooth infinite scroll
		const scroller = scrollerRef.current;
		const children = Array.from(scroller.children);
		if (hasClonedRef.current) return;

		// Clone until scroller is at least 2x container width
		for (let i: number = 0; i < 4; i++) {
			children.forEach((child) => scroller.appendChild(child.cloneNode(true)));
		}
		console.log("Copies: " + children.length);

		hasClonedRef.current = true;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setStart(true);
					}
				});
			},
			{ threshold: 0.1 },
		);

		observer.observe(containerRef.current);

		return () => observer.disconnect();
	}, []);

	const duration =
		speed === "fast" ? "30s" : speed === "normal" ? "70s" : "100s";

	return (
		<div
			ref={containerRef}
			className="scroller relative z-[20]"
			style={
				{
					"--duration": duration,
				} as React.CSSProperties
			}
		>
			<ul
				key={duration}
				ref={scrollerRef}
				className={`flex shrink-0  w-max flex-nowrap items-center justify-center ${
					start ? "animate-scroll" : ""
				} ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""} ${
					direction === "right" ? "[animation-direction:reverse]" : ""
				}`}
			>
				{items.map((item, idx) => {
					const graphic = sponsorGraphics[idx % sponsorGraphics.length]; // cycle through graphics
					return (
						<li
							key={`${item}-${idx}`}
							className="relative flex-none transition-transform hover:scale-105"
						>
							<a
								href={item.url}
								target="_blank"
								className="border-2 relative flex w-[180px] lg:w-[470px] aspect-[3/2] lg:aspect-[4/3] justify-center items-center"
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<div
									className={
										"relative aspect-[6/7.5] flex items-end justify-center"
									}
								>
									<Image
										src={graphic}
										alt={item.name}
										className="w-[80%] max-h-full"
									/>
								</div>
								<div
									className={
										"absolute z-10 flex justify-center \
                                    w-[67px] lg:h-1/2 lg:w-1/2  \
                                    left-[60px] top-[53%] lg:top-[35%] lg:left-[27%]"
									}
								>
									{item.logo ? (
										<Image
											src={urlFor(item.logo).url()}
											alt={item.name}
											width={150}
											height={100}
											className="absolute object-contain top-[45%]"
										/>
									) : (
										<h2
											className={
												"absolute text-black z-[20] text-center w-[20%]"
											}
										>
											{item.name}
										</h2>
									)}
								</div>
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
