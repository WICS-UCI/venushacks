import React from "react";
import imageUrlBuilder from "@sanity/image-url";

import { client } from "../../../sanity/client";
import "./OrganizerCard.scss";

const builder = imageUrlBuilder(client);

const linkedinIcon = "/assets/images/linkedin-icon.svg";
const defaultOrgPicPath = "/assets/images/default-org-picture.svg";

const OrganizerCard = ({ org }) => {
	const imageUrl = org.image
		? builder.image(org.image).format("webp").url()
		: defaultOrgPicPath;

	return (
		<div className="organizer-card">
			<div className="image-container">
				<img src={imageUrl} alt={org.name} className="org-image" />
				{org.link && (
					<a href={org.link} target="_blank" rel="noopener noreferrer">
						<img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
					</a>
				)}
			</div>
			<div className="org-info">
				<p className="org-name">{org.name}</p>
				<p className="org-role">{org.role}</p>
			</div>
		</div>
	);
};

export default OrganizerCard;
