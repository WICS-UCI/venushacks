import React from "react";
import "./workshop-card.scss";

function WorkshopCard({ workshop, backgroundGradient, rightSectionGradient }) {
	const { title, description, host, startTime, endTime, location } = workshop;

	const startDate = new Date(startTime);
	const endDate = new Date(endTime);

	return (
		<div className="workshop-card" style={{ background: backgroundGradient }}>
			<div className="workshop-card-left">
				<p className="workshop-card-title">{title}</p>
				<p className="info">Hosted by: {host}</p>
				<div className="mt-4 d-flex flex-column gap-0">
					<p className="info">Location: {location}</p>
					<p className="info">Time: {formatTimeRange(startDate, endDate)}</p>
				</div>
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

function formatTimeRange(start, end) {
	const options = { hour: "numeric", minute: "2-digit", hour12: "true" };
	return `${new Date(start).toLocaleTimeString([], options)} - ${new Date(
		end
	).toLocaleTimeString([], options)}`;
}
