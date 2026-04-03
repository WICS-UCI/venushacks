"use client";

import Image from "next/image";
import React, { useState } from "react";

import OrangeCapybara from "./assets/Orange Capy.svg";
import YellowCapybara from "./assets/Pineapple Capy.svg";
import GreenCapybara from "./assets/Melon Capy.svg";
import BlueCapybara from "./assets/blueberry capy.svg";
import BrownCapybara from "./assets/Main Capy.svg";
import PinkCapybaraLeft from "./assets/cherry_1.svg";
import PinkCapybaraRight from "./assets/Cherry 2.svg";
import Basket from "./assets/picnic_basket.svg";
import Blanket from "./assets/thick_picnic_blanket 1.svg";
import Flower from "./assets/flower.svg";
import GrassTuft from "./assets/grass.svg";
import GrassTuftFlipped from "./assets/grass2.svg";
import Melon from "./assets/Melon.svg";
import Shadow from "./assets/shadow.svg";
import ShadowWide from "./assets/shadow-wide.svg";
import OpenBasket from "./assets/open_basket.svg";

const PicnicScene = () => {
	const [isBasketOpen, setIsBasketOpen] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	const handleBasketHover = () => {
		if (!isAnimating) {
			setIsAnimating(true);
		}
	};

	const handleBasketAnimationEnd = () => {
		if (isAnimating) {
			setIsBasketOpen((prev) => !prev);
			setIsAnimating(false);
		}
	};
	return (
		<div className="w-full flex justify-center overflow-hidden pb-20 -mt-12">
			<div className="relative w-full max-w-[1700px] aspect-[17/8]">
				{/* blanket hidden below md */}
				<div className="hidden md:block absolute bottom-[3%] left-1/2 -translate-x-1/2 w-[90.5%] z-10">
					<Image src={Blanket} alt="picnic blanket" className="w-full h-auto" />
				</div>

				{/* basket */}
				<div
					className={`absolute bottom-[19%] left-[47%] -translate-x-1/2 z-30 ${
						isBasketOpen ? "w-[25%]" : "w-[19.5%]"
					}`}
					onMouseEnter={handleBasketHover}
				>
					<Image
						src={isBasketOpen ? OpenBasket : Basket}
						alt="picnic basket"
						className={`w-full h-auto cursor-pointer ${
							isAnimating ? "animate-basketBounce" : ""
						}`}
						onAnimationEnd={handleBasketAnimationEnd}
					/>
				</div>

				{/* back row */}
				<div className="absolute bottom-[30.5%] left-[33.5%] w-[19.5%] z-20">
					<Image
						src={YellowCapybara}
						alt="yellow capybara"
						className="w-full h-auto hover:animate-capyBounce cursor-pointer"
					/>
				</div>

				<div className="absolute bottom-[30%] left-[17%] w-[22%] z-20">
					<Image
						src={OrangeCapybara}
						alt="orange capybara"
						className="w-full h-auto hover:animate-capyBounce cursor-pointer"
					/>
				</div>

				<div className="absolute bottom-[28.5%] left-[51%] w-[21%] z-20">
					<Image
						src={GreenCapybara}
						alt="green capybara"
						className="w-full h-auto hover:animate-capyBounce cursor-pointer"
					/>
				</div>

				<div className="absolute bottom-[53%] left-[46.5%] w-[8.5%] z-20">
					<Image src={Melon} alt="melon" className="w-full h-auto" />
				</div>

				<div className="absolute bottom-[20.5%] right-[13%] w-[20.5%] z-20">
					<Image
						src={BlueCapybara}
						alt="blue capybara"
						className="w-full h-auto hover:animate-capyBounce cursor-pointer"
					/>
				</div>

				{/* front row */}
				<div className="absolute bottom-[15%] left-[13%] w-[13.5%] z-30">
					<Image
						src={PinkCapybaraLeft}
						alt="pink capybara"
						className="w-full h-auto hover:animate-capyBounce cursor-pointer"
					/>
				</div>

				<div className="absolute bottom-[10.5%] left-[26%] w-[11.5%] z-30">
					<Image
						src={PinkCapybaraRight}
						alt="pink capybara"
						className="w-full h-auto hover:animate-capyBounce cursor-pointer"
					/>
				</div>

				<div className="absolute bottom-[6.5%] right-[26.5%] w-[18%] z-30">
					<Image
						src={BrownCapybara}
						alt="brown capybara"
						className="w-full h-auto hover:animate-capyBounce cursor-pointer"
					/>
				</div>

				{/* flowers */}
				<div className="absolute bottom-[-9%] left-[14%] w-[4.5%] z-10">
					<Image src={Flower} alt="flower" className="w-full h-auto" />
				</div>

				<div className="absolute bottom-[8%] right-[5%] w-[4.5%] z-10">
					<Image src={Flower} alt="flower" className="w-full h-auto" />
				</div>

				{/* grass tufts */}
				<div className="absolute bottom-[37%] left-[6%] w-[3%] z-10">
					<Image
						src={GrassTuftFlipped}
						alt="grass tuft"
						className="w-full h-auto"
					/>
				</div>

				<div className="absolute bottom-[-9.5%] right-[29%] w-[3%] z-10">
					<Image src={GrassTuft} alt="grass tuft" className="w-full h-auto" />
				</div>

				{/* shadows */}
				<div className="absolute bottom-[16%] left-[37.5%] w-[18%] z-10">
					<Image
						src={Shadow}
						alt="picnic basket shadow"
						className="w-full h-auto"
					/>
				</div>

				<div className="absolute bottom-[16%] left-[14.5%] w-[11%] z-10">
					<Image
						src={ShadowWide}
						alt="pink capy left shadow"
						className="w-full h-auto"
					/>
				</div>

				<div className="absolute bottom-[9%] left-[25%] w-[11%] z-10">
					<Image
						src={ShadowWide}
						alt="pink capy right shadow"
						className="w-full h-auto"
					/>
				</div>

				<div className="absolute bottom-[9%] left-[55%] w-[16%] z-10">
					<Image
						src={Shadow}
						alt="brown capy shadow"
						className="w-full h-auto"
					/>
				</div>

				<div className="absolute bottom-[18%] left-[66%] w-[20%] z-10">
					<Image
						src={Shadow}
						alt="blue capy shadow"
						className="w-full h-auto"
					/>
				</div>

				<div className="absolute bottom-[32%] left-[18%] w-[20%] z-10">
					<Image
						src={Shadow}
						alt="orange capy shadow"
						className="w-full h-auto"
					/>
				</div>

				<div className="absolute bottom-[32%] left-[36%] w-[20%] z-10">
					<Image
						src={Shadow}
						alt="yellow capy shadow"
						className="w-full h-auto"
					/>
				</div>

				<div className="absolute bottom-[31.5%] left-[46%] w-[20%] z-10">
					<Image
						src={Shadow}
						alt="green capy shadow"
						className="w-full h-auto"
					/>
				</div>
			</div>
		</div>
	);
};

export default PicnicScene;
