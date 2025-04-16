import "./ApplyButton.scss";

export default function ApplyButton({ id, className, text, href }) {
	return (
		<a
			className={`apply-button ${className}`}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
		>
			<div id={id} />
			<p className="mt-2">{text}</p>
		</a>
	);
}
