import { PropsWithChildren } from "react";

import type { Metadata } from "next";

import stars from "@/assets/backgrounds/starry_repeatable.png";

import "./globals.css";

export const metadata: Metadata = {
	title: "VenusHacks 2026",
	description:
		"VenusHacks is UCI's largest women-centric hackathon, an annual event empowering women, gender minorities, and other underrepresented groups in tech. Hosted by WICS and Hack at UCI, the hackathon is open to participants of all experience levels with a mission to increase diversity in the tech industry by providing an inclusive community where students can receive the support to grow and express their creativity in computing.",
};

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div
			style={{ backgroundImage: `url(${stars.src})` }}
			className="overflow-x-hidden bg-top bg-repeat-y bg-[length:100%] relative"
		>
			{/* <Suspense fallback={<BaseNavbar />}>
				<NavbarParent />
			</Suspense> */}
			{children}
			{/* <Footer /> */}
		</div>
	);
}
