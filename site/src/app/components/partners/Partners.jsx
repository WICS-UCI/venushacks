import Partner from "./Partner";

import placeholder from "/assets/images/shell.svg";

import "./Partners.scss";

const Partners = () => {
	return (
		<section id="partners">
			<div id="partners-container">
				{/* <h2 className="partner-title">Partners</h2> */}
				<input type="button" value="<" />
				<div className="bubble">
					<div className="pop">
						<div className="bckgrd">
							<Partner
								imgId="design"
								imgSrc={placeholder}
								url="https://designatuci.com/"
							/>
						</div>
					</div>
				</div>
				<div className="bubble cur">
					<div className="pop">
						<Partner
							imgId="design"
							imgSrc={placeholder}
							url="https://designatuci.com/"
						/>
					</div>
				</div>
				<div className="bubble">
					<div className="pop">
						<Partner
							imgId="design"
							imgSrc={placeholder}
							url="https://designatuci.com/"
						/>
					</div>
				</div>
				<input type="button" value=">" />
			</div>
		</section>
	);
};

export default Partners;
