"use client";

import React, { useState } from "react";
import QuestionField from "@/lib/components/forms/QuestionField";

export default function ClosingQuestions() {
	const [answers, setAnswers] = useState({
		hearAbout: "",
		comments: "",
	});

	return (
		<div className="w-full flex justify-center flex-col gap-[20px]">
			<h2 className="font-figtree text-[20px] font-semibold text-black">
				IV. Closing Questions
			</h2>

			{/* Required dropdown */}
			<div className="flex flex-col gap-2">
				<label className="text-[16px] font-medium text-black font-figtree">
					How did you hear about VenusHacks?
					<span className="text-red-500"> *</span>
				</label>

				<select
					name="hear_about"
					required
					value={answers.hearAbout}
					onChange={(e) =>
						setAnswers({ ...answers, hearAbout: e.target.value })
					}
					className="border border-[#D6D6D6] rounded-[10px] p-3 bg-white text-black font-figtree"
				>
					<option value="">Select an option</option>
					<option>Social Media</option>
					<option>Friend</option>
					<option>University</option>
					<option>Discord</option>
					<option>Other</option>
				</select>
			</div>

			{/* Optional textarea */}
			<QuestionField
				name="frq_comments"
				label="Any questions, comments, or concerns?"
				optional
				value={answers.comments}
				onChange={(v) => setAnswers({ ...answers, comments: v })}
				placeholder="Enter a question, comment, or concern (optional)"
			/>
		</div>
	);
}
