"use client";

import { useState } from "react";
import { FAQ } from "./FAQ";

const FRUITS = ["🍒", "🍎", "🍊", "🍍", "🍈", "🫐"];

const ChevronIcon = ({ open }: { open: boolean }) => (
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

export default function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
	const [isOpen, setIsOpen] = useState(false);
	const fruit = FRUITS[index % FRUITS.length];

	return (
		<div
			className={`rounded-[28px] border-[3px] border-[#d77676] bg-white overflow-hidden transition-all duration-300`}
		>
			<button
				type="button"
				className="flex items-center w-full px-5 py-4 gap-4 text-left cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="text-3xl flex-shrink-0 leading-none">{fruit}</span>
				<span className="font-sniglet text-[#2f3152] flex-1 text-base leading-snug">
					{faq.question}
				</span>
				<div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#f8c4c4] border border-[#d77676] flex items-center justify-center">
					<ChevronIcon open={isOpen} />
				</div>
			</button>
			{isOpen && (
				<div className="px-5 pb-5">
					<hr className="border-gray-200 mb-4 mt-0 opacity-100" />
					<div className="font-sniglet text-[#2f3152] text-sm leading-relaxed">
						{faq.answer}
					</div>
				</div>
			)}
		</div>
	);
}
