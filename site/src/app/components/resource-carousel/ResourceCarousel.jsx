import { useState } from "react";
import ResourceCard from "./ResourceCard";
import "./ResourceCarousel.scss";

export default function ResourceCarousel({ resources, backgroundImage }) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextResource = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % resources.length);
	};

	const prevResource = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + resources.length) % resources.length
		);
	};

	return (
		<div className="whole-container">
			<div className="carousel-container">
				<button
					className="carousel-button left-button"
					onClick={prevResource}
				></button>

				<div
					className="carousel-wrapper container"
					style={{
						backgroundImage: `url(${backgroundImage})`,
					}}
				>
					<div
						className="carousel-track"
						style={{
							transform: `translateX(-${currentIndex * 100}%)`,
							transition: "transform 0.4s ease-in-out",
						}}
					>
						{resources.map((resource) => (
							<ResourceCard key={resource._id} {...resource} />
						))}
					</div>
				</div>

				<button
					className="carousel-button right-button"
					onClick={nextResource}
				></button>
			</div>

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
