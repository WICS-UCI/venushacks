import { useState, useEffect } from "react";
import { Tooltip, Footer } from "src/app/components";
import { starterPackData } from "src/app/data/resources-info";
import { Carousel, Stack, Card } from "react-bootstrap";
import { Nav, Redirect } from "src/app/components";
import useResources from "./useResources";

import "./Resources.scss";

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

const backgroundImages = [
	"/assets/images/resources-card1.svg",
	"/assets/images/resources-card2.svg",
	"/assets/images/resources-card3.svg",
	"/assets/images/resources-card4.svg",
];

export default function Resources() {
	const { resources, isLoading, error } = useResources();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!resources) return <div>No resources found</div>;

	return (
		<div className="Resources">
			<div id="left-fishes" />
			<div id="right-fishes" />

			<center>
				<h1 style={{ fontSize: "100px", textShadow: "#68B3D7 10px 10px 10px" }}>
					RESOURCES
				</h1>
			</center>
			<img
				src="/assets/images/resources-coral-top.svg"
				alt="top coral"
				id="resources-top-coral"
			/>
			<Nav />
			<div className="resource-list">
				{resources.order.map(
					({ _id, iconUrl, title, description, resources }, index) => (
						<div key={_id} className="category">
							<h3 style={{ fontSize: "100px" }}>{title}</h3>
							<ResourceCarousel
								resources={resources}
								backgroundImage={
									backgroundImages[index % backgroundImages.length]
								}
								className="resource-carousel"
							/>
						</div>
					)
				)}
			</div>
		</div>
	);
}

function ResourceCarousel({ resources, backgroundImage }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(true);
	const totalSlides = resources.length;

	const nextResource = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % resources.length);
	};

	const prevResource = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + resources.length) % resources.length
		);
	};

	// Transition back to first card
	useEffect(() => {
		if (currentIndex === totalSlides) {
			setTimeout(() => {
				setIsTransitioning(false);
				setCurrentIndex(0);
			}, 400);
		}
	}, [currentIndex, totalSlides]);

	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			{/* Carousel Section */}
			<div className="carousel-container">
				<button className="carousel-button left" onClick={prevResource}>
					&#9665;
				</button>

				<div className="carousel-wrapper">
					<div
						className="carousel-track"
						style={{
							transform: `translateX(-${currentIndex * 100}%)`,
							transition: "transform 0.4s ease-in-out",
						}}
					>
						{resources.map(
							({ _id, resourceIconUrl, title, link, description }) => (
								<div
									key={_id}
									className="resource-card"
									style={{
										// backgroundImage: `url(${backgroundImage})`,
										backgroundSize: "cover",
									}}
								>
									<a
										href={link}
										target="_blank"
										rel="noopener noreferrer"
										className="card-link"
									>
										<img
											src={resourceIconUrl}
											alt={title}
											className="resource-icon"
										/>
										<h4 className="resource-title">{title}</h4>
										<p className="resource-description">{description}</p>
									</a>
								</div>
							)
						)}
					</div>
				</div>

				<button className="carousel-button right" onClick={nextResource}>
					&#9655;
				</button>
			</div>

			{/* Indicators Section (now outside and below the carousel) */}
			<div className="carousel-indicators">
				{resources.map((_, index) => (
					<span
						key={index}
						className={`dot ${index === currentIndex ? "active" : ""}`}
						onClick={() => setCurrentIndex(index)}
					/>
				))}
			</div>
		</div>
	);
}
