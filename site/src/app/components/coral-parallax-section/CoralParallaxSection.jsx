import { Parallax } from "react-scroll-parallax";

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
				zIndex: -id,
			}}
		>
			<img
				src={`/assets/images/coral${id}.svg`}
				alt={`Coral Layer ${id}`}
				className="w-100 h-auto"
			/>
		</Parallax>
	);
};

const StaticCoralLayer = () => {
	return (
		<div className="coral-container">
			<div className="coral position-absolute" id="coral1">
				<img
					src="/assets/images/coral1.svg"
					alt="Dark Blue Coral"
					className="w-100 h-auto"
				/>
			</div>
		</div>
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
			<StaticCoralLayer />
		</>
	);
};

export default CoralParallaxSection;
