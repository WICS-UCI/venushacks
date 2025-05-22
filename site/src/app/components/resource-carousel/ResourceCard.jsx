import "./ResourceCard.scss";

export default function ResourceCard({
	_id,
	resourceIconUrl,
	title,
	link,
	description,
}) {
	return (
		<div className="resource-card container">
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="card-link"
			>
				<img src={resourceIconUrl} alt={title} className="resource-icon" />
				<h4 className="resource-title">{title}</h4>
				<p className="resource-description">{description}</p>
			</a>
		</div>
	);
}
