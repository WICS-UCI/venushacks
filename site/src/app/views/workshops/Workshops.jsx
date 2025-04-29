import { Link } from "react-router-dom";

import { WorkshopCard, Footer } from "src/app/components";
import { workshopsData } from "src/app/data/workshops-info.js";
import useWorkshops from "./useWorkshops";
import "./Workshops.scss";

const Workshops = () => {
	const { workshops, isLoading, error } = useWorkshops();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!workshops) return <div>No workshops found</div>;

	return (
		<section>
			<div className="workshops">
				<h2 className="workshops-title">Workshops</h2>
				<h2 className="workshops-subtitle">
					Refer to the Schedule Page for times and locations!{" "}
				</h2>

				{workshops.map((workshop) => (
					<WorkshopCard workshop={workshop} key={workshop.title} />
				))}
				<Footer />
			</div>
		</section>
	);
};

export default Workshops;
