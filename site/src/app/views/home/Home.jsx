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

const VH_DATE = "May 24 - 26, 2024";
const CONTACT_EMAIL = "venushacks.uci@gmail.com";

const Home = () => {
	return (
		<div className="Home">
			{/* HERO **********************/}
			{/* <section id="hero">
				<div id="hero-right">
					<img
						src={vh_title}
						alt="VenusHacks Title Logo"
						id="venushacks-title"
					/>
					<h4 id="date">{VH_DATE}</h4>
					<p id="tagline">UC Irvine&apos;s largest women-centric hackathon</p>
					<VenusButton url="/feedback" text="Feedback Form" />
					<VenusButton
						url="https://docs.google.com/presentation/d/1J8zlxYDR8AaiQXu7p_qg8xuav4qieKvU9AOkuwOJIhk/edit?usp=sharing"
						text="Closing Ceremony"
					/>
				</div>
				<div id="astronaut-animation"> */}
					{/* These assets are a background of a div instead of imgs to prevent
					them from being able to be saved to camera roll on iOS */}
					{/* <div id="boba" />
					<div id="astronaut" />
					<div id="laptop" />
					<div id="shiba-inu" />
				</div>
			</section>
			<div id="planet" />
			<h2 id="tanesha-moody-title">Tanesha Moody's Closing Speech</h2>
			<iframe
				src="https://drive.google.com/file/d/18y1D-co2T84_f287Eqj7NunVVTRM1-AP/preview"
				width="640"
				height="480"
				allow="autoplay"
				id="tanesha-moody"
			></iframe> */}

			{/* ABOUT **********************/}
			<section id="about">
				<About />
			</section>

			{/* FAQ ************************/}
			{/* <section id="faq">
				<img className="section-title" src={faq_title} alt="FAQ" />
				<div id="faq-container">
					<FAQs />
				</div>
				<p id="faq-contact-us">
					Additional logistic questions? Contact us at&nbsp;
					<a href={`mailto:${CONTACT_EMAIL}`} target="_top">
						{CONTACT_EMAIL}
					</a>
					.
				</p>
			</section>
			<Sponsors />
			<Partners /> */}

			{/* SPEAKERS ******************/}
			{/* <section id="speakers">
				<img className="section-title" src={speakers_title} alt="Speakers" />
				<Speakers />
			</section>

			<section id="meet-team">
				<img
					className="section-title"
					src={meet_team_title}
					alt="Meet the Team"
				/>
				<Team />
			</section>

			<Footer /> */}
		</div>
	);
};

export default Home;
