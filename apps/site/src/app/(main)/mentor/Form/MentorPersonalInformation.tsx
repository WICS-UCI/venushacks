"use client";

import { useState } from "react";

import CheckboxList from "@/lib/components/forms/CheckboxList";
import CodingSkillsTable from "./CodingSkillsTable";
import DropdownSelect from "@/lib/components/forms/DropdownSelect";
import QuestionField from "@/lib/components/forms/QuestionField";
import TextInput from "@/lib/components/forms/TextInput";

const shirtSizeOptions = [
	{ value: "small", text: "Small" },
	{ value: "medium", text: "Medium" },
	{ value: "large", text: "Large" },
	{ value: "xl", text: "Extra Large" },
];

const yearOptions = [
	{ value: "freshman", text: "Freshman" },
	{ value: "sophomore", text: "Sophomore" },
	{ value: "junior", text: "Junior" },
	{ value: "senior", text: "Senior" },
	{ value: "graduate", text: "Graduate Student" },
	{ value: "graduated", text: "Graduated" },
];

export default function MentorPersonalInformation() {
	const [textAreaAnswer, setTextAreaAnswer] = useState("");

	return (
		<div className="w-full flex flex-col gap-6">
			<h1 className="font-figtree text-xl md:text-2xl font-semibold mb-2">
				I. Personal Information
			</h1>

			<div className="flex gap-5 w-full max-[1000px]:flex-col max-[1000px]:items-center">
				<TextInput
					name="first_name"
					labelText="First Name"
					containerClass="flex flex-col w-1/2 max-[1000px]:w-full"
					isRequired={true}
					type="text"
					placeholder="Enter your first name"
				/>
				<TextInput
					name="last_name"
					labelText="Last Name"
					containerClass="flex flex-col w-1/2 max-[1000px]:w-full"
					isRequired={true}
					type="text"
					placeholder="Enter your last name"
				/>
			</div>

			<TextInput
				name="email"
				labelText="Email"
				containerClass="flex flex-col w-full"
				isRequired={true}
				type="email"
				placeholder="ex: peter@uci.edu"
			/>

			<DropdownSelect
				name="school_year"
				labelText="What year are you?"
				placeholder="Select an option"
				containerClass="flex flex-col w-full"
				values={yearOptions}
			/>

			<TextInput
				name="major_minor"
				labelText='Major (If you have graduated or are working full-time, you can put "N/A")'
				containerClass="flex flex-col w-full"
				isRequired={true}
				type="text"
				placeholder="ex: Computer Science, Psychology"
			/>

			<TextInput
				name="university"
				labelText="Affiliation (If you are still a student, this is your university (full name please); If you have graduated or are working full-time, this is your company or organization! e.g. University of California, Irvine)"
				containerClass="flex flex-col w-full"
				isRequired={true}
				type="text"
				placeholder="ex: University of California, Irvine"
			/>

			<div className="flex gap-5 w-full max-[1000px]:flex-col max-[1000px]:items-center">
				<TextInput
					name="linkedin"
					labelText="LinkedIn"
					containerClass="flex flex-col w-1/3 max-[1000px]:w-full"
					isRequired={false}
					type="url"
					placeholder="https://linkedin.com/in/yourprofile"
				/>
				<TextInput
					name="github"
					labelText="GitHub"
					containerClass="flex flex-col w-1/3 max-[1000px]:w-full"
					isRequired={false}
					type="url"
					placeholder="https://github.com/yourusername"
				/>
				<TextInput
					name="website"
					labelText="Personal Website"
					containerClass="flex flex-col w-1/3 max-[1000px]:w-full"
					isRequired={false}
					type="url"
					placeholder="https://yourwebsite.com"
				/>
			</div>

			<DropdownSelect
				name="shirt_size"
				labelText="T-Shirt Size (Unisex)"
				containerClass="flex flex-col w-full"
				values={shirtSizeOptions}
				placeholder="Select an option"
			/>

			<QuestionField
				name="availability"
				label="Availability — For orientation / pre-meeting / for event? (Please describe when you are available during the event, May 16–17, 2026)"
				maxWords={300}
				required
				value={textAreaAnswer}
				onChange={(v) => setTextAreaAnswer(v)}
			/>

			<CodingSkillsTable />

			<CheckboxList
				name="dev_areas"
				labelText="Select which areas of development you are most comfortable with"
				isRequired={true}
				includeOther={true}
				options={[
					{ value: "ui_ux_design", label: "UI/UX Design" },
					{ value: "graphic_design", label: "Graphic Design" },
					{ value: "git", label: "Git" },
					{ value: "frontend", label: "Frontend" },
					{ value: "backend", label: "Backend" },
					{ value: "embedded_systems", label: "Embedded Systems" },
					{ value: "iot", label: "IoT" },
					{ value: "databases", label: "Databases" },
					{ value: "game_dev", label: "Game Dev" },
					{ value: "ml_ai", label: "Machine Learning / AI" },
				]}
			/>
		</div>
	);
}
