import {
	Landing,
	FooterGraphic,
	ChooseCharacter,
	FAQ,
	Sponsors,
	Partners,
	Organizers,
	Footer,
} from "./sections";

import ComingSoon from "./sections/Landing/ComingSoon";

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
			<section id="home">
				<Landing />
			</section>
			<section id="faqs">
				<FAQ />
			</section>
			<section id="sponsors">
				<Sponsors />
			</section>
			<section id="partners">
				<Partners />
			</section>
			<section id="team">
				<Organizers />
			</section>
			<FooterGraphic />
      <Footer />
		</>
	);
}
