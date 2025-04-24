import Container from "react-bootstrap/Container";
import Title from "../title/Title";
import PrimaryButton from "../primary-button/PrimaryButton";

import "./HeroTitle.scss";

export default function HeroTitle() {
	return (
		<Container className="d-flex flex-column align-items-center content-container">
			<Title />
			<div className="button-row">
				<PrimaryButton
					href="/apply"
					type="button"
				>
					Apply Now
				</PrimaryButton>
				<PrimaryButton
					href="mailto:venushacks.corporate@gmail.com"
					type="button"
				>
					Sponsor Us
				</PrimaryButton>
			</div>
		</Container>
	);
}
