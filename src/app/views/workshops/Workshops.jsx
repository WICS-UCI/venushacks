import { Link } from "react-router-dom";

import { WorkshopCard, Footer } from "src/app/components";
import { workshopsData } from "src/app/data/workshops-info.js";

import "./Workshops.scss";

const Workshops = () => {
	return (
		<div className="workshops">
			<div id="workshops_header">
				<h2>Workshops</h2>
				<h5>
					For time and location info, check the{" "}
					<Link to="/schedule">Schedule</Link> page!
				</h5>
			</div>

			{workshopsData.map((workshop) => WorkshopCard(workshop))}
			<Footer />
		</div>
	);
};

export default Workshops;
