import React from "react";
import { speakersData } from "src/app/data/speakers-info.js";
import "./speakers.scss";

const Speaker = ({ name, title, photo }) => {
	return (
		<div className="speaker-img-wrapper">
			<img
				src={"assets/images/2024-speaker-photos/" + photo + ".png"}
				alt={name + "'s profile picture"}
			/>
			<div className="text">
				<h4>{name}</h4>
				<p>{title}</p>
			</div>
		</div>
	);
};

const renderSpeakers = (speakers) => {
	return (
		<div className="speaker-photos">
			{speakers.map((speaker, index) => (
				<Speaker
					name={speaker.name}
					title={speaker.title}
					photo={speaker.photo}
					key={index}
				/>
			))}
		</div>
	);
};

const Speakers = () => {
	return (
		<div id="speakers">
			<p className="subheader">Opening Speakers</p>
			{renderSpeakers(speakersData.opening)}
			<p className="subheader">Closing Speakers</p>
			{renderSpeakers(speakersData.closing)}
			<p className="subheader">Panelists</p>
			{renderSpeakers(speakersData.panelists)}
		</div>
	);
};

export default Speakers;
