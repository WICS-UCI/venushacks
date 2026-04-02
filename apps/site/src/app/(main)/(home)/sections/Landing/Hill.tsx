"use client";

import Image from "next/image";
import hill from "./assets/hill.svg";
import hill_outline from "./assets/hill_outline.svg";

export default function Hill() {
	return (
		<div>
			<div className="absolute z-10">
				<Image src={hill_outline} alt="hill outline" />
			</div>
			<div>
				<Image src={hill} alt="hill fill" />
			</div>
			<div className="absolute bg-[#C5C771] w-full h-full" />
		</div>
	);
}
