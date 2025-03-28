import { Button } from "react-bootstrap";

import "./PrimaryButton.scss";

export default function PrimaryButton({ type, children, href }) {
	return (
		<Button
			as={href ? "a" : "button"}
			type={type}
			href={href}
			target={href?.startsWith("http") ? "_blank" : undefined}
			rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
			className="primary-button"
		>
			{children}
		</Button>
	);
}
