import Sponsor from "./Sponsor";

import sponsors_title from "/assets/images/titles/vh-sponsors.svg";

import odit from "/assets/images/2024-sponsors/odit.png";
import melissa from "/assets/images/2024-sponsors/melissa.png";
import antrepreneur from "/assets/images/2024-sponsors/antrepreneur-center.png";
import oai from "/assets/images/2024-sponsors/oai.png";
import spfb from "/assets/images/2024-sponsors/spfb.png";

import "./Sponsors.scss";

const CORPORATE_EMAIL = "sponsorships@venushacks.com";

const Sponsors = () => {
	return (
		<section id="sponsors">
			<img className="section-title" src={sponsors_title} alt="Sponsor" />
			<div id="sponsors-container">
				<div className="logo-wrapper medium">
					<Sponsor
						imgId="spfb"
						imgSrc={spfb}
						url="https://asuci.uci.edu/president/spfb/"
					/>
				</div>
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
			</div>
			{/* <p className="sponsor-contact-us">
				Join our movement, contact us at&nbsp;
				<a href={`mailto:${CORPORATE_EMAIL}`} target="_top">
					{CORPORATE_EMAIL}
				</a>
				.
			</p> */}
		</section>
	);
};

export default Sponsors;
