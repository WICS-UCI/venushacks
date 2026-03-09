"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Sniglet, Figtree } from "next/font/google";

import submitImage from "@/assets/images/vh_submit.png";

// Custom fonts

const sniglet = Sniglet({
	subsets: ["latin"],
	weight: ["400"],
});

const figtree = Figtree({
	subsets: ["latin"],
	weight: ["500", "700"],
});

// Component signature can be declared with roles for dynamic span text
export default function ApplicationSubmittedModal({
	role,
}: {
	role: "hacker" | "mentor" | "volunteer";
}) {
	// router to redirect with buttons
	const router = useRouter();

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center px-4">
			<div
				className={`w-full max-w-[659px] md:w-[659px] md:h-[525px] bg-white rounded-[30px] shadow-xl p-6 md:p-[40px] flex flex-col gap-6 md:gap-[30px] text-center ${figtree.className}`}
			>
				<div className="relative mx-auto w-full max-w-[314px] aspect-[314/199]">
					<Image
						src={submitImage}
						alt="Submission Illustration"
						fill
						className="object-contain"
						priority
					/>
				</div>
				{/* Header Text */}
				<h2
					className={`${sniglet.className} text-[30px] leading-[100%] tracking-[0.05em] font-normal text-center text-black`}
				>
					Application Successfully Submitted
				</h2>
				{/* Thank you <p> text */}
				<p className="text-[16px] leading-[120%] tracking-[0.05em] tracking-[0em] font-normal text-center text-black">
					Thank you for submitting your{" "}
					<span className="font-bold capitalize">{role}</span> application to
					VenusHacks 2026! Keep an eye out for an email from us when an update
					is made to your application. Please give us a few weeks to go through
					all the applications, and if you have any further questions, feel free
					to email us at venushacks.uci@gmail.com.
				</p>
				{/* Div containing Buttons */}
				<div className="flex flex-col md:flex-row gap-4 w-full">
					<button
						onClick={() => router.push("/")}
						className={`w-full md:flex-1 px-8 py-3 text-[16px] font-bold border rounded-full transition-opacity`}
						type="submit"
						style={{
							background: "#FFECEC",
							color: "#CF6868",
							borderColor: "#CF6868",
						}}
					>
						← Back to Home Page
					</button>

					<button
						onClick={() => router.push("/portal")}
						className={`w-full md:flex-1 px-8 py-3 text-base font-bold border-[1px] rounded-full whitespace-nowrap transition-opacity`}
						type="submit"
						style={{
							background: "#F8C4C4",
							color: "#CF6868",
							borderColor: "#CF6868",
						}}
					>
						Visit Application Dashboard →
					</button>
				</div>
			</div>
		</div>
	);
}
