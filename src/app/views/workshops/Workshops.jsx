import { Link } from "react-router-dom";

import { WorkshopCard, Footer } from "src/app/components";
import { workshopsData } from "src/app/data/workshops-info.js";
import workshopsTitle from "/assets/images/titles/vh-workshops-title.png";

import "./Workshops.scss";

const Workshops = () => {
	return (
		<div className="workshops">
			<div id="workshops_header">
				<img src={workshopsTitle} alt="Workshops" id="title-img" />
				<h5>
					For time and location info, check the{" "}
					<Link to="/schedule">Schedule</Link> page!
				</h5>
			</div>

			{workshopsData.map((workshop) => (
				<WorkshopCard workshop={workshop} key={workshop.title} />
			))}
			<Footer />
		</div>
	);
};

export default Workshops;
