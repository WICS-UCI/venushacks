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
			<div className="mt-2 flex flex-row gap-2">
				<label htmlFor={`${name}-other-input`} className="text-lg">
					Other: <RequiredAsterisk />
				</label>
				<input
					type="text"
					name={`_other_${name}`}
					id={`${name}-other-input`}
					className="text-[var(--color-black)] text-sm border shadow-lg p-2 h-10 resize-none rounded-xl flex flex-col"
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
			<OtherPopup value={value} name={name} />
		</div>
	);
}
