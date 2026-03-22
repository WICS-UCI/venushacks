"use client";

import MultipleSelect from "@/lib/components/forms/MultipleSelect";
import DropdownSelect from "@/lib/components/forms/DropdownSelect";
import ResumeInformation from "@/lib/components/forms/shared/ResumeInformation";
import TextInput from "@/lib/components/forms/TextInput";
import LastSaved from "@/lib/components/forms/LastSaved";

export default function GeneralQuestions() {
	return (
		<div className="w-full">
			<div className="flex flex-col items-left">
				<h1 className="font-sniglet text-2xl font-semibold tracking-tight mb-2">
					II. General Questions
				</h1>
			</div>

			{/* General questions block */}
			<div className="flex flex-col gap-5 text-slate-800 mt-4">
				{/* How many hackathons */}
				<DropdownSelect
					name="hackathons_attended"
					labelText="How many hackathons have you attended before?"
					containerClass="flex flex-col gap-1"
					placeholder="This is my first hackathon"
					values={[
						{ value: "0", text: "This is my first hackathon" },
						{ value: "1-3", text: "1–3" },
						{ value: "4-6", text: "4–6" },
						{ value: "7+", text: "7+" },
					]}
				/>
				{/* VenusHacks previously */}
				<DropdownSelect
					name="attended_venushacks"
					labelText="Have you attended VenusHacks previously?"
					containerClass="flex flex-col gap-1"
					placeholder="No"
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
						labelText="May we share your resume with sponsors? (optional)"
						containerClass="flex flex-col gap-1"
						isRequired={false}
						placeholder="Yes"
						values={[
							{ value: "yes", text: "Yes" },
							{ value: "no", text: "No" },
						]}
					/>
				</div>

				{/* Dietary Restrctions - more options / change to multiple 
				select component can be implemented in the future */}
				<TextInput
					name="dietary_restrictions"
					labelText="What are your dietary restrictions? Include your allergies (if any)."
					containerClass="flex flex-col gap-1"
					isRequired={true}
					type="text"
					placeholder="e.g. Vegetarian, nut allergy... or leave blank if none"
				/>

				{/* Acknowledgements */}
				<MultipleSelect
					name="acknowledgements"
					labelText=""
					inputType="checkbox"
					isRequired={true}
					containerClass="flex flex-col"
					horizontal={false}
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
				{/* TODO: Implement client-side application autosave */}
				<LastSaved lastSaved={null} />
			</div>
		</div>
	);
}
