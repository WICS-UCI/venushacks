import { useState, useEffect } from "react";
import { Tooltip, Footer } from "src/app/components";
import { starterPackData } from "src/app/data/resources-info";
import { Carousel, Stack, Card } from "react-bootstrap";
import { Nav, Redirect } from "src/app/components";


import useResources from "./useResources";

// import next_icon from "/assets/images/next-icon.svg";
// import prev_icon from "/assets/images/prev-icon.svg";

import "./Resources.scss";


function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}


export default function Resources() {
	const { resources, isLoading, error } = useResources();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!resources) return <div>No resources found</div>;

	return (
		<div className="Resources">
			<div id="left-fishes" />
			<div id="right-fishes" />
			<div id="coral" />
		<Nav />
		<center><h1>Resources</h1></center>
			<div className="resource-list">
			{resources.order.map(({ _id, iconUrl, title, description, resources }) => (
				<div key={_id} className="category">
					<h3>
						{title}
					</h3>
					<p>{description}</p>
					<ResourceCarousel resources={resources} />
				</div>
			))}
			</div>
		</div>
	);
}


function ResourceCarousel({ resources }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(true);
	const totalSlides = resources.length;
	

	const nextResource = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % resources.length);
	};

	const prevResource = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + resources.length) % resources.length);
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
		<div className="carousel-container">
			<button className="carousel-button left" onClick={prevResource}>&#9665;</button>
			
			<div className="carousel-wrapper">
				<div
					className="carousel-track"
					style={{
						transform: `translateX(-${currentIndex * 100}%)`,
						transition: "transform 0.4s ease-in-out"
					}}
				>
					{resources.map(({ _id, resourceIconUrl, title, link, description }) => (
						<div key={_id} className="resource-card">
							<a href={link} target="_blank" rel="noopener noreferrer">
								<img src={resourceIconUrl} alt={title} className="resource-icon" />
								<h4 className="resource-title">{title}</h4>
								<p className="resource-description">{description}</p>
							</a>
						</div>
					))}
				</div>
			</div>

			<button className="carousel-button right" onClick={nextResource}>&#9655;</button>

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
/*
function Resources() {
	const [uiIndex, setUIIndex] = useState(0);
	const [backendIndex, setBackendIndex] = useState(0);
	const [databasesIndex, setDatabasesIndex] = useState(0);
	const [deploymentIndex, setDeploymentIndex] = useState(0);
	const [gamingIndex, setGamingIndex] = useState(0);
	const [aiIndex, setAIIndex] = useState(0);
	const [generalIndex, setGeneralIndex] = useState(0);

	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	const handleUISelect = (selectedIndex) => {
		setUIIndex(selectedIndex);
	};

	const handleBackendSelect = (selectedIndex) => {
		setBackendIndex(selectedIndex);
	};

	const handleDatabasesSelect = (selectedIndex) => {
		setDatabasesIndex(selectedIndex);
	};

	const handleDeploymentSelect = (selectedIndex) => {
		setDeploymentIndex(selectedIndex);
	};

	const handleGamingSelect = (selectedIndex) => {
		setGamingIndex(selectedIndex);
	};

	const handleAISelect = (selectedIndex) => {
		setAIIndex(selectedIndex);
	};

	const handleGeneralIndex = (selectedIndex) => {
		setGeneralIndex(selectedIndex);
	};

	const indexes = [
		uiIndex,
		backendIndex,
		databasesIndex,
		deploymentIndex,
		gamingIndex,
		aiIndex,
		generalIndex,
	];

	const handleIndexes = [
		setUIIndex,
		setBackendIndex,
		setDatabasesIndex,
		setDeploymentIndex,
		setGamingIndex,
		setAIIndex,
		setGeneralIndex,
	];

	useEffect(() => {
		function handleResize() {
			const dimensions = getWindowDimensions();
			if (dimensions.width <= 900) {
				handleIndexes.map((handleIndex) => {
					handleIndex(0);
				});
			} else if (dimensions.width > 900) {
				handleIndexes.map((handleIndex) => {
					handleIndex(0);
				});
			}
			setWindowDimensions(dimensions);
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="starter-packs">
			<h2>
				<img className="title-img" src="/assets/images/resources_title.png" />
			</h2>
			{starterPackData.map((starterPack, index) => (
				<div className="starter-pack-card" key={starterPack.name}>
					<div className="starter-pack-card-information">
						<h3>{starterPack.name}</h3>
						<p>{starterPack.description}</p>

						<div className="starter-pack-card-links">
							{windowDimensions.width <= 900 ? (
								<Carousel
									activeIndex={indexes[index]}
									onSelect={handleIndexes[index]}
									nextIcon={<img src={next_icon} alt="Next" />}
									prevIcon={<img src={prev_icon} alt="Previous" />}
									style={{ height: 500 }}
								>
									{[...Array(Math.ceil(starterPack.packs.length))].map(
										(_, index) => (
											<Carousel.Item key={index} className="carousel-item">
												<Stack direction="horizontal" className="stack">
													{starterPack.packs
														.slice(index, index + 1)
														.map((pack, packIndex) => (
															<Card key={packIndex} className="card">
																<Tooltip
																	className="tooltip_link"
																	content={pack.tooltip}
																	key={pack.name}
																>
																	<a
																		className="starter-pack-card-link"
																		href={pack.link}
																		target={
																			pack.link.startsWith("/")
																				? "_self"
																				: "_blank"
																		}
																		rel="noopener noreferrer"
																	>
																		<h4>{pack.name}</h4>
																		<img src={pack.image} alt={pack.name} />
																	</a>
																</Tooltip>
															</Card>
														))}
												</Stack>
											</Carousel.Item>
										)
									)}
								</Carousel>
							) : (
								<Carousel
									activeIndex={indexes[index]}
									onSelect={handleIndexes[index]}
									nextIcon={<img src={next_icon} alt="Next" />}
									prevIcon={<img src={prev_icon} alt="Previous" />}
									style={{ height: 500 }}
								>
									{[...Array(Math.ceil(starterPack.packs.length / 3))].map(
										(_, index) => (
											<Carousel.Item key={index} className="carousel-item">
												<Stack direction="horizontal" className="stack">
													{starterPack.packs
														.slice(index * 3, index * 3 + 3)
														.map((pack, packIndex) => (
															<Card key={packIndex} className="card">
																<Tooltip
																	className="tooltip_link"
																	content={pack.tooltip}
																	key={pack.name}
																>
																	<a
																		className="starter-pack-card-link"
																		href={pack.link}
																		target={
																			pack.link.startsWith("/")
																				? "_self"
																				: "_blank"
																		}
																		rel="noopener noreferrer"
																	>
																		<h4>{pack.name}</h4>
																		<img src={pack.image} alt={pack.name} />
																	</a>
																</Tooltip>
															</Card>
														))}
												</Stack>
											</Carousel.Item>
										)
									)}
								</Carousel>
							)}
						</div>
					</div>
				</div>
			))}
			<Footer />
		</div>
	);
}

export default Resources;
*/
