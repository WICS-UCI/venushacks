import { useRef, useState, useEffect } from "react";
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

const parallelCorals = coralImages.slice(0, coralImages.length - 1);
const darkBlueCoral = coralImages[coralImages.length - 1];

const SCROLL_INCREMENT = -20;
const SVG_ASPECT_RATIO = 1728 / 1117;
const PARALLAX_PORTION = 0.75;

const CoralLayer = ({
	speed,
	src,
	id,
	clientWidth,
	clientHeight,
	onHeightChange,
}) => {
	const layerRef = useRef(null);

	useEffect(() => {
		function updateHeight() {
			if (!layerRef.current) return;
			const rect = layerRef.current.getBoundingClientRect();
			onHeightChange(id, rect.bottom);
		}

		updateHeight();

		window.addEventListener("resize", updateHeight);
		return () => window.removeEventListener("resize", updateHeight);
	}, [id, onHeightChange]);

	const end = speed * SCROLL_INCREMENT;
	const aspectRatio = clientWidth / clientHeight;
	const height =
		(PARALLAX_PORTION * clientHeight * aspectRatio) / SVG_ASPECT_RATIO;

	return (
		<Parallax
			startScroll={0}
			endScroll={height * 1.5}
			translateY={[0, 20]}
			className="coral"
			id={`coral${id}`}
			style={{
				zIndex: 4 - speed,
			}}
		>
			<img
				ref={layerRef}
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

const CoralParallaxSection = ({ clientWidth, clientHeight }) => {
	const [containerHeight, setContainerHeight] = useState("100vh");
	const largestHeightRef = useRef(0);

	const [bottomPositions, setBottomPositions] = useState(
		Array(coralImages.length).fill(0)
	);

	useEffect(() => {
		const maxBottom = Math.max(...bottomPositions);
		if (maxBottom > largestHeightRef.current) {
			largestHeightRef.current = maxBottom;

			const totalPx = Math.ceil(maxBottom) + 100;

			const totalVh = ((totalPx / window.innerHeight) * 100) + 100;
			setContainerHeight(`${totalVh}vh`);
		}
	}, [bottomPositions]);

	const handleHeightChange = (layerIndex, bottom) => {
		setBottomPositions((prev) => {
			const newPositions = [...prev];
			if (Math.abs(newPositions[layerIndex] - bottom) < 5) {
				return prev;
			}
			newPositions[layerIndex] = bottom;
			return newPositions;
		});
	};

	return (
		<div className="hero-container" style={{ minHeight: containerHeight }}>
			{parallelCorals.map((src, i) => (
				<CoralLayer
					key={i}
					speed={parallelCorals.length - i}
					id={i}
					src={src}
					clientWidth={clientWidth}
					clientHeight={clientHeight}
					onHeightChange={handleHeightChange}
				/>
			))}

			<Parallax translateY={[20, 20]} className="coral static" id="static-coral">
				<img
					src={darkBlueCoral}
					alt="Dark Blue Coral"
					style={{
						width: "100%",
						height: "auto",
						display: "block",
						pointerEvents: "none",
						userSelect: "none",
					}}
				/>
			</Parallax>

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
};

export default CoralParallaxSection;
