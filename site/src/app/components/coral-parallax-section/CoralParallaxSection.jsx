import { Parallax } from "react-scroll-parallax";
import Container from "react-bootstrap/Container";
import Title from "../title/Title";
import PrimaryButton from "../primary-button/PrimaryButton";
import "./CoralParallaxSection.scss";

const coralImages = [
	"/assets/images/coral4.svg",
	"/assets/images/coral3.svg",
	"/assets/images/coral2.svg",
	"/assets/images/coral1.svg",
];

const SCROLL_INCREMENT = -20;
const SVG_ASPECT_RATIO = 1728 / 1117;
const PARALLAX_PORTION = 0.75;

const CoralLayer = ({ speed, src, id, clientWidth, clientHeight }) => {
	const end = speed * SCROLL_INCREMENT;
	const aspectRatio = clientWidth / clientHeight;
	const height =
		(PARALLAX_PORTION * clientHeight * aspectRatio) / SVG_ASPECT_RATIO;

	return (
		<Parallax
			startScroll={0}
			endScroll={height * 1.5}
			translateY={[0, -end * 1.2]}
			className="coral"
			id={`coral${id}`}
			style={{
				zIndex: 4 - speed,
			}}
		>
			<img
				src={src}
				alt=""
				style={{
					width: "100%",
					height: "auto",
					display: "block",
					userSelect: "none",
					pointerEvents: "none",
				}}
			/>
		</Parallax>
	);
};

const CoralParallaxSection = ({ clientWidth, clientHeight }) => (
	<div className="hero-container">
		{coralImages.map((src, i) => (
			<CoralLayer
				key={i}
				speed={coralImages.length - i}
				id={i}
				src={src}
				clientWidth={clientWidth}
				clientHeight={clientHeight}
			/>
		))}

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
	</div>
);

export default CoralParallaxSection;
