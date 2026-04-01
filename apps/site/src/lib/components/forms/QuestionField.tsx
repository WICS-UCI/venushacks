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
		<div className="flex flex-col gap-2 w-full">
			<label className="block text-sm md:text-base mb-2 font-figtree">
				{label}
				{maxWords && ` (${maxWords} words)`}
				{required && <span className="text-red-500"> *</span>}
				{optional && <span className="text-black"> (optional)</span>}
			</label>{" "}
			<textarea
				name={name}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				placeholder={
					placeholder ||
					(maxWords ? `Answer in ${maxWords} words` : "Enter your answer")
				}
				required={required}
				className={`w-full min-h-[100px] rounded-xl border px-3 py-2 resize-none outline-none text-sm md:text-base font-figtree text-black bg-[#FCFCFC] shadow-[0_0_5px_rgba(0,0,0,0.4)]
        ${overLimit ? "border-red-400" : "border-[#D6D6D6]"}
		focus:bg-white
		focus:border-gray-300
		focus:ring-2 focus:ring-gray-200`}
			/>
		</div>
	);
}
