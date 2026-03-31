"use client";

import MultipleSelect from "../MultipleSelect";
import DropdownSelect from "../DropdownSelect";
import SimpleRadio from "../SimpleRadio";
import ResumeInformation from "./ResumeInformation";
import LastSaved from "../LastSaved";

const yesNoOptions = [
	{ labelText: "", inputValue: "Yes" },
];

export default function ApplicationGeneralQuestions() {
	return (
		<div className="w-full">
			<div className="flex flex-col items-left">
				<h1 className="font-figtree text-xl md:text-2xl font-semibold mb-2">
					II. General Questions
				</h1>
			</div>

			{/* General questions block */}
			<div className="flex flex-col gap-6 text-slate-800 mt-4">
				{/* How many hackathons */}
				<DropdownSelect
					name="previous_hackathons"
					labelText="How many hackathons have you attended before?"
					containerClass="flex flex-col"
					placeholder="Select an option"
					values={[
						{ value: "0", text: "This is my first hackathon" },
						{ value: "1", text: "1" },
						{ value: "2", text: "2" },
						{ value: "3", text: "3" },
						{ value: "4+", text: "4+" },
					]}
				/>
				{/* VenusHacks previously */}
				<DropdownSelect
					name="previous_vh"
					labelText="Have you attended VenusHacks previously?"
					containerClass="flex flex-col"
					placeholder="Select an option"
					values={[
						{ value: "no", text: "No" },
						{ value: "yes", text: "Yes" },
					]}
				/>

				{/* Resume Upload row */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
					<ResumeInformation isRequired={false} />

					{/* Share with sponsors */}
					<DropdownSelect
						name="share_resume"
						labelText="May we share your resume with sponsors?"
						containerClass="flex flex-col"
						isRequired={false}
						placeholder="Select an option"
						values={[
							{ value: "yes", text: "Yes" },
							{ value: "no", text: "No" },
						]}
					/>
				</div>

				{/* Dietary Restrctions - more options / change to multiple 
				select component can be implemented in the future */}
				<DropdownSelect
					name="dietary_restrictions"
					labelText="What are your dietary restrictions?"
					containerClass="flex flex-col"
					placeholder="Select an option"
					values={[
						{ value: "none", text: "None" },
						{ value: "vegetarian", text: "Vegetarian" },
						{ value: "vegan", text: "Vegan" },
						{ value: "gluten-free", text: "Gluten-free" },
					]}
				/>

				{/* Acknowledgements */}
				<MultipleSelect
					name="acknowledgements"
					labelText=""
					inputType="checkbox"
					isRequired={true}
					containerClass="flex flex-col"
					horizontal={false}
					allChecked
					values={[
						{
							value: "transportation",
							text: "I acknowledge that I am responsible for my own transportation to UC Irvine and overnight stay between event days.",
						},
						{
							value: "in_person",
							text: "I acknowledge that VenusHacks is a 100% in-person event and that I must attend all 3 event days (Friday night, Saturday, and Sunday morning) in order to enter the competition and receive prizes.",
						},
					]}
				/>

				{/* <LastSaved lastSaved={null} /> */}
			</div>
		</div>
	);
}
