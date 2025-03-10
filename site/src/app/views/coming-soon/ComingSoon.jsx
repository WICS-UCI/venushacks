import Container from "react-bootstrap/Container";

import ResourceCard from "src/app/components/resources/Resources";
import ComingSoonTitle from "src/app/components/coming-soon/ComingSoonTitle";
import ComingSoonForm from "src/app/components/coming-soon-form/ComingSoonForm";

import "./ComingSoon.scss";

const ComingSoon = () => {
	return (
		<div className="coming-soon-container">
			<div id="left-fishes" />
			<div id="right-fishes" />
			<div id="coral" />

			<Container className="d-flex flex-column align-items-center">
				<ResourceCard />
				<ComingSoonTitle />
				<ComingSoonForm />
			</Container>
		</div>
	);
};

export default ComingSoon;
