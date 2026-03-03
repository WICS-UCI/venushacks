"use client";

import { useState } from "react";

import RequiredAsterisk from "./RequiredAsterisk";

interface SelectProps {
	name: string;
	labelText: string;
	values: Array<{ value: string; text: string }>;
	isRequired: boolean;
	containerClass: string;
	placeholder: string;
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
	isRequired,
	placeholder
}: SelectProps) {
	const [value, setValue] = useState("");

	return (
		<div className={containerClass}>
			<label className="text-lg mb-2" htmlFor={name}>
				{labelText} <RequiredAsterisk />
			</label>
			<select
				className="bg-[#e1e1e1] text-[var(--color-black)] text-lg h-10 p-1.5 rounded-md"
				name={name}
				id={name}
				defaultValue={""}
				onChange={(e) => setValue(e.target.value)}
				required = {isRequired}
				placeholder = {placeholder}
			>
				<option value="" disabled />
				{values.map((item, i) => {
					return (
						<option key={`option-${i}`} value={item.value}>
							{item.text}
						</option>
					);
				})}
			</select>
			<OtherPopup value={value} name={name} />
		</div>
	);
}
