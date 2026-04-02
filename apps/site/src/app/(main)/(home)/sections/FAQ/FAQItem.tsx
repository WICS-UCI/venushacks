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
const FRUIT_ALTS = ["cherry", "apple", "orange", "pineapple", "melon", "blueberry"];

const ChevronIcon = ({ open }: Readonly<{ open: boolean }>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#cf6868"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
	>
		<polyline points="9 18 15 12 9 6" />
	</svg>
);

export default function FAQItem({ faq, index }: Readonly<{ faq: FAQ; index: number }>) {
	const [isOpen, setIsOpen] = useState(false);
	const fruitIndex = index % FRUITS.length;
	const fruit = FRUITS[fruitIndex];
	const fruitAlt = FRUIT_ALTS[fruitIndex];

	return (
		<div className="rounded-[28px] border-[3px] border-[#d77676] bg-white overflow-hidden transition-all duration-300">
			<button
				type="button"
				className="flex items-center w-full gap-4 px-5 py-4 text-left cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="flex-shrink-0">
					<Image src={fruit} alt={fruitAlt} width={40} height={40} />
				</span>
				<span className="font-sniglet text-[#2f3152] flex-1 text-base leading-snug">
					{faq.question}
				</span>
				<div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f8c4c4] flex items-center justify-center">
					<ChevronIcon open={isOpen} />
				</div>
			</button>
			<div
				className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}
			>
				<div className="px-5 pb-5">
					<hr className="mt-0 mb-4 border-gray-200 opacity-100" />
					<div className="font-sniglet text-[#2f3152] text-sm leading-relaxed">
						{faq.answer}
					</div>
				</div>
			</div>
		</div>
	);
}
