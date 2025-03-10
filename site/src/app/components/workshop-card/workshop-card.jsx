import React from "react";
import "./workshop-card.scss";

const renderButtons = (buttons) => {
	return buttons.map((button) => {
		const { link, description } = button;
		return link ? (
			<div className="prereq-button" key={description}>
				<a href={link} target="_blank" rel="noopener noreferrer">
					{description}
				</a>
			</div>
		) : (
			<p>{description}</p>
		);
	});
};

function WorkshopCard({ workshop }) {
	const { title, description, prereqs, recap, host } = workshop;

	return (
		<div className="workshop-card">
			<div className="workshop-card-left">
				<p className="workshop-card-title">{title}</p>
				<p id="hosted-by">Hosted by</p>
				<p id="host-name">{host.name}</p>
				{/* recap??? */}
				{recap &&
					renderButtons(
						Object.entries(recap).map((pair) => {
							const [key, val] = pair;
							return { description: key, link: val };
						})
					)}
				{prereqs && (
					<div className="workshop-card-prereqs">
						<h5 id="prerequisites-title">Prequisites:</h5>
						{renderButtons(prereqs)}
					</div>
				)}
			</div>
			<div className="workshop-card-right">
				<p className="workshop-card-description">{description}</p>
			</div>
		</div>
	);
}

export default WorkshopCard;
