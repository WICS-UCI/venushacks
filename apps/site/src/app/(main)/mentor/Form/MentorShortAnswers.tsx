"use client";

import { useState } from "react";

import QuestionField from "@/lib/components/forms/QuestionField";

export default function ShortAnswers() {
	const [answers, setAnswers] = useState({
		why: "",
		inclusive: "",
		availability: "",
		questions: "",
	});

	return (
		<div className="w-full flex flex-col gap-6">
			<h1 className="font-figtree text-xl md:text-2xl font-semibold mb-2">
				II. Short Answers
			</h1>
			<QuestionField
				name="mentor_why_saq1"
				label="Why do you want to be a mentor for VenusHacks? What are you hoping to gain from this experience?"
				maxWords={300}
				required
				value={answers.why}
				onChange={(v) => setAnswers({ ...answers, why: v })}
			/>
			<QuestionField
				name="mentor_inclusive_saq2"
				label="How do you hope to contribute to VenusHacks' inclusive environment?"
				maxWords={300}
				required
				value={answers.inclusive}
				onChange={(v) => setAnswers({ ...answers, inclusive: v })}
			/>
			<QuestionField
				name="mentor_availability_saq3"
				label="Are you available to commit to the entire duration of VenusHacks 2026? If not, please specify your availability."
				maxWords={300}
				required
				value={answers.availability}
				onChange={(v) => setAnswers({ ...answers, availability: v })}
			/>
			<QuestionField
				name="mentor_questions_saq4"
				label="Questions, comments, concerns?"
				maxWords={300}
				required
				value={answers.questions}
				onChange={(v) => setAnswers({ ...answers, questions: v })}
			/>
		</div>
	);
}
