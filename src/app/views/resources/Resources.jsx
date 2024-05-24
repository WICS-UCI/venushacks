import { useState, useEffect } from "react";
import { Tooltip, Footer } from "src/app/components";
import { starterPackData } from "src/app/data/resources-info";
import { Carousel, Stack, Card } from "react-bootstrap";

import next_icon from "/assets/images/next-icon.svg";
import prev_icon from "/assets/images/prev-icon.svg";

import "./Resources.scss";

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

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
