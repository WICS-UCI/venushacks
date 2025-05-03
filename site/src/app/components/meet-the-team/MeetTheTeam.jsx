import { useState } from "react";
import TabRadioButtons from "../tab-radio-buttons/TabRadioButtons";
import useOrganizers from "./useOrganizers";

import "./MeetTheTeam.scss";
import OrganizerCard from "./OrganizerCard";

const departments = ["Board", "Corporate", "Logistics", "Marketing"];

export default function MeetTheTeam() {
	const { organizers, isLoading, error } = useOrganizers();
	const [currDepartment, setCurrDepartment] = useState(departments[0]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!organizers) return <div>No organizers found.</div>;
	return (
		<div className="tab-container">
			<TabRadioButtons
				tabFields={departments}
				selected={currDepartment}
				onChange={setCurrDepartment}
			/>

			<div id="organizers-container">
				{organizers[currDepartment].map((org, idx) => {
					return <OrganizerCard key={idx} org={org} />;
				})}
			</div>
		</div>
	);
}
