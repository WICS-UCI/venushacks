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
  isRequired: boolean;
}

const OtherPopup = ({ value, name, isRequired }: OtherProps) => {
	if (value !== "other") return null;

	return (
		<div className="mt-3">
		<label
			htmlFor={`${name}-other-input`}
			className="block text-sm font-semibold text-slate-900"
		>
			Other{isRequired && <RequiredAsterisk />}
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
			required={isRequired}
		/>
		</div>
	);
};

export default function DropdownSelect({
  name,
  labelText,
  values,
  containerClass,
  isRequired,
  placeholder,
}: SelectProps) {
  const [value, setValue] = useState("");

	return (
		<div className={containerClass}>
		<label
			className="block text-md font-semibold text-slate-900 mb-2"
			htmlFor={name}
		>
			{labelText} {isRequired && <RequiredAsterisk />}
		</label>

		<select
			className={`
				w-full h-12 rounded-2xl px-4 pr-10
				border border-gray-200
				bg-white shadow-[0_0_5px_rgba(0,0,0,0.4)] 
				outline-none appearance-none
				${value === "" ? "text-gray-400" : "text-gray-700"}
			`}
			name={name}
			id={name}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			required={isRequired}
			>
			{/* Placeholder */}
			<option value="" disabled className="text-gray-400">
				{placeholder}
			</option>

			{/* options */}
			{values.map((item, i) => (
				<option key={`option-${i}`} value={item.value} className="text-gray-700">
				{item.text}
				</option>
			))}
		</select>

      <div className="relative">
        <div className="pointer-events-none absolute right-4 -mt-8 text-slate-500">
			<svg width="18" height="18" viewBox="0 0 20 20" fill="none">
				<path
				d="M5 7.5L10 12.5L15 7.5"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				/>
			</svg>
        </div>
      </div>

      <OtherPopup value={value} name={name} isRequired={isRequired} />
    </div>
  );
}