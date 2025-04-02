import { Parallax } from "react-scroll-parallax";
import Container from "react-bootstrap/Container";
import Title from "../title/Title";
import PrimaryButton from "../primary-button/PrimaryButton";

import "./CoralParallaxSection.scss";

const translatePositions = [
	[0, 35],
	[0, 65],
	[0, 110],
];

const CoralParallaxLayer = ({ id }) => {
	const arrIndex = id - 2;
	return (
		<Parallax
			id={`coral${id}`}
			translateY={translatePositions[arrIndex]}
			className="coral"
			style={{
				position: "absolute",
				zIndex: -id,
			}}
		>
			<img
				src={`/assets/images/coral${id}.svg`}
				alt={`Coral Layer ${id}`}
				style={{
					width: "100%",
					height: "auto",
				}}
			/>
		</Parallax>
	);
};

const CoralParallaxSection = () => {
	return (
		<>
			<div className="overflow-container">
				<div className="background-container">
					{[2, 3, 4].map((val) => (
						<CoralParallaxLayer id={val} key={val} />
					))}
				</div>
			</div>
			<div className="coral-container">
				<div
					className="coral"
					id="coral1"
					style={{
						position: "absolute",
					}}
				>
					<img
						src="/assets/images/coral1.svg"
						alt="Dark Blue Coral"
						style={{
							width: "100%",
							height: "auto",
							display: "block",
							pointerEvents: "none",
							userSelect: "none",
						}}
					/>
				</div>
			</div>

			<Container className="d-flex flex-column align-items-center content-container">
				<Title />
				{/** @todo: change links */}
				<div className="button-row">
					<PrimaryButton href="/apply" type="button">
						Apply Now
					</PrimaryButton>
					<PrimaryButton href="/sponsor" type="button">
						Sponsor Us
					</PrimaryButton>
				</div>
			</Container>
		</>
	);
};

export default CoralParallaxSection;
