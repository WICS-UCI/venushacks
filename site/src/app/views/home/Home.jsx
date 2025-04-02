import About from "src/app/components/about/About";
import FAQs from "src/app/components/faqs/FAQs";
import Hero from "src/app/components/hero/Hero";

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
		</div>
	);
};

export default Home;
