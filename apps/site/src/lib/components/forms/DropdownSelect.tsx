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
		<div className="mt-3">
			<label
				htmlFor={`${name}-other-input`}
				className="block text-sm font-semibold text-slate-900"
			>
				Other: <RequiredAsterisk />
			</label>

			<input
				type="text"
				name={`_other_${name}`}
				id={`${name}-other-input`}
				className="
			mt-2 w-full
			h-12
			rounded-xl
			bg-white
			px-4
			text-slate-900
			placeholder:text-slate-100
			border border-slate-200
			shadow-[0_2px_10px_rgba(0,0,0,0.06)]
			outline-none
			focus:border-slate-300 focus:ring-2 focus:ring-slate-200
			"
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
	const [value, setValue] = useState("");

	return (
		<div className={containerClass}>
			<label className="font-figtree font-medium text-lg mb-2" htmlFor={name}>
				{labelText} {isRequired && <RequiredAsterisk />}
			</label>
			<div className="relative w-full">
				<select
					className={`w-full font-figtree appearance-none text-lg h-10 pl-3 pr-12 rounded-xl border border-[#D6D6D6] bg-[#FCFCFC] ${
						value === "" ? "text-[#8E8E8E]" : "text-black"
					}`}
					style={{ boxShadow: "0px 0px 5px 0px #00000033" }}
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
