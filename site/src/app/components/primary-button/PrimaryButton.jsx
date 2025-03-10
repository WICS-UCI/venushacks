import { Button } from "react-bootstrap";

import "./PrimaryButton.scss";

export default function PrimaryButton({ type, children }) {
	return (
		<Button type={type} className="primary-button">
			{children}
		</Button>
	);
}
