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
		<div className="w-full flex justify-center px-4 py-10">
			<div className="w-full max-w-[820px] bg-[#FCFCFC] border border-[#D6D6D6] rounded-[30px] p-[40px] flex flex-col gap-[30px]" style={{ boxShadow: '0px 4px 20px 0px #00000040' }}>
				<h2 className="font-figtree text-[20px] font-semibold text-black">
					III. Technical Questions
				</h2>

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

				<div className="flex justify-between items-center flex-wrap gap-3 mt-4">
					<p className="font-figtree font-normal italic text-[16px] leading-none text-gray-400">
						Last saved mm/dd/yyyy at 00:00:00.
					</p>

					<button
						type="button"
						className="rounded-full bg-[#F4B6B6] text-[#8C3A3A] hover:opacity-90 border border-[#CF6868] font-figtree font-semibold text-[16px] leading-none text-center"
						style={{ paddingTop: '12px', paddingRight: '50px', paddingBottom: '12px', paddingLeft: '50px' }}
					>
						Next →
					</button>
				</div>
			</div>
		</div>
	);
}
