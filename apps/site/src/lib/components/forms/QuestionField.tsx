"use client";

import React, { useState } from "react";

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
	const [wordError, setWordError] = useState("");

	const wordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
	const overLimit = maxWords && wordCount > maxWords;
	const errorMessage = `Please keep your answer to ${maxWords} words or fewer.`;

	const handleInvalid = (e: React.InvalidEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		if (overLimit) setWordError(errorMessage);
	};

	const handleChange = (newValue: string) => {
		onChange?.(newValue);
		const count =
			newValue.trim() === "" ? 0 : newValue.trim().split(/\s+/).length;
		if (maxWords && count <= maxWords) setWordError("");
	};

	return (
		<div className="flex flex-col gap-2 w-full">
			<label className="block text-sm md:text-base mb-2 font-figtree">
				{label}
				{maxWords && ` (${maxWords} words)`}
				{required && <span className="text-red-500"> *</span>}
				{optional && <span className="text-black"> (optional)</span>}
			</label>

			<textarea
				name={name}
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				onInvalid={handleInvalid}
				placeholder={
					placeholder ||
					(maxWords ? `Answer in ${maxWords} words` : "Enter your answer")
				}
				required={required}
				aria-invalid={!!overLimit}
				aria-describedby={wordError ? `${name}-error` : undefined}
				ref={(el) => {
					if (el) {
						if (overLimit) {
							el.setCustomValidity(errorMessage);
						} else {
							el.setCustomValidity("");
						}
					}
				}}
				className={`w-full min-h-[100px] rounded-xl border px-3 py-2 resize-none outline-none text-sm md:text-base font-figtree text-black bg-[#FCFCFC] shadow-[0_0_5px_rgba(0,0,0,0.4)]
				${
					overLimit
						? "border-red-400 focus:border-red-400 focus:ring-red-100"
						: "border-[#D6D6D6] focus:border-gray-300 focus:ring-gray-200"
				}
				focus:bg-white focus:ring-2`}
			/>

			{wordError && (
				<p
					id={`${name}-error`}
					role="alert"
					className="mt-1.5 flex items-center gap-1.5 text-xs md:text-sm text-red-500"
				>
					<svg
						className="w-3.5 h-3.5 shrink-0"
						viewBox="0 0 16 16"
						fill="currentColor"
						aria-hidden="true"
					>
						<path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.75 4a.75.75 0 0 0-1.5 0v3.25a.75.75 0 0 0 1.5 0V5zm-.75 6a.875.875 0 1 0 0-1.75A.875.875 0 0 0 8 11z" />
					</svg>
					{wordError}
				</p>
			)}
		</div>
	);
}
