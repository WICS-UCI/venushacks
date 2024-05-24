import Partner from "./Partner";

import partners_title from "/assets/images/titles/vh-partners.png";

import acm from "/assets/images/2024-partners/acm.png";
import cyber from "/assets/images/2024-partners/cyber.png";
import design from "/assets/images/2024-partners/design.png";
import hack from "/assets/images/2024-partners/hack.png";
import icssc from "/assets/images/2024-partners/icssc.png";
import wics from "/assets/images/2024-partners/wics.png";
import data from "/assets/images/2024-partners/data.png";

import "./Partners.scss";

const Partners = () => {
	return (
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
					<Partner imgId="wics" imgSrc={wics} url="https://wics.ics.uci.edu/" />
					<Partner imgId="hack" imgSrc={hack} url="https://hack.ics.uci.edu/" />
					<Partner
						imgId="data"
						imgSrc={data}
						url="https://www.dataatuci.com/"
					/>
				</div>
			</div>
		</section>
	);
};

export default Partners;
