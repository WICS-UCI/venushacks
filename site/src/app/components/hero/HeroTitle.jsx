import Container from "react-bootstrap/Container";
import Title from "../title/Title";
import PrimaryButton from "../primary-button/PrimaryButton";

import "./HeroTitle.scss";

export default function HeroTitle() {
	return (
		<Container className="d-flex flex-column align-items-center content-container">
			<Title />
			<div className="button-row">
				<PrimaryButton href="/midway" type="button">
					Midway Checkin
				</PrimaryButton>
				<PrimaryButton href="/report" type="button">
					Incident Form
				</PrimaryButton>
			</div>
		</Container>
	);
}
