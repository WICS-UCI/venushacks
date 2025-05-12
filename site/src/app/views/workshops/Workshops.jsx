import { useState } from "react";
import TabRadioButtons from "../../components/tab-radio-buttons/TabRadioButtons";
import { WorkshopCard } from "src/app/components";
import useWorkshops from "./useWorkshops";
import WorkshopsBottomGraphic from "src/app/components/workshops-bottom-graphic/WorkshopsBottomGraphic";
import "./Workshops.scss";

const days = ["Friday", "Saturday", "Sunday"];

const Workshops = () => {
	const { workshops, isLoading, error } = useWorkshops();
	const [selectedDay, setSelectedDay] = useState("Friday");

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!workshops) return <div>No workshops found</div>;

	// generate gradient for the workshop card
	const generateCardGradient = (index) => {
		const gradients = [
			"linear-gradient(180deg, #ABD8E9 0%, #1C78AB 100%)",
			"linear-gradient(180deg, #80C8EE 0%, #6284C5 100%)",
			"linear-gradient(180deg, #A4AEF9 0%, #EA87D8 100%)",
			"linear-gradient(180deg, #FFCBF7 0%, #9B5DBE 100%)",
			"linear-gradient(180deg, #DBA7F4 0%, #7B45A4 100%)",
		];

		return gradients[index % gradients.length];
	};

	// generate gradient for the workshop right section
	const generateRightSectionGradient = (index) => {
		const rightGradients = [
			"linear-gradient(180deg, #4AAFEB 0%, #24689D 100%)",
			"linear-gradient(180deg, #2797D1 0%, #6A86D1 100%)",
			"linear-gradient(180deg, #8F7AD4 0%, #C668C6 100%)",
			"linear-gradient(180deg, #EE95E3 0%, #6F3E8D 100%)",
			"linear-gradient(180deg, #9C4FC1 0%, #4C2B55 100%)",
		];

		return rightGradients[index % rightGradients.length];
	};

	return (
		<section>
			<div className="workshops">
				<h2 className="workshops-title">Workshops</h2>

				<div id="small-bubble" />
				<div id="big-bubble" />

				<div className="workshops-container">
					<TabRadioButtons
						tabFields={days}
						selected={selectedDay}
						onChange={setSelectedDay}
					/>

					{workshops[selectedDay.toLowerCase()].map((workshop, index) => (
						<div key={index} className="workshop-card-wrapper">
							{index === 0 && <div id="dolphin-tail" />}
							<WorkshopCard
								workshop={workshop}
								backgroundGradient={generateCardGradient(index)}
								rightSectionGradient={generateRightSectionGradient(index)}
							/>
						</div>
					))}
				</div>
			</div>
			<WorkshopsBottomGraphic />
		</section>
	);
};

export default Workshops;
