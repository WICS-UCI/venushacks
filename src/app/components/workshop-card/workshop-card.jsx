import React from "react";
import "./workshop-card.scss";

const renderButtons = (buttons) => {
	console.log(buttons);
	return buttons.map((button) => {
		const { link, description } = button;
		return link ? (
			<a href={link} target="_blank" rel="noopener noreferrer">
				{description}
			</a>
		) : (
			<p>{description}</p>
		);
	});
};

function WorkshopCard(workshop) {
	const { title, description, prereqs, recap, host } = workshop;

	return (
		<div className="workshop-card">
			<div className="workshop-card-header">
				<div>
					<h4>{title}</h4>
					<h5>
						Hosted by{" "}
						<a href={host.link} target="_blank" rel="noopener noreferrer">
							{host.name}
						</a>
					</h5>
				</div>
				<div className="right pink-buttons">
					{recap &&
						renderButtons(
							Object.entries(recap).map((pair) => {
								const [key, val] = pair;
								return { description: key, link: val };
							})
						)}
				</div>
			</div>
			{description}
			{prereqs && (
				<div className="workshop-card-prereqs pink-buttons">
					<h5>Prequisites:</h5>
					{renderButtons(prereqs)}
				</div>
			)}
		</div>
	);
}

export default WorkshopCard;
