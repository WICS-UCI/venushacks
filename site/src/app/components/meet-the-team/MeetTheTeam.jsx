import { useState } from "react";
import TabRadioButtons from "../tab-radio-buttons/TabRadioButtons";
import useOrganizers from "./useOrganizers";
import OrganizerCard from "./OrganizerCard";
import "./MeetTheTeam.scss";

const departments = ["Board", "Corporate", "Logistics", "Marketing"];

export default function MeetTheTeam() {
	const { organizers, isLoading, error } = useOrganizers();
	const [currDepartment, setCurrDepartment] = useState(departments[0]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!organizers) return <div>No organizers found.</div>;

	// Group organizers into rows of 4
	const organizerRows = [];
	for (let i = 0; i < organizers[currDepartment].length; i += 4) {
		organizerRows.push(organizers[currDepartment].slice(i, i + 4));
	}

	return (
		<div className="tab-container">
			<TabRadioButtons
				tabFields={departments}
				selected={currDepartment}
				onChange={setCurrDepartment}
			/>

			<div id="organizers-container">
				{organizerRows.map((row, rowIdx) => (
					<div key={rowIdx} className="organizer-row">
						{row.map((org, idx) => (
							<OrganizerCard key={idx} org={org} />
						))}
					</div>
				))}
			</div>
		</div>
	);
}
