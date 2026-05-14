import { Suspense } from "react";

import NavbarParent from "@/lib/components/Navbar/NavbarParent";
import BaseNavbar from "@/lib/components/Navbar/BaseNavbar";
import ComingSoon from "./sections/Landing/ComingSoon";

import {
	Landing,
	About,
	FooterGraphic,
	FAQ,
	Sponsors,
	Partners,
	Organizers,
	Footer,
	PrizeTracks,
} from "./sections";

export const revalidate = 60;

export default function Home() {
	// Show landing section only if still in maintenance,
	// otherwise show the rest of the sections
	return process.env.MAINTENANCE_MODE_HOME ? (
		<>
			<ComingSoon />
		</>
	) : (
		<>
			{!process.env.MAINTENANCE_MODE_HOME && (
				<Suspense fallback={<BaseNavbar />}>
					<NavbarParent />
				</Suspense>
			)}
			<section id="home">
				<Landing />
			</section>
			<section id="about">
				<About />
			</section>
			<section id="faqs">
				<FAQ />
			</section>
			<section id="sponsors">
				<Sponsors />
			</section>
			<section id="partners">
				<Partners />
			</section> */}
			<section id="prizes">
				<PrizeTracks />
			</section>
			<section id="team">
				<Organizers />
			</section>
			<FooterGraphic />
			<Footer />
		</>
	);
}
