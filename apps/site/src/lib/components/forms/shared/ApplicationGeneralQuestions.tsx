"use client";

import MultipleSelect from "../MultipleSelect";
import DropdownSelect from "../DropdownSelect";
import RequiredAsterisk from "../RequiredAsterisk";

export default function ApplicationGeneralQuestions() {
	return (
		<div className="w-full">
			<div className="flex flex-col items-left">
				<h1 className="font-sniglet text-2xl font-semibold tracking-tight">
					II. General Questions
				</h1>
			</div>

			{/* General questions block */}
			<div className="flex flex-col gap-5 text-slate-800">
				{/* How many hackathons */}
				<DropdownSelect
					name="hackathons_attended"
					labelText="How many hackathons have you attended before?"
					containerClass="flex flex-col gap-1"
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
					values={[
						{ value: "no", text: "No" },
						{ value: "yes", text: "Yes" },
					]}
				/>
			</div>
		</div>
	);
}
