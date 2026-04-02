"use client";

import Image from "next/image";
import pond from "./assets/Pond.svg";
import rainbow from "./assets/Rainbow.svg";
import ant from "./assets/Ant.svg";
import basket from "./assets/PicnicBasket.svg";
import yellow from "./assets/HappyYellowCapy.svg";
import green from "./assets/HappyGreenCapy.svg";
import float from "./assets/HappyFloatingCapy.svg";
import apple from "./assets/Apple.svg";
import orange from "./assets/HappyOrange.svg";
import splash from "./assets/WaterSplash.svg";
import ant2 from "./assets/Ant2.svg";
import blue from "./assets/HappyBlueCapy.svg";
import red from "./assets/HappyRedCapy.svg";
import cherry from "./assets/Cherries.svg";
import shadow from "./assets/Shadows.svg";
import flower from "./assets/flower.svg";
import grass1 from "./assets/grass.svg";
import grass2 from "./assets/grass2.svg";
import flyLine from "./assets/dotted-line.svg";

import { motion } from "framer-motion";

const FooterGraphic = () => {
	return (
		<section className="relative flex w-full aspect-[1280/1000] max-w-[1600px] mx-auto">
			<div className="">
				<div className={"scale-125 -z-10 flex justify-center"}>
                    <Image src={flyLine} alt="fly line" />
				</div>
				<Image
                    src={shadow}
					alt="Shadows"
					className="absolute left-[49%] top-[67%] w-[90%] -translate-x-1/2 -translate-y-1/2"
				/>
				<Image
					src={rainbow}
					alt="Rainbow"
					className="absolute left-[40%] top-[35%] w-[50%] -translate-x-1/2 -translate-y-1/2"
				/>
				<Image
					src={pond}
					alt="Pond"
					className="absolute left-1/2 top-1/2  w-[80%] -translate-x-1/2 -translate-y-1/2"
				/>
				<motion.div
					className="absolute left-[50%] top-[34%] w-[17%] -translate-x-1/2 -translate-y-1/2"
					animate={{ y: [0, -12, 0] }}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src={float} alt="Floating Capybara" className={""} />
					<Image
						src={apple}
						alt="Apple"
						className="absolute left-[50%] top-[13%] w-[22%] -translate-x-1/2 -translate-y-1/2"
					/>
				</motion.div>
				<Image
					src={yellow}
					alt="Yellow Capybara"
					className="absolute left-[67%] top-[63%] w-[17%] -translate-x-1/2 -translate-y-1/2"
				/>
				<Image
					src={green}
					alt="Green Capybara"
					className="absolute left-[86%] top-[54%] w-[18%] -translate-x-1/2 -translate-y-1/2"
				/>
				<Image
					src={basket}
					alt="basket"
					className="absolute left-[80%] top-[68%] w-[13%] -translate-x-1/2 -translate-y-1/2"
				/>
				<Image
					src={ant}
					alt="ant1"
					className="absolute left-[90%] top-[80%] w-[15%] -translate-x-1/2 -translate-y-1/2"
				/>
				<motion.div
					className={
						"absolute left-[30%] top-[43%] w-[18%] -translate-x-1/2 -translate-y-1/2"
					}
					animate={{ rotate: [-3, 3, -3] }}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src={orange} alt="Orange Capybara" className={""} />
				</motion.div>
				<motion.div
					className={"absolute left-[28%] top-[47%] w-[26%]"}
					animate={{ scale: [1.1, 1, 1.1] }}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<Image src={splash} alt="Splash" className={""} />
				</motion.div>
				<Image
					src={ant2}
					alt="Ant2"
					className="absolute left-[11%] top-[47%] w-[12%] -translate-x-1/2 -translate-y-1/2"
				/>
				<Image
					src={blue}
					alt="Blue Capybara"
					className="absolute left-[20%] top-[60%] w-[19%] -translate-x-1/2 -translate-y-1/2"
				/>
				<Image
					src={red}
					alt="Red Capybara"
					className="absolute left-[32%] top-[72%] w-[24%] -translate-x-1/2 -translate-y-1/2"
				/>
				<Image
					src={cherry}
					alt="Cherry"
					className="absolute left-[41%] top-[69%] w-[5%] -translate-x-1/2 -translate-y-1/2"
				/>
				<Image
					src={flower}
					alt="flower"
					className={"absolute top-[25%] left-[10%] w-[clamp(10px,5%,60px)]"}
				/>
				<Image
					src={flower}
					alt="flower"
					className={"absolute top-[78%] left-[55%] w-[clamp(10px,5%,60px)]"}
				/>
				<Image
					src={grass1}
					alt="grass"
					className={"absolute top-[25%] left-[80%] w-[clamp(10px,3%,60px)]"}
				/>
				<Image
					src={grass2}
					alt="grass"
					className={"absolute top-[70%] left-[90%] w-[clamp(10px,3%,60px)]"}
				/>
				<Image
					src={grass2}
					alt="grass"
					className={"absolute top-[75%] left-[10%] w-[clamp(10px,3%,60px)]"}
				/>
			</div>
		</section>
	);
};

export default FooterGraphic;
