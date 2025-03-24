import Container from "react-bootstrap/Container";
import Title from "../title/Title";
import PrimaryButton from "../primary-button/PrimaryButton";

import "./Hero.scss";


const Hero = () => {
	return (
		<div className="hero-container">
			<div id="coral" />

			<Container className="d-flex flex-column align-items-center">
				<Title />
				<div className="button-row">
					<PrimaryButton href="/apply" type="button">Apply Now</PrimaryButton>
					<PrimaryButton href="/sponsor" type="button">Sponsor Us</PrimaryButton>
				</div>
			</Container>
		</div>
	);
};

export default Hero;
