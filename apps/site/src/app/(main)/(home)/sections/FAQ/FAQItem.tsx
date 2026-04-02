"use client";

import { useState } from "react";
import Image from "next/image";
import { FAQ } from "./FAQ";

import cherry from "./assets/cherry.svg";
import apple from "./assets/apple.svg";
import orange from "./assets/orange.svg";
import pineapple from "./assets/pineapple.svg";
import melon from "./assets/melon.svg";
import blueberry from "./assets/blueberry.svg";

const FRUITS = [cherry, apple, orange, pineapple, melon, blueberry];
const FRUIT_ALTS = [
	"cherry",
	"apple",
	"orange",
	"pineapple",
	"melon",
	"blueberry",
];

const ChevronIcon = ({ open }: Readonly<{ open: boolean }>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#cf6868"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={`w-4 h-4 transition-transform duration-300 ${
			open ? "rotate-90" : ""
		}`}
	>
		<polyline points="9 18 15 12 9 6" />
	</svg>
);

export default function FAQItem({
	faq,
	index,
}: Readonly<{ faq: FAQ; index: number }>) {
	const [isOpen, setIsOpen] = useState(false);
	const fruitIndex = index % FRUITS.length;
	const fruit = FRUITS[fruitIndex];
	const fruitAlt = FRUIT_ALTS[fruitIndex];

	return (
		<div className="rounded-[28px] border-[3px] border-[#d77676] bg-white overflow-hidden transition-all duration-300">
			<button
				type="button"
				className="flex items-center w-full gap-4 px-5 py-4 text-left cursor-pointer min-h-[6rem]"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="flex-shrink-0 w-[40px] h-[40px] flex items-center justify-center">
					<Image
						src={fruit}
						alt={fruitAlt}
						width={50}
						height={50}
						className="w-[50px] h-[50px] object-contain"
					/>
				</span>
				<span className="font-sniglet text-[#2f3152] flex-1 text-xl leading-snug">
					{faq.question}
				</span>
				<div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f8c4c4] flex items-center justify-center">
					<ChevronIcon open={isOpen} />
				</div>
			</button>
			<div
				className={`grid transition-all duration-300 ease-in-out ${
					isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
				}`}
			>
				<div className="overflow-hidden">
					<div className="px-5 pb-5">
						<hr className="mt-0 mb-4 border-gray-200 opacity-100" />
						<div className="font-sniglet text-[#2f3152] text-sm leading-relaxed">
							{faq.answer}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
