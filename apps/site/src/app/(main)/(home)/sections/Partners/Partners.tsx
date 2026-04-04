import Image from "next/image";
import PartnersCarousel from "./PartnersCarousel";

import { getPartners } from "./getPartners";

import flower from "@/assets/icons/flower.svg";
import grass from "@/assets/icons/right_grass.svg";
import SmallStar from "@/assets/icons/small_star.svg";

export default async function Partners() {
	const { partners } = await getPartners();

	if (!partners?.length) {
		return null;
	}

	return (
		<section className="container py-24 relative mx-auto max-w-screen-2xl ">
			{/* <Image
				src={SmallStar}
				alt=""
				className="absolute left-16 top-32 hidden lg:block"
				width={42}
				height={42}
			/>
			<Image
				src={SmallStar}
				alt=""
				className="absolute left-32 top-48 hidden xl:block"
				width={42}
				height={42}
			/>
			<Image
				src={SmallStar}
				alt=""
				className="absolute left-20 top-72 hidden lg:block"
				width={30}
				height={30}
			/>
			<Image
				src={SmallStar}
				alt=""
				className="absolute right-32 bottom-24 hidden lg:block"
				width={42}
				height={42}
			/>
			<Image
				src={SmallStar}
				alt=""
				className="absolute right-24 bottom-48 hidden lg:block"
				width={42}
				height={42}
			/> */}

			<h2
				className="mx-auto mb-16 flex items-center justify-center text-center"
				style={{
					width: "min(100%, 1201.67px)",
					height: "88px",
					fontFamily: "Torus Pro",
					fontWeight: 700,
					fontStyle: "normal",
					fontSize: "78px",
					lineHeight: "86px",
					letterSpacing: "0.2em",
					color: "#2F3248",
				}}
			>
				Partners
			</h2>

			<PartnersCarousel partners={partners} />

			<div className="relative left-56">
				<Image src={flower} alt="flower" />
			</div>
		</section>
	);
}
