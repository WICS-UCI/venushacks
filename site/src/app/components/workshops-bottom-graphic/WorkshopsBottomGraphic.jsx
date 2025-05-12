import "./WorkshopsBottomGraphic.scss";

export default function WorkshopsBottomGraphic() {
	return (
		<div id="workshops-bottom-graphic-container">
			<div id="bottom-coral" />

			{/* chest */}
			<div id="chest-container">
				<div id="chest" />
				<div id="shadow" />
			</div>

			{/* left of chest */}
			<div className="left container">
				<div id="left-pinkStarfish" className="pinkStarfish" />
				<div id="left-purpleStarfish" className="purpleStarfish" />
				<div id="left-bottomShell" className="shell" />
				<div id="left-topShell" className="shell" />
			</div>
			
			{/* right of chest */}
			<div className="right container">
				<div id="right-pinkStarfish" className="pinkStarfish" />
				<div id="right-purpleStarfish" className="purpleStarfish" />
				<div id="right-bottomShell" className="shell" />
				<div id="right-topShell" className="shell" />
			</div>
		</div>
	);
}
