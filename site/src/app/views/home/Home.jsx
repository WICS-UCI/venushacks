import Hero from "src/app/components/hero/Hero";
import About from "src/app/components/about/About";
import FAQs from "src/app/components/faqs/FAQs";
import Sponsors from "src/app/components/sponsors/Sponsors";
import Partners from "src/app/components/partners/Partners";
import MeetTheTeam from "src/app/components/meet-the-team/MeetTheTeam";
import BottomGraphic from "src/app/components/bottom-graphic/BottomGraphic";

import "./Home.scss";

const VH_DATE = "May 24 - 26, 2024";
const CONTACT_EMAIL = "venushacks.uci@gmail.com";

const Home = () => {
	return (
		<div className="Home">
			{/* HERO **********************/}
			<section id="hero">
				<Hero />
			</section>

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

			{/* SPONSORS ************************/}
			<section id="sponsors">
				<div id="sponsors-container">
					<h2 className="section-title">SPONSORS</h2>
					<Sponsors />
				</div>
			</section>

			{/* PARTNERS ************************/}
			<section id="partner">
				<div id="partners-container">
					<h2 className="section-title">PARTNERS</h2>
					<Partners />
				</div>
			</section>

			{/* MEET THE TEAM ************************/}
			<section id="meet-the-team">
				<div id="meet-the-team-container">
					<h2 className="section-title">MEET THE TEAM</h2>
					<MeetTheTeam />
				</div>
			</section>

			{/* BOTTOM GRAPHIC ******************/}
			<section id="bottom-graphic">
				<BottomGraphic />
			</section>
		</div>
	);
};

export default Home;
