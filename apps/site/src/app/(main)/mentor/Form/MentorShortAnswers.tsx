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
				II. Insight Questions
			</h1>
			<QuestionField
				name="why_mentor_frq"
				label="Why do you want to be a mentor for VenusHacks? What are you hoping to gain from this experience?"
				maxWords={300}
				required
				value={answers.why}
				onChange={(v) => setAnswers({ ...answers, why: v })}
			/>
			<QuestionField
				name="contribute_inclusive_frq"
				label="How do you hope to contribute to VenusHacks' inclusive environment?"
				maxWords={300}
				required
				value={answers.inclusive}
				onChange={(v) => setAnswers({ ...answers, inclusive: v })}
			/>
			<QuestionField
				name="availability_specify"
				label="Are you available to commit to the entire duration of VenusHacks 2026? If not, please specify your availability."
				maxWords={300}
				required
				value={answers.availability}
				onChange={(v) => setAnswers({ ...answers, availability: v })}
			/>
			<QuestionField
				name="questions_comments_concerns"
				label="Questions, comments, concerns?"
				maxWords={300}
				required
				value={answers.questions}
				onChange={(v) => setAnswers({ ...answers, questions: v })}
			/>
		</div>
	);
}
