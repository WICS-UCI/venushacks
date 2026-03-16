"use client";

import React, { useState } from "react";
import QuestionField from "@/lib/components/forms/QuestionField";

export default function TechnicalQuestions() {
	const [answers, setAnswers] = useState({
		project: "",
		diversity: "",
		future: "",
		picnic: "",
	});

	return (
		<div className="w-full flex flex-col gap-6">
			<h1 className="font-figtree text-xl md:text-2xl font-semibold mb-2">
				III. Technical Questions
			</h1>

			<QuestionField
				name="frq_project"
				label="Describe a project you are passionate about that you've worked on in the past or are currently working on. It can be technical or non-technical!"
				maxWords={150}
				required
				value={answers.project}
				onChange={(v) => setAnswers({ ...answers, project: v })}
			/>

			<QuestionField
				name="frq_diversity"
				label="How have your past experiences shaped your definition of diversity and inclusivity?"
				maxWords={150}
				required
				value={answers.diversity}
				onChange={(v) => setAnswers({ ...answers, diversity: v })}
			/>

			<QuestionField
				name="frq_future"
				label="What's something you're excited to work on in the next 10 years? Dream big!"
				maxWords={100}
				required
				value={answers.future}
				onChange={(v) => setAnswers({ ...answers, future: v })}
			/>

			<QuestionField
				name="frq_picnic"
				label="What are your 3 must-haves at a picnic?"
				maxWords={50}
				required
				value={answers.picnic}
				onChange={(v) => setAnswers({ ...answers, picnic: v })}
			/>
		</div>
	);
}
