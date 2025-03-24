import FAQs from "src/app/components/faqs/FAQs";
import Sponsors from "src/app/components/sponsors/Sponsors";
import Partners from "src/app/components/partners/Partners";
import Speakers from "src/app/components/speakers/speakers";
import Team from "src/app/components/meet-team/team";
import { Footer, VenusButton } from "src/app/components";

// import vh_title from "/assets/images/titles/venushacks.svg";
// import about_title from "/assets/images/titles/vh-about.svg";
// import faq_title from "/assets/images/titles/vh-faq.png";
// import speakers_title from "/assets/images/titles/vh-speakers.svg";
// import meet_team_title from "/assets/images/titles/vh-meet-the-team.svg";

import "./Home.scss";
import Hero from "src/app/components/hero/Hero";

const VH_DATE = "May 24 - 26, 2024";
const CONTACT_EMAIL = "venushacks.uci@gmail.com";

const Home = () => {
	console.log("rendering home");
	return (
		<div className="Home">
			{/* HERO **********************/}
			<Hero />

			{/* ABOUT **********************/}

			{/* FAQ ************************/}

			{/* SPONSORS *******************/}
			{/* PARTNERS *******************/}

			{/* SPEAKERS ******************/}

			{/* <Footer /> */}
		</div>
	);
};

export default Home;
