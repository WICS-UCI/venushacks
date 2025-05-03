import React from "react";
import "./workshop-card.scss";

function WorkshopCard({ workshop, backgroundGradient, rightSectionGradient }) {
	const { title, description, host } = workshop;

	return (
		<div className="workshop-card" style={{ background: backgroundGradient }}>
			<div className="workshop-card-left">
				<p className="workshop-card-title">{title}</p>
				<p id="host">Hosted by: {host}</p>
			</div>
			<div
				className="workshop-card-right"
				style={{ background: rightSectionGradient }}
			>
				<p className="workshop-card-description">{description}</p>
			</div>
		</div>
	);
}

export default WorkshopCard;
