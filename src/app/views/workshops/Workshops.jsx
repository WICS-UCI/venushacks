import { Link } from "react-router-dom";

import "./Workshops.scss";

// import { WorkshopCard, Footer } from "./app/components";
import { WorkshopCard, Footer } from "../../components";
// import { workshopsData } from "./assets/data/workshops-info.js";
import { workshopsData } from "../../data/workshops-info.js";

function Workshops() {
	return (
		<div className="workshops">
			<h2>Workshops</h2>
			<h5>
				For time and location info, check the{" "}
				<Link to="/schedule">Schedule</Link> page!
			</h5>
			{workshopsData.map((workshop) => WorkshopCard(workshop))}
			<Footer />
		</div>
	);
}

export default Workshops;
