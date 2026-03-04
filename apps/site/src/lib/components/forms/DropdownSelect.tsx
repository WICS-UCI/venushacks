"use client";

import { useState } from "react";
import RequiredAsterisk from "./RequiredAsterisk";

interface SelectProps {
	name: string;
	labelText: string;
	values: Array<{ value: string; text: string }>;
	containerClass: string;
	isRequired?: boolean;
	placeholder?: string;
}

interface OtherProps {
	value: string;
	name: string;
}

const OtherPopup = ({ value, name }: OtherProps) => {
	if (value !== "other") return null;

	return (
		<div className="mt-6">
			<label
				htmlFor={`${name}-other-input`}
				className="block text-sm md:text-base font-figtree mb-2"
			>
				Other: <RequiredAsterisk />
			</label>

			<input
				type="text"
				name={`_other_${name}`}
				id={`${name}-other-input`}
				className="w-full font-figtree outline-none appearance-none text-sm md:text-base py-2 pl-4 pr-12 rounded-xl border border-[#D6D6D6] bg-[#FCFCFC] shadow-[0_0_5px_rgba(0,0,0,0.4)]"
				required
			/>
		</div>
	);
};

export default function DropdownSelect({
	name,
	labelText,
	values,
	containerClass,
	isRequired = true,
	placeholder = "",
}: SelectProps) {
	const [value, setValue] = useState(defaultValue);

	return (
		<div className={containerClass}>
			<label
				className="block text-sm md:text-base font-figtree mb-2"
				htmlFor={name}
			>
				{labelText}{" "}
				{isRequired ? (
					<RequiredAsterisk />
				) : (
					<span className="text-[#8E8E8E]">(optional)</span>
				)}
			</label>
			<div className="relative w-full">
				<select
					className={`w-full font-figtree outline-none appearance-none text-sm md:text-base py-2 pl-4 pr-12 rounded-xl border border-[#D6D6D6] bg-[#FCFCFC] shadow-[0_0_5px_rgba(0,0,0,0.4)] ${
						value === "" ? "text-[#8E8E8E]" : "text-black"
					}`}
					name={name}
					id={name}
					defaultValue=""
					onChange={(e) => setValue(e.target.value)}
					required={isRequired}
				>
					<option value="" disabled>
						{placeholder}
					</option>
					{values.map((item, i) => (
						<option key={`option-${i}`} value={item.value}>
							{item.text}
						</option>
					))}
				</select>
				{/* Added SVG to change dropdown arrow design */}
				<div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#8E8E8E"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="6 9 12 15 18 9" />
					</svg>
				</div>
			</div>
			<OtherPopup value={value} name={name} />
		</div>
	);
}
