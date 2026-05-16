import Image from "next/image";
import sched1 from "./assets/day1_sched.png";
import sched2 from "./assets/day2_sched.png";
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
			<section className="container py-20 md:py-24 relative mx-auto max-w-screen-2xl bg-[#BEE7E1] px-6 md:px-14">
				<div className="flex justify-center items-center flex-col gap-10">
					<Image priority src={sched1} width={800} height={500} alt="day 1 schedule" className="border-[5px] md:border-[20px] border-white rounded-[30px] md:rounded-[50px]" />
					<Image src={sched2} width={800} height={500} alt="day 2 schedule" className="border-[5px] md:border-[20px] border-white rounded-[30px] md:rounded-[50px]" />
				</div>
			</section>
		</>
	);
}
