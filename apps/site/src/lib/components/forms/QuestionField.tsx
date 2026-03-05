"use client";

import React from "react";

interface Props {
	label: string;
	name: string;
	value?: string;
	onChange?: (value: string) => void;
	maxWords?: number;
	required?: boolean;
	optional?: boolean;
	placeholder?: string;
}

export default function QuestionField({
	label,
	name,
	value = "",
	onChange,
	maxWords,
	required,
	optional,
	placeholder,
}: Props) {
	const wordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
	const overLimit = maxWords && wordCount > maxWords;

	return (
		<div className="flex flex-col gap-2 w-full font-figtree">
		<label className="text-[16px] font-medium text-black">
			{label}
			{maxWords && ` (${maxWords} words)`}
			{required && <span className="text-red-500"> *</span>}
			{optional && <span className="text-black"> (optional)</span>}
		</label>			<textarea
				name={name}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				placeholder={
					placeholder ||
					(maxWords ? `Answer in ${maxWords} words` : "Enter your answer")
				}
				required={required}
				style={{ boxShadow: '0px 0px 5px 0px #00000033' }}
				className={`w-full min-h-[100px] rounded-[10px] border p-3 resize-none outline-none text-[15px] font-figtree text-black
        ${overLimit ? "border-red-400" : "border-[#D6D6D6]"}
        focus:ring-2 focus:ring-[#f3a5a5]`}
			/>
		</div>
	);
}
