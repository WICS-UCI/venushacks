"use client";

import { useState } from "react";

import DropdownSelect from "@/lib/components/forms/DropdownSelect";
import MultipleSelect from "@/lib/components/forms/MultipleSelect";
import TextInput from "@/lib/components/forms/TextInput";
import QuestionField from "@/lib/components/forms/QuestionField";
import DayShift from "./DayShift";

const genderIdentity = [
	{ value: "female", text: "Female" },
	{ value: "male", text: "Male" },
	{ value: "non-binary", text: "Non-binary" },
	{ value: "other", text: "Other:" },
];

const yesNoOptions = [
	{ value: "true", text: "Yes" },
	{ value: "false", text: "No" },
];

const shirtSizes = [
	{ value: "small", text: "Small" },
	{ value: "medium", text: "Medium" },
	{ value: "large", text: "Large" },
	{ value: "xl", text: "Extra Large" },
];


export default function BasicInformation() {
	const [answers, setAnswers] = useState({
		prior: "",
		comments: "",
	});

	return (
		<div className="w-full flex flex-col gap-6">
			<h1 className="font-figtree text-xl md:text-2xl font-semibold mb-2">
				I. General Information
			</h1>

			<div className="grid grid-cols-12 gap-x-6 gap-y-6">
				<TextInput
					name="first_name"
					labelText="First Name"
					containerClass="col-span-12 md:col-span-6"
					isRequired={true}
					type="text"
					placeholder="Enter your first name"
				/>
				<TextInput
					name="last_name"
					labelText="Last Name"
					containerClass="col-span-12 md:col-span-6"
					isRequired={true}
					type="text"
					placeholder="Enter your last name"
				/>
				<TextInput
					name="email"
					labelText="Email"
					containerClass="col-span-12"
					isRequired={true}
					type="text"
					placeholder="ex: peter@uci.edu"
				/>
				<TextInput
					name="date_of_birth"
					labelText="Date of Birth"
					containerClass="col-span-12 md:col-span-6"
					isRequired={true}
					type="text"
					isDate
					placeholder="mm/dd/yyyy"
				/>
				<DropdownSelect
					name="is_18_older"
					labelText="Will you be 18 years or older by May 16th, 2026?"
					containerClass="col-span-12 md:col-span-6"
					isRequired={true}
					values={yesNoOptions}
					placeholder="Select an option"
				/>
				<DropdownSelect
					name="gender_identity"
					labelText="Gender Identity"
					containerClass="col-span-12 md:col-span-6"
					isRequired={true}
					values={genderIdentity}
					placeholder="Select an option"
				/>
				<TextInput
					name="pronouns"
					labelText="Preferred Pronouns"
					containerClass="col-span-12 md:col-span-6"
					isRequired={true}
					type="text"
					placeholder="Enter your preferred pronouns"
				/>
				<DropdownSelect
					name="shirt_size"
					labelText="Shirt Size (Unisex)"
					containerClass="col-span-12"
					isRequired={true}
					values={shirtSizes}
					placeholder="Select an option"
				/>
				<TextInput
					name="dietary_restrictions"
					labelText="What are your dietary restrictions? Include your allergies (if any)."
					containerClass="col-span-12 md:col-span-12"
					isRequired={false}
					type="text"
					placeholder="e.g. Vegetarian, nut allergy... or leave blank if none"
				/>
				<div className="w-full flex flex-col gap-6 col-span-12">
					<QuestionField
						name="prior_experience"
						label="Any prior hackathon volunteer experience (ex. VH 2025)? Enter N/A if none."
						maxWords={300}
						required
						value={answers.prior}
						onChange={(v) => setAnswers({ ...answers, prior: v })}
					/>
				</div>

				<DropdownSelect
					name="minimum_5_hours"
					labelText="Will you be available to volunteer a combined amount of 5 hours minimum across Saturday, May 16th, through Sunday, May 17th?"
					containerClass="col-span-12"
					isRequired={true}
					values={yesNoOptions}
					placeholder="Select an option"
				/>
				<label className="w-full block col-span-12 text-sm md:text-base mb-2 font-figtree">
					Please select your availability for Saturday and Sunday.
					<span className="text-red-500"> *</span>
				</label>
				<div className="w-full flex flex-col gap-6 col-span-12 md:col-span-6">
					<DayShift
						shiftText="May 16 - Saturday Shift"
						shiftLabel="saturday_availability"
						startHour={7}
						endHour={24}
					/>
				</div>
				<div className="w-full flex flex-col gap-6 col-span-12 md:col-span-6">
					<DayShift
						shiftText="May 17 - Sunday Shift"
						shiftLabel="sunday_availability"
						startHour={7}
						endHour={18}
					/>
				</div>
				<div className="w-full flex flex-col gap-6 col-span-12">
					<QuestionField
						name="questions_comments_concerns"
						label="Any questions, comments, or concerns?"
						optional
						value={answers.comments}
						onChange={(v) => setAnswers({ ...answers, comments: v })}
						placeholder="Enter a question, comment, or concern (optional)"
					/>
				</div>
				<MultipleSelect
					name="acknowledgements"
					labelText=""
					inputType="checkbox"
					isRequired={true}
					containerClass="flex flex-col col-span-12"
					horizontal={false}
					allChecked
					values={[
						{
							value: "transportation",
							text: "I acknowledge that I am responsible for my own transportation to UC Irvine and overnight stay between event days.",
						},
					]}
				/>
			</div>
		</div>
	);
}
