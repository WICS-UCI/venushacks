import { organizers } from "src/app/data/team-info";
import "./team.scss";

const Team = () => {
	const images = organizers.map((organizer, i) => (
		<div key={i} style={{ display: "inline-block" }}>
			<div className="organizer-img-wrapper">
				<img
					src={
						"assets/images/2024-organizer-photos/" + organizer.photo + ".jpg"
					}
					alt={organizer.photo + "'s profile picture"}
				/>
			</div>
			<p>{organizer.name}</p>
		</div>
	));
	return <div id="organizer-photos">{images}</div>;
};

export default Team;
