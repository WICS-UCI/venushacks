"use client";

import { useState } from "react";

import QuestionField from "@/lib/components/forms/QuestionField";

export default function VolunteerFRQ() {
	const [answers, setAnswers] = useState({
		why: "",
		gain: "",
		picnic: "",
	});

	return (
		<div className="w-full flex flex-col gap-6">
			<h1 className="font-figtree text-xl md:text-2xl font-semibold mb-2">
				II. Volunteer Questions
			</h1>
			<QuestionField
				name="frq_volunteer"
				label="Why do you want to be a volunteer at Venus Hacks?"
				maxWords={150}
				required
				value={answers.why}
				onChange={(v) => setAnswers({ ...answers, why: v })}
			/>
			<QuestionField
				name="frq_expect_to_gain"
				label="What do you expect to gain from this experience?"
				maxWords={150}
				required
				value={answers.gain}
				onChange={(v) => setAnswers({ ...answers, gain: v })}
			/>
			<QuestionField
				name="frq_picnic"
				label="What would you bring to your ideal picnic outing and why? Who would be there?"
				maxWords={100}
				required
				value={answers.picnic}
				onChange={(v) => setAnswers({ ...answers, picnic: v })}
			/>
		</div>
	);
}
