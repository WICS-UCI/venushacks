"use client";

import { useState } from "react";

import RequiredAsterisk from "./RequiredAsterisk";

interface SelectProps {
	name: string;
	labelText: string;
	values: Array<{ value: string; text: string }>;
	containerClass: string;
	defaultValue?: string;
}

interface OtherProps {
	value: string;
	name: string;
}

const OtherPopup = ({ value, name }: OtherProps) => {
	if (value === "other") {
		return (
			<div className="mt-2 flex flex-col gap-1">
				<label htmlFor={`${name}-other-input`} className="text-sm font-medium text-gray-700">
					Other: <RequiredAsterisk />
				</label>
				<input
					type="text"
					name={`_other_${name}`}
					id={`${name}-other-input`}
					className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 shadow-md rounded-xl"
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
	defaultValue = "",
}: SelectProps) {
	const [value, setValue] = useState(defaultValue);

	return (
		<div className={containerClass}>
			<label className="text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
				{labelText} <RequiredAsterisk />
			</label>
			<select
				className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 shadow-md rounded-xl appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]"
				name={name}
				id={name}
				defaultValue={defaultValue}
				onChange={(e) => setValue(e.target.value)}
				required
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
