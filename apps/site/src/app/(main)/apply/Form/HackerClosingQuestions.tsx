"use client";

import React, { useState } from "react";
import QuestionField from "@/lib/components/forms/QuestionField";
import DropdownSelect from "@/lib/components/forms/DropdownSelect";

const vhReference = [
	{ value: "social media", text: "Social Media" },
	{ value: "friend", text: "Friend" },
	{ value: "university", text: "University" },
	{ value: "discord", text: "Discord" },
	{ value: "other", text: "Other:" },
];

export default function ClosingQuestions() {
	const [answers, setAnswers] = useState({
		hearAbout: "",
		comments: "",
	});

	return (
		<div className="w-full flex flex-col gap-6">
			<h1 className="font-figtree text-xl md:text-2xl font-semibold mb-2">
				IV. Closing Questions
			</h1>

			<DropdownSelect
				name="how_did_you_hear_about_us"
				labelText="How did you hear about VenusHacks?"
				containerClass="flex flex-col"
				isRequired={true}
				values={vhReference}
				placeholder="Select an option"
			/>

			<QuestionField
				name="questions_comments_concerns"
				label="Any questions, comments, or concerns?"
				optional
				value={answers.comments}
				onChange={(v) => setAnswers({ ...answers, comments: v })}
				placeholder="Enter a question, comment, or concern (optional)"
			/>
		</div>
	);
}
