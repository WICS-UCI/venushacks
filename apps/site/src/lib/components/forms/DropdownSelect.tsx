"use client";

import { useState } from "react";

import RequiredAsterisk from "./RequiredAsterisk";

interface SelectProps {
	name: string;
	labelText: string;
	values: Array<{ value: string; text: string }>;
	containerClass: string;
}

interface OtherProps {
	value: string;
	name: string;
}

const OtherPopup = ({ value, name }: OtherProps) => {
	if (value === "other") {
		return (
			<div className="mt-2 flex gap-2">
				<label htmlFor={`${name}-other-input`} className="text-lg">
					Other: <RequiredAsterisk />
				</label>
				<input
					type="text"
					name={`_other_${name}`}
					id={`${name}-other-input`}
					className="text-black border-b-2 p-1 h-6 border-black w-6/12"
					required
				/>
			</div>
		);
	}
};

export default function DropdownSelect({
	name,
	labelText,
	values,
	containerClass,
}: SelectProps) {
	const [value, setValue] = useState("");

	return (
		<div className={containerClass}>
			<label className="font-figtree font-medium text-lg mb-2" htmlFor={name}>
				{labelText} <RequiredAsterisk />
			</label>
			<div className="relative w-full">
				<select
					className="w-full font-figtree appearance-none text-[#8E8E8E] text-lg h-10 pl-3 pr-12 rounded-xl border border-[#D6D6D6] bg-[#FCFCFC]"
					style={{ boxShadow: "0px 0px 5px 0px #00000033" }}
					name={name}
					id={name}
					defaultValue=""
					onChange={(e) => setValue(e.target.value)}
					required
				>
					<option value="" disabled />
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
