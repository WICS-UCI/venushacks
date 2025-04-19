import "./StaticCoral.scss";

export default function StaticCoral() {
	return (
		<div className="coral-static-container">
			<img
				src="/assets/images/coral4.svg"
				alt="Coral Layer 4"
				className="coral-static"
			/>
			<img
				src="/assets/images/coral3.svg"
				alt="Coral Layer 3"
				className="coral-static"
			/>
			<img
				src="/assets/images/coral2.svg"
				alt="Coral Layer 2"
				className="coral-static"
			/>
			<img
				src="/assets/images/coral1.svg"
				alt="Coral Layer 1"
				id="coral-static-1"
				className="coral-static"
			/>
		</div>
	);
}
