import { Footer, VenusButton } from "src/app/components";
import About from "src/app/components/about/About";
import FAQs from "src/app/components/faqs/FAQs";
import Team from "src/app/components/meet-team/team";
import Partners from "src/app/components/partners/Partners";
import Speakers from "src/app/components/speakers/speakers";
import Sponsors from "src/app/components/sponsors/Sponsors";

// import vh_title from "/assets/images/titles/venushacks.svg";
// import about_title from "/assets/images/titles/vh-about.svg";
// import faq_title from "/assets/images/titles/vh-faq.png";
// import speakers_title from "/assets/images/titles/vh-speakers.svg";
// import meet_team_title from "/assets/images/titles/vh-meet-the-team.svg";

import "./Home.scss";
import BottomGraphic from "src/app/components/bottom-graphic/BottomGraphic";

const VH_DATE = "May 24 - 26, 2024";
const CONTACT_EMAIL = "venushacks.uci@gmail.com";

const Home = () => {
	return (
		<div className="Home">
			{/* HERO **********************/}

			{/* ABOUT **********************/}
			<section id="about">
				<About />
			</section>

			{/* FAQ ************************/}
			<section id="faq">
				<div id="faq-container">
					<h2 className="section-title">FAQs</h2>
					<FAQs />
				</div>
			</section>
			{/* <Sponsors />
			<Partners /> */}

			{/* SPEAKERS ******************/}
			<section id="speakers">
			</section>

			<section id="meet-team">
			</section>

			{/* BOTTOM GRAPHIC ******************/}
			<section id="bottom-graphic">
				<BottomGraphic />
			</section>

			<Footer />
		</div>
	);
};

export default Home;
