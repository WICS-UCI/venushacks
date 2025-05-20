import { Button } from "react-bootstrap";

import "./PrimaryButton.scss";

export default function PrimaryButton({ type, children, href, disabled }) {
	return (
		<Button
			as={href ? "a" : "button"}
			type={type}
			href={href}
			target={href?.startsWith("http") ? "_blank" : undefined}
			rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
			className={disabled ? "disabled-primary-btn" : "primary-button"}
			disabled={disabled}
		>
			{children}
		</Button>
	);
}
