import Image from "next/image";
import sched1 from "./assets/day1_sched.svg";
import sched2 from "./assets/day2_sched.svg";
import logo from "@/lib/components/logo.png";

export default async function Schedules() {
	return (
		<>
			<style>{`body { background-color: #BEE7E1 !important; }`}</style>
			<div className="absolute z-10 right-5 top-5">
				<Image
					src={logo}
					className="w-10 md:w-20"
					alt="logo"
					width="80"
					height="80"
				/>
			</div>
			<section className="container py-14 md:py-24 relative mx-auto max-w-screen-2xl bg-[#BEE7E1] px-14">
				<div className="flex justify-center items-center flex-col gap-10">
					<Image src={sched1} width={600} height={500} alt="day 1 schedule" />
					<Image src={sched2} width={600} height={500} alt="day 2 schedule" />
				</div>
			</section>
		</>
	);
}
