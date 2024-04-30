import FAQs from "src/app/components/faqs/FAQs";
import { VenusButton } from "src/app/components";

import vhTitle from "/assets/images/titles/vh-title-launch.svg";
import about_title from "/assets/images/titles/vh-about.svg";
import faq_title from "/assets/images/titles/vh-faq.svg";

import "./Home.scss";

const VH_DATE = "May 24 - 26, 2024";
const CONTACT_EMAIL = "contact@venushacks.com";
// const CORPORATE_EMAIL = 'sponsorships@venushacks.com';

const Home = () => {
	return (
		<div className="Home">
			{/* HERO **********************/}
			<section id="hero">
				<div id="astronaut-animation">
					{/* These assets are a background of a div instead of imgs to prevent
					them from being able to be saved to camera roll on iOS */}
					<div id="boba" />
					<div id="astronaut" />
					<div id="laptop" />
					<div id="shiba-inu" />
				</div>

				<div id="hero-right">
					<img
						src={vhTitle}
						alt="VenusHacks Title Logo"
						id="venushacks-title"
					/>
					<h4 id="date">{VH_DATE}</h4>
					<p id="tagline">UC Irvine&apos;s largest women-centric hackathon</p>
					<p id="apps">Apps are now open!</p>
					<VenusButton text="Hacker" url="https://tally.so/r/wvyaW0" />
					<VenusButton
						text="Mentor"
						url="https://x03p1nm9c8s.typeform.com/to/tbReYJHH"
					/>
					<VenusButton text="Volunteer" url="https://tally.so/r/w48aRA" />
				</div>
			</section>
			<section id="about">
				<img className="section-title" src={about_title} alt="About" />
				<div id="about-text-container">
					<p>
						VenusHacks is UCI’s largest women-centric hackathon, an annual event
						empowering women, gender minorities, and other underrepresented
						groups in tech. Hosted by&nbsp;
						<a
							href="https://wics.ics.uci.edu/"
							target="_blank"
							rel="noopener noreferrer"
						>
							WICS
						</a>{" "}
						and&nbsp;
						<a
							href="https://hack.ics.uci.edu/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Hack at UCI
						</a>
						,&nbsp;the hackathon is open to participants of all experience
						levels with a mission to increase diversity in the tech industry by
						providing an inclusive community where students can receive the
						support to grow and express their creativity in computing.
					</p>
					<p>
						This year, VenusHacks will take place fully in-person in Spring
						2024! Join us as we welcome high school (18+), undergraduate, and
						graduate students to participate in our 36-hour (non-overnight)
						event that includes workshops, networking, fun activities, free food
						and swag, and lots of coding! Happy hacking!
					</p>
				</div>
			</section>
			<section id="faq">
				<img className="section-title" src={faq_title} alt="FAQ" />
				<FAQs />
				<p id="faq-contact-us">
					Additional logistic questions? Contact us at&nbsp;
					<a href={`mailto:${CONTACT_EMAIL}`} target="_top">
						{CONTACT_EMAIL}
					</a>
					.
				</p>
			</section>
		</div>
	);
};

export default Home;
