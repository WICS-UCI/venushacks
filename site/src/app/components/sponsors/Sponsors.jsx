import Sponsor from "./Sponsor";

import placeholder from "/assets/images/shell.svg";

import "./Sponsors.scss";

const CORPORATE_EMAIL = "sponsorships@venushacks.com";

const Sponsors = () => {
	return (

			<div id="all-sponsors">
				<h2 className="sponsor-title">SPONSORS</h2>
				<div className='sponsor'>
					<Sponsor
						imgId="spfb"
						imgSrc={placeholder}
						url="https://asuci.uci.edu/president/spfb/"
					/>
				</div>
				<div className='sponsor'>
					<Sponsor 
						imgId="odit" 
						imgSrc={placeholder} 
						url="https://odit.uci.edu/" 
					/>
				</div>
				<div className='sponsor'>
					<Sponsor
						imgId="melissa"
						imgSrc={placeholder}
						url="https://www.melissa.com/"
					/>
				</div>
				<div className='sponsor'>
					<Sponsor
						imgId="antrepreneur"
						imgSrc={placeholder}
						url="https://antrepreneur.uci.edu/"
					/>
				</div>
				<div className='sponsor'>
					<Sponsor
						imgId="antrepreneur"
						imgSrc={placeholder}
						url="https://antrepreneur.uci.edu/"
					/>
				</div>
			</div>
		
	);
};

export default Sponsors;
