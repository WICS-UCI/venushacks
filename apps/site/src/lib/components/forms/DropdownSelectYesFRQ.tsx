"use client";

import { useState } from "react";

import RequiredAsterisk from "./RequiredAsterisk";

interface SelectProps {
	name: string;
	labelText: string;
	values: Array<{ value: string; text: string }>;
	containerClass: string;
}

interface YesProps {
	value: string;
	name: string;
}

const YesPopup = ({ value, name }: YesProps) => {
	if (value === "yes") {
		return (
			<div className="mt-2 flex flex-row gap-2">
				<label htmlFor={`${name}-other-input`} className="text-lg">
					Provide your experience: <RequiredAsterisk />
				</label>
				<input
					type="text"
					name={`_other_${name}`}
					id={`${name}-other-input`}
					className="text-[var(--color-black)] text-sm border shadow-lg p-2 h-10 rounded-xl w-7/12"
					placeholder="ex. VH 2025"
					required
				/>
			</div>
		);
	}
};

export default function DropdownSelectYesFRQ({
	name,
	labelText,
	values,
	containerClass,
}: SelectProps) {
	const [value, setValue] = useState("");

	return (
		<div className={containerClass}>
			<div className="flex flex-col">
				<label className="text-md mb-2" htmlFor={name}>
					{labelText} <RequiredAsterisk />
				</label>
				<select
					className=" text-[var(--color-black)] text-lg h-10 p-1.5 rounded-xl border shadow-lg"
					name={name}
					id={name}
					defaultValue={""}
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
			</div>
			<YesPopup value={value} name={name} />
		</div>
	);
}
