import FAQs from "src/app/components/faqs/FAQs";
import Sponsor from "src/app/components/sponsor/Sponsor";
import Partner from "src/app/components/partner/Partner";

import vhTitle from "/assets/images/titles/vh-title-launch.svg";
import about_title from "/assets/images/titles/vh-about.svg";
import faq_title from "/assets/images/titles/vh-faq.svg";
import sponsors_title from "/assets/images/titles/vh-sponsors.svg";
import partners_title from "/assets/images/titles/vh-partners.svg";

import odit from "/assets/images/2024-sponsors/odit.png";
import melissa from "/assets/images/2024-sponsors/melissa.png";
import antrepreneur from "/assets/images/2024-sponsors/antrepreneur-center.png";
import oai from "/assets/images/2024-sponsors/office-access-inclusion.png";
import spfb from "/assets/images/2024-sponsors/spfb.png";

import acm from "/assets/images/2024-partners/acm.png";
import cyber from "/assets/images/2024-partners/cyber.png";
import design from "/assets/images/2024-partners/design.png";
import hack from "/assets/images/2024-partners/hack.png";
import icssc from "/assets/images/2024-partners/icssc.jpg";
import wics from "/assets/images/2024-partners/wics.png";

import "./Home.scss";

const VH_DATE = "May 24 - 26, 2024";
const CONTACT_EMAIL = "venushacks.uci@gmail.com";
const CORPORATE_EMAIL = "sponsorships@venushacks.com";

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
				</div>
			</section>

			{/* ABOUT **********************/}
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
							className="about-url"
						>
							WICS
						</a>{" "}
						and&nbsp;
						<a
							href="https://hack.ics.uci.edu/"
							target="_blank"
							rel="noopener noreferrer"
							className="about-url"
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

			{/* FAQ ************************/}
			<section id="faq">
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

			{/* SPONSORS **********************/}
			<section id="sponsors">
				<img className="section-title" src={sponsors_title} alt="Sponsor" />
				<div id="sponsors-container">
					<div className="logo-wrapper largest">
						<Sponsor imgId="odit" imgSrc={odit} url="https://odit.uci.edu/" />
					</div>
					<div className="logo-wrapper large">
						<Sponsor
							imgId="melissa"
							imgSrc={melissa}
							url="https://www.melissa.com/"
						/>
					</div>
					<div className="logo-wrapper medium">
						<Sponsor
							imgId="antrepreneur"
							imgSrc={antrepreneur}
							url="https://antrepreneur.uci.edu/"
						/>
					</div>
					<div className="logo-wrapper medium">
						<Sponsor imgId="oai" imgSrc={oai} url="https://oai.tech.uci.edu/" />
					</div>
					<div className="logo-wrapper medium">
						<Sponsor
							imgId="spfb"
							imgSrc={spfb}
							url="https://asuci.uci.edu/president/spfb/"
						/>
					</div>
				</div>
				<p className="sponsor-contact-us">
					Join our movement, contact us at&nbsp;
					<a href={`mailto:${CORPORATE_EMAIL}`} target="_top">
						{CORPORATE_EMAIL}
					</a>
					.
				</p>
			</section>

			{/* PARTNERS **********************/}
			<section id="partners">
				<img className="section-title" src={partners_title} alt="Partners" />
				<div id="partners-container">
					<div className="logo-wrapper medium">
						<Partner
							imgId="design"
							imgSrc={design}
							url="https://designatuci.com/"
						/>
						<Partner imgId="acm" imgSrc={acm} url="https://www.acm-uci.org/" />
						<Partner imgId="cyber" imgSrc={cyber} url="https://cyberuci.com/" />
						<Partner
							imgId="icssc"
							imgSrc={icssc}
							url="https://studentcouncil.ics.uci.edu/"
						/>
						<Partner
							imgId="wics"
							imgSrc={wics}
							url="https://wics.ics.uci.edu/"
						/>
						<Partner
							imgId="hack"
							imgSrc={hack}
							url="https://hack.ics.uci.edu/"
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
