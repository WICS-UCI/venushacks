"use client";

import React, { useState } from "react";
import QuestionField from "@/lib/components/forms/QuestionField";

export default function ClosingQuestions() {
	const [answers, setAnswers] = useState({
		hearAbout: "",
		comments: "",
	});

	return (
		<div className="w-full flex justify-center px-4 py-10">
			<div className="w-full max-w-[820px] bg-[#FCFCFC] border border-[#D6D6D6] rounded-[30px] p-[40px] flex flex-col gap-[30px]" style={{ boxShadow: '0px 4px 20px 0px #00000040' }}>
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

				<div className="flex justify-between items-center flex-wrap gap-3 mt-4">
					<p className="font-figtree font-normal italic text-[16px] leading-none text-gray-400">
						Last saved mm/dd/yyyy at 00:00:00.
					</p>

					<button
						type="button"
						className="rounded-full bg-[#F4B6B6] text-[#8C3A3A] hover:opacity-90 border border-[#CF6868] font-figtree font-semibold text-[16px] leading-none text-center"
						style={{ paddingTop: '12px', paddingRight: '50px', paddingBottom: '12px', paddingLeft: '50px' }}
					>
						Submit Application →
					</button>
				</div>
			</div>
		</div>
	);
}
